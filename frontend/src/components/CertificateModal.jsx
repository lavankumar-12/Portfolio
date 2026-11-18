import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Award, CheckCircle2, Calendar, ShieldCheck, Download, Loader2 } from 'lucide-react';

const getExtensionFromSrc = (src) => {
  if (!src) return 'png';
  if (src.startsWith('data:')) {
    const match = src.match(/^data:image\/([a-zA-Z0-9+.-]+);/);
    if (match) {
      const subtype = match[1].toLowerCase();
      if (subtype.includes('svg')) return 'svg';
      if (subtype === 'jpeg') return 'jpg';
      return subtype;
    }
    if (src.startsWith('data:application/pdf')) return 'pdf';
    return 'png';
  }
  const cleanUrl = src.split('?')[0].split('#')[0];
  const extMatch = cleanUrl.match(/\.([a-zA-Z0-9]+)$/);
  return extMatch ? extMatch[1].toLowerCase() : 'png';
};

export const CertificateModal = ({ certificate, isOpen, onClose }) => {
  const [downloading, setDownloading] = useState(false);

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

  if (!certificate || typeof document === 'undefined') return null;

  const handleDownload = async () => {
    const src = certificate.previewImage;
    if (!src) return;

    const safeTitle = (certificate.title || 'certificate')
      .replace(/[^a-zA-Z0-9]+/g, '_')
      .replace(/^_+|_+$/g, '');
    const ext = getExtensionFromSrc(src);
    const fileName = `${safeTitle}.${ext}`;

    setDownloading(true);
    try {
      if (src.startsWith('data:')) {
        const link = document.createElement('a');
        link.href = src;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        const res = await fetch(src);
        const blob = await res.blob();
        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
      }
    } catch {
      // Fallback if external cross-origin image blocks fetch blob
      window.open(src, '_blank', 'noopener,noreferrer');
    } finally {
      setDownloading(false);
    }
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="certificate-modal-title"
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

          {/* Modal Shell */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 14 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            className="relative w-full max-w-2xl max-h-[88vh] flex flex-col overflow-hidden rounded-3xl bg-white dark:bg-[#0E1019] border border-slate-200 dark:border-cyan-500/25 shadow-2xl dark:shadow-[0_24px_80px_rgba(0,0,0,0.85)] z-10"
          >
            {/* Top Neon Accent Strip */}
            <div className="h-1 w-full bg-gradient-to-r from-cyan-400 via-[#FF2E63] to-amber-400 shrink-0" />

            {/* Compact Certificate Image Preview */}
            <div className="relative h-48 sm:h-56 w-full shrink-0 overflow-hidden bg-slate-100 dark:bg-[#08090F] flex items-center justify-center p-4 border-b border-slate-200 dark:border-white/8">
              {certificate.previewImage ? (
                <img
                  src={certificate.previewImage}
                  alt={certificate.title}
                  className="max-h-full max-w-full rounded-xl shadow-md object-contain"
                />
              ) : (
                <Award className="w-16 h-16 text-cyan-400/70" />
              )}

              <button
                type="button"
                onClick={onClose}
                aria-label="Close certificate dialog"
                className="absolute top-3.5 right-3.5 p-2 rounded-full bg-black/65 hover:bg-[#FF2E63] text-white border border-white/15 backdrop-blur-md transition-colors shadow-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
              <div>
                <span className="inline-block px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border border-cyan-400/35 mb-2">
                  {certificate.badgeText || 'Certified'}
                </span>
                <h3
                  id="certificate-modal-title"
                  className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white"
                >
                  {certificate.title}
                </h3>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-0.5">
                  {certificate.issuer}
                </p>
              </div>

              {/* Meta Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-[#151824] border border-slate-200 dark:border-cyan-500/20 text-xs">
                  <Calendar className="w-4 h-4 text-cyan-500 dark:text-cyan-400 shrink-0" />
                  <div>
                    <span className="block text-slate-500 dark:text-slate-400 text-[11px]">Issued</span>
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {certificate.date || 'Verified'}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-[#151824] border border-slate-200 dark:border-amber-400/20 text-xs">
                  <Award className="w-4 h-4 text-amber-500 dark:text-amber-400 shrink-0" />
                  <div>
                    <span className="block text-slate-500 dark:text-slate-400 text-[11px]">
                      Performance / Grade
                    </span>
                    <span className="font-bold text-amber-600 dark:text-amber-400">
                      {certificate.score}
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              {certificate.description && (
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {certificate.description}
                </p>
              )}

              {/* Skills Validated */}
              {certificate.skills && certificate.skills.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />
                    Core Competencies Validated
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {certificate.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-lg text-xs font-medium bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-400/25"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Credential ID */}
              {certificate.credentialId && (
                <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-400/20 flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-cyan-500 dark:text-cyan-400 shrink-0" />
                  <span>
                    Credential ID:{' '}
                    <span className="font-mono font-semibold text-slate-900 dark:text-white">
                      {certificate.credentialId}
                    </span>
                  </span>
                </div>
              )}
            </div>

            {/* Pinned Footer */}
            <div className="shrink-0 px-5 sm:px-6 py-4 bg-slate-50/90 dark:bg-[#0A0B12] border-t border-slate-200 dark:border-white/10 flex flex-wrap items-center justify-between gap-3">
              {certificate.previewImage ? (
                <button
                  type="button"
                  onClick={handleDownload}
                  disabled={downloading}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-[#FF2E63] to-[#FF5E2B] text-white text-xs sm:text-sm font-bold shadow-[0_0_18px_rgba(255,46,99,0.4)] hover:shadow-[0_0_26px_rgba(255,46,99,0.6)] disabled:opacity-60 transition-all"
                >
                  {downloading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Download className="w-4 h-4" />
                  )}
                  <span>{downloading ? 'Downloading...' : 'Download Certificate'}</span>
                </button>
              ) : (
                <div />
              )}

              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 rounded-full text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white border border-slate-300 dark:border-white/15 hover:bg-slate-200/60 dark:hover:bg-white/10 transition-colors"
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
