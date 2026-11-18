import express from 'express';
import { Certificate } from '../models/Certificate.js';
import { requireAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET /api/certificates (Public: visible only; Admin: ?all=true returns all including hidden)
router.get('/', async (req, res) => {
  try {
    const includeHidden = req.query.all === 'true';
    const filter = includeHidden ? {} : { hidden: { $ne: true } };
    const [items, totalCount] = await Promise.all([
      Certificate.find(filter).sort({ order: 1, createdAt: -1 }),
      Certificate.countDocuments(),
    ]);
    res.setHeader('X-Total-Count', String(totalCount));
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch certificates', error: error.message });
  }
});

// POST /api/certificates (Admin)
router.post('/', requireAdmin, async (req, res) => {
  try {
    const {
      title,
      issuer,
      score,
      badgeText,
      date,
      credentialId,
      previewImage,
      skills,
      description,
      order,
    } = req.body;

    if (!title || !issuer) {
      return res.status(400).json({ message: 'Title and issuer are required' });
    }

    const created = await Certificate.create({
      title: title.trim(),
      issuer: issuer.trim(),
      score: score?.trim() || 'Verified Certificate',
      badgeText: badgeText?.trim() || 'Certified',
      date: date?.trim() || '',
      credentialId: credentialId?.trim() || '',
      previewImage: previewImage || '',
      skills: Array.isArray(skills)
        ? skills.filter(Boolean)
        : String(skills || '')
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean),
      description: description?.trim() || '',
      order: Number(order) || 0,
    });

    res.status(201).json(created);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create certificate', error: error.message });
  }
});

// PUT /api/certificates/:id (Admin)
router.put('/:id', requireAdmin, async (req, res) => {
  try {
    const payload = { ...req.body };
    if (payload.skills !== undefined && !Array.isArray(payload.skills)) {
      payload.skills = String(payload.skills || '')
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
    }

    const updated = await Certificate.findByIdAndUpdate(req.params.id, payload, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ message: 'Certificate not found' });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update certificate', error: error.message });
  }
});

// PATCH /api/certificates/:id/visibility (Admin - toggle hide/show)
router.patch('/:id/visibility', requireAdmin, async (req, res) => {
  try {
    const item = await Certificate.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Certificate not found' });
    item.hidden =
      typeof req.body?.hidden === 'boolean' ? req.body.hidden : !Boolean(item.hidden);
    await item.save();
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: 'Failed to toggle certificate visibility', error: error.message });
  }
});

// DELETE /api/certificates/:id (Admin)
router.delete('/:id', requireAdmin, async (req, res) => {
  try {
    const deleted = await Certificate.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Certificate not found' });
    res.json({ message: 'Certificate deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete certificate', error: error.message });
  }
});

export default router;
