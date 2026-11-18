import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema(
  {
    singletonKey: {
      type: String,
      default: 'main_profile',
      unique: true,
    },
    name: {
      type: String,
      default: 'Lavan Kumar',
      trim: true,
    },
    title: {
      type: String,
      default: 'Full Stack Developer',
      trim: true,
    },
    smallIntro: {
      type: String,
      default: "HELLO, I'M",
      trim: true,
    },
    status: {
      type: String,
      default: 'Available for Internships & Full-time Roles',
      trim: true,
    },
    location: {
      type: String,
      default: 'Hyderabad, India',
      trim: true,
    },
    educationBadge: {
      type: String,
      default: 'B.Tech – CSE (Narsimha Reddy Engineering College)',
      trim: true,
    },
    college: {
      type: String,
      default: 'Narsimha Reddy Engineering College',
      trim: true,
    },
    heroDescription: {
      type: String,
      default:
        'I build modern digital experiences by combining clean design, powerful backend systems, and scalable web technologies.',
      trim: true,
    },
    aboutBio: {
      type: String,
      default:
        'I am a Computer Science Engineering student and Full Stack Developer passionate about building modern, responsive, and scalable web applications. I enjoy solving real-world problems through clean code and continuously sharpening my engineering skills.',
      trim: true,
    },
    profilePhoto: {
      type: String,
      default: '',
    },
    specialtyText: {
      type: String,
      default: 'Full Stack MERN & Python',
      trim: true,
    },
    highlightMetric: {
      type: String,
      default: '95%',
      trim: true,
    },
    highlightLabel: {
      type: String,
      default: 'Java NPTEL',
      trim: true,
    },
    highlightSubtitle: {
      type: String,
      default: 'Elite + Gold Category',
      trim: true,
    },
    github: {
      type: String,
      default: 'https://github.com/lavan-kumar',
      trim: true,
    },
    linkedin: {
      type: String,
      default: 'https://linkedin.com/in/lavan-kumar',
      trim: true,
    },
    email: {
      type: String,
      default: 'lavan.kumar@example.com',
      trim: true,
    },
    resumeData: {
      type: String,
      default: '',
    },
    resumeFileName: {
      type: String,
      default: 'Lavan_Kumar_Resume.pdf',
      trim: true,
    },
    resumeLastUpdated: {
      type: String,
      default: 'November 2024',
      trim: true,
    },
  },
  { timestamps: true }
);

export const Profile = mongoose.model('Profile', profileSchema);
