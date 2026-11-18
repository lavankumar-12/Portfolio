import React from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { ResumeViewer } from '../components/ResumeViewer';

export const Resume = () => {
  return (
    <section id="resume" className="py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Curriculum Vitae"
          title="Professional Resume"
          subtitle="Review my full background, technical toolbelt, academic qualifications, and project experiences."
        />

        <ResumeViewer />
      </div>
    </section>
  );
};

