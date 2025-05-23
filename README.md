# 🧠 Trellix – TaskBoard Pro

A full-featured, open-source Kanban task management app built using the **MERN stack** with real-time updates, Firebase authentication, workflow automations, and a modern gradient UI.

---

Features

- 🔐Google Authentication (Firebase)
- 🗂️ Project Management
  - Create projects
  - Invite team members
  - Access control for project data
-  Task Management
  - Kanban board with drag & drop
  - Task assignee, due date, and status
  - Custom statuses per project (optional)
- Workflow Automation
  - Automations like:
    - When task moved to Done → assign badge
    - When assigned to a user → move to In Progress
    - When due date passes → send notification
- Comments on tasks
- User Badges for completed tasks
- Real-Time Updates with WebSockets (Socket.IO)
- Responsive Gradient UI (light/dark support)

---

## 🛠️ Tech Stack

| Layer        | Technology                       |
|--------------|----------------------------------|
| Frontend     | React + Vite + Tailwind CSS      |
| Backend      | Node.js + Express.js             |
| Auth         | Firebase Google OAuth            |
| Real-Time    | Socket.IO                        |
| Database     | MongoDB (via Mongoose)           |
| Scheduling   | node-cron                        |

---

Real-Time Features
Task creation/update is synced live across clients
Socket.IO used for real-time communication
Frontend subscribes to project room on login

📌 Database Models
User: name, email, badges, firebaseId
Project: title, description, owner, members[]
Task: title, description, status, dueDate, assignee, project
Automation: trigger, condition, action, project
Comment: taskId, text, author, timestamp
Notification: user, message, task, read

✅ To Do / Improvements
 Deadline notifications (cron)
 Comment editing/deletion
 Export tasks as CSV
 Role-based permissions (admin/member)

