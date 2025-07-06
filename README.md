
📝 Full Stack To-Do Application

This is a full-stack to-do task management application built as part of the Senior Full Stack Engineer Take Home Assessment. It allows users to create and manage to-do tasks via a simple web interface. The system is composed of three components:

- ✅ Frontend: React.js
- ✅ Backend: Node.js with Express
- ✅ Database: PostgreSQL
- ✅ Dockerized deployment using docker-compose


🚀 Features

- Add new tasks with title and description
- View the 5 most recent uncompleted tasks
- Mark tasks as "Done" to remove them from view
- Fully containerized using Docker
- Unit tests for frontend and backend
- Clean, minimal UI


📦 Project Structure

.
├── frontend/         React frontend app
├── backend/          Express backend app
├── docker-compose.yml
└── README.txt


🛠️ Tech Stack

Layer      | Technology
-----------|---------------------
Frontend   | React, HTML/CSS
Backend    | Node.js, Express.js
Database   | PostgreSQL
Deployment | Docker, Docker Compose
Testing    | Jest, React Testing Library, Supertest


🧪 Testing

Frontend Unit Tests

- Located in frontend/src/__tests__/
- Uses React Testing Library + Jest
- Run with:

  cd frontend
  npm install
  npm test

Backend Unit Tests

- Located in backend/tests/
- Uses Jest + Supertest
- Run with:

  cd backend
  npm install
  npm test

⚙️ Setup Instructions

🔧 Prerequisites

- Docker
- Docker Compose

📦 Build & Run the App

1. Clone the repository:

   git clone https://github.com/your-username/fullstack-todo-app.git
   cd fullstack-todo-app

2. Start all services using Docker Compose:

   docker-compose up --build

3. Access the app at:
   - http://localhost:3000 (Frontend)
   - http://localhost:5000 (Backend API)


🧱 Database Schema

The database contains a single table: task

Column      | Type      | Description
------------|-----------|--------------------------
id          | UUID      | Primary Key
title       | TEXT      | Task title
description | TEXT      | Task description
completed   | BOOLEAN   | Completion status
created_at  | TIMESTAMP | Task creation timestamp


✅ Endpoints (Backend API)

Method | Endpoint     | Description
--------|--------------|-----------------------
GET    | /tasks       | Get 5 latest tasks
POST   | /tasks       | Add a new task
PATCH  | /tasks/:id   | Mark task as complete



