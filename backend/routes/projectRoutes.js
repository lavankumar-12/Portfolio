import express from 'express';
import { Project } from '../models/Project.js';
import { requireAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

const parseArrayField = (val) => {
  if (Array.isArray(val)) return val.map((item) => String(item).trim()).filter(Boolean);
  if (typeof val === 'string') {
    return val
      .split(/[\n,]/)
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return [];
};

// GET /api/projects (Public: visible only; Admin: ?all=true returns all including hidden)
router.get('/', async (req, res) => {
  try {
    const includeHidden = req.query.all === 'true';
    const filter = includeHidden ? {} : { hidden: { $ne: true } };
    const [projects, totalCount] = await Promise.all([
      Project.find(filter).sort({ order: 1, createdAt: -1 }),
      Project.countDocuments(),
    ]);
    res.setHeader('X-Total-Count', String(totalCount));
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch projects', error: error.message });
  }
});

// POST /api/projects (Admin)
router.post('/', requireAdmin, async (req, res) => {
  try {
    const {
      title,
      subtitle,
      category,
      shortDescription,
      fullDescription,
      technologies,
      keyFeatures,
      architecture,
      image,
      githubUrl,
      liveDemoUrl,
      order,
    } = req.body;

    if (!title || !shortDescription) {
      return res.status(400).json({ message: 'Title and short description are required' });
    }

    const created = await Project.create({
      title: title.trim(),
      subtitle: subtitle?.trim() || '',
      category: category?.trim() || 'Full Stack Development',
      shortDescription: shortDescription.trim(),
      fullDescription: fullDescription?.trim() || shortDescription.trim(),
      technologies: parseArrayField(technologies),
      keyFeatures: Array.isArray(keyFeatures)
        ? keyFeatures.filter(Boolean)
        : String(keyFeatures || '')
            .split('\n')
            .map((l) => l.trim())
            .filter(Boolean),
      architecture: architecture?.trim() || '',
      image: image || '',
      githubUrl: githubUrl?.trim() || '',
      liveDemoUrl: liveDemoUrl?.trim() || '',
      order: Number(order) || 0,
    });

    res.status(201).json(created);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create project', error: error.message });
  }
});

// PUT /api/projects/:id (Admin)
router.put('/:id', requireAdmin, async (req, res) => {
  try {
    const payload = { ...req.body };
    if (payload.technologies !== undefined) {
      payload.technologies = parseArrayField(payload.technologies);
    }
    if (payload.keyFeatures !== undefined) {
      payload.keyFeatures = Array.isArray(payload.keyFeatures)
        ? payload.keyFeatures.filter(Boolean)
        : String(payload.keyFeatures || '')
            .split('\n')
            .map((l) => l.trim())
            .filter(Boolean);
    }

    const updated = await Project.findByIdAndUpdate(req.params.id, payload, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ message: 'Project not found' });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update project', error: error.message });
  }
});

// PATCH /api/projects/:id/visibility (Admin - toggle hide/show)
router.patch('/:id/visibility', requireAdmin, async (req, res) => {
  try {
    const item = await Project.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Project not found' });
    item.hidden =
      typeof req.body?.hidden === 'boolean' ? req.body.hidden : !Boolean(item.hidden);
    await item.save();
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: 'Failed to toggle project visibility', error: error.message });
  }
});

// DELETE /api/projects/:id (Admin)
router.delete('/:id', requireAdmin, async (req, res) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Project not found' });
    res.json({ message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete project', error: error.message });
  }
});

export default router;
