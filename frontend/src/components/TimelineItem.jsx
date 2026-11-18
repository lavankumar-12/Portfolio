import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, CheckCircle, Sparkles, Building2 } from 'lucide-react';

export const TimelineItem = ({
  title,
  subtitle,
  date,
  location,
  type,
  badge,
  responsibilities = [],
  highlights = [],
  technologies = [],
  learningOutcomes,
  isLast = false,
  index = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative flex gap-4 sm:gap-6 group"
    >
      {/* Timeline track & dot */}
      <div className="flex flex-col items-center">
        {/* Pulsing Node */}
        <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-light-surface dark:bg-purple-950/80 border-2 border-light-accent dark:border-dark-accent z-10 group-hover:scale-110 transition-transform duration-200">
          <div className="w-2.5 h-2.5 rounded-full bg-light-accent dark:bg-dark-accent animate-pulse" />
        </div>
        {/* Vertical line */}
        {!isLast && (
          <div className="w-0.5 flex-grow bg-gradient-to-b from-light-accent/40 via-light-border to-transparent dark:from-dark-accent/40 dark:via-dark-border dark:to-transparent mt-1" />
        )}
      </div>

      {/* Card Content */}
      <div className="flex-1 pb-10">
        <div className="p-6 sm:p-7 rounded-2xl bg-light-bg dark:bg-dark-card border border-light-border dark:border-dark-border shadow-light-card dark:shadow-dark-card hover:shadow-light-hover dark:hover:shadow-dark-hover transition-all duration-300">
          {/* Header Row */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-light-surface dark:bg-purple-950/50 text-light-accent dark:text-dark-accent border border-light-border dark:border-dark-border">
              {type || badge || 'Experience'}
            </span>
            <div className="flex items-center gap-3 text-xs text-light-body dark:text-dark-body font-medium">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-light-accent dark:text-dark-accent" />
                {date}
              </span>
              {location && (
                <span className="hidden sm:flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-light-accent dark:text-dark-accent" />
                  {location}
                </span>
              )}
            </div>
          </div>

          {/* Title & Organization */}
          <h3 className="text-xl font-bold text-light-heading dark:text-dark-heading group-hover:text-light-accent dark:group-hover:text-dark-accent transition-colors">
            {title}
          </h3>
          <p className="text-sm font-semibold text-light-accent dark:text-dark-accent mt-0.5 flex items-center gap-1.5">
            <Building2 className="w-4 h-4" />
            {subtitle}
          </p>

          {/* Responsibilities list */}
          {responsibilities.length > 0 && (
            <ul className="mt-4 space-y-2">
              {responsibilities.map((resp, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 text-xs sm:text-sm text-light-body dark:text-dark-body leading-relaxed"
                >
                  <CheckCircle className="w-4 h-4 text-light-accent dark:text-dark-accent mt-0.5 shrink-0" />
                  <span>{resp}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Highlights list for education */}
          {highlights.length > 0 && (
            <ul className="mt-4 space-y-2">
              {highlights.map((hl, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 text-xs sm:text-sm text-light-body dark:text-dark-body leading-relaxed"
                >
                  <Sparkles className="w-4 h-4 text-light-accent dark:text-dark-accent mt-0.5 shrink-0" />
                  <span>{hl}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Learning Outcomes */}
          {learningOutcomes && (
            <div className="mt-4 p-3 rounded-xl bg-light-surface/60 dark:bg-purple-950/20 border border-light-border dark:border-dark-border text-xs sm:text-sm text-light-body dark:text-dark-body">
              <span className="font-semibold text-light-heading dark:text-dark-heading block mb-1">
                Learning Outcomes:
              </span>
              <p className="italic">{learningOutcomes}</p>
            </div>
          )}

          {/* Tech stack badges */}
          {technologies.length > 0 && (
            <div className="mt-4 pt-4 border-t border-light-border dark:border-dark-border flex flex-wrap gap-1.5">
              {technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-md text-xs font-medium bg-light-secondary dark:bg-dark-secondary text-light-heading dark:text-dark-heading border border-light-border dark:border-dark-border"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

