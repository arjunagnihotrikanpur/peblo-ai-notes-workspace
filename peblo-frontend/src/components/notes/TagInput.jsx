import { useState } from 'react'

export default function TagInput({ tags = [], onChange }) {
  const [input, setInput] = useState('')

  const addTag = () => {
    const clean = input.trim().toLowerCase().replace(/\s+/g, '-')
    if (clean && !tags.includes(clean)) {
      onChange([...tags, clean])
    }
    setInput('')
  }

  const removeTag = (tag) => onChange(tags.filter((t) => t !== tag))

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      addTag()
    }
    if (e.key === 'Backspace' && !input && tags.length > 0) {
      removeTag(tags[tags.length - 1])
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-3 py-2 min-h-[40px] focus-within:ring-2 focus-within:ring-indigo-500/40 focus-within:border-indigo-500/40 transition-all">
      {tags.map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
        >
          #{tag}
          <button
            type="button"
            onClick={() => removeTag(tag)}
            className="text-indigo-400/60 hover:text-indigo-300 transition-colors ml-0.5"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </span>
      ))}
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={addTag}
        placeholder={tags.length === 0 ? 'Add tags… (press Enter or comma)' : ''}
        className="flex-1 min-w-[120px] bg-transparent text-sm text-gray-300 placeholder-gray-600 focus:outline-none"
      />
    </div>
  )
}
