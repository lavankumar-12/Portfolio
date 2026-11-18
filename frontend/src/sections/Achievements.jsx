import React from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { AchievementCard } from '../components/AchievementCard';
import { usePortfolio } from '../context/PortfolioContext';

export const Achievements = () => {
  const { achievements } = usePortfolio();

  // Hidden on the portfolio webpage until achievements are added via /admin
  if (!achievements || achievements.length === 0) {
    return null;
  }

  return (
    <section id="achievements" className="py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Milestones"
          title="Key Achievements & Highlights"
          subtitle="Notable academic distinctions, verified credentials, and software development milestones."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((item, idx) => (
            <AchievementCard key={item._id || item.id || item.title} achievement={item} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};
