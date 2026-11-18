import express from 'express';
import { CodingProfile } from '../models/CodingProfile.js';
import { requireAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

const parseFocus = (val) => {
  if (Array.isArray(val)) return val.map((s) => String(s).trim()).filter(Boolean);
  if (typeof val === 'string') {
    return val
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return [];
};

// GET /api/coding-profiles (Public: visible only; Admin: ?all=true returns all including hidden)
router.get('/', async (req, res) => {
  try {
    const includeHidden = req.query.all === 'true';
    const filter = includeHidden ? {} : { hidden: { $ne: true } };
    const [items, totalCount] = await Promise.all([
      CodingProfile.find(filter).sort({ order: 1, createdAt: 1 }),
      CodingProfile.countDocuments(),
    ]);
    res.setHeader('X-Total-Count', String(totalCount));
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch coding profiles', error: error.message });
  }
});

// POST /api/coding-profiles (Admin)
router.post('/', requireAdmin, async (req, res) => {
  try {
    const { platform, handle, url, tagline, description, icon, color, focus, order } = req.body;
    if (!platform || !url) {
      return res.status(400).json({ message: 'Platform name and profile URL are required' });
    }

    const created = await CodingProfile.create({
      platform: platform.trim(),
      handle: handle?.trim() || '',
      url: url.trim(),
      tagline: tagline?.trim() || '',
      description: description?.trim() || '',
      icon: icon?.trim() || 'Code2',
      color: color?.trim() || '#FF2E63',
      focus: parseFocus(focus),
      order: Number(order) || 0,
    });

    res.status(201).json(created);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create coding profile', error: error.message });
  }
});

// PUT /api/coding-profiles/:id (Admin)
router.put('/:id', requireAdmin, async (req, res) => {
  try {
    const payload = { ...req.body };
    if (payload.focus !== undefined) {
      payload.focus = parseFocus(payload.focus);
    }

    const updated = await CodingProfile.findByIdAndUpdate(req.params.id, payload, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ message: 'Coding profile not found' });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update coding profile', error: error.message });
  }
});

// PATCH /api/coding-profiles/:id/visibility (Admin - toggle hide/show)
router.patch('/:id/visibility', requireAdmin, async (req, res) => {
  try {
    const item = await CodingProfile.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Coding profile not found' });
    item.hidden =
      typeof req.body?.hidden === 'boolean' ? req.body.hidden : !Boolean(item.hidden);
    await item.save();
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: 'Failed to toggle visibility', error: error.message });
  }
});

// DELETE /api/coding-profiles/:id (Admin)
router.delete('/:id', requireAdmin, async (req, res) => {
  try {
    const deleted = await CodingProfile.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Coding profile not found' });
    res.json({ message: 'Coding profile deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete coding profile', error: error.message });
  }
});

export default router;
