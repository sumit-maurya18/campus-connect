"use client";

import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import InfoCards from "./InfoCards";
import Pagination from "./Pagination";
import CategoryDropdown from "./CategoryDropDown";
import useFetchHackathonsLearning from "./useFetchHackathonsLearning";

// --- CONFIGURATION ---
const ITEMS_PER_PAGE = 6; // ✅ 6 hackathons/learning opportunities per page
// ----------------------

const HackLearnPageTemplate = ({ pageType, title, subtitle }) => {
  // UI States
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ Fetch data using custom hook
  const { data, loading, error } = useFetchHackathonsLearning({
    event: pageType, // e.g. "hackathon" or "learning"
    limit: ITEMS_PER_PAGE,
    page: currentPage,
  });

  // ✅ Normalize API data
  const opportunities = Array.isArray(data) ? data : [];
  const totalPages = Math.ceil(opportunities.total / ITEMS_PER_PAGE) || 5;

  // Pagination handler
  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setCurrentPage(page);
    }
  };

  // ✅ Apply search & category filters (frontend filtering)
  const filteredOpportunities = opportunities.filter((item) => {
    const matchesSearch =
      item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.company?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      category === "All" ||
      item.category?.toLowerCase() === category.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  // ==========================================================
  // 🧱 RENDER SECTION
  // ==========================================================
  return (
    <div className="container mx-auto px-4 py-16 min-h-screen pt-20">
      {/* ===== HEADER ===== */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
          {title}
        </h1>
        <p className="text-lg text-gray-600">{subtitle}</p>
      </div>

      {/* ===== SEARCH + FILTER ===== */}
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-12">
        {/* 🔍 Search Bar */}
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder={`Search by name, company, or keyword...`}
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-violet-500 focus:border-violet-500"
          />
          <Search
            size={20}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
        </div>

        {/* 🏷️ Category Dropdown */}
        <CategoryDropdown
          category={category}
          setCategory={setCategory}
          setCurrentPage={setCurrentPage}
        />
      </div>

      {/* ===== MAIN CONTENT ===== */}
      {loading ? (
        <div className="text-center py-20 text-xl font-medium text-gray-600">
          Loading hackathons & learning opportunities...
        </div>
      ) : error ? (
        <div className="text-center py-20 text-xl font-medium text-red-500">
          Failed to load data: {error}
        </div>
      ) : filteredOpportunities.length === 0 ? (
        <div className="text-center text-xl text-gray-500 py-10">
          No opportunities found matching your criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredOpportunities.map((item) => (
            <InfoCards
              key={item.id}
              title={item.title}
              company={item.company || "N/A"}
              duration={item.duration || "Varies"}
              imageText={item.imageText || ""}
              closingDate={item.deadline || item.closingDate}
              logoSrc={item.logo || "/logos/default-logo.png"}
              mode={item.mode || "online"}
              url={item.url || "#"}
            />
          ))}
        </div>
      )}

      {/* ===== PAGINATION ===== */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default HackLearnPageTemplate;
