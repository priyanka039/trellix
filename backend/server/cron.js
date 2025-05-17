import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import Task from './models/Task.js';
import Notification from './models/Notification.js';

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const overdueTasks = await Task.find({
    dueDate: { $lt: new Date() },
    status: { $ne: 'Done' }
  });

  for (const task of overdueTasks) {
    if (task.assignee) {
      await Notification.create({
        user: task.assignee,
        message: `Task "${task.title}" is overdue!`
      });
    }
  }

  console.log('Checked for overdue tasks.');
  process.exit();
});