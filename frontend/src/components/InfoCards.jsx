import React from 'react';
import Link from 'next/link';
import { Calendar } from 'lucide-react';

const InfoCards = ({ title, company, duration, imageText, closingDate, logoSrc, mode, url }) => {
  // const applyLink = `/internships/${title.toLowerCase().replace(/\s/g, '-')}/apply`;

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      timeZoneName: 'short',
    });

  return (
    <div className="bg-gray-100 border border-gray-500 rounded-2xl shadow-md overflow-hidden transition transform hover:scale-[1.02] duration-300">
      <div className="relative h-48 bg-gray-900 flex flex-col items-center justify-center text-center px-4">
        <img
          src={logoSrc || '/placeholder-logo.png'}
          alt={`${company} Logo`}
          className="h-20 w-auto mb-3 opacity-80"
        />
        <p className="text-white text-lg font-semibold leading-tight">{title}</p>
      </div>

      <div className="p-5">
        <h3 className="text-base font-bold text-gray-900 truncate">{title}</h3>

        {/* 🔹 Dynamic Badges */}
        <div className="flex flex-wrap items-center gap-2 mt-2">
          <span className="bg-violet-100 text-violet-700 text-xs font-semibold px-2.5 py-0.5 rounded">
            Free
          </span>
          {mode && (
            <span className="bg-violet-100 text-violet-700 text-xs font-semibold px-2.5 py-0.5 rounded capitalize">
              {mode}
            </span>
          )}
        </div>

        <div className="mt-3 text-sm text-gray-600">
          <p>Registration Ends On:</p>
          <div className="flex items-center gap-2 mt-1 text-gray-700">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(closingDate)}</span>
          </div>
        </div>

        <div className="mt-5">
          <Link
            href={`${url}` || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center py-2.5 px-4 border border-black rounded-lg shadow-md text-base font-bold 
             text-white bg-black hover:bg-white hover:text-black transition-colors duration-300"
          >
            Register Now
          </Link>

        </div>
      </div>
    </div>
  );
};

export default InfoCards;
