import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getDashboard } from '../services/dashboardService'
import DashboardStats from '../components/dashboard/DashboardStats'
import LoadingSpinner from '../components/common/LoadingSpinner'
import { timeAgo, truncate } from '../utils/helpers'

export default function DashboardPage() {
  const { user }                = useAuth()
  const navigate                = useNavigate()
  const [data, setData]         = useState(null)
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState('')

  useEffect(() => {
    getDashboard()
      .then(setData)
      .catch(() => setError('Failed to load dashboard'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-32 text-sm text-red-400">
        {error}
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Greeting */}
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Good day, {user?.name?.split(' ')[0]} 👋
        </h2>
        <p className="text-sm text-gray-500 mt-1">Here's an overview of your workspace.</p>
      </div>

      {/* Stats */}
      <DashboardStats data={data} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Notes */}
        <div className="lg:col-span-2 bg-[#1a1a1a] border border-[#242424] rounded-xl p-5">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-sm font-semibold text-gray-300">Recent Notes</h3>
            <button
              onClick={() => navigate('/notes')}
              className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              View all →
            </button>
          </div>

          {data?.recentNotes?.length === 0 ? (
            <div className="py-8 text-center text-sm text-gray-600">No notes yet</div>
          ) : (
            <div className="space-y-2">
              {data?.recentNotes?.map((note) => (
                <div
                  key={note._id}
                  onClick={() => navigate(`/notes/${note._id}`)}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 cursor-pointer transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors truncate">
                      {note.title || <span className="italic text-gray-600">Untitled</span>}
                    </p>
                    <p className="text-xs text-gray-600 mt-0.5 truncate">
                      {truncate(note.content, 60)}
                    </p>
                  </div>
                  <span className="text-[10px] text-gray-700 flex-shrink-0 mt-1">
                    {timeAgo(note.updatedAt)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Top Tags */}
        <div className="bg-[#1a1a1a] border border-[#242424] rounded-xl p-5">
          <h3 className="text-sm font-semibold text-gray-300 mb-5">Most Used Tags</h3>

          {data?.mostUsedTags?.length === 0 ? (
            <div className="py-8 text-center text-sm text-gray-600">No tags yet</div>
          ) : (
            <div className="space-y-3">
              {data?.mostUsedTags?.map((tag) => {
                const maxCount = data.mostUsedTags[0]?.count || 1
                const pct = Math.round((tag.count / maxCount) * 100)
                return (
                  <div key={tag._id}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-gray-400">#{tag._id}</span>
                      <span className="text-xs text-gray-600">{tag.count}</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#111] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={() => navigate('/notes/new')}
          className="flex items-center gap-4 p-5 bg-indigo-500/5 hover:bg-indigo-500/10 border border-indigo-500/15 rounded-xl transition-all group text-left"
        >
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500/30 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-200">New Note</p>
            <p className="text-xs text-gray-600 mt-0.5">Start writing something new</p>
          </div>
        </button>

        <button
          onClick={() => navigate('/notes')}
          className="flex items-center gap-4 p-5 bg-[#1a1a1a] hover:bg-[#1e1e1e] border border-[#242424] rounded-xl transition-all group text-left"
        >
          <div className="w-10 h-10 rounded-xl bg-[#111] border border-[#2a2a2a] flex items-center justify-center text-gray-500 group-hover:text-gray-300 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-200">Browse Notes</p>
            <p className="text-xs text-gray-600 mt-0.5">Search and filter your workspace</p>
          </div>
        </button>
      </div>
    </div>
  )
}
