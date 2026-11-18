import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    subtitle: {
      type: String,
      default: '',
      trim: true,
    },
    category: {
      type: String,
      default: 'Full Stack Development',
      trim: true,
    },
    shortDescription: {
      type: String,
      required: true,
      trim: true,
    },
    fullDescription: {
      type: String,
      default: '',
    },
    technologies: {
      type: [String],
      default: [],
    },
    keyFeatures: {
      type: [String],
      default: [],
    },
    architecture: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      default: '',
    },
    githubUrl: {
      type: String,
      default: '',
    },
    liveDemoUrl: {
      type: String,
      default: '',
    },
    order: {
      type: Number,
      default: 0,
    },
    hidden: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Project = mongoose.model('Project', projectSchema);
