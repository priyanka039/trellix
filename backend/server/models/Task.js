import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  text: String,
  createdAt: { type: Date, default: Date.now }
});

const taskSchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  title: String,
  description: String,
  dueDate: Date,
  assignee: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: String,
  priority: { type: String, enum: ['Low', 'Medium', 'High'] },
  comments: [commentSchema]
}, { timestamps: true });

export default mongoose.model('Task', taskSchema);