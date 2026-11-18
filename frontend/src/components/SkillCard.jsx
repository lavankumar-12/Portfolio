import React from 'react';
import { motion } from 'framer-motion';
import {
  Code2,
  Palette,
  FileCode2,
  Atom,
  Sparkles,
  Server,
  Cpu,
  Terminal,
  Flame,
  Database,
  Table2,
  Layers,
  Coffee,
  Code,
  FileCode,
  FileSpreadsheet,
  GitBranch,
  Github,
  AppWindow,
  Send,
  Cloud,
  ServerCog,
  Boxes,
} from 'lucide-react';

const iconMap = {
  Code2,
  Palette,
  FileCode2,
  Atom,
  Sparkles,
  Server,
  Cpu,
  Terminal,
  Flame,
  Database,
  Table2,
  Layers,
  Coffee,
  Code,
  FileCode,
  FileSpreadsheet,
  GitBranch,
  Github,
  AppWindow,
  Send,
  Cloud,
  ServerCog,
  Boxes,
};

export const SkillCard = ({ category }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="p-6 sm:p-7 rounded-2xl bg-light-bg dark:bg-dark-card border border-light-border dark:border-dark-border shadow-light-card dark:shadow-dark-card hover:shadow-light-hover dark:hover:shadow-dark-hover transition-all duration-300 flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-light-heading dark:text-dark-heading">
            {category.title}
          </h3>
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-light-surface dark:bg-purple-950/50 text-light-accent dark:text-dark-accent border border-light-border dark:border-dark-border">
            {category.skills.length} Technologies
          </span>
        </div>
        <p className="text-xs sm:text-sm text-light-body dark:text-dark-body mb-6">
          {category.description}
        </p>

        {/* Skill Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {category.skills.map((skill) => {
            const IconComponent = iconMap[skill.icon] || Code2;
            return (
              <motion.div
                key={skill.name}
                whileHover={{ scale: 1.02 }}
                className="group p-3 rounded-xl bg-light-secondary dark:bg-dark-secondary/70 border border-light-border dark:border-dark-border hover:border-light-accent dark:hover:border-dark-accent transition-all duration-200"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-light-surface dark:bg-purple-900/30 flex items-center justify-center text-light-accent dark:text-dark-accent group-hover:bg-light-accent group-hover:text-white dark:group-hover:bg-dark-accent dark:group-hover:text-dark-bg transition-colors duration-200 shrink-0">
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-semibold text-light-heading dark:text-dark-heading truncate">
                      {skill.name}
                    </h4>
                    <p className="text-[11px] text-light-body dark:text-dark-body truncate">
                      {skill.level}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};
