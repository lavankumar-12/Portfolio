import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, CheckCircle2, Cpu, Layers } from 'lucide-react';

export const ProjectModal = ({ project, isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!project || typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
        >
          {/* Dark Blurred Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-md"
          />

          {/* Modal Shell: Flex Column with Compact Banner, Scrollable Body, Sticky Footer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 14 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            className="relative w-full max-w-2xl max-h-[88vh] flex flex-col overflow-hidden rounded-3xl bg-white dark:bg-[#0E1019] border border-slate-200 dark:border-white/12 shadow-2xl dark:shadow-[0_24px_80px_rgba(0,0,0,0.85)] z-10"
          >
            {/* Top Coral-Cyan Neon Accent Strip */}
            <div className="h-1 w-full bg-gradient-to-r from-[#FF2E63] via-[#FF5E2B] to-cyan-400 shrink-0" />

            {/* Compact Hero Preview Banner */}
            <div className="relative h-44 sm:h-52 w-full shrink-0 overflow-hidden bg-slate-100 dark:bg-[#08090F]">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              {/* Bottom gradient vignette for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/30" />

              {/* Always-Accessible Close Button */}
              <button
                type="button"
                onClick={onClose}
                aria-label="Close modal"
                className="absolute top-3.5 right-3.5 p-2 rounded-full bg-black/65 hover:bg-[#FF2E63] text-white border border-white/15 backdrop-blur-md transition-colors shadow-lg"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Category Pill & Title Overlay */}
              <div className="absolute bottom-3.5 left-5 right-5 flex flex-col gap-1">
                <div>
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 backdrop-blur-md">
                    {project.category}
                  </span>
                </div>
                <h3
                  id="project-modal-title"
                  className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-snug"
                >
                  {project.title}
                </h3>
                {project.subtitle && (
                  <p className="text-xs sm:text-sm font-medium text-cyan-300/95">
                    {project.subtitle}
                  </p>
                )}
              </div>
            </div>

            {/* Scrollable Body Content */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
              {/* Overview */}
              <div>
                <h4 className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400 mb-1.5">
                  Project Overview
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {project.fullDescription || project.shortDescription}
                </p>
              </div>

              {/* Key Features */}
              {project.keyFeatures && project.keyFeatures.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400 mb-2.5 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#FF2E63]" />
                    Key Features
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {project.keyFeatures.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-xs sm:text-[13px] text-slate-700 dark:text-slate-300 p-2.5 rounded-xl bg-slate-50 dark:bg-[#151824] border border-slate-200/80 dark:border-white/8"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF2E63] mt-1.5 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Architecture (if provided) */}
              {project.architecture && (
                <div className="p-3.5 rounded-xl bg-cyan-500/8 border border-cyan-500/20">
                  <h4 className="text-[11px] font-bold uppercase tracking-[0.18em] text-cyan-600 dark:text-cyan-400 mb-1 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" />
                    Architecture
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {project.architecture}
                  </p>
                </div>
              )}

              {/* Technologies */}
              {(project.technologies || []).length > 0 && (
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />
                    Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-[#171A28] text-slate-800 dark:text-cyan-300 border border-slate-200 dark:border-cyan-400/25"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Pinned Bottom Action Footer */}
            <div className="shrink-0 px-5 sm:px-6 py-4 bg-slate-50/90 dark:bg-[#0A0B12] border-t border-slate-200 dark:border-white/10 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                {project.githubUrl && project.githubUrl.trim() && project.githubUrl.trim() !== '#' && (
                  <a
                    href={project.githubUrl.trim()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-300 dark:border-white/15 bg-white dark:bg-[#151824] text-xs sm:text-sm font-semibold text-slate-800 dark:text-white hover:border-[#FF2E63] hover:text-[#FF2E63] transition-colors shadow-sm"
                  >
                    <Github className="w-4 h-4" />
                    GitHub
                  </a>
                )}
                {project.liveDemoUrl && project.liveDemoUrl.trim() && project.liveDemoUrl.trim() !== '#' && (
                  <a
                    href={project.liveDemoUrl.trim()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-[#FF2E63] to-[#FF5E2B] text-xs sm:text-sm font-bold text-white shadow-[0_0_18px_rgba(255,46,99,0.4)] hover:shadow-[0_0_26px_rgba(255,46,99,0.6)] transition-all"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
                )}
              </div>

              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-full text-xs sm:text-sm font-semibold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-white/10 transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};
