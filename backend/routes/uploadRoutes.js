import express from 'express';
import multer from 'multer';
import { requireAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

const uploadImage = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 4 * 1024 * 1024 }, // 4 MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files (PNG, JPG, WEBP, SVG) are allowed'));
    }
  },
});

const uploadResume = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 8 * 1024 * 1024 }, // 8 MB limit for PDFs
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files (.pdf) are allowed for resume upload'));
    }
  },
});

// POST /api/upload (Admin - Images)
router.post('/', requireAdmin, uploadImage.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No image file provided' });
  }

  const base64 = req.file.buffer.toString('base64');
  const dataUri = `data:${req.file.mimetype};base64,${base64}`;

  res.json({
    url: dataUri,
    mimeType: req.file.mimetype,
    size: req.file.size,
  });
});

// POST /api/upload/resume (Admin - PDF Resume)
router.post('/resume', requireAdmin, uploadResume.single('resume'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No PDF file provided' });
  }

  const base64 = req.file.buffer.toString('base64');
  const dataUri = `data:application/pdf;base64,${base64}`;

  res.json({
    url: dataUri,
    fileName: req.file.originalname,
    size: req.file.size,
  });
});

export default router;
