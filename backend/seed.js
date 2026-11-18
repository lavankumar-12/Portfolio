import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { Skill } from './models/Skill.js';
import { Project } from './models/Project.js';
import { Experience } from './models/Experience.js';
import { Certificate } from './models/Certificate.js';
import { Profile } from './models/Profile.js';
import { CodingProfile } from './models/CodingProfile.js';

dotenv.config();

export const defaultSkills = [
  {
    category: 'Frontend',
    skills: ['HTML', 'CSS', 'JS', 'React', 'Tailwind CSS'],
    order: 1,
  },
  {
    category: 'Backend',
    skills: ['Node', 'Express', 'REST', 'Python', 'Flask'],
    order: 2,
  },
  {
    category: 'Databases',
    skills: ['MongoDB', 'MySQL', 'PostgreSQL'],
    order: 3,
  },
  {
    category: 'Languages & Tools',
    skills: ['Java', 'Python', 'SQL', 'Git', 'GitHub', 'Postman', 'Vercel'],
    order: 4,
  },
];

export const defaultProjects = [
  {
    title: 'Hospital Management System',
    subtitle: 'Full Stack Healthcare & Patient Portal',
    category: 'Full Stack Development',
    shortDescription:
      'A hospital management application designed to manage patient records, appointments, and hospital operations.',
    fullDescription:
      'A complete healthcare management system engineered to streamline clinical administration. Organizes patient check-ins, medical appointment scheduling, inpatient bed tracking, and electronic health records with role-based access.',
    technologies: ['Python', 'Flask', 'MySQL', 'JavaScript', 'HTML', 'CSS'],
    keyFeatures: [
      'Patient records management with registration and medical history logs',
      'Doctor appointment scheduling system with slot verification',
      'Role-based access control for Admin, Doctor, and Staff',
      'Relational MySQL database with optimized queries',
    ],
    architecture: 'Python Flask REST backend connected to MySQL with responsive frontend views.',
    image: '',
    githubUrl: 'https://github.com/lavan-kumar/hospital-management-system',
    liveDemoUrl: 'https://hospital-system-demo.vercel.app',
    order: 1,
  },
  {
    title: 'Expense Tracker',
    subtitle: 'MERN Stack Personal Finance Application',
    category: 'MERN Stack',
    shortDescription:
      'A web application for tracking income, expenses, and financial transactions with analytics.',
    fullDescription:
      'An intuitive personal finance management web application enabling users to record cash inflows and outflows, categorize transactions, and track monthly net savings using the MERN stack.',
    technologies: ['React', 'Node', 'Express', 'MongoDB', 'Tailwind CSS'],
    keyFeatures: [
      'Interactive income and expense logging with real-time balance updates',
      'Dynamic categorization and transaction history timeline',
      'REST API backend powered by Express and MongoDB',
      'Responsive React frontend with clean validation',
    ],
    architecture: 'React SPA connected to Express/Node.js REST API and MongoDB.',
    image: '',
    githubUrl: 'https://github.com/lavan-kumar/expense-tracker',
    liveDemoUrl: 'https://expense-tracker-demo.vercel.app',
    order: 2,
  },
  {
    title: 'Todo List Application',
    subtitle: 'Task Management with Authentication & CRUD',
    category: 'Full Stack Web',
    shortDescription:
      'A task management application with CRUD operations and user authentication.',
    fullDescription:
      'A full stack task organizer featuring user authentication, persistent task storage in MySQL, status filtering, and complete CRUD operations.',
    technologies: ['Node', 'Express', 'MySQL', 'JavaScript', 'HTML', 'CSS'],
    keyFeatures: [
      'User authentication and private task boards',
      'Complete CRUD operations with instant UI reflection',
      'Persistent MySQL relational storage',
      'Priority tagging and completion tracking',
    ],
    architecture: 'Express.js server managing REST routes and MySQL database queries.',
    image: '',
    githubUrl: 'https://github.com/lavan-kumar/todo-list-app',
    liveDemoUrl: 'https://todo-app-demo.vercel.app',
    order: 3,
  },
  {
    title: 'Automated Docstring Generator',
    subtitle: 'Python AST Code Analysis Tool',
    category: 'Python Tooling',
    shortDescription:
      'An automated Python documentation tool that analyzes source code and generates baseline docstrings.',
    fullDescription:
      'A developer utility that parses Python Abstract Syntax Trees (AST) to extract function signatures, parameters, and return declarations, generating PEP 257 compliant docstring stubs.',
    technologies: ['Python', 'AST', 'Streamlit', 'PEP 257'],
    keyFeatures: [
      'Static AST parsing without executing untrusted source code',
      'Automatic parameter and return signature extraction',
      'PEP 257 compliant docstring generation',
      'Interactive Streamlit web interface',
    ],
    architecture: 'Python AST static analyzer served via interactive Streamlit UI.',
    image: '',
    githubUrl: 'https://github.com/lavan-kumar/automated-docstring-generator',
    liveDemoUrl: 'https://docstring-gen-demo.streamlit.app',
    order: 4,
  },
];

export const defaultExperience = [
  {
    organization: 'Bees Software Solutions',
    role: 'Software Development Intern',
    type: 'Internship',
    duration: 'Jun 2024 – Aug 2024',
    location: 'Hyderabad, India',
    responsibilities: [
      'Built modular React frontend components and integrated RESTful APIs with Node.js.',
      'Participated in Git workflows, code reviews, and responsive UI debugging.',
    ],
    technologies: ['React', 'JavaScript', 'REST APIs', 'Git', 'Postman'],
    learningOutcomes:
      'Gained practical experience in Agile team workflows and production full stack engineering.',
    order: 1,
  },
  {
    organization: 'Infosys Springboard',
    role: 'Project Trainee / AI & Full Stack Intern',
    type: 'Internship Program',
    duration: 'Feb 2024 – Apr 2024',
    location: 'Virtual',
    responsibilities: [
      'Completed technical project track focused on Python, AI fundamentals, and web architecture.',
      'Implemented algorithmic solutions and automated testing scripts.',
    ],
    technologies: ['Python', 'AI Fundamentals', 'Data Structures', 'Web Tech'],
    learningOutcomes:
      'Strengthened structured problem solving and modern AI-web integration.',
    order: 2,
  },
  {
    organization: 'Google for Developers / AICTE',
    role: 'Android Developer Virtual Intern',
    type: 'Virtual Internship',
    duration: '2023 – 2024',
    location: 'Virtual',
    responsibilities: [
      'Built native Android prototypes using Kotlin, Android Studio, and Material Design.',
      'Implemented activity lifecycles, local storage, and API integration.',
    ],
    technologies: ['Kotlin', 'Java', 'Android Studio', 'Material Design'],
    learningOutcomes:
      'Mastered native Android architecture components and mobile UI guidelines.',
    order: 3,
  },
];

export const defaultCertificates = [
  {
    title: 'Programming in Java (NPTEL)',
    issuer: 'NPTEL • IIT Kharagpur',
    score: '95% Score (Elite + Gold)',
    badgeText: 'Elite + Gold',
    date: 'October 2023',
    credentialId: 'NPTEL23CS-XXXXXX',
    previewImage: '',
    skills: ['Java', 'OOP', 'Multithreading', 'Collections'],
    description:
      'Proctored national certification covering Java OOP, multithreading, exception handling, and collections framework.',
    order: 1,
  },
  {
    title: 'Python Programming Certification',
    issuer: 'GeeksforGeeks',
    score: 'Certified Python Developer',
    badgeText: 'Verified',
    date: 'December 2023',
    credentialId: 'GFG-PY-XXXXXX',
    previewImage: '',
    skills: ['Python 3', 'Data Structures', 'OOP', 'File I/O'],
    description:
      'Certification validating Python 3 programming fundamentals, built-in data structures, and modular scripting.',
    order: 2,
  },
  {
    title: 'Android Developer Virtual Internship',
    issuer: 'Google for Developers / AICTE',
    score: 'Completed Internship Track',
    badgeText: 'Google Supported',
    date: 'January 2024',
    credentialId: 'GOOGLE-AICTE-XXXXXX',
    previewImage: '',
    skills: ['Kotlin', 'Android Studio', 'Jetpack', 'Room DB'],
    description:
      'Formal internship completion certificate for Google-supported Android development curriculum.',
    order: 3,
  },
  {
    title: 'Artificial Intelligence & Modern Web',
    issuer: 'Infosys Springboard',
    score: 'Course Completion',
    badgeText: 'Infosys Certified',
    date: 'April 2024',
    credentialId: 'INFY-SB-AI-XXXXXX',
    previewImage: '',
    skills: ['Artificial Intelligence', 'ML Foundations', 'Web Services'],
    description:
      'Completed specialized Infosys Springboard training in AI fundamentals and web application concepts.',
    order: 4,
  },
];

export const defaultCodingProfiles = [
  {
    platform: 'GitHub',
    handle: 'lavan-kumar',
    url: 'https://github.com/lavan-kumar',
    tagline: 'Open Source Repositories & Full Stack Codebases',
    description: 'Hosts complete source code repositories for full stack web applications, API backends, and Python tools.',
    icon: 'Github',
    color: '#FF2E63',
    focus: ['React.js', 'Node.js', 'Flask', 'Full Stack Projects'],
    order: 1,
  },
  {
    platform: 'LeetCode',
    handle: 'lavan-kumar',
    url: 'https://leetcode.com/u/lavan-kumar',
    tagline: 'Data Structures & Algorithmic Challenges',
    description: 'Practicing algorithmic problem solving, time-space complexity optimization, and coding patterns.',
    icon: 'Code2',
    color: '#FFA116',
    focus: ['Arrays', 'Strings', 'Trees', 'Dynamic Programming'],
    order: 2,
  },
  {
    platform: 'HackerRank',
    handle: 'lavan-kumar',
    url: 'https://www.hackerrank.com/profile/lavan-kumar',
    tagline: 'Problem Solving & Core Language Foundations',
    description: 'Strengthening syntax, object-oriented concepts, and relational SQL queries through challenge tracks.',
    icon: 'Award',
    color: '#2EC866',
    focus: ['Java', 'Python', 'SQL', 'Problem Solving'],
    order: 3,
  },
  {
    platform: 'CodeChef',
    handle: 'lavan-kumar',
    url: 'https://www.codechef.com/users/lavan-kumar',
    tagline: 'Competitive Programming & Timed Contests',
    description: 'Participating in graded programming contests and sharpening algorithmic implementation speed.',
    icon: 'Flame',
    color: '#FF5E2B',
    focus: ['Contest Practice', 'Mathematical Logic', 'Algorithm Speed'],
    order: 4,
  },
];

export const seedDatabase = async (force = false) => {
  const results = {};

  if (force || (await Profile.countDocuments()) === 0) {
    if (force) await Profile.deleteMany({});
    await Profile.create({ singletonKey: 'main_profile' });
    results.profile = 1;
  }

  if (force || (await Skill.countDocuments()) === 0) {
    if (force) await Skill.deleteMany({});
    await Skill.insertMany(defaultSkills);
    results.skills = defaultSkills.length;
  }
  if (force || (await Project.countDocuments()) === 0) {
    if (force) await Project.deleteMany({});
    await Project.insertMany(defaultProjects);
    results.projects = defaultProjects.length;
  }
  if (force || (await Experience.countDocuments()) === 0) {
    if (force) await Experience.deleteMany({});
    await Experience.insertMany(defaultExperience);
    results.experience = defaultExperience.length;
  }
  if (force || (await Certificate.countDocuments()) === 0) {
    if (force) await Certificate.deleteMany({});
    await Certificate.insertMany(defaultCertificates);
    results.certificates = defaultCertificates.length;
  }
  if (force || (await CodingProfile.countDocuments()) === 0) {
    if (force) await CodingProfile.deleteMany({});
    await CodingProfile.insertMany(defaultCodingProfiles);
    results.codingProfiles = defaultCodingProfiles.length;
  }

  return results;
};

// Allow standalone CLI execution: `npm run seed`
const isDirectRun = process.argv[1] && process.argv[1].endsWith('seed.js');
if (isDirectRun) {
  connectDB().then(async (connected) => {
    if (!connected) {
      process.exit(1);
    }
    const res = await seedDatabase(false);
    console.log('✅ Seed completed:', res);
    process.exit(0);
  });
}
