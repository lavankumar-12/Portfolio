import React from 'react';
import { motion } from 'framer-motion';
import { Award, GraduationCap, Briefcase, Code2, Terminal } from 'lucide-react';

const iconMap = {
  Award,
  GraduationCap,
  Briefcase,
  Code2,
  Terminal,
};

export const AchievementCard = ({ achievement, index }) => {
  const IconComponent = iconMap[achievement.iconName] || Award;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="p-6 rounded-2xl bg-gradient-to-br from-amber-50/90 via-white/95 to-rose-50/75 dark:bg-none dark:bg-dark-card border border-amber-200/80 dark:border-dark-border shadow-light-card dark:shadow-dark-card hover:shadow-light-hover dark:hover:shadow-dark-hover hover:border-[#FF2E63]/40 transition-all duration-300 flex flex-col justify-between backdrop-blur-md"
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#FF2E63]/10 border border-[#FF2E63]/25 flex items-center justify-center text-[#FF2E63] shadow-sm">
            <IconComponent className="w-5 h-5" />
          </div>
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border border-cyan-500/25">
            {achievement.tag}
          </span>
        </div>

        <div className="mb-2">
          <span className="text-2xl font-extrabold text-amber-500 dark:text-amber-400 tracking-tight block">
            {achievement.metric}
          </span>
          <p className="text-xs font-semibold text-cyan-600 dark:text-cyan-400">
            {achievement.subtitle}
          </p>
        </div>

        <h3 className="text-base font-bold text-light-heading dark:text-white mb-2">
          {achievement.title}
        </h3>

        <p className="text-xs sm:text-sm text-light-body dark:text-dark-body leading-relaxed">
          {achievement.description}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-light-border dark:border-dark-border flex items-center justify-between text-xs text-light-body dark:text-dark-body">
        <span className="font-medium">{achievement.category}</span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#FF2E63]" />
      </div>
    </motion.div>
  );
};
