//useFetchOpportunities.jsx


// ==============================================
// 🎯 Custom React Hook: useFetchOpportunities
// ==============================================
//
// ✅ Purpose:
// Fetches opportunities (jobs/internships) from the backend API `/api/job`
// with optional filtering, pagination, and automatic loading/error state handling.
//
// ✅ Usage Example:
// const { data, loading, error } = useFetchOpportunities({ type: "internship", limit: 5, page: 1 });
//
// ✅ Returns:
// - data: Array of job objects fetched from the API
// - loading: Boolean (true while fetching, false when done)
// - error: String (error message if fetching fails)
//
// ==============================================
'use client';
import { useState, useEffect } from "react";

const useFetchOpportunities = ({ type, limit = 3, page = 1 }) => {
  // React state hooks for managing data, loading, and errors
  const [data, setData] = useState([]);       // Stores fetched jobs
  const [loading, setLoading] = useState(true); // Controls loading spinner
  const [error, setError] = useState(null);     // Holds error message if something fails

  useEffect(() => {
    // Inner async function to fetch opportunities
    const fetchData = async () => {
      setLoading(true); // Start loading when request begins

      try {
        // Construct the backend URL dynamically
        // Example: /api/job?type=internship&limit=3&page=1
        const baseUrl =   process.env.NEXT_PUBLIC_URL;
        const url = `${baseUrl}/api?type=${type}&limit=${limit}&page=${page}`;


        // Send HTTP GET request to the backend API
        const response = await fetch(url);

        // Throw an error if API returns non-200 status
        if (!response.ok) throw new Error("Failed to fetch opportunities");

        // Parse response JSON
        const json = await response.json();

        // Update data state
        setData(json);
      } catch (err) {
        // Catch and store error message
        setError(err.message);
      } finally {
        // Stop loading indicator regardless of success or failure
        setLoading(false);
      }
    };

    // Invoke the fetch function whenever dependencies change
    fetchData();

    // Dependencies: re-fetch data whenever type, limit, or page changes
  }, [type, limit, page]);

  // Return the hook's state values for use in components
  return { data, loading, error };
};

export default useFetchOpportunities;



/*
=========================================================
📘 API DOCUMENTATION: GET /api/job
=========================================================

📍 Endpoint:
    GET /api/job

📋 Description:
    Fetches a list of job or internship opportunities from the backend,
    filtered and paginated based on query parameters.

---------------------------------------------------------
🔧 QUERY PARAMETERS:
---------------------------------------------------------
| Name  | Type   | Required | Default | Description                        | Example              |
|--------|--------|-----------|----------|------------------------------------|----------------------|
| type   | string | No        | none     | Filter by type of opportunity      | internship / job     |
| limit  | number | No        | 3        | Number of results per page         | 5                    |
| page   | number | No        | 1        | Page number for pagination         | 2                    |

---------------------------------------------------------
📤 Example Request URLs:
---------------------------------------------------------
1️⃣ Get all jobs:
    GET /api/job

2️⃣ Get only internships:
    GET /api/job?type=internship

3️⃣ Get paginated internships (5 per page, 2nd page):
    GET /api/job?type=internship&limit=5&page=2

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
  ...
]

---------------------------------------------------------
❌ Example Error Response (Status: 500 or fetch error)
---------------------------------------------------------
{
  "error": "Server error"
}
or (in React state)
error = "Failed to fetch opportunities"

---------------------------------------------------------
⚙️ Notes:
---------------------------------------------------------
- This hook automatically refetches when `type`, `limit`, or `page` changes.
- Default limit = 3 (you can override in props).
- Frontend can show loaders/spinners using `loading` flag.
- Backend should support pagination via LIMIT and OFFSET.

=========================================================
*/
