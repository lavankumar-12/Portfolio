import hospitalSvg from '../assets/projects/hospital-system.svg';
import expenseSvg from '../assets/projects/expense-tracker.svg';
import todoSvg from '../assets/projects/todo-app.svg';
import docstringSvg from '../assets/projects/docstring-generator.svg';

export const projects = [
  {
    id: "hospital-management-system",
    title: "Hospital Management System",
    subtitle: "Full Stack Healthcare & Patient Portal",
    category: "Full Stack Development",
    shortDescription:
      "A hospital management application designed to manage patient records, appointments, and hospital operations.",
    fullDescription:
      "A complete healthcare management system engineered to streamline clinical administration. The platform organizes patient check-ins, medical appointment scheduling with doctors, inpatient bed tracking, and confidential electronic health records. Built with robust relational schema design and role-based access for administrative and medical staff.",
    technologies: ["Python", "Flask", "MySQL", "JavaScript", "HTML5", "CSS3"],
    keyFeatures: [
      "Patient records management with automated registration and medical history logs",
      "Doctor appointment scheduling system with date and time-slot verification",
      "Role-based access control (Admin, Doctor, Staff) for privacy compliance",
      "Relational MySQL database with optimized queries for fast search and lookup",
      "Responsive user interface for desktop and tablet clinical workstations"
    ],
    architecture:
      "Built using Python Flask for RESTful endpoint handling, connected to MySQL via relational connectors, with server-rendered and responsive frontend interfaces.",
    image: hospitalSvg,
    githubUrl: "https://github.com/lavan-kumar/hospital-management-system", // [Editable Placeholder]
    liveDemoUrl: "https://hospital-system-demo.vercel.app", // [Editable Placeholder]
    isConfigured: false, // indicates placeholder status
    stats: {
      records: "Patient Records",
      appointments: "Doctor Scheduling",
      security: "Role-Based Auth"
    }
  },
  {
    id: "expense-tracker",
    title: "Expense Tracker",
    subtitle: "MERN Stack Personal Finance Application",
    category: "MERN Stack",
    shortDescription:
      "A web application for tracking income, expenses, and financial transactions with analytics.",
    fullDescription:
      "An intuitive personal finance management web application that enables users to record cash inflows and outflows, categorize transactions (e.g., food, utilities, education, entertainment), and visualize spending trends over time. Built using the modern MERN stack with responsive reactive state updates.",
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
    keyFeatures: [
      "Interactive income and expense logging with real-time balance calculations",
      "Dynamic categorization and visual transaction history timeline",
      "RESTful API backend powered by Express and MongoDB document storage",
      "Responsive React frontend with smooth UI state changes and validation",
      "Monthly summaries and net savings calculation"
    ],
    architecture:
      "Single-page application (SPA) frontend in React.js interacting with an Express/Node.js REST API layer that queries a MongoDB NoSQL database.",
    image: expenseSvg,
    githubUrl: "https://github.com/lavan-kumar/expense-tracker", // [Editable Placeholder]
    liveDemoUrl: "https://expense-tracker-demo.vercel.app", // [Editable Placeholder]
    isConfigured: false,
    stats: {
      stack: "MERN Stack",
      storage: "MongoDB Atlas",
      ui: "Tailwind CSS"
    }
  },
  {
    id: "todo-list-application",
    title: "Todo List Application",
    subtitle: "Task Management with Authentication & CRUD",
    category: "Full Stack Web",
    shortDescription:
      "A task management application with CRUD operations and user authentication.",
    fullDescription:
      "A practical full stack task organizer built to handle daily priorities efficiently. Features secure user authentication (signup/login), persistent task storage in MySQL, filtering by status (all, pending, completed), and full CRUD (Create, Read, Update, Delete) capability with clean feedback.",
    technologies: ["Node.js", "Express.js", "MySQL", "JavaScript", "HTML5", "CSS3"],
    keyFeatures: [
      "User authentication and session management for private task boards",
      "Comprehensive CRUD operations for tasks with immediate UI reflection",
      "Persistent relational storage using MySQL database tables",
      "Priority tagging, completion status toggling, and date tracking",
      "Fast, lightweight server response times with clean Express routes"
    ],
    architecture:
      "Express.js backend server managing REST API endpoints, session tokens, and MySQL SQL queries with client-side JavaScript for dynamic DOM updates.",
    image: todoSvg,
    githubUrl: "https://github.com/lavan-kumar/todo-list-app", // [Editable Placeholder]
    liveDemoUrl: "https://todo-app-demo.vercel.app", // [Editable Placeholder]
    isConfigured: false,
    stats: {
      crud: "Complete CRUD",
      auth: "Session Auth",
      database: "MySQL Store"
    }
  },
  {
    id: "automated-docstring-generator",
    title: "Automated Docstring Generator",
    subtitle: "Python AST Code Analysis & Documentation Tool",
    category: "Python Tooling",
    shortDescription:
      "An automated Python documentation tool that analyzes source code and generates baseline docstrings.",
    fullDescription:
      "A developer productivity tool designed to automate one of the most tedious aspects of Python programming: writing standardized docstrings. By analyzing the source code's Abstract Syntax Tree (AST), it extracts function names, arguments, return signatures, and raises declarations, auto-generating PEP 257 compliant docstring stubs.",
    technologies: ["Python", "AST Module", "Streamlit", "PEP 257"],
    keyFeatures: [
      "Abstract Syntax Tree (AST) static code parsing without executing untrusted code",
      "Automatic parameter type deduction and return type recognition",
      "Formatting compliant with PEP 257 and Google docstring style guidelines",
      "Interactive Streamlit web interface for immediate code upload and preview",
      "Export generated documentation directly or copy formatted Python snippets"
    ],
    architecture:
      "Python-based static analysis engine leveraging the built-in `ast` standard library module, served through an interactive Streamlit UI for instant in-browser inspection.",
    image: docstringSvg,
    githubUrl: "https://github.com/lavan-kumar/automated-docstring-generator", // [Editable Placeholder]
    liveDemoUrl: "https://docstring-gen-demo.streamlit.app", // [Editable Placeholder]
    isConfigured: false,
    stats: {
      standard: "PEP 257 Compliant",
      engine: "Python AST",
      ui: "Streamlit GUI"
    }
  }
];

