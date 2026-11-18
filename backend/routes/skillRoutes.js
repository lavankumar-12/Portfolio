import express from 'express';
import { Skill } from '../models/Skill.js';
import { requireAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET /api/skills (Public: visible only; Admin: ?all=true returns all including hidden)
router.get('/', async (req, res) => {
  try {
    const includeHidden = req.query.all === 'true';
    const filter = includeHidden ? {} : { hidden: { $ne: true } };
    const [skills, totalCount] = await Promise.all([
      Skill.find(filter).sort({ order: 1, createdAt: 1 }),
      Skill.countDocuments(),
    ]);
    res.setHeader('X-Total-Count', String(totalCount));
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch skills', error: error.message });
  }
});

// POST /api/skills (Admin)
router.post('/', requireAdmin, async (req, res) => {
  try {
    const { category, skills, order } = req.body;
    if (!category || !skills) {
      return res.status(400).json({ message: 'Category and skills list are required' });
    }
    const parsedSkills = Array.isArray(skills)
      ? skills.map((s) => s.trim()).filter(Boolean)
      : String(skills)
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean);

    const created = await Skill.create({
      category: category.trim(),
      skills: parsedSkills,
      order: Number(order) || 0,
    });
    res.status(201).json(created);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create skill category', error: error.message });
  }
});

// PUT /api/skills/:id (Admin)
router.put('/:id', requireAdmin, async (req, res) => {
  try {
    const { category, skills, order } = req.body;
    const parsedSkills = Array.isArray(skills)
      ? skills.map((s) => s.trim()).filter(Boolean)
      : String(skills || '')
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean);

    const updated = await Skill.findByIdAndUpdate(
      req.params.id,
      {
        category: category?.trim(),
        skills: parsedSkills,
        order: Number(order) || 0,
      },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: 'Skill category not found' });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update skill category', error: error.message });
  }
});

// PATCH /api/skills/:id/visibility (Admin - toggle hide/show)
router.patch('/:id/visibility', requireAdmin, async (req, res) => {
  try {
    const item = await Skill.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Skill category not found' });
    item.hidden =
      typeof req.body?.hidden === 'boolean' ? req.body.hidden : !Boolean(item.hidden);
    await item.save();
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: 'Failed to toggle skill visibility', error: error.message });
  }
});

// DELETE /api/skills/:id (Admin)
router.delete('/:id', requireAdmin, async (req, res) => {
  try {
    const deleted = await Skill.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Skill category not found' });
    res.json({ message: 'Skill category deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete skill category', error: error.message });
  }
});

export default router;
