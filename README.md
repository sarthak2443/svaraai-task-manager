# SvaraAI: Task & Project Management System

A full-stack Task & Project Management System built as part of the **SvaraAI Full Stack Developer Assignment**.  
The application focuses on clean architecture, modular code, and a modern, responsive UI.

---
## Live Demo
Frontend: https://<vercel-app>.vercel.app  
Backend: https://svaraai-task-manager.onrender.com

### Frontend
- Next.js 16 (App Router)
- React.js
- Tailwind CSS v4
- Render (Backend)

### Backend
- Node.js
- Express.js
- MongoDB (Atlas)
- JWT Authentication
- Vercel (Frontend)

---

## ✨ Features

### Authentication
- User Signup & Login
- JWT-based authentication
- Protected routes

### Projects
- Create projects
- List projects
- Project-wise navigation

### Tasks & Kanban Board
- Create tasks with priority
- Kanban-style board with columns:
  - Todo
  - In Progress
  - Done
- Update task status directly from board
- Color-coded priorities (High / Medium / Low)

### Dashboard
- Total projects count
- Tasks grouped by status
- Overview of task progress

---

## 🧱 Architecture

### Backend (Clean Architecture)
- **Controllers** – Handle HTTP requests
- **Services** – Business logic
- **Repositories** – Database interactions
- **Middlewares** – Authentication & validation

### Frontend
- App Router structure (`/app`)
- Reusable UI components
- Centralized API helper
- Client-only rendering for highly interactive pages (Kanban, Auth) to avoid hydration issues

---

## ⚙️ Setup Instructions

### Backend Setup
```bash
cd backend
npm install
npm run dev
