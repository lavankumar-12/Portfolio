import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail, Download, Sparkles, Code2, MapPin } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { getCustomResumeEndpoint } from '../services/api';
import profileAvatar from '../assets/images/profile.svg';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 120, damping: 16 },
  },
};

export const Hero = () => {
  const { profile, profileLoading } = usePortfolio();

  const handleScrollToProjects = (e) => {
    e.preventDefault();
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const photoSource = profile.profilePhoto || '/profile.webp' || profileAvatar;
  const resumeHref = profile.hasCustomResume
    ? getCustomResumeEndpoint(true)
    : profile.resumeFilePath || '/Lavan_Kumar_Resume.pdf';
  const resumeDownloadName = profile.resumeFileName || 'Lavan_Kumar_Resume.pdf';

  const nameParts = (profile.name || 'Lavan Kumar').trim().split(/\s+/);
  const firstName = nameParts[0] || 'Lavan';
  const restName = nameParts.slice(1).join(' ');

  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex items-center justify-center pt-24 sm:pt-28 pb-12 sm:pb-16 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Staggered Animated Text & CTAs */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 space-y-5 sm:space-y-6 text-center lg:text-left"
          >
            {/* Electric Cyan Pill Badge */}
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-4 py-1.5 rounded-full bg-cyan-500/10 dark:bg-[#0B1620]/85 text-cyan-700 dark:text-cyan-400 border border-cyan-500/35 text-[10px] sm:text-[11px] font-bold tracking-[0.16em] sm:tracking-[0.2em] uppercase shadow-sm backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span>{profile.smallIntro}</span>
                <span className="opacity-40">•</span>
                <span className="tracking-wider">{profile.status}</span>
              </div>
            </motion.div>

            {/* Two-Tone Bold Display Heading */}
            <motion.div variants={itemVariants} className="space-y-2">
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08] uppercase break-words">
                <span className="text-light-heading dark:text-white dark:text-glow-white">
                  {firstName}
                </span>
                {restName && (
                  <>
                    {' '}
                    <span className="bg-gradient-to-r from-[#FF2E63] via-[#FF4D4D] to-[#FF5E2B] bg-clip-text text-transparent text-glow-coral">
                      {restName}
                    </span>
                  </>
                )}
              </h1>

              <div className="flex items-center justify-center lg:justify-start gap-2 pt-1">
                <span className="text-lg sm:text-2xl lg:text-3xl font-bold text-cyan-600 dark:text-cyan-400 tracking-wide">
                  {profile.title}
                </span>
              </div>
            </motion.div>

            {/* Location & College Tag */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3 text-xs sm:text-sm text-light-body dark:text-slate-300 font-medium"
            >
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#FF2E63]" />
                {profile.location}
              </span>
              {profile.educationBadge && (
                <>
                  <span className="text-slate-500 hidden sm:inline">•</span>
                  <span className="flex items-center gap-1.5">
                    <Code2 className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
                    {profile.educationBadge}
                  </span>
                </>
              )}
            </motion.div>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-sm sm:text-base lg:text-lg text-light-body dark:text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal"
            >
              {profile.heroDescription}
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 sm:gap-4 w-full sm:w-auto"
            >
              <motion.a
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                href="#projects"
                onClick={handleScrollToProjects}
                className="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#FF2E63] to-[#FF5E2B] text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-[0_0_24px_rgba(255,46,99,0.45)] hover:shadow-[0_0_34px_rgba(255,46,99,0.7)] transition-shadow flex items-center justify-center gap-2 text-center"
              >
                <span>View My Projects</span>
                <ArrowDown className="w-4 h-4 animate-bounce" />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                href={resumeHref}
                download={resumeDownloadName}
                className="px-6 py-3.5 rounded-full border border-light-border dark:border-white/15 bg-light-bg dark:bg-[#11121B]/90 hover:border-cyan-400 dark:hover:border-cyan-400 text-light-heading dark:text-white font-semibold text-xs sm:text-sm shadow-sm transition-colors flex items-center justify-center gap-2 backdrop-blur-md text-center"
              >
                <Download className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
                <span>Download Resume</span>
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              variants={itemVariants}
              className="pt-3 sm:pt-4 flex items-center justify-center lg:justify-start gap-3 sm:gap-4"
            >
              <span className="text-xs font-bold uppercase tracking-widest text-light-body dark:text-slate-400">
                Connect:
              </span>
              <div className="flex items-center gap-2.5">
                {profile.github && (
                  <motion.a
                    whileHover={{ scale: 1.12, y: -2 }}
                    whileTap={{ scale: 0.94 }}
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub Profile"
                    className="w-10 h-10 rounded-full border border-light-border dark:border-white/15 bg-light-bg dark:bg-[#11121B]/90 flex items-center justify-center text-light-body dark:text-slate-300 hover:text-[#FF2E63] dark:hover:text-[#FF2E63] hover:border-[#FF2E63] transition-colors shadow-sm"
                    title="GitHub Profile"
                  >
                    <Github className="w-4 h-4" />
                  </motion.a>
                )}

                {profile.linkedin && (
                  <motion.a
                    whileHover={{ scale: 1.12, y: -2 }}
                    whileTap={{ scale: 0.94 }}
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn Profile"
                    className="w-10 h-10 rounded-full border border-light-border dark:border-white/15 bg-light-bg dark:bg-[#11121B]/90 flex items-center justify-center text-light-body dark:text-slate-300 hover:text-cyan-500 dark:hover:text-cyan-400 hover:border-cyan-400 transition-colors shadow-sm"
                    title="LinkedIn Profile"
                  >
                    <Linkedin className="w-4 h-4" />
                  </motion.a>
                )}

                {profile.email && (
                  <motion.a
                    whileHover={{ scale: 1.12, y: -2 }}
                    whileTap={{ scale: 0.94 }}
                    href={`mailto:${profile.email}`}
                    aria-label={`Email ${profile.name}`}
                    className="w-10 h-10 rounded-full border border-light-border dark:border-white/15 bg-light-bg dark:bg-[#11121B]/90 flex items-center justify-center text-light-body dark:text-slate-300 hover:text-[#FF5E2B] dark:hover:text-[#FF5E2B] hover:border-[#FF5E2B] transition-colors shadow-sm"
                    title="Send Email"
                  >
                    <Mail className="w-4 h-4" />
                  </motion.a>
                )}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Round Animated Profile Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.86 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 100, damping: 16, delay: 0.18 }}
            className="lg:col-span-5 flex justify-center py-4 px-2"
          >
            <div className="relative w-52 h-52 sm:w-68 sm:h-68 md:w-80 md:h-80 flex items-center justify-center">
              {/* Outer Ambient Circular Neon Glow */}
              <motion.div
                animate={{ scale: [1, 1.06, 1], opacity: [0.55, 0.85, 0.55] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -inset-3 sm:-inset-4 rounded-full bg-gradient-to-tr from-[#FF2E63]/35 via-cyan-400/25 to-[#FF5E2B]/35 blur-xl sm:blur-2xl -z-10 pointer-events-none"
              />

              {/* Slowly Rotating Gradient Border Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-1 sm:-inset-1.5 rounded-full bg-gradient-to-tr from-[#FF2E63] via-cyan-400 to-[#FF5E2B] p-[2.5px] sm:p-[3px] shadow-[0_0_24px_rgba(255,46,99,0.3)] pointer-events-none"
              >
                <div className="w-full h-full rounded-full bg-light-bg dark:bg-[#090A10]" />
              </motion.div>

              {/* Dashed Subtle Orbital Ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-3 sm:-inset-5 rounded-full border border-dashed border-cyan-400/30 dark:border-cyan-400/25 pointer-events-none"
              />

              {/* Round Profile Photo Container - High Performance Instant Display */}
              <div className="relative w-full h-full rounded-full overflow-hidden border-3 sm:border-4 border-light-bg dark:border-[#0B0C14] bg-light-secondary dark:bg-[#11121B] shadow-2xl z-10">
                <img
                  src={photoSource}
                  alt={`${profile.name} - ${profile.title}`}
                  loading="eager"
                  fetchpriority="high"
                  decoding="async"
                  onError={(e) => {
                    if (e.currentTarget.src !== profileAvatar) {
                      e.currentTarget.src = profileAvatar;
                    }
                  }}
                  className="w-full h-full object-cover object-top scale-[1.03] transition-opacity duration-300"
                />
              </div>

              {/* Floating Cyan Specialty Badge (Positioned cleanly with mobile protection) */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-3 -right-2 sm:-top-5 sm:-right-6 z-20 px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-light-bg/95 dark:bg-[#11121B]/95 border border-light-border dark:border-cyan-400/35 shadow-xl backdrop-blur-md flex items-center gap-1.5 sm:gap-2 max-w-[160px] sm:max-w-none"
              >
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-cyan-500/15 flex items-center justify-center text-cyan-500 dark:text-cyan-400 shrink-0">
                  <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </div>
                <div className="text-left min-w-0">
                  <p className="text-[8px] sm:text-[9px] text-light-body dark:text-slate-400 uppercase tracking-wider font-bold">
                    Specialty
                  </p>
                  <p className="text-[11px] sm:text-xs font-bold text-light-heading dark:text-white truncate sm:whitespace-nowrap">
                    {profile.specialtyText}
                  </p>
                </div>
              </motion.div>

              {/* Floating Warm Gold Highlight Badge (Positioned cleanly below circle) */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
                className="absolute -bottom-3 -left-2 sm:-bottom-5 sm:-left-6 z-20 px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-light-bg/95 dark:bg-[#11121B]/95 border border-light-border dark:border-amber-400/35 shadow-xl backdrop-blur-md flex items-center gap-2 max-w-[170px] sm:max-w-none"
              >
                <div className="px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-lg bg-amber-400/15 flex items-center justify-center text-amber-500 dark:text-amber-400 shrink-0">
                  <span className="text-[10px] sm:text-xs font-extrabold">{profile.highlightMetric}</span>
                </div>
                <div className="text-left min-w-0">
                  <p className="text-[8px] sm:text-[9px] text-light-body dark:text-slate-400 uppercase tracking-wider font-bold">
                    {profile.highlightLabel}
                  </p>
                  <p className="text-[11px] sm:text-xs font-bold text-light-heading dark:text-white truncate sm:whitespace-nowrap">
                    {profile.highlightSubtitle}
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
