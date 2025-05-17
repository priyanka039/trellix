import express from 'express';
import { authenticateFirebase } from '../middleware/authMiddleware.js';
import Task from '../models/Task.js';

const router = express.Router();

router.get('/:projectId', authenticateFirebase, async (req, res) => {
  const tasks = await Task.find({ projectId: req.params.projectId });
  res.json(tasks);
});

router.post('/', authenticateFirebase, async (req, res) => {
  const { projectId, title, description, dueDate, assignee, priority } = req.body;
  const task = new Task({
    projectId,
    title,
    description,
    dueDate,
    assignee,
    priority,
    status: 'To Do'
  });
  await task.save();
  
  const { io } = await import('../app.js');
  io.to(task.projectId.toString()).emit('taskCreated', task);
  res.status(201).json(task);

});

router.patch('/:id', authenticateFirebase, async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('assignee');
  const automations = await import('../models/Automation.js');
  const Automation = automations.default;
  const users = await import('../models/User.js');
  const User = users.default;

  if (req.body.status) {
    const triggers = await Automation.find({ projectId: task.projectId, triggerType: 'statusChange', triggerValue: req.body.status });
    for (const rule of triggers) {
      if (rule.actionType === 'assignBadge' && task.assignee) {
        const user = await User.findById(task.assignee._id);
        if (!user.badges.includes(rule.actionValue)) {
          user.badges.push(rule.actionValue);
          await user.save();
        }
      }
    }
  }

  
  const { io } = await import('../app.js');
  io.to(task.projectId.toString()).emit('taskUpdated', task);
  res.json(task);

});

export default router;router.post('/:id/comments', authenticateFirebase, async (req, res) => {
  const { text } = req.body;
  const task = await Task.findById(req.params.id);
  task.comments.push({ user: req.user._id, text });
  await task.save();
  res.status(201).json(task.comments);
});