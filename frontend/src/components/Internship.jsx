//Internship.jsx

// =============================================
// 🎯 Internship Section Component
// =============================================
//
// ✅ Purpose:
// Displays latest internship opportunities dynamically
// fetched from the backend using the useFetchOpportunities hook.
//
// ✅ Data Source:
// GET /api/job?type=internship&limit=3
//
// ✅ Includes:
// - Dynamic cards (OpportunityCard)
// - Loading & error states
// - “Explore More” link to full internship list
//
// =============================================
"use client";
import React from "react";
import Link from "next/link";
import OpportunityCard from "./OpportunityCard";
import useFetchOpportunities from "./useFetchOpportunities";

const Internship = () => {
  // ✅ Using the custom hook to fetch internships (limit = 3)
  //    This hook handles fetching, loading, and error states internally.
  const { data: internships, loading, error } = useFetchOpportunities({
    type: "Internship",
    limit: 3,
  });

  return (
    // ==============================
    // 🎯 SECTION WRAPPER
    // ==============================
    <section
      id="internship-section"
      className="py-12 px-4 sm:px-6 lg:px-8 bg-white pt-20"
    >
      {/* ==============================
          🏷️ SECTION HEADER
          - Always visible (even during loading/error)
      ============================== */}
      <div className="max-w-7xl mx-auto flex justify-between items-center mb-10">
        {/* Section Title */}
        <h2 className="text-3xl font-extrabold text-black tracking-tight">
          Internships
        </h2>

        {/* “Explore More” link that navigates to the full internship list page */}
        <Link
          href="/internships"
          className="text-lg font-semibold text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out"
        >
          Explore More &rarr;
        </Link>
      </div>

      {/* ==============================
          🧩 MAIN CONTENT AREA (Cards / Loading / Error)
          - All 3 states are handled here
      ============================== */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* 🔄 If data is still loading */}
        {loading ? (
          <p className="col-span-3 text-center text-gray-500 text-lg font-semibold">
            Loading internships...
          </p>
        ) : /* ❌ If there was an error fetching data */ error ? (
          <p className="col-span-3 text-center text-red-500 text-lg font-semibold">
            Failed to load internships: {error}
          </p>
        ) : /* ✅ If data is fetched successfully and internships exist */ internships.length > 0 ? (
          internships.map((internship) => (
            <OpportunityCard
              key={internship.id}
              id={internship.id}
              title={internship.title}
              company={internship.company}
              duration={internship.duration || "Not specified"}
              stipend={internship.salary || "Not Disclosed"}
              logo={internship.logo || "/logos/default-logo.png"}
              type={internship.type || "Internship"}
              location={internship.location || "Remote"}
              postedDate={internship.posted_at}
              closingDate={internship.deadline}
              postedOn={internship.source || "Careers Page"}
              url={internship.url}
            />
          ))
        ) : (
          // 🚫 If there are no internships to show
          <p className="col-span-3 text-center text-gray-600 text-lg">
            No internships available right now.
          </p>
        )}
      </div>
    </section>
  );
};

export default Internship;


/*
=========================================================
📘 API DOCUMENTATION (Frontend Integration)
=========================================================

📍 Hook Used:
    useFetchOpportunities({ type: "internship", limit: 3 })

📍 Backend Endpoint:
    GET /api/job?type=internship&limit=3

📋 Description:
    Fetches top 3 internship listings from the backend and displays
    them as cards with title, company, stipend, and deadline.

---------------------------------------------------------
🔧 QUERY PARAMETERS:
---------------------------------------------------------
| Name  | Type   | Default | Description                        | Example              |
|--------|--------|----------|------------------------------------|----------------------|
| type   | string | internship | Filters only internship-type jobs | internship           |
| limit  | number | 3        | Number of internship cards to show | 3                    |
| page   | number | 1        | Page number for pagination (optional) | 1                |

---------------------------------------------------------
📦 Example Response (from backend):
---------------------------------------------------------
[
  {
    "id": 12,
    "title": "Frontend Developer Intern",
    "company": "Google",
    "type": "internship",
    "status": "open",
    "location": "Remote",
    "salary": "15000",
    "duration": "3 Months",
    "posted_at": "2025-10-28T10:20:00.000Z",
    "deadline": "2025-11-15T00:00:00.000Z",
    "logo": "/logos/google.png"
  },
  ...
]

---------------------------------------------------------
✅ Renders:
---------------------------------------------------------
- A responsive 3-column grid of internship cards.
- Loading indicator while fetching data.
- Error message if request fails.
- Fallback message if no internships are available.
- “Explore More →” link navigates to `/internships`.

=========================================================
*/
