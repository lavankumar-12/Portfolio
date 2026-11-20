import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Eye, FileText, Calendar, Check, ExternalLink } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { getCustomResumeEndpoint } from '../services/api';

export const ResumeViewer = () => {
  const { profile } = usePortfolio();
  const [copied, setCopied] = useState(false);
  const [showEmbed, setShowEmbed] = useState(false);

  const isCustomUpload = Boolean(profile.hasCustomResume);
  const previewUrl = isCustomUpload
    ? getCustomResumeEndpoint(false)
    : profile.resumeFilePath || '/Lavan_Kumar_Resume.pdf';
  const downloadUrl = isCustomUpload
    ? getCustomResumeEndpoint(true)
    : profile.resumeFilePath || '/Lavan_Kumar_Resume.pdf';
  const resumeFileName = profile.resumeFileName || 'Lavan_Kumar_Resume.pdf';
  const lastUpdated = profile.resumeLastUpdated || 'November 2024';

  const handleCopyLink = () => {
    const shareUrl = previewUrl.startsWith('http')
      ? previewUrl
      : window.location.origin + previewUrl;
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
      className="w-full max-w-4xl mx-auto rounded-2xl sm:rounded-3xl bg-gradient-to-br from-sky-50/90 via-white/95 to-rose-50/90 dark:bg-none dark:bg-dark-card border border-slate-200/90 dark:border-dark-border shadow-light-card dark:shadow-dark-card p-5 sm:p-10 backdrop-blur-md"
    >
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5 pb-6 border-b border-light-border dark:border-dark-border">
        <div className="flex items-center gap-3.5 sm:gap-4">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#FF2E63]/10 border border-[#FF2E63]/25 flex items-center justify-center text-[#FF2E63] shadow-sm shrink-0">
            <FileText className="w-6 h-6 sm:w-7 sm:h-7" />
          </div>
          <div className="min-w-0">
            <h3 className="text-lg sm:text-2xl font-bold text-light-heading dark:text-white truncate">
              {resumeFileName}
            </h3>
            <p className="text-xs sm:text-sm text-light-body dark:text-dark-body flex items-center gap-1.5 mt-0.5">
              <Calendar className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400 shrink-0" />
              <span>Last revised: <span className="font-semibold">{lastUpdated}</span></span>
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full md:w-auto">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowEmbed(!showEmbed)}
            className="w-full sm:w-auto px-4 py-2.5 rounded-full border border-light-border dark:border-cyan-400/35 bg-light-secondary dark:bg-cyan-500/10 text-xs sm:text-sm font-semibold text-light-heading dark:text-cyan-300 hover:border-cyan-400 transition-colors flex items-center justify-center gap-2"
          >
            <Eye className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
            <span>{showEmbed ? 'Hide Document Preview' : 'Interactive Preview'}</span>
          </motion.button>

          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href={downloadUrl}
            download={resumeFileName}
            className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-gradient-to-r from-[#FF2E63] to-[#FF5E2B] text-white text-xs sm:text-sm font-bold shadow-[0_0_20px_rgba(255,46,99,0.35)] hover:shadow-[0_0_28px_rgba(255,46,99,0.55)] transition-all flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Download Resume PDF</span>
          </motion.a>
        </div>
      </div>

      {/* Embed preview container */}
      <AnimatePresence mode="wait">
        {showEmbed ? (
          <motion.div
            key="embed"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-6 rounded-2xl overflow-hidden border border-light-border dark:border-dark-border bg-light-secondary dark:bg-dark-secondary"
          >
            <div className="p-3 bg-light-secondary dark:bg-[#161824] border-b border-light-border dark:border-dark-border flex items-center justify-between text-xs">
              <span className="font-medium text-light-heading dark:text-white">
                Official PDF Document Embed
              </span>
              <a
                href={previewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1 font-semibold"
              >
                Open full tab <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <iframe
              src={previewUrl}
              title={`${profile.name} Resume`}
              className="w-full h-[450px] sm:h-[600px] border-none bg-white"
            />
          </motion.div>
        ) : (
          <motion.div
            key="summary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            <div className="p-4 rounded-xl bg-sky-50/80 dark:bg-[#161824] border border-sky-200/70 dark:border-white/10">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 block mb-1">
                Candidate Profile
              </span>
              <p className="text-sm font-bold text-light-heading dark:text-white">
                {profile.name}
              </p>
              <p className="text-xs text-light-body dark:text-dark-body mt-0.5">
                {profile.title} • {profile.location}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-amber-50/80 dark:bg-[#161824] border border-amber-200/70 dark:border-white/10">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 block mb-1">
                Top Qualifications
              </span>
              <p className="text-sm font-bold text-light-heading dark:text-white">
                B.Tech CSE &amp; NPTEL 95%
              </p>
              <p className="text-xs text-light-body dark:text-dark-body mt-0.5">
                {profile.highlightSubtitle}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-rose-50/80 dark:bg-[#161824] border border-rose-200/70 dark:border-white/10">
              <span className="text-xs font-bold uppercase tracking-wider text-[#FF2E63] block mb-1">
                Document Status
              </span>
              <p className="text-sm font-bold text-light-heading dark:text-white">
                {isCustomUpload ? 'Latest PDF Uploaded' : 'Direct PDF Available'}
              </p>
              <button
                onClick={handleCopyLink}
                className="text-xs text-cyan-600 dark:text-cyan-400 hover:underline font-semibold mt-0.5 flex items-center gap-1"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-500" /> Link Copied
                  </>
                ) : (
                  'Copy Portfolio Resume Link'
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
