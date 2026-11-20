import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';

const navLinks = [
  { name: 'HOME', href: '#home' },
  { name: 'ABOUT', href: '#about' },
  { name: 'SKILLS', href: '#skills' },
  { name: 'PROJECTS', href: '#projects' },
  { name: 'EXPERIENCE', href: '#experience' },
  { name: 'CERTIFICATIONS', href: '#certifications' },
  { name: 'CONTACT', href: '#contact' },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 24);
          const scrollPosition = window.scrollY + 200;

          for (let i = navLinks.length - 1; i >= 0; i--) {
            const section = document.getElementById(navLinks[i].href.substring(1));
            if (section) {
              const sectionTop = section.getBoundingClientRect().top + window.scrollY;
              if (scrollPosition >= sectionTop) {
                setActiveSection(navLinks[i].href.substring(1));
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on Escape key or outside interaction
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleLinkClick = (e, href) => {
    // 1. Close mobile drawer immediately so the screen is clear
    setIsOpen(false);

    const targetId = href.replace(/^#/, '');
    const target = document.getElementById(targetId);

    if (target) {
      if (e && e.preventDefault) {
        e.preventDefault();
      }

      // Small delay allows mobile touch event cycle to complete so browsers
      // do not cancel the smooth scroll
      setTimeout(() => {
        const navOffset = 84;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = target.getBoundingClientRect().top;
        const offsetPosition = elementRect - bodyRect - navOffset;

        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: 'smooth',
        });

        setActiveSection(targetId);
        try {
          window.history.pushState(null, '', href);
        } catch {}
      }, 60);
    }
  };

  return (
    <>
      {/* Mobile Drawer Outside Backdrop */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/45 backdrop-blur-sm lg:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 pt-3.5"
      >
        <div
          className={`max-w-6xl mx-auto rounded-2xl backdrop-blur-xl transition-all duration-300 border ${
            scrolled
              ? 'bg-white/95 dark:bg-[#0D0E16]/95 border-slate-200 dark:border-white/12 shadow-xl dark:shadow-[0_12px_40px_rgba(0,0,0,0.75)]'
              : 'bg-white/85 dark:bg-[#11121B]/85 border-slate-200/80 dark:border-white/10 shadow-lg dark:shadow-[0_8px_30px_rgba(0,0,0,0.55)]'
          }`}
        >
          <div className="px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
            {/* Two-Tone Brand Logo */}
            <a
              href="#home"
              onClick={(e) => handleLinkClick(e, '#home')}
              className="group flex items-center font-black text-lg sm:text-xl tracking-wider uppercase focus:outline-none shrink-0"
            >
              <span className="bg-gradient-to-r from-[#FF2E63] to-[#FF5E2B] bg-clip-text text-transparent">
                LAVAN
              </span>
              <span className="text-slate-900 dark:text-white">.DEV</span>
            </a>

            {/* Desktop Uppercase Nav Links */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className={`relative px-3 py-1.5 rounded-lg text-xs font-semibold tracking-widest transition-colors duration-200 ${
                      isActive
                        ? 'text-[#E11D48] dark:text-[#FF2E63]'
                        : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-gradient-to-r from-[#FF2E63] to-[#FF5E2B]"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Actions: Theme Toggle & Fiery Pill CTA (Desktop only) */}
            <div className="hidden lg:flex items-center space-x-3 shrink-0">
              <ThemeToggle />
              <motion.a
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                href="#contact"
                onClick={(e) => handleLinkClick(e, '#contact')}
                className="px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-full bg-gradient-to-r from-[#FF2E63] to-[#FF5E2B] text-white shadow-[0_0_20px_rgba(255,46,99,0.45)] hover:shadow-[0_0_30px_rgba(255,46,99,0.7)] transition-shadow"
              >
                Get in Touch
              </motion.a>
            </div>

            {/* Mobile Menu & Theme Toggle Trigger (All viewports < lg) */}
            <div className="flex items-center space-x-2 lg:hidden">
              <ThemeToggle />
              <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-[#171925] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF2E63]/40"
                aria-label="Toggle navigation menu"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Drawer */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="lg:hidden border-t border-slate-200 dark:border-white/10 px-4 pt-3 pb-5 overflow-hidden"
              >
                <div className="flex flex-col space-y-1.5 max-h-[calc(100vh-6rem)] overflow-y-auto">
                  {navLinks.map((link) => {
                    const isActive = activeSection === link.href.substring(1);
                    return (
                      <a
                        key={link.name}
                        href={link.href}
                        onClick={(e) => handleLinkClick(e, link.href)}
                        className={`px-4 py-3 rounded-xl text-xs font-bold tracking-widest flex items-center justify-between transition-colors ${
                          isActive
                            ? 'bg-[#FF2E63]/15 text-[#FF2E63]'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/5 active:bg-[#FF2E63]/10'
                        }`}
                      >
                        <span>{link.name}</span>
                        {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#FF2E63]" />}
                      </a>
                    );
                  })}
                  <div className="pt-2">
                    <a
                      href="#contact"
                      onClick={(e) => handleLinkClick(e, '#contact')}
                      className="w-full py-2.5 rounded-full bg-gradient-to-r from-[#FF2E63] to-[#FF5E2B] text-white text-xs font-bold uppercase tracking-wider text-center block shadow-[0_0_20px_rgba(255,46,99,0.35)]"
                    >
                      Get in Touch
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>
    </>
  );
};
