// components/FullTimeOpenings.jsx

import React from 'react';
import Link from 'next/link';
import InfoCards from './InfoCards'


// Sample data to drive the component
const internshipsData = [
  {
    id: 1,
    title: 'Software Engineering Internship',
    company: 'Tech Innovators Inc.',
    duration: '3 Months',
    imageText: 'TECHNOOLOGY',
    openingDate: '2025-10-01',
    closingDate: '2025-11-15',
    logoSrc: '/logos/tech-logo.png' // Replace with your actual path
  },
  {
    id: 2,
    title: 'Marketing Internship',
    company: 'Global Marketing Solutions',
    duration: '2 Months',
    imageText: 'MARKETING COMUJN',
    openingDate: '2025-10-10',
    closingDate: '2025-12-05',
    logoSrc: '/logos/marketing-logo.png' // Replace with your actual path
  },
  {
    id: 3,
    title: 'Finance Internship',
    company: 'Financial Services Group',
    duration: '3 Months',
    imageText: 'FIIANNCE',
    openingDate: '2025-11-01',
    closingDate: '2025-12-30',
    logoSrc: '/logos/finance-logo.png' // Replace with your actual path
  },
];

const FullTimeOpenings = () => {
  return (
    // Max width container for the whole section
    <section id='full-time-section' className="py-12 px-4 sm:px-6 lg:px-8 bg-white pt-20"> 
      
      {/* Header: Title and Explore More Link */}
      <div className="max-w-7xl mx-auto flex justify-between items-center mb-10">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Full Time Opportunities
        </h2>
        {/* The new "Explore More" link */}
        <Link 
          href="/internships" 
          className="text-lg font-semibold text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out"
        >
          Explore More &rarr; 
        </Link>
      </div>

      {/* Cards Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {internshipsData.map((internship) => (
          <InfoCards key={internship.id} {...internship} />
        ))}
      </div>

    </section>
  );
};

export default FullTimeOpenings;