"use client";

import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import OpportunityCard from "./OpportunityCard";
import Pagination from "./Pagination";
import CategoryDropdown from "../components/CategoryDropDown";
import useFetchOpportunities from "./useFetchOpportunities"; // ✅ import your custom hook

// --- CONFIGURATION ---
const ITEMS_PER_PAGE = 9; // ✅ now 9 per page
// ---------------------

const OpportunityPageTemplate = ({ pageType, title, subtitle }) => {
    // UI states
    const [currentPage, setCurrentPage] = useState(1);
    const [category, setCategory] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");

    // ✅ Fetch from backend using your custom hook
    const { data, loading, error } = useFetchOpportunities({
        type: pageType,   // job/internship
        limit: ITEMS_PER_PAGE,
        page: currentPage,
    });

    // For now, assume backend returns a simple array. Adjust if it sends pagination info.
    const opportunities = Array.isArray(data) ? data : [];
    const totalPages = Math.ceil(opportunities.total / ITEMS_PER_PAGE) || 5; // fallback demo

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            window.scrollTo({ top: 0, behavior: "smooth" });
            setCurrentPage(page);
        }
    };

    return (
        <div className="container mx-auto px-4 py-16 min-h-screen pt-20">
            {/* Header */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{title}</h1>
                <p className="text-lg text-gray-600">{subtitle}</p>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-12">
                {/* Search Bar */}
                <div className="relative flex-grow">
                    <input
                        type="text"
                        placeholder={`Search by title, company, or keyword...`}
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                    <Search
                        size={20}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                    />
                </div>

                {/* Category Dropdown */}
                <CategoryDropdown
                    category={category}
                    setCategory={setCategory}
                    setCurrentPage={setCurrentPage}
                />
            </div>

            {/* Data Section */}
            {loading ? (
                <div className="text-center py-20 text-xl font-medium text-gray-600">
                    Loading opportunities...
                </div>
            ) : error ? (
                <div className="text-center py-20 text-xl font-medium text-red-500">
                    Failed to load opportunities: {error}
                </div>
            ) : opportunities.length === 0 ? (
                <div className="text-center text-xl text-gray-500 py-10">
                    No opportunities found matching your criteria.
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {opportunities.map((opportunity) => (
                        <OpportunityCard
                            key={opportunity.id}

                            // 🧾 Basic Information
                            id={opportunity.id}
                            title={opportunity.title}
                            company={opportunity.company}
                            role={opportunity.role || "Not specified"}

                            // 💼 Type and Category
                            type={opportunity.type || pageType || "Opportunity"}

                            // 🕓 Duration or Timing
                            duration={opportunity.duration || "Not specified"}
                            postedDate={opportunity.posted_at || opportunity.postedDate}
                            closingDate={opportunity.deadline || opportunity.closingDate}

                            // 💰 Salary / Stipend
                            stipend={opportunity.salary || opportunity.stipend || "Not disclosed"}

                            // 📍 Location Details
                            location={opportunity.location || "Remote"}

                            // 🏢 Branding / Logo
                            logo={opportunity.logo || "/logos/default-logo.png"}

                            // 🔗 Source Info
                            postedOn={opportunity.source || "Company Careers Page"}

                            // (Optional) Add extra fields if your API includes them
                            url={opportunity.url}
                            tags={opportunity.tags || []}
                            status={opportunity.status}
                        />
                    ))}

                </div>
            )}

            {/* Pagination */}
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

export default OpportunityPageTemplate;
