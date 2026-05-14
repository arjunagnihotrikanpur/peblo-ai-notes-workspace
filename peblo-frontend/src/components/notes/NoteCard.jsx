import { useNavigate } from 'react-router-dom'
import { timeAgo, truncate } from '../../utils/helpers'

export default function NoteCard({ note, onArchive }) {
  const navigate = useNavigate()

  const handleArchive = (e) => {
    e.stopPropagation()
    onArchive(note._id)
  }

  return (
    <div
      onClick={() => navigate(`/notes/${note._id}`)}
      className="group relative bg-[#1a1a1a] border border-[#242424] hover:border-[#333] rounded-xl p-5 cursor-pointer transition-all duration-150 hover:bg-[#1e1e1e] animate-fade-in"
    >
      {/* Archive button */}
      <button
        onClick={handleArchive}
        title="Archive note"
        className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 p-1.5 text-gray-600 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all duration-150"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
        </svg>
      </button>

      {/* AI badge */}
      {note.aiSummary && (
        <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 rounded-full px-2 py-0.5 mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          AI Enhanced
        </span>
      )}

      {/* Title */}
      <h3 className="text-sm font-semibold text-gray-200 mb-2 pr-6 leading-snug line-clamp-2">
        {note.title || <span className="text-gray-600 italic">Untitled</span>}
      </h3>

      {/* Content preview */}
      {note.content && (
        <p className="text-xs text-gray-500 mb-4 leading-relaxed line-clamp-3">
          {truncate(note.content, 140)}
        </p>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between gap-2 mt-auto">
        {/* Tags */}
        <div className="flex flex-wrap gap-1 flex-1 min-w-0">
          {note.tags?.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-indigo-500/10 text-indigo-400"
            >
              #{tag}
            </span>
          ))}
          {note.tags?.length > 3 && (
            <span className="text-[10px] text-gray-600">+{note.tags.length - 3}</span>
          )}
        </div>

        {/* Time */}
        <span className="text-[10px] text-gray-700 flex-shrink-0">
          {timeAgo(note.updatedAt)}
        </span>
      </div>
    </div>
  )
}
