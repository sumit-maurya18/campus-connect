//AboutUs.jsx

import React from 'react';
import OurTeam from "@/components/OurTeam"

const AboutUs = () => {
    return (
        <section id='about-us-section' className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 bg-white pt-20">
            <div className="flex flex-col lg:flex-row items-center gap-12">
                {/* Text Content */}
                <div className="lg:w-1/2">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-black mb-6 border-b-4 border-blue-500 pb-2 inline-block">
                        Our Mission & Vision
                    </h1>
                    <p className="mt-4 text-lg text-gray-700 leading-relaxed">
                        <span className="font-semibold text-blue-600">Campus Connect</span> is a vibrant online platform designed to empower college students by providing a centralized hub for all their academic, social, and professional needs. Our mission is to foster a connected and supportive campus community where students can thrive both inside and outside the classroom.
                    </p>
                    <p className="mt-4 text-lg text-gray-700 leading-relaxed">
                        We envision a future where every student has access to the resources and opportunities they need to succeed, and Campus Connect is here to make that vision a reality through innovation and dedication.
                    </p>
                
                </div>

                {/* Image/Illustration */}
                <div className="lg:w-1/2 w-full">
                    <img
                        src="/images/mission-vision.jpg"
                        alt="Illustration of students collaborating and reading a book"
                        className="w-full h-auto rounded-xl shadow-2xl object-cover border-4 border-blue-100"
                    />
                </div>
                
            </div>

            
        </section>
    );
};

export default AboutUs;
