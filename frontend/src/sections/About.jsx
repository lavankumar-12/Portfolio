import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../components/SectionHeading';
import { usePortfolio } from '../context/PortfolioContext';
import { MapPin, Code2, GraduationCap } from 'lucide-react';

export const About = () => {
  const { profile } = usePortfolio();

  return (
    <section id="about" className="py-16 md:py-24 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading badge="About Me" title="Who I Am" className="mb-8 md:mb-10" />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="p-7 sm:p-9 rounded-2xl bg-gradient-to-br from-sky-50/95 via-white/95 to-cyan-50/90 dark:bg-none dark:bg-dark-card border border-sky-200/80 dark:border-dark-border shadow-light-card dark:shadow-dark-card text-center space-y-6 backdrop-blur-md"
        >
          <p className="text-base sm:text-lg text-slate-700 dark:text-dark-body leading-relaxed max-w-2xl mx-auto">
            {profile.aboutBio}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <span className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium bg-white/90 dark:bg-dark-secondary/70 text-light-heading dark:text-dark-heading border border-sky-200/80 dark:border-dark-border shadow-sm">
              <Code2 className="w-4 h-4 text-[#FF2E63]" />
              {profile.title}
            </span>
            <span className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium bg-white/90 dark:bg-dark-secondary/70 text-light-heading dark:text-dark-heading border border-sky-200/80 dark:border-dark-border shadow-sm">
              <GraduationCap className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              B.Tech CSE • {profile.college}
            </span>
            <span className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium bg-white/90 dark:bg-dark-secondary/70 text-light-heading dark:text-dark-heading border border-sky-200/80 dark:border-dark-border shadow-sm">
              <MapPin className="w-4 h-4 text-[#FF5E2B]" />
              {profile.location}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
