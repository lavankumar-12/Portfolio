import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../components/SectionHeading';
import { SkillOrbitVisual } from '../components/SkillOrbitVisual';
import { usePortfolio } from '../context/PortfolioContext';

export const Skills = () => {
  const { skills } = usePortfolio();
  const [highlightedSkill, setHighlightedSkill] = useState(null);

  const allSkillNames = useMemo(
    () => (skills || []).flatMap((group) => group.skills || []),
    [skills]
  );

  if (!skills || skills.length === 0) return null;

  return (
    <section id="skills" className="py-16 md:py-24 relative scroll-mt-20 md:scroll-mt-24">
      <div className="max-w-[82rem] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Skills"
          title="Technical Skills"
          subtitle="Core technologies I work with across frontend, backend, and databases."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Side: Wider Categorized Skills Card */}
          <div className="lg:col-span-8 rounded-2xl bg-gradient-to-br from-rose-50/95 via-white/95 to-orange-50/85 dark:bg-none dark:bg-dark-card/90 backdrop-blur-md border border-rose-200/80 dark:border-dark-border shadow-light-card dark:shadow-dark-card divide-y divide-rose-200/60 dark:divide-dark-border overflow-hidden">
            {skills.map((group, idx) => (
              <motion.div
                key={group._id || group.id || group.category}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.06 }}
                className="p-5 sm:px-8 sm:py-6 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 hover:bg-rose-100/40 dark:hover:bg-white/[0.02] transition-colors"
              >
                {/* Category Label */}
                <div className="sm:w-40 shrink-0 flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-gradient-to-r from-[#FF2E63] to-[#FF5E2B]" />
                  <h3 className="text-sm sm:text-base font-bold text-light-heading dark:text-white">
                    {group.category}:
                  </h3>
                </div>

                {/* Clean Animated Skill Pills */}
                <div className="flex flex-wrap items-center gap-2.5">
                  {(group.skills || []).map((skill) => {
                    const isHighlighted =
                      highlightedSkill &&
                      highlightedSkill.toLowerCase() === skill.toLowerCase();

                    return (
                      <motion.span
                        key={skill}
                        onMouseEnter={() => setHighlightedSkill(skill)}
                        onMouseLeave={() => setHighlightedSkill(null)}
                        whileHover={{ scale: 1.08, y: -2 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                        className={`cursor-pointer px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium border transition-all shadow-sm ${
                          isHighlighted
                            ? 'bg-[#FF2E63]/15 border-[#FF2E63] text-[#FF2E63] dark:text-white shadow-[0_0_14px_rgba(255,46,99,0.3)]'
                            : 'bg-white/90 dark:bg-[#161824] text-light-heading dark:text-slate-200 border-rose-200/70 dark:border-white/10 hover:border-cyan-400 dark:hover:border-cyan-400 hover:text-cyan-600 dark:hover:text-cyan-400'
                        }`}
                      >
                        {skill}
                      </motion.span>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Side: Animated Round Skill Logos Orbit */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="lg:col-span-4 flex items-center justify-center lg:justify-end lg:pl-4 w-full overflow-hidden sm:overflow-visible"
          >
            <SkillOrbitVisual
              skillNames={allSkillNames}
              highlightedSkill={highlightedSkill}
              onHighlightSkill={setHighlightedSkill}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
