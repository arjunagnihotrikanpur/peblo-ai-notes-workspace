# Peblo AI Notes Workspace Frontend

A modern SaaS-style frontend for the Peblo AI Notes Workspace built using React, Vite, and TailwindCSS.

This frontend provides:

- Authentication flows
- Protected dashboard experience
- Notes management workspace
- AI-powered note insights
- Public note sharing
- Productivity analytics dashboard
- Responsive modern UI

---

# Tech Stack

## Core Frontend

- ReactJS (Vite)
- TailwindCSS
- React Router DOM
- Axios

## State Management

- React Context API

## API Communication

- Axios instance with:
  - JWT token interceptors
  - automatic auth header injection
  - automatic 401 redirect handling

---

# Features

## Authentication

- User signup
- User login
- Persistent authentication
- Protected routes
- Public route handling

---

## Notes Workspace

- Create notes
- Edit notes
- Archive notes
- Tag management
- Search/filter/sort
- Responsive notes grid

---

## AI Features

- Generate AI summaries
- View action items
- Suggested title support
- Apply AI-generated titles

---

## Dashboard

Displays:

- Total notes
- AI usage statistics
- Weekly activity
- Most-used tags
- Recent notes
- Tag visualization chart

---

## Public Sharing

- Public read-only note pages
- Shareable URLs
- No authentication required for public notes

---

# Frontend Architecture

The frontend is organized using a modular scalable structure.

```bash
src/
├── api/axios.js
├── context/AuthContext.jsx
├── services/
├── hooks/
├── routes/
├── layouts/
├── components/
└── pages/
```

---

# Folder Structure Explanation

## api/

### axios.js

Centralized Axios instance.

Responsibilities:

- base API URL
- JWT interceptor
- automatic Authorization headers
- automatic redirect on expired sessions

---

## context/

### AuthContext.jsx

Global authentication state management.

Handles:

- login
- signup
- logout
- token persistence
- current user state

---

## services/

Contains all API request logic.

Examples:

- authService
- noteService
- dashboardService

Separates API logic from UI components.

---

## hooks/

### useNotes.js

Custom hook for:

- notes fetching
- searching
- filtering
- sorting
- debounced search

### useDebounce.js

Reusable debouncing hook for optimized search UX.

---

## routes/

### PrivateRoute.jsx

Protects authenticated routes.

Redirects unauthenticated users to:

```bash
/login
```

---

### PublicRoute.jsx

Prevents authenticated users from accessing auth pages.

Redirects logged-in users to:

```bash
/dashboard
```

---

## layouts/

### AppLayout.jsx

Main application shell.

Contains:

- responsive sidebar
- mobile layout
- page container
- navigation structure

---

# Components

---

## Layout Components

### Sidebar.jsx

Features:

- navigation links
- new note button
- user profile footer
- logout action

---

### Navbar.jsx

Features:

- mobile hamburger menu
- page title
- quick actions

---

# Notes Components

---

### NoteCard.jsx

Displays:

- note title
- tags
- AI badge
- hover archive actions

---

### NotesList.jsx

Responsive notes grid with:

- loading states
- empty states
- dynamic rendering

---

### SearchBar.jsx

Supports:

- keyword search
- tag filtering
- sorting selector

---

### TagInput.jsx

Features:

- enter/comma tag creation
- backspace removal
- interactive tag UX

---

### EditorToolbar.jsx

Actions:

- save note
- AI insights generation
- share note
- navigation

---

# AI Components

---

### AIInsightsPanel.jsx

Displays:

- AI summary
- extracted action items
- suggested title
- apply-title functionality

---

# Dashboard Components

---

### DashboardStats.jsx

Displays stat cards for:

- total notes
- AI usage
- weekly activity
- top tags

---

# Common Components

---

### LoadingSpinner.jsx

Reusable loading state UI.

---

### EmptyState.jsx

Reusable empty state component.

---

# Pages

---

## LoginPage

Features:

- login form
- validation
- error handling
- animated glow background

---

## SignupPage

Features:

- account creation
- validation
- responsive auth UI

---

## DashboardPage

Displays:

- stats cards
- recent notes
- top tags chart
- activity overview

---

## NotesPage

Features:

- full notes listing
- search/filter/sort
- responsive grid

---

## NoteEditorPage

Features:

- create/edit note
- AI generation
- sharing
- autosave-ready architecture
- keyboard shortcut support

---

## SharedNotePage

Public read-only note view.

No authentication required.

---

## NotFoundPage

Custom 404 page.

---

# Setup Instructions

## 1. Clone Repository

```bash
git clone YOUR_REPOSITORY_URL
```

---

## 2. Navigate Into Frontend

```bash
cd frontend
```

---

## 3. Install Dependencies

```bash
npm install
```

---

## 4. Configure Environment Variables

Create:

```bash
.env
```

Add:

```env
VITE_API_URL=http://localhost:5000/api
```

---

## 5. Start Development Server

```bash
npm run dev
```

---

# Build For Production

```bash
npm run build
```

---

# Run Production Preview

```bash
npm run preview
```

---

# Authentication Flow

1. User logs in/signup
2. JWT token stored
3. Axios interceptor attaches token automatically
4. Protected routes validate auth state
5. Expired sessions redirect to login

---

# API Integration

The frontend communicates with the backend using centralized services.

Examples:

- authService.js
- noteService.js
- dashboardService.js

This keeps:

- UI cleaner
- logic reusable
- architecture scalable

---

# UI / UX Highlights

- Modern SaaS-inspired design
- Responsive layout
- Dark mode styling
- Smooth spacing & hierarchy
- Loading states
- Empty states
- Interactive note management
- Optimized search UX

---

# Future Improvements

Potential future enhancements:

- Real-time collaboration
- Markdown support
- Rich text editor
- WebSocket syncing
- Offline support
- Drag-and-drop organization
- Role-based permissions
- Notifications system
- Theme customization

---

# Backend Compatibility

Designed to work with the Peblo AI Notes Workspace backend.

Supports:

- JWT authentication
- AI endpoints
- Dashboard analytics
- Public sharing APIs

---

# Author

Arjun Agnihotri
arjunagnihotri14a@gmail.com

Built for the Peblo Full Stack Developer Challenge.

Frontend developed using ReactJS + TailwindCSS with a modern scalable architecture.
