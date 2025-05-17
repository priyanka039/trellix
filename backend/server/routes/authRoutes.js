import express from 'express';
import { authenticateFirebase } from '../middleware/authMiddleware.js';

const router = express.Router();

// Firebase login is handled via middleware
router.post('/login', (req, res) => {
  res.send({ message: 'Login handled via Firebase token middleware' });
});

// ✅ User info route (used for badges panel)
router.get('/user', authenticateFirebase, async (req, res) => {
  res.json({ name: req.user.name, email: req.user.email, badges: req.user.badges });
});

export default router;
