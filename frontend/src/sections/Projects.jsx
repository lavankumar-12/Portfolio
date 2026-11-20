import React, { useState, useMemo } from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { ProjectCard } from '../components/ProjectCard';
import { ProjectModal } from '../components/ProjectModal';
import { usePortfolio } from '../context/PortfolioContext';

export const Projects = () => {
  const { projects } = usePortfolio();
  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState('all');

  const categories = useMemo(() => {
    const unique = Array.from(new Set(projects.map((p) => p.category).filter(Boolean)));
    return [
      { label: 'All Projects', value: 'all' },
      ...unique.map((cat) => ({ label: cat, value: cat })),
    ];
  }, [projects]);

  const filteredProjects =
    filter === 'all' ? projects : projects.filter((p) => p.category === filter);

  if (!projects || projects.length === 0) return null;

  return (
    <section id="projects" className="py-16 md:py-24 relative scroll-mt-20 md:scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Featured Projects"
          title="Projects"
          subtitle="Selected full stack web applications and developer tools."
        />

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setFilter(cat.value)}
              className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                filter === cat.value
                  ? 'bg-gradient-to-r from-[#FF2E63] to-[#FF5E2B] text-white shadow-[0_0_16px_rgba(255,46,99,0.35)]'
                  : 'bg-light-bg dark:bg-dark-card border border-light-border dark:border-dark-border text-light-body dark:text-dark-body hover:border-[#FF2E63]/60'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Medium 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project._id || project.id || project.title}
              project={project}
              onSelect={(p) => setSelectedProject(p)}
            />
          ))}
        </div>

        {/* Reusable Project Details Modal */}
        <ProjectModal
          project={selectedProject}
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </section>
  );
};
