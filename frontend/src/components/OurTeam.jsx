//OurTeam.jsx


import TeamData from '../data/TeamData';
import TeamCard from './TeamCard';

const MeetOurTeam = () => {
  return (
    // Section container: Centered content, padding
    <section className="py-16 bg-gray-100">
      
      {/* Header Section: Centered text, spacing */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          Meet Our Team
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          The passionate individuals dedicated to building the future of campus life.
        </p>
      </header>

      {/* Team Grid: Grid layout, responsiveness for 3 columns on large screens */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {TeamData.map((member) => (
            <TeamCard
              key={member.id}
              {...member}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MeetOurTeam;