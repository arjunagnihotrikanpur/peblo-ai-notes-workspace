import { useState, useEffect } from 'react'
import { useParams, Link }     from 'react-router-dom'
import { getSharedNote }       from '../services/noteService'
import LoadingSpinner          from '../components/common/LoadingSpinner'
import { formatDate }          from '../utils/helpers'

export default function SharedNotePage() {
  const { shareId }             = useParams()
  const [note, setNote]         = useState(null)
  const [loading, setLoading]   = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    getSharedNote(shareId)
      .then(setNote)
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false))
  }, [shareId])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0d0d0d]">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (notFound) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0d0d0d] px-4 text-center">
        <div className="w-14 h-14 rounded-2xl bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center text-gray-600 mb-5">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-white mb-2">Note not found</h2>
        <p className="text-sm text-gray-500 mb-6">This link may have expired or been removed.</p>
        <Link to="/login" className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors">
          Go to Peblo →
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d] px-4 py-12">
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-500/3 rounded-full blur-3xl" />
      </div>

      <div className="max-w-2xl mx-auto relative animate-fade-in">
        {/* Brand bar */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/login" className="flex items-center gap-2 group">
            <div className="w-6 h-6 rounded-md bg-indigo-500 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-gray-400 group-hover:text-gray-200 transition-colors">Peblo</span>
          </Link>
          <span className="text-xs text-gray-700 bg-[#1a1a1a] border border-[#2a2a2a] px-2 py-1 rounded-full">
            Public note
          </span>
        </div>

        {/* Note content */}
        <article className="bg-[#1a1a1a] border border-[#242424] rounded-2xl p-8">
          {/* Tags */}
          {note.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-5">
              {note.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-2xl font-bold text-white mb-3 leading-snug">
            {note.title || <span className="text-gray-600 italic">Untitled</span>}
          </h1>

          {/* Meta */}
          <p className="text-xs text-gray-600 mb-8">
            {note.updatedAt ? `Updated ${formatDate(note.updatedAt, 'MMM d, yyyy · h:mm a')}` : ''}
          </p>

          {/* Content */}
          <div className="prose prose-invert prose-sm max-w-none">
            <pre className="whitespace-pre-wrap text-sm text-gray-300 leading-relaxed font-sans">
              {note.content || <span className="text-gray-600 italic">No content</span>}
            </pre>
          </div>

          {/* AI Summary */}
          {note.aiSummary && (
            <div className="mt-8 pt-8 border-t border-[#2a2a2a]">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-5 h-5 rounded bg-indigo-500/20 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="text-xs font-semibold text-indigo-300">AI Summary</span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">{note.aiSummary}</p>
            </div>
          )}
        </article>

        {/* CTA */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-600 mb-3">
            Want to create your own AI-powered notes?
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 px-5 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium rounded-lg transition-colors"
          >
            Get started free →
          </Link>
        </div>
      </div>
    </div>
  )
}
