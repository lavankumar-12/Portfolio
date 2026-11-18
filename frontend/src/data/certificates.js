import nptelSvg from '../assets/certificates/nptel-java.svg';
import pythonGfgSvg from '../assets/certificates/python-gfg.svg';
import googleAndroidSvg from '../assets/certificates/google-android.svg';
import infosysAiSvg from '../assets/certificates/infosys-ai.svg';

export const certificates = [
  {
    id: "java-nptel",
    title: "Programming in Java (NPTEL)",
    issuer: "NPTEL • IIT Kharagpur (Ministry of Education, Govt. of India)",
    score: "95% Score (Elite + Gold Category)",
    badgeText: "Elite + Gold (Top 1-2%)",
    date: "October 2023", // [Editable Placeholder]
    credentialId: "NPTEL23CS-XXXXXX", // [Editable Placeholder]
    previewImage: nptelSvg,
    skills: ["Java Core", "OOP Principles", "Multithreading", "Exception Handling", "Collections Framework"],
    description:
      "Comprehensive certification covering object-oriented programming, inheritance, polymorphism, abstract classes, multi-threaded programming, and Java collections with rigorous proctored examination."
  },
  {
    id: "python-gfg",
    title: "Python Programming Certification",
    issuer: "GeeksforGeeks",
    score: "Certified Python Developer",
    badgeText: "Verified Certificate",
    date: "December 2023", // [Editable Placeholder]
    credentialId: "GFG-PY-XXXXXX", // [Editable Placeholder]
    previewImage: pythonGfgSvg,
    skills: ["Python 3", "Data Structures", "Functional Programming", "File I/O", "OOP in Python"],
    description:
      "Hands-on certification demonstrating proficiency in Python 3 syntax, built-in data structures (lists, tuples, dicts, sets), algorithmic scripting, and modular application development."
  },
  {
    id: "google-android-cert",
    title: "Android Developer Virtual Internship Certificate",
    issuer: "Google for Developers & EduSkills / AICTE",
    score: "Successfully Completed Internship Track",
    badgeText: "Google Supported",
    date: "January 2024", // [Editable Placeholder]
    credentialId: "GOOGLE-AICTE-AND-XXXXXX", // [Editable Placeholder]
    previewImage: googleAndroidSvg,
    skills: ["Android Studio", "Kotlin", "Material Design", "Room DB", "Jetpack Components"],
    description:
      "Formal credential awarded for successfully completing the industry-aligned Android development virtual internship syllabus supported by Google for Developers."
  },
  {
    id: "infosys-springboard-ai",
    title: "Artificial Intelligence & Modern Web Courses",
    issuer: "Infosys Springboard",
    score: "Professional Course Completion",
    badgeText: "Infosys Certified",
    date: "April 2024", // [Editable Placeholder]
    credentialId: "INFY-SB-AI-XXXXXX", // [Editable Placeholder]
    previewImage: infosysAiSvg,
    skills: ["Artificial Intelligence", "Machine Learning Foundations", "Full Stack Concepts", "Problem Solving"],
    description:
      "Specialized training covering contemporary artificial intelligence foundations, deep learning introductory concepts, and integration with modern web services."
  }
];

