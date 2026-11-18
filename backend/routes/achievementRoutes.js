import express from 'express';
import { Achievement } from '../models/Achievement.js';
import { requireAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET /api/achievements (Public: visible only; Admin: ?all=true returns all including hidden)
router.get('/', async (req, res) => {
  try {
    const includeHidden = req.query.all === 'true';
    const filter = includeHidden ? {} : { hidden: { $ne: true } };
    const [items, totalCount] = await Promise.all([
      Achievement.find(filter).sort({ order: 1, createdAt: -1 }),
      Achievement.countDocuments(),
    ]);
    res.setHeader('X-Total-Count', String(totalCount));
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch achievements', error: error.message });
  }
});

// POST /api/achievements (Admin)
router.post('/', requireAdmin, async (req, res) => {
  try {
    const { title, category, iconName, metric, subtitle, description, tag, order } = req.body;
    if (!title || !metric || !description) {
      return res.status(400).json({ message: 'Title, metric, and description are required' });
    }
    const created = await Achievement.create({
      title: title.trim(),
      category: category?.trim() || 'Milestone',
      iconName: iconName?.trim() || 'Award',
      metric: metric.trim(),
      subtitle: subtitle?.trim() || '',
      description: description.trim(),
      tag: tag?.trim() || 'Highlight',
      order: Number(order) || 0,
    });
    res.status(201).json(created);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create achievement', error: error.message });
  }
});

// PUT /api/achievements/:id (Admin)
router.put('/:id', requireAdmin, async (req, res) => {
  try {
    const updated = await Achievement.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ message: 'Achievement not found' });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update achievement', error: error.message });
  }
});

// PATCH /api/achievements/:id/visibility (Admin - toggle hide/show)
router.patch('/:id/visibility', requireAdmin, async (req, res) => {
  try {
    const item = await Achievement.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Achievement not found' });
    item.hidden =
      typeof req.body?.hidden === 'boolean' ? req.body.hidden : !Boolean(item.hidden);
    await item.save();
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: 'Failed to toggle achievement visibility', error: error.message });
  }
});

// DELETE /api/achievements/:id (Admin)
router.delete('/:id', requireAdmin, async (req, res) => {
  try {
    const deleted = await Achievement.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Achievement not found' });
    res.json({ message: 'Achievement deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete achievement', error: error.message });
  }
});

export default router;
