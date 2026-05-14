export default function AIInsightsPanel({ summary, actionItems = [], suggestedTitle, onApplyTitle }) {
  if (!summary && actionItems.length === 0 && !suggestedTitle) return null

  return (
    <div className="bg-indigo-500/5 border border-indigo-500/15 rounded-xl p-5 space-y-4 animate-slide-in">
      {/* Header */}
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-md bg-indigo-500/20 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h3 className="text-sm font-semibold text-indigo-300">AI Insights</h3>
      </div>

      {/* Suggested title */}
      {suggestedTitle && (
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">
            Suggested Title
          </p>
          <div className="flex items-start gap-3 justify-between">
            <p className="text-sm text-gray-300 italic">"{suggestedTitle}"</p>
            {onApplyTitle && (
              <button
                onClick={() => onApplyTitle(suggestedTitle)}
                className="flex-shrink-0 text-xs text-indigo-400 hover:text-indigo-300 underline transition-colors"
              >
                Apply
              </button>
            )}
          </div>
        </div>
      )}

      {/* Summary */}
      {summary && (
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">
            Summary
          </p>
          <p className="text-sm text-gray-400 leading-relaxed">{summary}</p>
        </div>
      )}

      {/* Action items */}
      {actionItems.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">
            Action Items
          </p>
          <ul className="space-y-1.5">
            {actionItems.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
