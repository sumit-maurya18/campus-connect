import React from 'react';
import Link from 'next/link';
import InfoCards from './InfoCards';

const hackathonsData = [
  {
    id: 1,
    title: 'Gen AI Exchange Hackathon',
    company: 'Google Cloud',
    duration: 'Hybrid',
    imageText: 'Hackathon',
    closingDate: '2025-09-21',
    logoSrc: '/logos/google-cloud.png',
  },
  {
    id: 2,
    title: 'AI for Impact Challenge',
    company: 'Microsoft Research',
    duration: 'Online',
    imageText: 'AI Innovation',
    closingDate: '2025-11-15',
    logoSrc: '/logos/microsoft.png',
  },
  {
    id: 3,
    title: 'Next-Gen Developer Summit',
    company: 'Meta Platforms',
    duration: 'In-person',
    imageText: 'Developer Event',
    closingDate: '2025-12-10',
    logoSrc: '/logos/meta.png',
  },
];

const Hackathons = () => {
  return (
    <section id="hackathon-section" className="py-12 px-4 sm:px-6 lg:px-8 bg-white pt-20">
      <div className="max-w-7xl mx-auto flex justify-between items-center mb-10">
        <h2 className="text-3xl font-extrabold text-gray-900">Hackathons</h2>
        <Link
          href="/hackathons"
          className="text-lg font-semibold text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out"
        >
          Explore More &rarr;
        </Link>
      </div>

      {/* Card Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {hackathonsData.map((hackathon) => (
          <InfoCards key={hackathon.id} {...hackathon} />
        ))}
      </div>
    </section>
  );
};

export default Hackathons;
