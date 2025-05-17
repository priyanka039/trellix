import express from 'express';
import { authenticateFirebase } from '../middleware/authMiddleware.js';
import Notification from '../models/Notification.js';

const router = express.Router();

router.get('/', authenticateFirebase, async (req, res) => {
  const notifications = await Notification.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(notifications);
});

router.patch('/:id/read', authenticateFirebase, async (req, res) => {
  await Notification.findByIdAndUpdate(req.params.id, { read: true });
  res.json({ message: 'Marked as read' });
});

export default router;