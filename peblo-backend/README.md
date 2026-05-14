# Peblo AI Notes Workspace Backend

A production-style backend for an AI-powered collaborative notes workspace built as part of the Peblo Full Stack Developer Challenge.

This backend provides:

- Authentication & authorization
- Notes CRUD system
- Search, filtering & sorting
- AI-powered note summarization
- Public note sharing
- Productivity analytics dashboard
- Modular scalable backend architecture

---

# Tech Stack

## Backend

- Node.js
- Express.js

## Database

- MongoDB
- Mongoose

## Authentication

- JWT (JSON Web Tokens)
- bcryptjs

## AI Integration

- OpenRouter API
- Free LLM models

## Other Packages

- express-async-handler
- dotenv
- cors
- cookie-parser
- nanoid

---

# Features

## Authentication System

- User signup
- User login
- JWT authentication
- Protected routes
- Password hashing using bcrypt

---

## Notes Workspace

- Create notes
- Update notes
- Archive notes
- Tag support
- Auto-ready architecture for autosave

---

## AI Integration

Generate:

- AI summaries
- Action items
- Suggested titles

AI generation is handled through a dedicated service layer for clean architecture.

---

## Search & Filtering

Supports:

- Keyword search
- Tag filtering
- Sorting by:
  - newest
  - oldest
  - title

---

## Public Sharing

Users can:

- Generate public share links
- Access shared notes without authentication

---

## Productivity Dashboard

Provides:

- Total notes count
- Recently edited notes
- Most-used tags
- AI usage statistics
- Weekly activity summary

---

# Folder Structure

```bash
src/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── authController.js
│   ├── noteController.js
│   └── dashboardController.js
│
├── middleware/
│   ├── authMiddleware.js
│   └── errorMiddleware.js
│
├── models/
│   ├── User.js
│   └── Note.js
│
├── routes/
│   ├── authRoutes.js
│   ├── noteRoutes.js
│   └── dashboardRoutes.js
│
├── services/
│   └── aiService.js
│
├── utils/
│   └── generateToken.js
│
└── server.js
```

---

# Architecture Explanation

## Controllers

Handle request/response logic.

Example:

- creating notes
- generating AI summaries
- dashboard aggregation

---

## Routes

Define API endpoints and connect them to controllers.

---

## Middleware

Used for:

- JWT authentication
- error handling
- route protection

---

## Services

Contains reusable business logic.

The AI integration is isolated inside:

```bash
services/aiService.js
```

This allows changing AI providers without affecting routes/controllers.

---

## Models

MongoDB schemas using Mongoose.

---

## Utils

Reusable helper functions such as JWT token generation.

---

# Database Schemas

## User Schema

```js
{
  name: String,
  email: String,
  password: String
}
```

---

## Note Schema

```js
{
  (user,
    title,
    content,
    tags,
    archived,
    isPublic,
    shareId,
    aiSummary,
    aiActionItems,
    aiSuggestedTitle);
}
```

---

# Environment Variables

Create a `.env` file in the root directory.

Example:

```env
PORT=5000

MONGO_URI=your_mongodb_connection

JWT_SECRET=your_secret

OPENROUTER_API_KEY=your_api_key
```

---

# Installation & Setup

## 1. Clone Repository

```bash
git clone YOUR_REPOSITORY_URL
```

---

## 2. Navigate Into Backend

```bash
cd peblo-backend
```

---

## 3. Install Dependencies

```bash
npm install
```

---

## 4. Setup Environment Variables

Create:

```bash
.env
```

Add required environment variables.

---

## 5. Start Development Server

```bash
npm run dev
```

---

# API Base URL

```bash
http://localhost:5000/api
```

---

# Authentication Routes

---

# Signup User

## Route

```http
POST /api/auth/signup
```

## Request Body

```json
{
  "name": "Arjun",
  "email": "arjun@test.com",
  "password": "123456"
}
```

## Example Response

```json
{
  "_id": "6644cfe...",
  "name": "Arjun",
  "email": "arjun@test.com",
  "token": "JWT_TOKEN"
}
```

---

# Login User

## Route

```http
POST /api/auth/login
```

## Request Body

```json
{
  "email": "arjun@test.com",
  "password": "123456"
}
```

## Example Response

```json
{
  "_id": "6644cfe...",
  "name": "Arjun",
  "email": "arjun@test.com",
  "token": "JWT_TOKEN"
}
```

---

# Get Current User

## Route

```http
GET /api/auth/me
```

## Headers

```http
Authorization: Bearer TOKEN
```

## Example Response

```json
{
  "_id": "6644cfe...",
  "name": "Arjun",
  "email": "arjun@test.com"
}
```

---

# Notes Routes

---

# Create Note

## Route

```http
POST /api/notes
```

## Headers

```http
Authorization: Bearer TOKEN
```

## Request Body

```json
{
  "title": "Project Planning",
  "content": "Need to finish backend APIs",
  "tags": ["backend", "work"]
}
```

## Example Response

```json
{
  "_id": "6644abc...",
  "title": "Project Planning",
  "content": "Need to finish backend APIs",
  "tags": ["backend", "work"]
}
```

---

# Get All Notes

## Route

```http
GET /api/notes
```

## Headers

```http
Authorization: Bearer TOKEN
```

## Example Response

```json
[
  {
    "_id": "6644abc...",
    "title": "Project Planning"
  }
]
```

---

# Get Single Note

## Route

```http
GET /api/notes/:id
```

## Headers

```http
Authorization: Bearer TOKEN
```

## Example Response

```json
{
  "_id": "6644abc...",
  "title": "Project Planning",
  "content": "Need to finish backend APIs"
}
```

---

# Update Note

## Route

```http
PATCH /api/notes/:id
```

## Headers

```http
Authorization: Bearer TOKEN
```

## Request Body

```json
{
  "title": "Updated Project Planning"
}
```

## Example Response

```json
{
  "_id": "6644abc...",
  "title": "Updated Project Planning"
}
```

---

# Archive Note

## Route

```http
DELETE /api/notes/:id
```

## Headers

```http
Authorization: Bearer TOKEN
```

## Example Response

```json
{
  "message": "Note archived"
}
```

---

# Search Notes

## Route

```http
GET /api/notes?search=backend
```

## Example Response

```json
[
  {
    "title": "Backend Planning"
  }
]
```

---

# Filter Notes By Tag

## Route

```http
GET /api/notes?tag=work
```

---

# Sort Notes

## Newest

```http
GET /api/notes
```

## Oldest

```http
GET /api/notes?sort=oldest
```

## Alphabetical

```http
GET /api/notes?sort=title
```

---

# AI Routes

---

# Generate AI Summary

## Route

```http
POST /api/notes/:id/ai
```

## Headers

```http
Authorization: Bearer TOKEN
```

## Example Response

```json
{
  "message": "AI insights generated",
  "summary": "Received a backend assignment from Peblo",
  "action_items": [],
  "suggested_title": "Backend Assignment from Peblo"
}
```

---

# Public Share Routes

---

# Generate Share Link

## Route

```http
POST /api/notes/:id/share
```

## Headers

```http
Authorization: Bearer TOKEN
```

## Example Response

```json
{
  "message": "Share link generated",
  "shareId": "abc123xyz",
  "publicUrl": "/shared/abc123xyz"
}
```

---

# Access Shared Note

## Route

```http
GET /api/notes/shared/:shareId
```

## Example Response

```json
{
  "_id": "6644abc...",
  "title": "Project Planning",
  "content": "Need to finish backend APIs"
}
```

---

# Dashboard Routes

---

# Get Dashboard Stats

## Route

```http
GET /api/dashboard
```

## Headers

```http
Authorization: Bearer TOKEN
```

## Example Response

```json
{
  "totalNotes": 8,

  "recentNotes": [],

  "mostUsedTags": [
    {
      "_id": "backend",
      "count": 5
    }
  ],

  "aiUsageCount": 3,

  "weeklyActivity": 6
}
```

---

# Error Handling

Centralized error handling middleware is implemented for:

- cleaner controllers
- consistent API responses
- production-style architecture

---

# Security Features

- JWT route protection
- Password hashing
- User-specific note ownership
- Protected private routes
- Public/private note separation

---

# Future Improvements

Potential future enhancements:

- Realtime collaboration
- Markdown editor
- Rich text editor
- WebSockets
- Role-based access
- Rate limiting
- Unit & integration tests
- Docker support
- CI/CD pipelines

---

# Author

Arjun Agnihotri
arjunagnihotri14a@gmail.com

Built for the Peblo Full Stack Developer Challenge.
