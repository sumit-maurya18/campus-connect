// components/InfoCards.jsx


import React from 'react';
import Link from 'next/link';

const InfoCards = ({ title, company, duration, imageText, openingDate, closingDate, logoSrc }) => {
  
  // Assuming the internship listing or detail page path is dynamic
  const applyLink = `/internships/${title.toLowerCase().replace(/\s/g, '-')}/apply`;

  const formatDate = (dateString) => {
    // Note: Assuming a simple 'YYYY-MM-DD' format for dateString
    return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition transform hover:scale-[1.02] duration-300 border border-gray-200">
      
      {/* Image/Logo Area (Dark Background) */}
      <div className="relative h-48 bg-gray-800 flex items-center justify-center p-6">
        <div className="text-center">
          <img 
            src={logoSrc || '/placeholder-logo.png'} 
            alt={`${company} Logo`} 
            className="h-20 w-auto mx-auto mb-2 opacity-70 filter grayscale" 
          />
          <p className="text-white/70 tracking-widest text-xs font-medium uppercase">
            {imageText || 'OPPORTUNITY'} 
          </p>
        </div>
      </div>

      {/* Content Area (White Background) */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 mb-1 leading-snug">{title}</h3>
        
        {/* Company and Duration Row */}
        <p className="text-sm text-gray-600 mb-4">
          {company} | <span className="font-medium text-gray-700">{duration}</span>
        </p>

        {/* Opening and Closing Dates */}
        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center text-sm">
          <div>
            <p className="text-gray-500">Opening Date</p>
            <p className="font-bold text-gray-800">{formatDate(openingDate)}</p>
          </div>
          <div className="text-right">
            <p className="text-gray-500">Closing Date</p>
            {/* Highlight the closing date for urgency */}
            <p className="font-semibold text-red-600">{formatDate(closingDate)}</p>
          </div>
        </div>
        
        {/* 💡 NEW: Apply Button */}
        <div className="mt-6">
          <Link
            href={applyLink}
            // Primary, full-width, eye-catching button style
            className="block text-center py-2.5 px-4 border border-black rounded-lg shadow-md text-base font-bold text-white bg-black hover:bg-white hover:text-black transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/50"

          >
            Apply Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InfoCards;