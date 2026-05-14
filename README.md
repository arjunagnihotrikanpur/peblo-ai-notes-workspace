# Peblo AI Notes Workspace

A full-stack AI-powered collaborative notes workspace built for the Peblo Full Stack Developer Challenge.

This project combines:

- modern SaaS-style frontend architecture
- scalable Node.js backend architecture
- AI-powered note summarization
- public sharing
- productivity analytics
- JWT authentication

The application allows users to create, organize, search, summarize, and share notes through a modern responsive interface.

---

# Live Demo

## Frontend

```bash
https://peblo-ai-notes-workspace-owbmdwg21.vercel.app/login
```

## Backend API

```bash
https://peblo-ai-notes-workspace.onrender.com/api
```

---

# Tech Stack

## Frontend

- ReactJS (Vite)
- TailwindCSS
- React Router DOM
- Axios
- Context API

---

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

---

## AI Integration

- OpenRouter API
- Free/Open LLM models

---

# Features

## Authentication

- User signup
- User login
- JWT authentication
- Protected routes
- Persistent sessions

---

## Notes Workspace

- Create notes
- Edit notes
- Archive notes
- Tag support
- Search/filter/sort
- Responsive note management UI

---

## AI Features

Generate:

- AI summaries
- Action items
- Suggested titles

---

## Public Sharing

- Generate public note links
- Public read-only notes
- No authentication required for shared pages

---

## Productivity Dashboard

Displays:

- Total notes
- Recently edited notes
- Most-used tags
- Weekly activity
- AI usage statistics

---

# Project Structure

```bash
codebase/
│
├── peblo-backend/
│   ├── src/
│   ├── README.md
│   └── package.json
│
├── peblo-frontend/
│   ├── src/
│   ├── README.md
│   └── package.json
│
├── .gitignore
└── README.md
```

---

# Backend Architecture Overview

The backend follows a modular production-style architecture.

Structure includes:

- controllers
- middleware
- services
- models
- routes
- centralized error handling

Key backend features:

- JWT auth middleware
- AI service abstraction
- MongoDB aggregation pipelines
- protected/public route separation

Detailed backend documentation:

```bash
./peblo-backend/README.md
```

---

# Frontend Architecture Overview

The frontend follows a scalable component-based structure.

Includes:

- protected routing
- reusable components
- centralized API handling
- custom hooks
- responsive SaaS UI
- modular layouts

Detailed frontend documentation:

```bash
./peblo-frontend/README.md
```

---

# Setup Instructions

# 1. Clone Repository

```bash
git clone https://github.com/arjunagnihotrikanpur/peblo-ai-notes-workspace
```

---

# 2. Navigate Into Project

```bash
cd codebase
```

---

# Backend Setup

## Navigate Into Backend

```bash
cd peblo-backend
```

---

## Install Dependencies

```bash
npm install
```

---

## Configure Environment Variables

Create:

```bash
.env
```

Add:

```env
PORT=5000

MONGO_URI=

JWT_SECRET=

OPENROUTER_API_KEY=
```

---

## Start Backend

```bash
npm run dev
```

Backend runs on:

```bash
http://localhost:5000
```

---

# Frontend Setup

## Navigate Into Frontend

```bash
cd peblo-frontend
```

---

## Install Dependencies

```bash
npm install
```

---

## Configure Environment Variables

Create:

```bash
.env
```

Add:

```env
VITE_API_URL=http://localhost:5000/api
```

---

## Start Frontend

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# Production Deployment

## Recommended Deployment Stack

| Layer    | Platform      |
| -------- | ------------- |
| Frontend | Vercel        |
| Backend  | Render        |
| Database | MongoDB Atlas |

---

# API Documentation

Complete API route documentation is available in:

```bash
./peblo-backend/README.md
```

Includes:

- request examples
- response examples
- headers
- authentication
- route descriptions

---

# Frontend Documentation

Frontend architecture and component documentation available in:

```bash
./peblo-frontend/README.md
```

---

# Screenshots

Screenshots Provided in the Repo:

- Login page
- Dashboard
- Notes page
- Editor page
- AI insights panel
- Public shared note page

---

# Demo Video

demo video link

Recommended flow:

1. Authentication
2. Notes CRUD
3. Search/filter
4. AI generation
5. Public sharing
6. Dashboard analytics
7. Architecture overview

---

# Engineering Highlights

## Backend

- Modular architecture
- Service-layer AI integration
- JWT authentication
- Centralized error handling
- MongoDB aggregation pipelines

---

## Frontend

- Responsive SaaS-style UI
- Protected routing
- Custom hooks
- Centralized Axios configuration
- Reusable component architecture

---

# Future Improvements

Potential future enhancements:

- Real-time collaboration
- Rich text editor
- Markdown support
- WebSockets
- Notifications
- Offline support
- Docker deployment
- CI/CD pipelines
- Automated testing

---

# Author

Arjun Agnihotri
arjunagnihotri14a@gmail.com

Built for the Peblo Full Stack Developer Challenge.

Full-stack application developed using:

- ReactJS
- TailwindCSS
- Node.js
- Express.js
- MongoDB
