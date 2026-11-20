import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Database, Globe } from 'lucide-react';

const DEVICON_BASE = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';

const SKILL_ICON_META = {
  html: { src: `${DEVICON_BASE}/html5/html5-original.svg`, color: '#E34F26' },
  html5: { src: `${DEVICON_BASE}/html5/html5-original.svg`, color: '#E34F26' },
  css: { src: `${DEVICON_BASE}/css3/css3-original.svg`, color: '#1572B6' },
  css3: { src: `${DEVICON_BASE}/css3/css3-original.svg`, color: '#1572B6' },
  js: { src: `${DEVICON_BASE}/javascript/javascript-original.svg`, color: '#F7DF1E' },
  javascript: { src: `${DEVICON_BASE}/javascript/javascript-original.svg`, color: '#F7DF1E' },
  ts: { src: `${DEVICON_BASE}/typescript/typescript-original.svg`, color: '#3178C6' },
  typescript: { src: `${DEVICON_BASE}/typescript/typescript-original.svg`, color: '#3178C6' },
  react: { src: `${DEVICON_BASE}/react/react-original.svg`, color: '#61DAFB' },
  'react.js': { src: `${DEVICON_BASE}/react/react-original.svg`, color: '#61DAFB' },
  reactjs: { src: `${DEVICON_BASE}/react/react-original.svg`, color: '#61DAFB' },
  tailwind: { src: `${DEVICON_BASE}/tailwindcss/tailwindcss-original.svg`, color: '#38BDF8' },
  'tailwind css': { src: `${DEVICON_BASE}/tailwindcss/tailwindcss-original.svg`, color: '#38BDF8' },
  tailwindcss: { src: `${DEVICON_BASE}/tailwindcss/tailwindcss-original.svg`, color: '#38BDF8' },
  node: { src: `${DEVICON_BASE}/nodejs/nodejs-original.svg`, color: '#5FA04E' },
  'node.js': { src: `${DEVICON_BASE}/nodejs/nodejs-original.svg`, color: '#5FA04E' },
  nodejs: { src: `${DEVICON_BASE}/nodejs/nodejs-original.svg`, color: '#5FA04E' },
  express: { src: `${DEVICON_BASE}/express/express-original.svg`, color: '#22D3EE', invertDark: true },
  'express.js': { src: `${DEVICON_BASE}/express/express-original.svg`, color: '#22D3EE', invertDark: true },
  expressjs: { src: `${DEVICON_BASE}/express/express-original.svg`, color: '#22D3EE', invertDark: true },
  python: { src: `${DEVICON_BASE}/python/python-original.svg`, color: '#3776AB' },
  flask: { src: `${DEVICON_BASE}/flask/flask-original.svg`, color: '#22D3EE', invertDark: true },
  django: { src: `${DEVICON_BASE}/django/django-plain.svg`, color: '#44B78B' },
  mongodb: { src: `${DEVICON_BASE}/mongodb/mongodb-original.svg`, color: '#47A248' },
  mongo: { src: `${DEVICON_BASE}/mongodb/mongodb-original.svg`, color: '#47A248' },
  mysql: { src: `${DEVICON_BASE}/mysql/mysql-original.svg`, color: '#4479A1' },
  postgresql: { src: `${DEVICON_BASE}/postgresql/postgresql-original.svg`, color: '#336791' },
  postgres: { src: `${DEVICON_BASE}/postgresql/postgresql-original.svg`, color: '#336791' },
  java: { src: `${DEVICON_BASE}/java/java-original.svg`, color: '#ED8B00' },
  git: { src: `${DEVICON_BASE}/git/git-original.svg`, color: '#F05032' },
  github: { src: `${DEVICON_BASE}/github/github-original.svg`, color: '#FF2E63', invertDark: true },
  postman: { src: `${DEVICON_BASE}/postman/postman-original.svg`, color: '#FF6C37' },
  vercel: { src: `${DEVICON_BASE}/vercel/vercel-original.svg`, color: '#FF2E63', invertDark: true },
  nextjs: { src: `${DEVICON_BASE}/nextjs/nextjs-original.svg`, color: '#22D3EE', invertDark: true },
  'next.js': { src: `${DEVICON_BASE}/nextjs/nextjs-original.svg`, color: '#22D3EE', invertDark: true },
  docker: { src: `${DEVICON_BASE}/docker/docker-original.svg`, color: '#2496ED' },
  kotlin: { src: `${DEVICON_BASE}/kotlin/kotlin-original.svg`, color: '#7F52FF' },
  firebase: { src: `${DEVICON_BASE}/firebase/firebase-original.svg`, color: '#FFCA28' },
  bootstrap: { src: `${DEVICON_BASE}/bootstrap/bootstrap-original.svg`, color: '#7952B3' },
  redux: { src: `${DEVICON_BASE}/redux/redux-original.svg`, color: '#764ABC' },
  c: { src: `${DEVICON_BASE}/c/c-original.svg`, color: '#A8B9CC' },
  'c++': { src: `${DEVICON_BASE}/cplusplus/cplusplus-original.svg`, color: '#00599C' },
  vscode: { src: `${DEVICON_BASE}/vscode/vscode-original.svg`, color: '#007ACC' },
  'vs code': { src: `${DEVICON_BASE}/vscode/vscode-original.svg`, color: '#007ACC' },
  rest: { fallbackType: 'api', color: '#FF2E63' },
  'rest api': { fallbackType: 'api', color: '#FF2E63' },
  'rest apis': { fallbackType: 'api', color: '#FF2E63' },
  sql: { fallbackType: 'db', color: '#22D3EE' },
};

const getSkillMeta = (skillName) => {
  const key = (skillName || '').trim().toLowerCase();
  return SKILL_ICON_META[key] || { fallbackType: 'text', color: '#FF5E2B' };
};

const RoundSkillLogo = ({ skill, isHighlighted, onHover, onLeave }) => {
  const [imgFailed, setImgFailed] = useState(false);
  const meta = getSkillMeta(skill);

  return (
    <div
      onMouseEnter={() => onHover(skill)}
      onMouseLeave={onLeave}
      className="group relative flex items-center justify-center cursor-pointer"
    >
      {/* Round Logo Orb */}
      <motion.div
        animate={isHighlighted ? { scale: 1.24 } : { scale: 1 }}
        whileHover={{ scale: 1.24 }}
        transition={{ type: 'spring', stiffness: 360, damping: 18 }}
        style={{
          boxShadow: isHighlighted
            ? `0 0 24px ${meta.color}80, inset 0 0 12px ${meta.color}30`
            : `0 6px 18px rgba(0,0,0,0.45)`,
          borderColor: isHighlighted ? meta.color : undefined,
        }}
        className={`w-9 h-9 sm:w-13 sm:h-13 rounded-full flex items-center justify-center p-1.5 sm:p-2.5 bg-white dark:bg-[#121420] border-2 transition-colors duration-200 ${
          isHighlighted
            ? 'z-30'
            : 'border-slate-200 dark:border-white/15 hover:border-cyan-400'
        }`}
      >
        {meta.src && !imgFailed ? (
          <img
            src={meta.src}
            alt={skill}
            loading="lazy"
            onError={() => setImgFailed(true)}
            className={`w-5 h-5 sm:w-7 sm:h-7 object-contain ${
              meta.invertDark ? 'dark:invert dark:brightness-200' : ''
            }`}
          />
        ) : meta.fallbackType === 'api' ? (
          <Globe className="w-4 h-4 sm:w-6 sm:h-6 text-[#FF2E63]" />
        ) : meta.fallbackType === 'db' ? (
          <Database className="w-4 h-4 sm:w-6 sm:h-6 text-cyan-400" />
        ) : (
          <span
            className="text-[9px] sm:text-[11px] font-black uppercase tracking-tight text-center leading-none"
            style={{ color: meta.color }}
          >
            {skill.slice(0, 4)}
          </span>
        )}
      </motion.div>

      {/* Hover Tooltip Pill */}
      <div
        className={`pointer-events-none absolute -bottom-7 sm:-bottom-8 left-1/2 -translate-x-1/2 px-2 sm:px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold whitespace-nowrap bg-slate-900 dark:bg-[#0D0E16] text-white border border-white/15 shadow-lg transition-all duration-200 z-40 ${
          isHighlighted
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0'
        }`}
      >
        {skill}
      </div>
    </div>
  );
};

export const SkillOrbitVisual = ({ skillNames = [], highlightedSkill, onHighlightSkill }) => {
  // Deduplicate skills cleanly, up to 14 orbiting logos (5 inner + 9 outer)
  const uniqueSkills = Array.from(
    new Map(skillNames.map((s) => [s.trim().toLowerCase(), s.trim()])).values()
  ).slice(0, 14);

  const innerCount = Math.min(5, Math.ceil(uniqueSkills.length * 0.4));
  const innerSkills = uniqueSkills.slice(0, innerCount);
  const outerSkills = uniqueSkills.slice(innerCount);

  return (
    <div className="relative flex items-center justify-center w-full max-w-[320px] sm:max-w-[420px] mx-auto h-[290px] sm:h-[370px] select-none">
      {/* Ambient Radial Center Glow */}
      <div className="absolute w-44 h-44 sm:w-56 sm:h-56 rounded-full bg-gradient-to-tr from-[#FF2E63]/20 via-cyan-400/15 to-[#FF5E2B]/20 blur-3xl pointer-events-none" />

      {/* Center Core Badge */}
      <motion.div
        animate={{ scale: [1, 1.07, 1] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
        className="relative z-20 w-13 h-13 sm:w-18 sm:h-18 rounded-full bg-gradient-to-tr from-[#FF2E63] via-[#FF4D4D] to-[#FF5E2B] p-[2px] shadow-[0_0_24px_rgba(255,46,99,0.45)] flex items-center justify-center"
      >
        <div className="w-full h-full rounded-full bg-white dark:bg-[#0B0C14] flex flex-col items-center justify-center">
          <Code2 className="w-5 h-5 sm:w-6 sm:h-6 text-[#FF2E63]" />
          <span className="text-[8px] sm:text-[9px] font-extrabold uppercase tracking-widest text-cyan-600 dark:text-cyan-400 mt-0.5">
            STACK
          </span>
        </div>
      </motion.div>

      {/* Inner Orbit Track */}
      <div className="absolute w-[150px] h-[150px] sm:w-[195px] sm:h-[195px] rounded-full border border-dashed border-cyan-500/35 dark:border-cyan-400/25 pointer-events-none" />

      {/* Inner Rotating Orbit Ring (Clockwise) */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
        className="absolute w-[150px] h-[150px] sm:w-[195px] sm:h-[195px] pointer-events-none"
      >
        {innerSkills.map((skill, i) => {
          const angle = (i / Math.max(innerSkills.length, 1)) * 2 * Math.PI - Math.PI / 2;
          const xPct = 50 + 50 * Math.cos(angle);
          const yPct = 50 + 50 * Math.sin(angle);
          const isHigh =
            highlightedSkill &&
            highlightedSkill.toLowerCase() === skill.toLowerCase();

          return (
            <div
              key={skill}
              style={{ left: `${xPct}%`, top: `${yPct}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
            >
              {/* Counter-rotate so each logo stays upright while orbiting */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
              >
                <RoundSkillLogo
                  skill={skill}
                  isHighlighted={isHigh}
                  onHover={onHighlightSkill}
                  onLeave={() => onHighlightSkill(null)}
                />
              </motion.div>
            </div>
          );
        })}
      </motion.div>

      {/* Outer Orbit Track */}
      {outerSkills.length > 0 && (
        <>
          <div className="absolute w-[240px] h-[240px] sm:w-[320px] sm:h-[320px] rounded-full border border-dashed border-[#FF2E63]/30 dark:border-[#FF2E63]/25 pointer-events-none" />

          {/* Outer Rotating Orbit Ring (Counter-Clockwise) */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 36, repeat: Infinity, ease: 'linear' }}
            className="absolute w-[240px] h-[240px] sm:w-[320px] sm:h-[320px] pointer-events-none"
          >
            {outerSkills.map((skill, i) => {
              const angle = (i / Math.max(outerSkills.length, 1)) * 2 * Math.PI;
              const xPct = 50 + 50 * Math.cos(angle);
              const yPct = 50 + 50 * Math.sin(angle);
              const isHigh =
                highlightedSkill &&
                highlightedSkill.toLowerCase() === skill.toLowerCase();

              return (
                <div
                  key={skill}
                  style={{ left: `${xPct}%`, top: `${yPct}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                >
                  {/* Counter-rotate clockwise so logos stay upright */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 36, repeat: Infinity, ease: 'linear' }}
                  >
                    <RoundSkillLogo
                      skill={skill}
                      isHighlighted={isHigh}
                      onHover={onHighlightSkill}
                      onLeave={() => onHighlightSkill(null)}
                    />
                  </motion.div>
                </div>
              );
            })}
          </motion.div>
        </>
      )}
    </div>
  );
};
