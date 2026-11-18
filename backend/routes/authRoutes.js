import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { requireAdmin } from '../middleware/authMiddleware.js';
import { AdminCredential } from '../models/AdminCredential.js';

const router = express.Router();

const getJwtSecret = () =>
  process.env.JWT_SECRET || 'lavan_portfolio_dev_jwt_secret_change_in_prod';

const getEnvAdmin = () => ({
  email: (process.env.ADMIN_EMAIL || 'admin@lavan.dev').trim().toLowerCase(),
  password: process.env.ADMIN_PASSWORD || 'admin123',
});

// Helper: fetch DB credential if MongoDB is connected
const getStoredAdmin = async () => {
  if (mongoose.connection.readyState !== 1) return null;
  return AdminCredential.findOne({ singletonKey: 'main_admin' });
};

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const inputEmail = email.trim().toLowerCase();
    const storedAdmin = await getStoredAdmin();

    let isValid = false;
    let activeEmail = '';

    if (storedAdmin) {
      activeEmail = storedAdmin.email.toLowerCase();
      if (inputEmail === activeEmail) {
        isValid = await bcrypt.compare(password, storedAdmin.passwordHash);
      }
    } else {
      const envAdmin = getEnvAdmin();
      activeEmail = envAdmin.email;
      isValid = inputEmail === activeEmail && password === envAdmin.password;
    }

    if (!isValid) {
      return res.status(401).json({ message: 'Invalid admin credentials' });
    }

    const token = jwt.sign({ email: activeEmail, role: 'admin' }, getJwtSecret(), {
      expiresIn: '7d',
    });

    res.json({
      token,
      admin: { email: activeEmail, role: 'admin' },
      message: 'Login successful',
    });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
});

// GET /api/auth/verify
router.get('/verify', requireAdmin, async (req, res) => {
  try {
    const storedAdmin = await getStoredAdmin();
    const activeEmail = storedAdmin ? storedAdmin.email : req.admin.email;
    res.json({
      valid: true,
      admin: { email: activeEmail, role: 'admin' },
      passwordStoredInDb: Boolean(storedAdmin),
    });
  } catch (error) {
    res.json({ valid: true, admin: req.admin });
  }
});

// PUT /api/auth/password (Admin Protected - Update admin password & optional email in MongoDB Atlas)
router.put('/password', requireAdmin, async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        message: 'MongoDB Atlas must be connected to save a new admin password.',
      });
    }

    const { currentPassword, newPassword, newEmail } = req.body;

    if (!currentPassword || !newPassword) {
      return res
        .status(400)
        .json({ message: 'Current password and new password are required' });
    }

    if (newPassword.length < 6) {
      return res
        .status(400)
        .json({ message: 'New password must be at least 6 characters long' });
    }

    const storedAdmin = await getStoredAdmin();
    const envAdmin = getEnvAdmin();

    // Verify current password
    let currentMatches = false;
    if (storedAdmin) {
      currentMatches = await bcrypt.compare(currentPassword, storedAdmin.passwordHash);
    } else {
      currentMatches = currentPassword === envAdmin.password;
    }

    if (!currentMatches) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    const targetEmail = (newEmail?.trim() || storedAdmin?.email || envAdmin.email).toLowerCase();
    const passwordHash = await bcrypt.hash(newPassword, 10);

    await AdminCredential.findOneAndUpdate(
      { singletonKey: 'main_admin' },
      {
        $set: {
          singletonKey: 'main_admin',
          email: targetEmail,
          passwordHash,
        },
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    // Issue a fresh JWT token matching the updated email
    const token = jwt.sign({ email: targetEmail, role: 'admin' }, getJwtSecret(), {
      expiresIn: '7d',
    });

    res.json({
      message: 'Admin password updated securely in MongoDB Atlas!',
      token,
      admin: { email: targetEmail, role: 'admin' },
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update password', error: error.message });
  }
});

export default router;
