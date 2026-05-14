import { Routes, Route, Navigate } from 'react-router-dom'
import PrivateRoute from './routes/PrivateRoute'
import PublicRoute from './routes/PublicRoute'
import AppLayout from './layouts/AppLayout'

import LoginPage      from './pages/LoginPage'
import SignupPage     from './pages/SignupPage'
import DashboardPage  from './pages/DashboardPage'
import NotesPage      from './pages/NotesPage'
import NoteEditorPage from './pages/NoteEditorPage'
import SharedNotePage from './pages/SharedNotePage'
import NotFoundPage   from './pages/NotFoundPage'

export default function App() {
  return (
    <Routes>
      {/* Public auth routes */}
      <Route element={<PublicRoute />}>
        <Route path="/login"  element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Route>

      {/* Shared note — no auth needed */}
      <Route path="/shared/:shareId" element={<SharedNotePage />} />

      {/* Protected app routes */}
      <Route element={<PrivateRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/"          element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/notes"     element={<NotesPage />} />
          <Route path="/notes/new" element={<NoteEditorPage />} />
          <Route path="/notes/:id" element={<NoteEditorPage />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
