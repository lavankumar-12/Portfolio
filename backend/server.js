import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { connectDB } from './config/db.js';
import { requireAdmin } from './middleware/authMiddleware.js';
import { seedDatabase } from './seed.js';

import authRoutes from './routes/authRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import skillRoutes from './routes/skillRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import experienceRoutes from './routes/experienceRoutes.js';
import certificateRoutes from './routes/certificateRoutes.js';
import achievementRoutes from './routes/achievementRoutes.js';
import codingProfileRoutes from './routes/codingProfileRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration (strips trailing slashes automatically so Vercel URLs always match)
const allowedOrigins = process.env.CLIENT_URL
  ? process.env.CLIENT_URL.split(',').map((o) => o.trim().replace(/\/$/, '')).filter(Boolean)
  : null;

app.use(
  cors({
    origin: allowedOrigins && allowedOrigins.length > 0 ? allowedOrigins : true,
    credentials: true,
    exposedHeaders: ['X-Total-Count'],
  })
);

// Increase JSON payload limit for base64 image & PDF resume uploads
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

// Root status route (helpful for Render/Railway health probes)
app.get('/', (req, res) => {
  res.json({
    service: 'Lavan Kumar Portfolio API',
    status: 'running',
    dbConnected: mongoose.connection.readyState === 1,
  });
});

// Health check & DB status
app.get('/api/health', (req, res) => {
  const dbConnected = mongoose.connection.readyState === 1;
  res.json({
    status: 'ok',
    dbConnected,
    dbState: mongoose.connection.readyState,
    timestamp: new Date().toISOString(),
  });
});

// Middleware to return a helpful 503 if MongoDB Atlas URI isn't connected yet
const ensureDbConnected = (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      message:
        'Database is not connected. Please set your MONGODB_URI in backend/.env and restart the backend server.',
    });
  }
  next();
};

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/profile', ensureDbConnected, profileRoutes);
app.use('/api/skills', ensureDbConnected, skillRoutes);
app.use('/api/projects', ensureDbConnected, projectRoutes);
app.use('/api/experience', ensureDbConnected, experienceRoutes);
app.use('/api/certificates', ensureDbConnected, certificateRoutes);
app.use('/api/achievements', ensureDbConnected, achievementRoutes);
app.use('/api/coding-profiles', ensureDbConnected, codingProfileRoutes);
app.use('/api/messages', ensureDbConnected, messageRoutes);

// Admin endpoint to seed default portfolio entries into an empty MongoDB Atlas DB
app.post('/api/seed', requireAdmin, ensureDbConnected, async (req, res) => {
  try {
    const force = Boolean(req.body?.force);
    const seeded = await seedDatabase(force);
    res.json({ message: 'Seed operation complete', seeded });
  } catch (error) {
    res.status(500).json({ message: 'Failed to seed database', error: error.message });
  }
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Server error:', err.message);
  res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});



app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Node.js server is running",
    timestamp: new Date()
  });
});

// Automated self-ping keep-alive for Render free tier (prevents 15-minute inactivity spin-down)
const keepAliveUrl = process.env.RENDER_EXTERNAL_URL || process.env.SERVER_URL;
if (keepAliveUrl) {
  const pingIntervalMs = 12 * 60 * 1000; // Ping every 12 minutes
  setInterval(async () => {
    try {
      const pingEndpoint = `${keepAliveUrl.replace(/\/$/, '')}/health`;
      await fetch(pingEndpoint);
      console.log(`[KeepAlive] Pinged ${pingEndpoint} to prevent free tier spin-down`);
    } catch (err) {
      console.log(`[KeepAlive] Ping failed:`, err.message);
    }
  }, pingIntervalMs);
  console.log(`⏱️ Keep-alive scheduled every 12 minutes for: ${keepAliveUrl}`);
}

// Connect DB and start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Portfolio Backend API running on http://localhost:${PORT}`);
  });
});
