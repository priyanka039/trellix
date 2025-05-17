import admin from '../utils/firebaseAdmin.js';
import User from '../models/User.js';

export const authenticateFirebase = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    let user = await User.findOne({ email: decoded.email });
    if (!user) {
      user = await User.create({ name: decoded.name || 'No Name', email: decoded.email });
    }
    req.user = user;
    next();
  } catch (err) {
    console.error('Auth error:', err);
    res.status(401).json({ message: 'Invalid token' });
  }
};