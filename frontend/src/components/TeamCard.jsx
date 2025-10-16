// TeamCard.jsx

import React from 'react';
// Import the LinkedIn icon from lucide-react
import { Linkedin } from 'lucide-react'; 

const ProfileCard = ({ name, title, imageSrc, linkedinUrl }) => {
  return (
    // Card container: Padding, white background, rounded corners, shadow
    <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md transition duration-300 hover:shadow-xl">
      
      {/* Image container: Relative positioning for the LinkedIn icon */}
      <div className="relative mb-4">
        {/* Profile image: Circular, fixed size */}
        <img
          src={imageSrc}
          alt={`Profile image of ${name}`}
          className="w-32 h-32 rounded-full object-cover" // w-32, h-32, rounded-full
        />
        
        {/* LinkedIn link/icon: Absolute position, blue background */}
        <a 
          href={linkedinUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="absolute bottom-0 right-0 p-1 bg-blue-600 rounded-full text-gray-200 text-xs font-bold w-6 h-6 flex items-center justify-center border-2 border-white"
        >
          {/* Replaced 'in' text with Lucide's Linkedin icon */}
          <Linkedin size={14} /> 
        </a>
      </div>
      
      {/* Name */}
      <h3 className="text-lg font-semibold text-gray-800 mt-2">{name}</h3>
      
      {/* Title: Blue color (as seen in the original image) */}
      <p className="text-sm font-medium text-blue-600">{title}</p>
    </div>
  );
};

export default ProfileCard;