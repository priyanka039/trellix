import express from 'express';
import { authenticateFirebase } from '../middleware/authMiddleware.js';
import Project from '../models/Project.js';

const router = express.Router();

router.get('/', authenticateFirebase, async (req, res) => {
  const projects = await Project.find({ members: req.user._id });
  res.json(projects);
});

router.post('/', authenticateFirebase, async (req, res) => {
  const { title, description } = req.body;
  const project = new Project({
    title,
    description,
    owner: req.user._id,
    members: [req.user._id]
  });
  await project.save();
  res.status(201).json(project);
});

export default router;