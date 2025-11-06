// FooterLinkGroup.jsx
import React from 'react';

const FooterLinkGroup = ({ title, links }) => {
  return (
    <div>
      <h3 className="text-white text-base font-semibold mb-4">{title}</h3>
      <ul className="space-y-3">
        {links.map((link, index) => (
          <li key={index}>
            <a 
              href={link.url} 
              className="text-gray-400 text-sm hover:text-white transition-colors duration-200"
            >
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterLinkGroup;