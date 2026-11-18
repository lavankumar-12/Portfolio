import React from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { TimelineItem } from '../components/TimelineItem';
import { educationList } from '../data/education';

export const Education = () => {
  return (
    <section id="education" className="py-20 md:py-28 bg-light-secondary/40 dark:bg-dark-secondary/30 transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Academic Journey"
          title="Education History"
          subtitle="Foundations in computer science, mathematics, and analytical problem solving."
        />

        <div className="relative mt-8">
          {educationList.map((edu, index) => (
            <TimelineItem
              key={edu.id}
              title={edu.degree}
              subtitle={edu.institution}
              date={edu.duration}
              location={edu.location}
              badge={edu.grade}
              type={edu.status}
              highlights={edu.keyHighlights}
              isLast={index === educationList.length - 1}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

