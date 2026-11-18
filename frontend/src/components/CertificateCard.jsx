import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Eye, Award } from 'lucide-react';

export const CertificateCard = ({ certificate, onSelect }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="group relative flex flex-col justify-between h-full rounded-2xl overflow-hidden bg-gradient-to-b from-cyan-50/85 via-white/95 to-indigo-50/75 dark:bg-none dark:bg-[#10121C] border border-cyan-200/80 dark:border-cyan-500/20 shadow-light-card dark:shadow-dark-card hover:shadow-xl hover:shadow-cyan-500/10 hover:border-cyan-500/60 transition-all duration-300 backdrop-blur-md"
    >
      {/* Top Color Accent Strip: Electric Cyan to Warm Gold */}
      <div className="h-1 w-full bg-gradient-to-r from-cyan-400 via-[#FF2E63] to-amber-400" />

      <div>
        {/* Preview Banner */}
        <div className="relative h-40 w-full overflow-hidden bg-light-secondary dark:bg-[#090B11] p-3.5 flex items-center justify-center border-b border-light-border dark:border-white/5">
          {certificate.previewImage ? (
            <img
              src={certificate.previewImage}
              alt={certificate.title}
              className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-500 rounded-md"
            />
          ) : (
            <Award className="w-12 h-12 text-cyan-400/70" />
          )}

          <div className="absolute top-2.5 left-2.5">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border border-cyan-400/35 backdrop-blur-sm">
              {certificate.badgeText || 'Certified'}
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="p-5 space-y-2.5">
          <h3 className="text-base font-bold text-light-heading dark:text-white group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors line-clamp-2">
            {certificate.title}
          </h3>

          <p className="text-xs font-medium text-light-body dark:text-slate-400 line-clamp-1">
            {certificate.issuer}
          </p>

          <div className="flex items-center justify-between text-xs pt-1.5 gap-2">
            <span className="flex items-center gap-1 text-light-body dark:text-slate-400 shrink-0">
              <Calendar className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />
              {certificate.date}
            </span>
            <span className="font-bold text-amber-600 dark:text-amber-400 truncate">
              {certificate.score}
            </span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-5 pt-0">
        <button
          type="button"
          onClick={() => onSelect(certificate)}
          className="w-full py-2.5 px-4 rounded-xl bg-cyan-600 hover:bg-cyan-500 dark:bg-cyan-500/15 dark:hover:bg-cyan-500/25 text-white dark:text-cyan-300 border border-transparent dark:border-cyan-400/30 text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm"
        >
          <Eye className="w-4 h-4" />
          <span>View Certificate</span>
        </button>
      </div>
    </motion.div>
  );
};
