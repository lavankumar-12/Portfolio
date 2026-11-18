import express from 'express';
import { Profile } from '../models/Profile.js';
import { requireAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET /api/profile (Public - Fast lightweight payload without raw PDF base64)
router.get('/', async (req, res) => {
  try {
    const includeResume = req.query.includeResume === 'true';

    if (includeResume) {
      const fullProfile = await Profile.findOne({ singletonKey: 'main_profile' }).lean();
      return res.json(fullProfile || {});
    }

    const doc = await Profile.findOne({ singletonKey: 'main_profile' })
      .select('-resumeData')
      .lean();

    if (!doc) return res.json({});

    // Lightweight existence check for custom uploaded resume without pulling the full PDF blob
    const hasResumeDoc = await Profile.exists({
      singletonKey: 'main_profile',
      resumeData: { $exists: true, $ne: '' },
    });

    res.set('Cache-Control', 'public, max-age=60, stale-while-revalidate=300');
    res.json({
      ...doc,
      hasCustomResume: Boolean(hasResumeDoc),
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch profile', error: error.message });
  }
});

// GET /api/profile/resume (Public - Streams uploaded PDF binary directly)
router.get('/resume', async (req, res) => {
  try {
    const doc = await Profile.findOne({ singletonKey: 'main_profile' })
      .select('resumeData resumeFileName')
      .lean();

    if (!doc || !doc.resumeData) {
      return res.status(404).json({ message: 'No custom resume uploaded yet' });
    }

    const base64Part = doc.resumeData.includes(',')
      ? doc.resumeData.split(',')[1]
      : doc.resumeData;
    const pdfBuffer = Buffer.from(base64Part, 'base64');
    const fileName = (doc.resumeFileName || 'Lavan_Kumar_Resume.pdf').replace(/["\r\n]/g, '');

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `${req.query.download === '1' ? 'attachment' : 'inline'}; filename="${fileName}"`
    );
    res.setHeader('Cache-Control', 'public, max-age=300');
    res.send(pdfBuffer);
  } catch (error) {
    res.status(500).json({ message: 'Failed to serve resume PDF', error: error.message });
  }
});

// PUT /api/profile (Admin)
router.put('/', requireAdmin, async (req, res) => {
  try {
    const allowedFields = [
      'name',
      'title',
      'smallIntro',
      'status',
      'location',
      'educationBadge',
      'college',
      'heroDescription',
      'aboutBio',
      'profilePhoto',
      'specialtyText',
      'highlightMetric',
      'highlightLabel',
      'highlightSubtitle',
      'github',
      'linkedin',
      'email',
      'resumeData',
      'resumeFileName',
      'resumeLastUpdated',
    ];

    const updates = { singletonKey: 'main_profile' };
    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] =
          typeof req.body[field] === 'string' &&
          field !== 'profilePhoto' &&
          field !== 'resumeData'
            ? req.body[field].trim()
            : req.body[field];
      }
    }

    const updated = await Profile.findOneAndUpdate(
      { singletonKey: 'main_profile' },
      { $set: updates },
      { new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update profile', error: error.message });
  }
});

export default router;
