'use client';

import React from "react";
import Link from "next/link";
import InfoCards from "./InfoCards";
import useFetchHackathonsLearning from "./useFetchHackathonsLearning";

const Hackathons = () => {
  const { data: hackathons, loading, error } = useFetchHackathonsLearning({
    event: "hackathon",
    limit: 3,
    page: 1,
  });

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

      {/* Loading and Error States */}
      {loading && <p className="text-center text-gray-500">Loading hackathons...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Card Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {!loading && !error && hackathons.length > 0 ? (
          hackathons.map((item) => (
            <InfoCards
              key={item.id}
              id={item.id}
              title={item.title}
              company={item.tags?.company || "Unknown"}
              // duration={item.mode}
              imageText={item.event}
              closingDate={item.deadline}
              logoSrc={item.banner_image_url || "/logos/default.png"}
              mode={item.mode}
              url={item.url}
            />
          ))
        ) : (
          !loading &&
          !error && (
            <p className="col-span-3 text-center text-gray-500">
              No hackathons available.
            </p>
          )
        )}
      </div>
    </section>
  );
};

export default Hackathons;
