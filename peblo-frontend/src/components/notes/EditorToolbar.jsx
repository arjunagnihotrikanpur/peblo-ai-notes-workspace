import { useNavigate } from 'react-router-dom'

export default function EditorToolbar({
  isNew,
  isSaving,
  onSave,
  onGenerateAI,
  onShare,
  aiLoading,
  shareLoading,
  shareUrl,
  onCopyShare,
}) {
  const navigate = useNavigate()

  return (
    <div className="flex items-center justify-between gap-3 flex-wrap">
      {/* Back */}
      <button
        onClick={() => navigate('/notes')}
        className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-300 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        All Notes
      </button>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {/* Share */}
        {!isNew && (
          <>
            {shareUrl ? (
              <button
                onClick={onCopyShare}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium rounded-lg hover:bg-emerald-500/20 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy Link
              </button>
            ) : (
              <button
                onClick={onShare}
                disabled={shareLoading}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1a1a1a] border border-[#2a2a2a] text-gray-400 text-xs font-medium rounded-lg hover:bg-[#222] hover:text-gray-200 transition-colors disabled:opacity-50"
              >
                {shareLoading ? (
                  <div className="w-3.5 h-3.5 border border-gray-500 border-t-gray-300 rounded-full animate-spin" />
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                )}
                Share
              </button>
            )}

            {/* AI */}
            <button
              onClick={onGenerateAI}
              disabled={aiLoading}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium rounded-lg hover:bg-indigo-500/20 transition-colors disabled:opacity-50"
            >
              {aiLoading ? (
                <div className="w-3.5 h-3.5 border border-indigo-500/40 border-t-indigo-400 rounded-full animate-spin" />
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              )}
              {aiLoading ? 'Generating…' : 'AI Insights'}
            </button>
          </>
        )}

        {/* Save */}
        <button
          onClick={onSave}
          disabled={isSaving}
          className="flex items-center gap-1.5 px-4 py-1.5 bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-semibold rounded-lg transition-colors disabled:opacity-50"
        >
          {isSaving ? (
            <div className="w-3.5 h-3.5 border border-white/40 border-t-white rounded-full animate-spin" />
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
          {isSaving ? 'Saving…' : isNew ? 'Create Note' : 'Save'}
        </button>
      </div>
    </div>
  )
}
