import mongoose from 'mongoose';

const codingProfileSchema = new mongoose.Schema(
  {
    platform: {
      type: String,
      required: true,
      trim: true,
    },
    handle: {
      type: String,
      default: '',
      trim: true,
    },
    url: {
      type: String,
      required: true,
      trim: true,
    },
    tagline: {
      type: String,
      default: '',
      trim: true,
    },
    description: {
      type: String,
      default: '',
      trim: true,
    },
    icon: {
      type: String,
      default: 'Code2',
      trim: true,
    },
    color: {
      type: String,
      default: '#FF2E63',
      trim: true,
    },
    focus: {
      type: [String],
      default: [],
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

export const CodingProfile = mongoose.model('CodingProfile', codingProfileSchema);
