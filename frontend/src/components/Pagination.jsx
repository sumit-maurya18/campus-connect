// components/Pagination.jsx
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Function to dynamically determine which pages to show 
const getVisiblePages = (currentPage, totalPages) => {
  const range = 2; // Show 2 pages on either side of the current page
  const pages = new Set();
  
  // Always include the first and last page
  if (totalPages > 0) pages.add(1);
  if (totalPages > 1) pages.add(totalPages);
  
  // Include pages around the current page
  for (let i = currentPage - range; i <= currentPage + range; i++) {
    if (i > 1 && i < totalPages) {
      pages.add(i);
    }
  }

  const sortedPages = Array.from(pages).sort((a, b) => a - b);
  const finalPages = [];

  // Insert "..." indicators
  for (let i = 0; i < sortedPages.length; i++) {
    const page = sortedPages[i];
    finalPages.push(page);
    if (i < sortedPages.length - 1 && sortedPages[i + 1] > page + 1) {
      finalPages.push('...');
    }
  }
  
  return finalPages;
};


const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  
  // FIX: Use the dynamic calculation instead of the fixed array
  const pagesToShow = getVisiblePages(currentPage, totalPages); 
  const isActive = (page) => page === currentPage;

  return (
    <div className="flex justify-center items-center mt-12 space-x-2">
      
      {/* Previous Button: Correctly calls onPageChange */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-full text-gray-500 hover:text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition duration-150"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Page Numbers: Dynamically generated */}
      {pagesToShow.map((page, index) => (
        <React.Fragment key={index}>
          {page === '...' ? (
            <span className="px-3 py-1 text-gray-500">...</span>
          ) : (
            <button
              onClick={() => onPageChange(page)}
              className={`px-4 py-2 text-sm font-semibold rounded-full 
                          transition-colors duration-200
                          ${isActive(page) 
                              ? 'bg-black text-white shadow-md' 
                              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'}`
              }
            >
              {page}
            </button>
          )}
        </React.Fragment>
      ))}

      {/* Next Button: Correctly calls onPageChange */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-full text-gray-500 hover:text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition duration-150"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default Pagination;