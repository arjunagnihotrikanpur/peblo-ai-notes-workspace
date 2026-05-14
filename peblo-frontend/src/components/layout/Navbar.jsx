import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const PAGE_TITLES = {
  '/dashboard': 'Dashboard',
  '/notes':     'My Notes',
  '/notes/new': 'New Note',
}

function getTitle(pathname) {
  if (PAGE_TITLES[pathname]) return PAGE_TITLES[pathname]
  if (pathname.startsWith('/notes/')) return 'Edit Note'
  return 'Peblo'
}

export default function Navbar({ onMenuClick }) {
  const { pathname } = useLocation()
  const navigate     = useNavigate()
  const { logout }   = useAuth()

  return (
    <header className="flex items-center justify-between h-14 px-5 border-b border-[#1f1f1f] bg-[#111111] flex-shrink-0">
      {/* Left: hamburger + page title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-1.5 text-gray-500 hover:text-gray-300 rounded-lg hover:bg-white/5 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h1 className="text-sm font-semibold text-gray-200">{getTitle(pathname)}</h1>
      </div>

      {/* Right: actions */}
      <div className="flex items-center gap-2">
        {pathname === '/notes' && (
          <button
            onClick={() => navigate('/notes/new')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-medium rounded-lg transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            New Note
          </button>
        )}
        <button
          onClick={logout}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs text-gray-500 hover:text-red-400 hover:bg-red-400/5 rounded-lg transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Log out
        </button>
      </div>
    </header>
  )
}
