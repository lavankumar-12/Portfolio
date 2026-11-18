import React from 'react';
import { Link } from 'react-router-dom';
import { Terminal, ArrowUp, Github, Linkedin, Mail, Shield } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const Footer = () => {
  const { profile } = usePortfolio();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="bg-transparent transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12 pb-12 border-b border-light-border dark:border-dark-border">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <a
              href="#home"
              className="inline-flex items-center font-black text-xl tracking-wider uppercase focus:outline-none"
            >
              <span className="bg-gradient-to-r from-[#FF2E63] to-[#FF5E2B] bg-clip-text text-transparent">
                LAVAN
              </span>
              <span className="text-light-heading dark:text-white">.DEV</span>
            </a>
            <p className="text-sm text-light-body dark:text-dark-body max-w-md leading-relaxed">
              Full Stack Developer &amp; Computer Science Engineering student based in Hyderabad, India. Focused on building modern, responsive, and scalable web solutions.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="w-9 h-9 rounded-xl border border-light-border dark:border-dark-border bg-light-bg dark:bg-dark-card flex items-center justify-center text-light-body dark:text-dark-body hover:text-light-accent dark:hover:text-dark-accent hover:border-light-accent dark:hover:border-dark-accent transition-colors shadow-sm"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="w-9 h-9 rounded-xl border border-light-border dark:border-dark-border bg-light-bg dark:bg-dark-card flex items-center justify-center text-light-body dark:text-dark-body hover:text-light-accent dark:hover:text-dark-accent hover:border-light-accent dark:hover:border-dark-accent transition-colors shadow-sm"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${profile.email}`}
                aria-label={`Email ${profile.name}`}
                className="w-9 h-9 rounded-xl border border-light-border dark:border-dark-border bg-light-bg dark:bg-dark-card flex items-center justify-center text-light-body dark:text-dark-body hover:text-light-accent dark:hover:text-dark-accent hover:border-light-accent dark:hover:border-dark-accent transition-colors shadow-sm"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-light-heading dark:text-dark-heading mb-4">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              {navLinks.slice(0, 4).map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-light-body hover:text-light-accent dark:text-dark-body dark:hover:text-dark-accent transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-light-heading dark:text-dark-heading mb-4">
              Explore More
            </h4>
            <ul className="space-y-2 text-sm">
              {navLinks.slice(4).map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-light-body hover:text-light-accent dark:text-dark-body dark:hover:text-dark-accent transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar with Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-light-body dark:text-dark-body">
          <p className="flex items-center gap-1">
            © {new Date().getFullYear()} Lavan Kumar. All rights reserved. Crafted with passion &amp; precision.
          </p>

          <div className="flex items-center gap-3">
            <Link
              to="/admin"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-light-border dark:border-dark-border bg-light-bg dark:bg-dark-card hover:border-light-accent dark:hover:border-dark-accent text-light-body dark:text-dark-body hover:text-light-accent dark:hover:text-dark-accent font-medium transition-all shadow-sm"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin</span>
            </Link>

            <button
              onClick={scrollToTop}
              aria-label="Scroll back to top"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-light-border dark:border-dark-border bg-light-bg dark:bg-dark-card hover:border-light-accent dark:hover:border-dark-accent text-light-heading dark:text-dark-heading font-medium transition-all shadow-sm group"
            >
              <span>Back to top</span>
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

