import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema(
  {
    organization: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      default: 'Internship',
      trim: true,
    },
    duration: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      default: 'Remote',
      trim: true,
    },
    responsibilities: {
      type: [String],
      default: [],
    },
    technologies: {
      type: [String],
      default: [],
    },
    learningOutcomes: {
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

export const Experience = mongoose.model('Experience', experienceSchema);
