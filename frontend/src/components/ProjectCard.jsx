import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Eye } from 'lucide-react';

export const ProjectCard = ({ project, onSelect }) => {
  const hasGithub = Boolean(project.githubUrl && project.githubUrl.trim() && project.githubUrl.trim() !== '#');
  const hasLiveDemo = Boolean(project.liveDemoUrl && project.liveDemoUrl.trim() && project.liveDemoUrl.trim() !== '#');

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="group flex flex-col h-full rounded-2xl overflow-hidden bg-gradient-to-b from-white via-rose-50/40 to-sky-50/60 dark:bg-none dark:bg-dark-card border border-slate-200/90 dark:border-dark-border shadow-light-card dark:shadow-dark-card hover:shadow-light-hover dark:hover:shadow-dark-hover hover:border-[#FF2E63]/50 transition-all duration-300 backdrop-blur-md"
    >
      {/* Compact Medium Thumbnail */}
      <div className="relative h-40 sm:h-44 w-full overflow-hidden bg-light-secondary dark:bg-[#0B0C14]">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-2.5 left-2.5">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-light-bg/90 dark:bg-[#0B0C14]/85 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30 backdrop-blur-sm">
            {project.category}
          </span>
        </div>
      </div>

      {/* Medium Card Body */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between gap-3.5">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-light-heading dark:text-white group-hover:text-[#FF2E63] transition-colors line-clamp-1">
            {project.title}
          </h3>
          <p className="mt-1.5 text-xs sm:text-sm text-light-body dark:text-dark-body line-clamp-2 leading-relaxed">
            {project.shortDescription}
          </p>
        </div>

        {/* Tech Badges */}
        <div className="flex flex-wrap gap-1.5">
          {(project.technologies || []).slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-light-secondary dark:bg-[#171925] text-light-heading dark:text-slate-300 border border-light-border dark:border-white/10"
            >
              {tech}
            </span>
          ))}
          {(project.technologies || []).length > 4 && (
            <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold text-[#FF2E63] bg-[#FF2E63]/10">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        {/* Action Row: GitHub Logo + Optional Live Demo Button + View Details Button */}
        <div className="pt-3 border-t border-light-border dark:border-dark-border flex items-center gap-2">
          {hasGithub && (
            <a
              href={project.githubUrl.trim()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`GitHub repository for ${project.title}`}
              title="GitHub Repository"
              className="p-2 rounded-lg border border-light-border dark:border-white/10 bg-light-secondary dark:bg-[#161824] text-light-heading dark:text-white hover:text-[#FF2E63] dark:hover:text-[#FF2E63] hover:border-[#FF2E63] transition-colors shrink-0"
            >
              <Github className="w-4 h-4" />
            </a>
          )}

          {hasLiveDemo && (
            <a
              href={project.liveDemoUrl.trim()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-lg bg-gradient-to-r from-[#FF2E63] to-[#FF5E2B] text-white text-xs font-bold hover:shadow-[0_0_16px_rgba(255,46,99,0.4)] transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5 shrink-0" />
              <span>Live Demo</span>
            </a>
          )}

          <button
            type="button"
            onClick={() => onSelect(project)}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-lg border border-light-border dark:border-cyan-400/30 bg-light-secondary dark:bg-cyan-500/10 text-light-heading dark:text-cyan-300 text-xs font-semibold hover:border-cyan-400 hover:text-cyan-600 dark:hover:text-cyan-200 transition-colors"
          >
            <Eye className="w-3.5 h-3.5 shrink-0" />
            <span>View Details</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};
