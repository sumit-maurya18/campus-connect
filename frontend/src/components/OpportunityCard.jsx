// components/OpportunityCard.jsx


import React from 'react';
import Link from 'next/link';
import { Clock, DollarSign, MapPin, Briefcase, Calendar, Link as LinkIcon } from 'lucide-react'; //LinkIcon

const OpportunityCard = ({ 
    id, title, company, duration, stipend, logo, 
    type, location, postedDate, closingDate, role, postedOn //postedOn
}) => {
    
    const hasStipend = stipend && stipend !== 'Unpaid' && stipend !== 'N/A';
    const linkPath = `/opportunities/${id}`; 

    const formatDate = (dateString) => {
        return dateString ? new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'N/A';
    };

    return (
        <div className="bg-gray-100 rounded-xl shadow-lg border border-gray-500 p-4 
                 transition duration-300 hover:shadow-2xl hover:scale-[1.01]">
            
            {/* Header/Logo Section */}
            <div className="flex justify-between items-start mb-3">
                <div>
                    <h3 className="text-base font-bold text-gray-900 mb-1 leading-snug">{title}</h3>
                    <p className="text-xs text-gray-600 font-medium">{company}</p>
                </div>
                <div className="w-15 h-15 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-xs text-gray-800 font-medium">Logo</span> 
                </div>
            </div>

            {/* Detailed Info Grid - 2 columns per row for tighter fit */}
            <div className="grid grid-cols-2 gap-y-2 gap-x-2 text-xs text-gray-700 mb-4 border-t pt-3 border-gray-100">
                
                {/* 1. Duration & Role Type */}
                <div className="flex items-center space-x-1 truncate" title={`Duration: ${duration}`}>
                    <Clock size={12} className="text-indigo-500 flex-shrink-0" />
                    <span><span className="font-semibold">{duration}</span></span>
                </div>
                
                {/* 2. Work Type (WFH/WFO/Remote) */}
                <div className="flex items-center space-x-1 truncate" title={`Type: ${type}`}>
                    <Briefcase size={12} className="text-purple-500 flex-shrink-0" />
                    <span><span className="font-semibold">{type}</span></span>
                </div>
                
                {/* 3. Stipend */}
                <div className="flex items-center space-x-1 truncate" title={`Stipend: ${stipend || 'Unpaid'}`}>
                    <DollarSign size={12} className={hasStipend ? 'text-green-500' : 'text-red-500'} />
                    <span className={`font-semibold ${hasStipend ? 'text-gray-900' : 'text-red-500'}`}>
                        {stipend || 'Unpaid'}
                    </span>
                </div>

                {/* 4. Location */}
                <div className="flex items-center space-x-1 truncate" title={`Location: ${location}`}>
                    <MapPin size={12} className="text-blue-500 flex-shrink-0" />
                    <span><span className="font-semibold">{location}</span></span>
                </div>
                
                {/* 5. Posted Date */}
                <div className="flex items-center space-x-1 truncate" title={`Posted: ${formatDate(postedDate)}`}>
                    <Calendar size={12} className="text-orange-500 flex-shrink-0" />
                    <span><span className="font-semibold">{formatDate(postedDate)}</span></span>
                </div>
                
                {/* 6. Posted On Site (NEW FIELD) */}
                <div className="flex items-center space-x-1 truncate" title={`Posted On: ${postedOn}`}>
                    <LinkIcon size={12} className="text-teal-500 flex-shrink-0" />
                    <span><span className="font-semibold">{postedOn || 'N/A'}</span></span>
                </div>
            </div>

            {/* Apply Button */}
            <Link
                href={linkPath}
                className="block text-center py-2 bg-black text-white text-sm font-bold rounded-lg 
                   hover:bg-white hover:text-black transition duration-200 mt-2"
            >
                Apply Now
            </Link>
        </div>
    );
};

export default OpportunityCard;