"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'; 

const links = [
  { name: 'Home', path: '/' },
  { name: 'Internships', path: '/internships' },
  { name: 'Hackathons', path: '/hackathons' },
  { name: 'Jobs', path: '/jobs' },
  { name: 'About', path: '/about' },
];

const Navbar = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray-100 p-5 fixed w-full top-0 left-0 shadow-md z-10">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo/Brand Name */}
        <h1 className="text-2xl font-bold text-black">
          <Link href="/">Campus Connect</Link>
        </h1>

        {/* Desktop Navigation Links (Visible only on medium screens and up) */}
        <ul className="hidden md:flex justify-evenly flex-row ml-10 space-x-4">
          {links.map((link) => (
            <li key={link.name}>
              <Link
                href={link.path}
                className="px-4 py-2 text-black font-semibold rounded-md hover:bg-black hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button (Visible only on small screens) */}
        <div className="md:hidden">
          <button 
            onClick={toggleMenu} 
            className="text-black hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-black rounded-md p-1"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? (
              // X icon when menu is open
              <XMarkIcon className="h-6 w-6" /> 
            ) : (
              // Hamburger icon when menu is closed
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown (Conditionally rendered) */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <ul className="flex flex-col mt-4 space-y-2">
          {links.map((link) => (
            <li key={link.name}>
              <Link
                href={link.path}
                // Close the menu on link click
                onClick={toggleMenu} 
                className="block px-4 py-2 text-black font-semibold rounded-md hover:bg-black hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;