import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Calendar, MapPin, ChevronRight, Briefcase } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { usePortfolio } from '../context/PortfolioContext';

export const Experience = () => {
  const { experiences } = usePortfolio();
  const [activeIndex, setActiveIndex] = useState(0);

  const safeIndex = activeIndex < experiences.length ? activeIndex : 0;
  const activeExp = experiences[safeIndex];

  if (!experiences || experiences.length === 0) return null;

  return (
    <section id="experience" className="py-16 md:py-24 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Experience"
          title="Professional Experience"
          subtitle="Internships and hands-on engineering tracks."
        />

        {activeExp && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Company Selector List */}
            <div className="lg:col-span-4 flex lg:flex-col gap-2 overflow-x-auto no-scrollbar pb-2 lg:pb-0 touch-pan-x">
              {experiences.map((exp, idx) => {
                const isActive = idx === safeIndex;
                return (
                  <button
                    key={exp._id || exp.id || exp.organization}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    className={`group text-left px-4 py-3 sm:py-3.5 rounded-xl border transition-all duration-200 shrink-0 lg:shrink lg:w-full flex items-center justify-between gap-3 ${
                      isActive
                        ? 'bg-rose-50/95 dark:bg-[#FF2E63]/10 border-[#FF2E63] shadow-[0_0_16px_rgba(255,46,99,0.15)]'
                        : 'bg-cyan-50/75 dark:bg-dark-card border-cyan-200/75 dark:border-dark-border hover:border-[#FF2E63]/50'
                    }`}
                  >
                    <div className="min-w-0">
                      <p
                        className={`text-sm font-bold truncate ${
                          isActive
                            ? 'text-[#FF2E63]'
                            : 'text-light-heading dark:text-white'
                        }`}
                      >
                        {exp.organization}
                      </p>
                      <p className="text-xs text-light-body dark:text-dark-body truncate mt-0.5">
                        {exp.duration}
                      </p>
                    </div>
                    <ChevronRight
                      className={`w-4 h-4 shrink-0 hidden lg:block transition-transform ${
                        isActive
                          ? 'text-[#FF2E63] translate-x-0.5'
                          : 'text-light-body/40 dark:text-slate-600'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Right Clean Detail Panel */}
            <div className="lg:col-span-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeExp._id || activeExp.id || safeIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-cyan-50/90 via-white/95 to-sky-50/85 dark:bg-none dark:bg-dark-card border border-cyan-200/80 dark:border-dark-border shadow-light-card dark:shadow-dark-card relative overflow-hidden backdrop-blur-md"
                >
                  {/* Fiery CODESTORM Coral-Orange Top Accent Bar */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF2E63] via-[#FF5E2B] to-cyan-400" />

                  {/* Header */}
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
                    <div>
                      <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 mb-1.5">
                        <Briefcase className="w-3.5 h-3.5" />
                        <span>{activeExp.type || 'Internship'}</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-light-heading dark:text-white">
                        {activeExp.role}
                      </h3>
                      <p className="text-sm font-semibold text-light-body dark:text-slate-300 flex items-center gap-1.5 mt-1">
                        <Building2 className="w-4 h-4 text-[#FF2E63]" />
                        {activeExp.organization}
                      </p>
                    </div>

                    <div className="flex flex-col items-start sm:items-end gap-1.5 text-xs font-medium text-light-body dark:text-dark-body">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-light-secondary dark:bg-[#161824] border border-light-border dark:border-white/10">
                        <Calendar className="w-3.5 h-3.5 text-[#FF5E2B]" />
                        {activeExp.duration}
                      </span>
                      {activeExp.location && (
                        <span className="inline-flex items-center gap-1 text-xs">
                          <MapPin className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />
                          {activeExp.location}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Concise Responsibilities */}
                  <ul className="space-y-2.5 mb-6">
                    {(activeExp.responsibilities || []).map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 text-sm text-light-body dark:text-slate-300 leading-relaxed"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF2E63] mt-2 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech Stack Footer */}
                  {(activeExp.technologies || []).length > 0 && (
                    <div className="pt-4 border-t border-light-border dark:border-dark-border flex flex-wrap gap-2">
                      {activeExp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-lg text-xs font-medium bg-light-secondary dark:bg-[#161824] text-light-heading dark:text-cyan-300 border border-light-border dark:border-cyan-400/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
