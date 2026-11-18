import express from 'express';
import { Experience } from '../models/Experience.js';
import { requireAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET /api/experience (Public: visible only; Admin: ?all=true returns all including hidden)
router.get('/', async (req, res) => {
  try {
    const includeHidden = req.query.all === 'true';
    const filter = includeHidden ? {} : { hidden: { $ne: true } };
    const [items, totalCount] = await Promise.all([
      Experience.find(filter).sort({ order: 1, createdAt: -1 }),
      Experience.countDocuments(),
    ]);
    res.setHeader('X-Total-Count', String(totalCount));
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch experience', error: error.message });
  }
});

// POST /api/experience (Admin)
router.post('/', requireAdmin, async (req, res) => {
  try {
    const {
      organization,
      role,
      type,
      duration,
      location,
      responsibilities,
      technologies,
      learningOutcomes,
      order,
    } = req.body;

    if (!organization || !role || !duration) {
      return res.status(400).json({ message: 'Organization, role, and duration are required' });
    }

    const created = await Experience.create({
      organization: organization.trim(),
      role: role.trim(),
      type: type?.trim() || 'Internship',
      duration: duration.trim(),
      location: location?.trim() || 'Remote',
      responsibilities: Array.isArray(responsibilities)
        ? responsibilities.filter(Boolean)
        : String(responsibilities || '')
            .split('\n')
            .map((r) => r.trim())
            .filter(Boolean),
      technologies: Array.isArray(technologies)
        ? technologies.filter(Boolean)
        : String(technologies || '')
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean),
      learningOutcomes: learningOutcomes?.trim() || '',
      order: Number(order) || 0,
    });

    res.status(201).json(created);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create experience', error: error.message });
  }
});

// PUT /api/experience/:id (Admin)
router.put('/:id', requireAdmin, async (req, res) => {
  try {
    const payload = { ...req.body };
    if (payload.responsibilities !== undefined && !Array.isArray(payload.responsibilities)) {
      payload.responsibilities = String(payload.responsibilities || '')
        .split('\n')
        .map((r) => r.trim())
        .filter(Boolean);
    }
    if (payload.technologies !== undefined && !Array.isArray(payload.technologies)) {
      payload.technologies = String(payload.technologies || '')
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);
    }

    const updated = await Experience.findByIdAndUpdate(req.params.id, payload, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ message: 'Experience not found' });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update experience', error: error.message });
  }
});

// PATCH /api/experience/:id/visibility (Admin - toggle hide/show)
router.patch('/:id/visibility', requireAdmin, async (req, res) => {
  try {
    const item = await Experience.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Experience not found' });
    item.hidden =
      typeof req.body?.hidden === 'boolean' ? req.body.hidden : !Boolean(item.hidden);
    await item.save();
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: 'Failed to toggle experience visibility', error: error.message });
  }
});

// DELETE /api/experience/:id (Admin)
router.delete('/:id', requireAdmin, async (req, res) => {
  try {
    const deleted = await Experience.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Experience not found' });
    res.json({ message: 'Experience deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete experience', error: error.message });
  }
});

export default router;
