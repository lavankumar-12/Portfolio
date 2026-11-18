import mongoose from 'mongoose';

const adminCredentialSchema = new mongoose.Schema(
  {
    singletonKey: {
      type: String,
      default: 'main_admin',
      unique: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const AdminCredential = mongoose.model('AdminCredential', adminCredentialSchema);
