import React from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { ContactForm } from '../components/ContactForm';
import { usePortfolio } from '../context/PortfolioContext';
import { Mail, MapPin, Linkedin, Github, MessageSquare, Clock } from 'lucide-react';

export const Contact = () => {
  const { profile } = usePortfolio();

  return (
    <section id="contact" className="py-20 md:py-28 relative scroll-mt-20 md:scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Get in Touch"
          title="Let's Build Something Together"
          subtitle="Interested in hiring a Full Stack Developer, collaborating on a project, or discussing engineering opportunities? Send a message."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Direct Contact Info & Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-sky-50/90 via-white/95 to-cyan-50/85 dark:bg-none dark:bg-dark-card border border-sky-200/80 dark:border-dark-border shadow-light-card dark:shadow-dark-card space-y-6 backdrop-blur-md">
              <div>
                <h3 className="text-xl font-bold text-light-heading dark:text-dark-heading mb-1">
                  Contact Information
                </h3>
                <p className="text-xs sm:text-sm text-light-body dark:text-dark-body">
                  Feel free to reach out directly through any of the channels below.
                </p>
              </div>

              <div className="space-y-4">
                {/* Email Item */}
                <a
                  href={`mailto:${profile.email}`}
                  className="group flex items-start gap-4 p-4 rounded-2xl bg-light-secondary dark:bg-dark-secondary/60 border border-light-border dark:border-dark-border hover:border-light-accent dark:hover:border-dark-accent transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#FF2E63]/10 border border-[#FF2E63]/25 flex items-center justify-center text-[#FF2E63] shrink-0 group-hover:scale-105 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-light-body dark:text-dark-body block">
                      Email Address
                    </span>
                    <p className="text-sm font-bold text-light-heading dark:text-dark-heading break-all group-hover:text-light-accent dark:group-hover:text-dark-accent transition-colors">
                      {profile.email}
                    </p>
                  </div>
                </a>

                {/* Location Item */}
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-light-secondary dark:bg-dark-secondary/60 border border-light-border dark:border-dark-border">
                  <div className="w-10 h-10 rounded-xl bg-[#FF2E63]/10 border border-[#FF2E63]/25 flex items-center justify-center text-[#FF2E63] shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-light-body dark:text-dark-body block">
                      Current Location
                    </span>
                    <p className="text-sm font-bold text-light-heading dark:text-dark-heading">
                      {profile.location}
                    </p>
                  </div>
                </div>

                {/* Response Time Item */}
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-light-secondary dark:bg-dark-secondary/60 border border-light-border dark:border-dark-border">
                  <div className="w-10 h-10 rounded-xl bg-[#FF2E63]/10 border border-[#FF2E63]/25 flex items-center justify-center text-[#FF2E63] shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-light-body dark:text-dark-body block">
                      Response Availability
                    </span>
                    <p className="text-sm font-bold text-light-heading dark:text-dark-heading">
                      Within 24 Hours
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Connect */}
              <div className="pt-4 border-t border-light-border dark:border-dark-border">
                <span className="text-xs font-semibold uppercase tracking-wider text-light-body dark:text-dark-body block mb-3">
                  Professional Networks
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 px-3 rounded-xl border border-light-border dark:border-dark-border bg-light-secondary dark:bg-dark-secondary/60 hover:border-light-accent dark:hover:border-dark-accent text-xs font-semibold text-light-heading dark:text-dark-heading flex items-center justify-center gap-2 transition-all shadow-sm"
                  >
                    <Linkedin className="w-4 h-4 text-[#0A66C2]" />
                    <span>LinkedIn</span>
                  </a>

                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 px-3 rounded-xl border border-light-border dark:border-dark-border bg-light-secondary dark:bg-dark-secondary/60 hover:border-light-accent dark:hover:border-dark-accent text-xs font-semibold text-light-heading dark:text-dark-heading flex items-center justify-center gap-2 transition-all shadow-sm"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-rose-50/85 via-white/95 to-sky-50/80 dark:bg-none dark:bg-dark-card border border-rose-200/75 dark:border-dark-border shadow-light-card dark:shadow-dark-card backdrop-blur-md">
              <h3 className="text-xl font-bold text-light-heading dark:text-dark-heading mb-1 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-light-accent dark:text-dark-accent" />
                Send a Direct Message
              </h3>
              <p className="text-xs sm:text-sm text-light-body dark:text-dark-body mb-6">
                Fill in the details below and I will get back to your inquiry promptly.
              </p>

              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

