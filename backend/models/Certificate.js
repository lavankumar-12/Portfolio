import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    issuer: {
      type: String,
      required: true,
      trim: true,
    },
    score: {
      type: String,
      default: 'Verified Certificate',
      trim: true,
    },
    badgeText: {
      type: String,
      default: 'Certified',
      trim: true,
    },
    date: {
      type: String,
      default: '',
      trim: true,
    },
    credentialId: {
      type: String,
      default: '',
      trim: true,
    },
    previewImage: {
      type: String,
      default: '',
    },
    skills: {
      type: [String],
      default: [],
    },
    description: {
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

export const Certificate = mongoose.model('Certificate', certificateSchema);
