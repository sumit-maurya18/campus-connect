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
        location,
        start_date,
        end_date,
        salary,
        posted_at,
        deadline,
        tags,
        status,
        url)
        VALUES ($1,$2,$3,$4,$5,$6,$7,CURRENT_TIMESTAMP,$8,$9::jsonb,$10,$11)
        RETURNING *`,
      [
        title,
        type,
        company,
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
// ============================================
// 📘 ROUTE: GET /job
// ============================================

// Importing necessary modules
// Assuming 'router' and 'pool' (PostgreSQL connection pool) are already defined above.

router.get("/job", async (req, res) => {
  try {
    // Extracting query parameters from the request URL
    // Example: /job?type=internship&status=open&limit=5&page=2
    const { type, status, limit, page } = req.query;

    // Base SQL query
    let query = "SELECT * FROM job";
    const params = [];      // Stores parameter values to prevent SQL injection
    const conditions = [];  // Stores WHERE clause conditions

    // ✅ Filter: Job Type
    // If `type` is provided (e.g., 'internship', 'job', 'remote')
    // Add a WHERE condition for type
    if (type) {
      params.push(type);
      conditions.push(`type = $${params.length}`);  // $1 placeholder in SQL
    }

    // ✅ Filter: Job Status
    // If `status` is provided (e.g., 'open', 'closed')
    if (status) {
      params.push(status);
      conditions.push(`status = $${params.length}`);  // $2 placeholder in SQL
    }

    // ✅ Apply WHERE conditions (if any)
    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
    }

    // ✅ Sort by posting date (newest first)
    query += " ORDER BY posted_at DESC";

    // ✅ Pagination
    // If `limit` and/or `page` are provided, apply LIMIT and OFFSET
    if (limit) {
      const limitNum = parseInt(limit, 10);          // Convert string → integer
      const pageNum = parseInt(page, 10) || 1;       // Default page = 1

      // LIMIT number of results per page
      params.push(limitNum);
      query += ` LIMIT $${params.length}`;           // e.g., LIMIT $3

      // OFFSET to skip previous pages
      params.push(limitNum * (pageNum - 1));
      query += ` OFFSET $${params.length}`;          // e.g., OFFSET $4
    }

    // ✅ Execute query with prepared statement parameters
    const result = await pool.query(query, params);

    // ✅ Return JSON response
    res.status(200).json(result.rows);

  } catch (err) {
    console.error("GET /job error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});


/*
=========================================================
🧾 API DOCUMENTATION: GET /job
=========================================================

📍 Endpoint:
    GET /job

📋 Description:
    Fetches job listings from the database with optional filters
    for job type, status, and pagination.

---------------------------------------------------------
🔧 QUERY PARAMETERS:
---------------------------------------------------------
| Name     | Type   | Required | Description                            | Example              |
|-----------|--------|-----------|----------------------------------------|----------------------|
| type      | string | No        | Filter by job type                    | internship / job     |
| status    | string | No        | Filter by job status                  | open / closed        |
| limit     | number | No        | Limit number of records per page      | 5                    |
| page      | number | No        | Specify which page to fetch           | 2                    |

---------------------------------------------------------
📤 Example Request URLs:
---------------------------------------------------------

1️⃣ Get all jobs (no filters)
    GET /job

2️⃣ Get only internship jobs
    GET /job?type=internship

3️⃣ Get only open jobs
    GET /job?status=open

4️⃣ Get open internship jobs
    GET /job?type=internship&status=open

5️⃣ Paginated request (5 jobs per page, 2nd page)
    GET /job?limit=5&page=2

---------------------------------------------------------
📦 Example Successful Response (Status: 200 OK)
---------------------------------------------------------
[
  {
    "id": 1,
    "title": "Frontend Developer Intern",
    "type": "internship",
    "status": "open",
    "company": "Google",
    "location": "Bangalore",
    "salary": "20000",
    "posted_at": "2025-10-28T10:20:00.000Z",
    "deadline": "2025-11-15T00:00:00.000Z",
    "url": "https://careers.google.com/jobs/..."
  },
  {
    "id": 2,
    "title": "Backend Developer",
    "type": "job",
    "status": "open",
    "company": "Microsoft",
    "location": "Hyderabad",
    "salary": "100000",
    "posted_at": "2025-10-27T09:15:00.000Z",
    "deadline": "2025-11-10T00:00:00.000Z",
    "url": "https://careers.microsoft.com/..."
  }
]

---------------------------------------------------------
❌ Example Error Response (Status: 500)
---------------------------------------------------------
{
  "error": "Server error"
}

---------------------------------------------------------
🧠 Notes:
- All parameters are optional.
- You can combine multiple filters (type + status).
- Pagination helps in loading data in chunks.
- The API uses prepared statements to prevent SQL injection.
=========================================================
*/



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