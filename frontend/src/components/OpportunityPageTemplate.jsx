// components/OpportunityPageTemplate.jsx

"use client";

import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import OpportunityCard from './OpportunityCard';
import Pagination from './Pagination';
import CategoryDropdown from '../components/CategoryDropDown'; // <-- Import the new dropdown

// --- CONFIGURATION ---
const ITEMS_PER_PAGE = 20; 
// ---------------------

// --- CONCEPTUAL MOCK DATA & FETCH FUNCTION ---
const MOCK_DATA = {
    internships: {
        data: Array.from({ length: 116 }, (_, i) => ({
            id: i + 1, 
            title: `Role ${i + 1} (${i < 20 ? 'Page 1' : i < 40 ? 'Page 2' : 'Page 3'})`, 
            company: `Company ${i + 1}`, 
            duration: "3 months", 
            stipend: i % 5 === 0 ? "Unpaid" : "$2500/mo", 
            logo: "/img/logo.png", 
            type: i % 3 === 0 ? "Remote" : "WFO", 
            location: "Remote/US", 
            postedDate: "2025-10-01", 
            closingDate: "2025-11-15", 
            role: "Full Stack",
            postedOn: i % 2 === 0 ? "LinkedIn" : "Indeed", 
        })),
    },
};

const fetchOpportunities = async (pageType, page, category, searchTerm) => {
    await new Promise(resolve => setTimeout(resolve, 300)); 
    
    // Simple filter simulation (only filters the mock data, doesn't actually use the category yet)
    let fullData = MOCK_DATA.internships.data; 
    
    // (In a real app, filtering by category and search term would happen here or on the backend)

    const totalItems = fullData.length;
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    
    const paginatedData = fullData.slice(start, end);

    return {
        data: paginatedData,
        totalPages: totalPages,
    };
};
// ----------------------------------------------------------------------


const OpportunityPageTemplate = ({ pageType, title, subtitle }) => {
    const [opportunities, setOpportunities] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [category, setCategory] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            try {
                // Pass all relevant state variables to the fetch function
                const result = await fetchOpportunities(pageType, currentPage, category, searchTerm);
                
                setOpportunities(result.data);
                setTotalPages(result.totalPages);
            } catch (error) {
                console.error("Error fetching opportunities:", error);
                setOpportunities([]);
            } finally {
                setIsLoading(false);
            }
        };
        loadData();
    }, [pageType, currentPage, category, searchTerm]); 

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setCurrentPage(page);
        }
    };

    return (
        <div className="container mx-auto px-4 py-16 min-h-screen pt-20">
            
            {/* Header */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
                    {title}
                </h1>
                <p className="text-lg text-gray-600">
                    {subtitle}
                </p>
            </div>

            {/* Search and Filters */}
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
                    <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                
                {/* Category Dropdown (Filter) - Integration Point */}
                <CategoryDropdown
                    category={category}
                    setCategory={setCategory}
                    setCurrentPage={setCurrentPage}
                />
            </div>

            {/* Data Display Area */}
            {isLoading ? (
                <div className="text-center py-20 text-xl font-medium text-gray-600">Loading opportunities...</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {opportunities.map((opportunity) => (
                        <OpportunityCard 
                            key={opportunity.id} 
                            {...opportunity} 
                        />
                    ))}
                    {opportunities.length === 0 && (
                        <div className="text-center text-xl text-gray-500 col-span-full py-10">No opportunities found matching your criteria.</div>
                    )}
                </div>
            )}

            {/* Pagination Component */}
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