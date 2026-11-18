import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';

export const ThemeToggle = ({ className = '' }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`relative p-2.5 rounded-xl border transition-colors duration-200 
        bg-light-surface text-light-heading border-light-border hover:border-light-accent
        dark:bg-dark-card dark:text-dark-heading dark:border-dark-border dark:hover:border-dark-accent
        focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent ${className}`}
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        {isDark ? (
          <Sun className="w-5 h-5 text-amber-300 transition-transform duration-300 rotate-0 hover:rotate-45" />
        ) : (
          <Moon className="w-5 h-5 text-light-accent transition-transform duration-300 -rotate-12 hover:rotate-0" />
        )}
      </div>
    </motion.button>
  );
};

