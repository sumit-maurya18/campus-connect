import { Router } from "express";
import pool from "../db.js";

const router = Router();

router.get("/", async (req, res) => {
    try {
        let {
            q = "",
            page = 1,
            limit = 9,
            type
        } = req.query;

        page = Number(page);
        limit = Number(limit);

        const search = q.toLowerCase().trim();
        const offset = (page - 1) * limit;

        let params = [];
        let where = [];

        /* -------------------------------------------------------
           1️⃣ STRICT TYPE FILTER (Never overridden by search)
        -------------------------------------------------------- */
        if (type === "Internship" || type === "Full-Time") {
            params.push(type);
            where.push(`type = $${params.length}`);
        }

        /* -------------------------------------------------------
           2️⃣ SEARCH KEYWORDS (ONLY title/company/skills etc)
              DOES NOT search by type
        -------------------------------------------------------- */
        if (search) {
            params.push(`%${search}%`);
            const idx = params.length;

            where.push(`(
                LOWER(title) LIKE $${idx} OR
                LOWER(company) LIKE $${idx} OR
                LOWER(location) LIKE $${idx} OR
                LOWER(duration) LIKE $${idx} OR
                LOWER(posted_on) LIKE $${idx}
            )`);

            // JSONB SKILLS ARRAY SEARCH
            params.push(search);
            where.push(`
                EXISTS (
                    SELECT 1
                    FROM jsonb_array_elements_text(tags->'skills') AS skill
                    WHERE LOWER(skill) LIKE '%' || $${params.length} || '%'
                )
            `);
        }

        /* -------------------------------------------------------
           3️⃣ BUILD FINAL WHERE CLAUSE
        -------------------------------------------------------- */
        let finalWhere = where.length > 0 ? "WHERE " + where.join(" AND ") : "";

        /* -------------------------------------------------------
           4️⃣ MAIN QUERY
        -------------------------------------------------------- */
        params.push(limit);
        params.push(offset);

        const mainQuery = `
            SELECT *
            FROM job
            ${finalWhere}
            ORDER BY posted_at DESC
            LIMIT $${params.length - 1} OFFSET $${params.length};
        `;

        /* -------------------------------------------------------
           5️⃣ COUNT QUERY (no limit/offset)
        -------------------------------------------------------- */
        const countQuery = `
            SELECT COUNT(*) AS total
            FROM job
            ${finalWhere};
        `;

        // count query uses only the search + type params (not limit/offset)
        const countParams = params.slice(0, params.length - 2);

        const [result, count] = await Promise.all([
            pool.query(mainQuery, params),
            pool.query(countQuery, countParams)
        ]);

        const total = Number(count.rows[0].total);
        const totalPages = Math.ceil(total / limit);

        /* -------------------------------------------------------
           6️⃣ SEND RESPONSE
        -------------------------------------------------------- */
        res.json({
            success: true,
            query: q,
            type,
            page,
            limit,
            total,
            totalPages,
            data: result.rows
        });

    } catch (err) {
        console.error("Search error:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});

export default router;
