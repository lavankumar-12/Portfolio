import express from 'express';
import { Message } from '../models/Message.js';
import { requireAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// POST /api/messages (Public - from Contact Form)
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const created = await Message.create({
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
    });
    res.status(201).json({ message: 'Message saved successfully', data: created });
  } catch (error) {
    res.status(500).json({ message: 'Failed to save message', error: error.message });
  }
});

// GET /api/messages (Admin)
router.get('/', requireAdmin, async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch messages', error: error.message });
  }
});

// PATCH /api/messages/:id/read (Admin)
router.patch('/:id/read', requireAdmin, async (req, res) => {
  try {
    const updated = await Message.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Message not found' });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update message', error: error.message });
  }
});

// DELETE /api/messages/:id (Admin)
router.delete('/:id', requireAdmin, async (req, res) => {
  try {
    const deleted = await Message.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Message not found' });
    res.json({ message: 'Message deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete message', error: error.message });
  }
});

export default router;
