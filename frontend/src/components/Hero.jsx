// components/HeroBanner.js

import React from 'react';
import Image from 'next/image'; // Recommended for optimized images in Next.js

// Replace '/images/campus-background.jpg' with the actual path to your image
const BACKGROUND_IMAGE_SRC = '/images/univ.jpg'; 

const Hero = () => {
  return (
    <section className="relative pt-10 w-full min-h-[400px] md:min-h-[500px] flex items-center justify-center overflow-hidden z-0">
      
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        {/* Next.js Image Component for performance */}
        <Image
          src={BACKGROUND_IMAGE_SRC}
          alt="University Campus Background"
          layout="fill"
          objectFit="cover"
          quality={80}
        />
        {/* Semi-Transparent White Overlay */}
        <div className="absolute inset-0 bg-white/70 backdrop-blur-[1px]"></div>
      </div>

      {/* Content Container (z-10 ensures it's above the image/overlay) */}
      <div className="relative z-10 text-center px-4 py-12 max-w-4xl">
        
        {/* Headline */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-4">
          Empowering Students.<br className="md:hidden"/> Connecting Campuses.
        </h1>
        
        {/* Subhead */}
        <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
          Your gateway to internships, jobs, hackathons, and learning programs. Join our community and unlock your potential.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          
          {/* Primary CTA: Explore Now */}
          <a
            href="/explore"
            className="px-8 py-3 text-lg font-semibold text-white bg-gray-900 border-2 border-gray-900 rounded-lg shadow-lg hover:bg-gray-700 transition duration-300 transform hover:scale-[1.02]"
          >
            Explore Now
          </a>
          
          {/* Secondary CTA: Join Us */}
          <a
            href="/join"
            className="px-8 py-3 text-lg font-semibold text-gray-900 bg-white border-2 border-gray-900 rounded-lg shadow-lg hover:bg-gray-50 transition duration-300 transform hover:scale-[1.02]"
          >
            Join Us
          </a>
        </div>
        
      </div>
    </section>
  );
};

export default Hero;