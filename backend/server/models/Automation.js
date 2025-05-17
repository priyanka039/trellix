import mongoose from 'mongoose';

const automationSchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  triggerType: String,     // 'statusChange', 'dueDate'
  triggerValue: String,    // e.g., 'Done'
  actionType: String,      // 'assignBadge'
  actionValue: String      // e.g., 'TaskMaster'
});

export default mongoose.model('Automation', automationSchema);