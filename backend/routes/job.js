import express from "express";
import pool from "../db.js"; // Adjust path as needed

const router = express.Router();

// POST route to add new opportunities
router.post("/job", async (req, res) => {
  try {
    const {
      title,
      type,
      company,
      description,
      location,
      start_date,
      end_date,
      salary,
      deadline,
      tags,
      status,
      url,
    } = req.body;

    // Validating required fields
    if (!title || !type || !company || !url) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Default status
    const opportunityStatus = status || "active";

    const newOpportunity = await pool.query(
      `INSERT INTO job
        (title,
        type,
        company,
        description,
        location,
        start_date,
        end_date,
        salary,
        posted_at,
        deadline,
        tags,
        status,
        url)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,CURRENT_TIMESTAMP,$9,$10::jsonb,$11,$12)
        RETURNING *`,
      [
        title,
        type,
        company,
        description || null,
        location || null,
        start_date || null,
        end_date || null,
        salary || null,
        deadline || null,
        JSON.stringify(tags || []), // convert tags array to JSONB
        opportunityStatus,
        url,
      ]
    );

    res.status(201).json(newOpportunity.rows[0]); // returning inserted rows
  } catch (err) {
    console.error("POST /job error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

//GET request to fetch all jobs
router.get("/job", async (req, res) => {
  try {
    const { type, status } = req.query;

    let query = "SELECT * FROM job";
    const params = [];
    const conditions = [];

    if (type) {
      params.push(type);
      conditions.push(`type = $${params.length}`);
    }

    if (status) {
      params.push(status);
      conditions.push(`status = $${params.length}`);
    }

    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
    }

    query += " ORDER BY posted_at DESC";

    const result = await pool.query(query, params);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("GET /job error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});


// UPDATE a job by ID
router.put("/job/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      type,
      company,
      description,
      location,
      start_date,
      end_date,
      salary,
      deadline,
      tags,
      status,
      url,
    } = req.body;

    // Check if the job exists
    const jobExists = await pool.query("SELECT * FROM job WHERE id = $1", [id]);
    if (jobExists.rows.length === 0) {
      return res.status(404).json({ error: "Job not found" });
    }

    // Build dynamic update query
    const fields = [];
    const values = [];
    let index = 1;

    const addField = (fieldName, value) => {
      if (value !== undefined) {
        fields.push(`${fieldName} = $${index}`);
        values.push(value);
        index++;
      }
    };

    addField("title", title);
    addField("type", type);
    addField("company", company);
    addField("description", description);
    addField("location", location);
    addField("start_date", start_date);
    addField("end_date", end_date);
    addField("salary", salary);
    addField("deadline", deadline);
    addField("tags", tags ? JSON.stringify(tags) : undefined);
    addField("status", status);
    addField("url", url);

    if (fields.length === 0) {
      return res.status(400).json({ error: "No fields to update" });
    }

    const query = `UPDATE job SET ${fields.join(", ")} WHERE id = $${index} RETURNING *`;
    values.push(id);

    const updatedJob = await pool.query(query, values);
    res.status(200).json(updatedJob.rows[0]);
  } catch (err) {
    console.error("PUT /job/:id error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});



// DELETE a job by ID
router.delete("/job/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID
    if (!id || isNaN(id)) {
      return res.status(400).json({ error: "Invalid job ID" });
    }

    // Attempt to delete the job
    const result = await pool.query(
      "DELETE FROM job WHERE id = $1 RETURNING *",
      [id]
    );

    // If no job was deleted
    if (result.rows.length === 0) {
      console.warn(`DELETE /job/${id} - Job not found`);
      return res.status(404).json({ error: "Job not found" });
    }

    // Successful deletion
    console.log(`DELETE /job/${id} - Job deleted successfully`);
    res.status(200).json({ message: "Job deleted successfully", job: result.rows[0] });
    
  } catch (err) {
    // Log detailed error for debugging
    console.error(`DELETE /job/${req.params.id} error:`, err.message);
    res.status(500).json({ error: "Server error" });
  }
});



export default router;