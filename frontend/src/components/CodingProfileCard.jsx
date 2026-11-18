import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Code2, Award, Flame, Terminal } from 'lucide-react';

const iconMap = {
  Github: Github,
  Code2: Code2,
  Award: Award,
  Flame: Flame,
  Terminal: Terminal,
};

export const CodingProfileCard = ({ profile, index }) => {
  const IconComponent = iconMap[profile.icon] || Code2;

  return (
    <motion.a
      href={profile.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group block p-6 rounded-2xl bg-gradient-to-br from-rose-50/85 via-white/95 to-orange-50/70 dark:bg-none dark:bg-dark-card border border-rose-200/80 dark:border-dark-border shadow-light-card dark:shadow-dark-card hover:shadow-light-hover dark:hover:shadow-dark-hover hover:border-light-accent dark:hover:border-dark-accent transition-all duration-300 backdrop-blur-md"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center text-white shadow-sm"
            style={{ backgroundColor: profile.color }}
          >
            <IconComponent className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-light-heading dark:text-dark-heading group-hover:text-light-accent dark:group-hover:text-dark-accent transition-colors">
              {profile.platform}
            </h3>
            {profile.handle && (
              <span className="text-xs font-mono text-light-body dark:text-dark-body">
                @{profile.handle.replace(/^@/, '')}
              </span>
            )}
          </div>
        </div>

        <div className="p-2 rounded-lg bg-light-secondary dark:bg-dark-secondary text-light-body dark:text-dark-body group-hover:text-light-accent dark:group-hover:text-dark-accent transition-colors">
          <ExternalLink className="w-4 h-4" />
        </div>
      </div>

      {profile.tagline && (
        <p className="text-xs sm:text-sm font-medium text-light-heading dark:text-dark-heading mb-1">
          {profile.tagline}
        </p>
      )}

      {profile.description && (
        <p className="text-xs text-light-body dark:text-dark-body leading-relaxed mb-4">
          {profile.description}
        </p>
      )}

      {/* Focus areas */}
      {(profile.focus || []).length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-light-border dark:border-dark-border">
          {profile.focus.map((item) => (
            <span
              key={item}
              className="px-2 py-0.5 rounded text-[11px] font-medium bg-light-secondary dark:bg-[#161824] text-light-body dark:text-slate-300 border border-light-border dark:border-white/5"
            >
              {item}
            </span>
          ))}
        </div>
      )}
    </motion.a>
  );
};

