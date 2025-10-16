// Footer.jsx - Lucide Icons Integrated

import React from 'react';
import { footerLinks, socialLinks } from '../data/FooterData';
import FooterLinkGroup from './FooterLinkGroup';

// Import specific icons from the lucide-react package
// NOTE: Make sure you installed 'lucide-react' if you are in a React project
import { Twitter, Linkedin, MessageCircle } from 'lucide-react'; 

// ------------------------------------------
// 1. Social Icon Mapping/Component
// ------------------------------------------

// Map string names from footerData.js to the actual Lucide Icon components
const iconMap = {
  Twitter: Twitter,
  Linkedin: Linkedin,
  // Assuming 'Discord' is represented by MessageCircle or another appropriate icon
  Discord: MessageCircle, 
};

// Reusable component to render a social icon link
const SocialIcon = ({ iconName, url }) => {
  const IconComponent = iconMap[iconName];
  if (!IconComponent) return null; // Safety check

  return (
    <a 
      href={url} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="text-gray-400 hover:text-white transition-colors duration-200"
    >
      {/* Use the Lucide Icon Component */}
      <IconComponent size={20} className="w-6 h-6" /> 
    </a>
  );
};

// ------------------------------------------
// 2. Main Footer Component
// ------------------------------------------

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-8 mb-12 border-b border-gray-800 pb-10">
          
          {/* Column 1: Campus Connect Branding */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-xl font-bold mb-3">Campus Connect</h3>
            <p className="text-gray-400 text-sm">
              Empowering Students. Connecting Campuses.
            </p>
          </div>

          {/* Column 2 & 3: Modular Link Groups */}
          <FooterLinkGroup 
            title={footerLinks.quickLinks.title} 
            links={footerLinks.quickLinks.links} 
          />

          <FooterLinkGroup 
            title={footerLinks.resources.title} 
            links={footerLinks.resources.links} 
          />

          {/* Column 4: Follow Us (Social Media) */}
          <div>
            <h3 className="text-white text-base font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {/* Map over social links and use the SocialIcon component */}
              {socialLinks.map((social, index) => (
                <SocialIcon
                  key={index}
                  iconName={social.icon} // e.g., 'Twitter'
                  url={social.url}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Copyright Note */}
        <div className="text-center pt-4">
          <p className="text-gray-500 text-xs">
            &copy; {currentYear} Campus Connect. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;