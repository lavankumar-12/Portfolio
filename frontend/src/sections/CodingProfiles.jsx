import React from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { CodingProfileCard } from '../components/CodingProfileCard';
import { usePortfolio } from '../context/PortfolioContext';

export const CodingProfiles = () => {
  const { codingProfiles } = usePortfolio();

  if (!codingProfiles || codingProfiles.length === 0) return null;

  return (
    <section id="coding-profiles" className="py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Problem Solving"
          title="Coding & Developer Profiles"
          subtitle="Continuous problem solving, data structure practice, and open-source software contributions."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {codingProfiles.map((item, idx) => (
            <CodingProfileCard
              key={item._id || item.id || item.platform}
              profile={item}
              index={idx}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
