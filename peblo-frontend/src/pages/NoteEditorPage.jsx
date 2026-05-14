import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate }            from 'react-router-dom'
import toast                                 from 'react-hot-toast'

import * as noteService from '../services/noteService'
import EditorToolbar    from '../components/notes/EditorToolbar'
import TagInput         from '../components/notes/TagInput'
import AIInsightsPanel  from '../components/ai/AIInsightsPanel'
import LoadingSpinner   from '../components/common/LoadingSpinner'
import { buildShareUrl, copyToClipboard } from '../utils/helpers'

const AUTOSAVE_DELAY = 1500 // ms

export default function NoteEditorPage() {
  const { id }    = useParams()
  const navigate  = useNavigate()
  const isNew     = !id

  const [note, setNote]         = useState(null)
  const [title, setTitle]       = useState('')
  const [content, setContent]   = useState('')
  const [tags, setTags]         = useState([])

  const [pageLoading, setPageLoading]   = useState(!isNew)
  const [isSaving, setIsSaving]         = useState(false)
  const [aiLoading, setAiLoading]       = useState(false)
  const [shareLoading, setShareLoading] = useState(false)
  const [shareUrl, setShareUrl]         = useState('')
  const [aiData, setAiData]             = useState(null)
  const [isDirty, setIsDirty]           = useState(false)

  // Load existing note
  useEffect(() => {
    if (!id) return
    setPageLoading(true)
    noteService.getNote(id)
      .then((data) => {
        setNote(data)
        setTitle(data.title || '')
        setContent(data.content || '')
        setTags(data.tags || [])
        if (data.aiSummary) {
          setAiData({
            summary:        data.aiSummary,
            actionItems:    data.aiActionItems || [],
            suggestedTitle: data.aiSuggestedTitle || '',
          })
        }
        if (data.shareId) {
          setShareUrl(buildShareUrl(data.shareId))
        }
      })
      .catch(() => {
        toast.error('Note not found')
        navigate('/notes')
      })
      .finally(() => setPageLoading(false))
  }, [id, navigate])

  // Mark dirty on changes
  useEffect(() => {
    if (!pageLoading) setIsDirty(true)
  }, [title, content, tags]) // eslint-disable-line

  const handleSave = useCallback(async () => {
    if (isSaving) return
    setIsSaving(true)
    try {
      const payload = { title, content, tags }
      if (isNew) {
        const created = await noteService.createNote(payload)
        toast.success('Note created!')
        setIsDirty(false)
        navigate(`/notes/${created._id}`, { replace: true })
      } else {
        const updated = await noteService.updateNote(id, payload)
        setNote(updated)
        setIsDirty(false)
        toast.success('Saved')
      }
    } catch {
      toast.error('Failed to save note')
    } finally {
      setIsSaving(false)
    }
  }, [isSaving, id, isNew, title, content, tags, navigate])

  // Keyboard shortcut: Ctrl/Cmd + S
  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault()
        handleSave()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [handleSave])

  const handleGenerateAI = async () => {
    if (!id) { toast.error('Save the note first'); return }
    setAiLoading(true)
    try {
      const result = await noteService.generateAI(id)
      setAiData({
        summary:        result.summary,
        actionItems:    result.action_items || [],
        suggestedTitle: result.suggested_title || '',
      })
      toast.success('AI insights generated!')
    } catch {
      toast.error('AI generation failed')
    } finally {
      setAiLoading(false)
    }
  }

  const handleShare = async () => {
    if (!id) { toast.error('Save the note first'); return }
    setShareLoading(true)
    try {
      const result = await noteService.generateShareLink(id)
      const url = buildShareUrl(result.shareId)
      setShareUrl(url)
      await copyToClipboard(url)
      toast.success('Share link copied to clipboard!')
    } catch {
      toast.error('Failed to generate share link')
    } finally {
      setShareLoading(false)
    }
  }

  const handleCopyShare = async () => {
    const ok = await copyToClipboard(shareUrl)
    if (ok) toast.success('Link copied!')
  }

  const handleApplyTitle = (suggested) => {
    setTitle(suggested)
    toast.success('Title applied')
  }

  if (pageLoading) {
    return (
      <div className="flex items-center justify-center py-32">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto space-y-5 animate-fade-in">
      {/* Toolbar */}
      <EditorToolbar
        isNew={isNew}
        isSaving={isSaving}
        onSave={handleSave}
        onGenerateAI={handleGenerateAI}
        onShare={handleShare}
        aiLoading={aiLoading}
        shareLoading={shareLoading}
        shareUrl={shareUrl}
        onCopyShare={handleCopyShare}
      />

      {/* Dirty indicator */}
      {isDirty && !isNew && (
        <p className="text-[11px] text-amber-400/60 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400/60 inline-block" />
          Unsaved changes · Press ⌘S to save
        </p>
      )}

      {/* Title */}
      <input
        type="text"
        placeholder="Note title…"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full bg-transparent text-2xl font-bold text-white placeholder-gray-700 border-none focus:outline-none resize-none"
      />

      {/* Tags */}
      <TagInput tags={tags} onChange={setTags} />

      {/* Content textarea */}
      <textarea
        placeholder="Start writing… (Markdown-friendly)"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={20}
        className="w-full bg-[#1a1a1a] border border-[#242424] rounded-xl px-5 py-4 text-sm text-gray-300 placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/30 resize-none leading-relaxed font-mono transition-all"
      />

      {/* AI Insights */}
      {aiData && (
        <AIInsightsPanel
          summary={aiData.summary}
          actionItems={aiData.actionItems}
          suggestedTitle={aiData.suggestedTitle}
          onApplyTitle={handleApplyTitle}
        />
      )}

      {/* Share URL display */}
      {shareUrl && (
        <div className="flex items-center gap-3 p-3 bg-emerald-500/5 border border-emerald-500/15 rounded-xl">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-emerald-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
          <p className="text-xs text-emerald-400 flex-1 truncate font-mono">{shareUrl}</p>
          <button onClick={handleCopyShare} className="text-xs text-emerald-400 hover:text-emerald-300 underline flex-shrink-0">
            Copy
          </button>
        </div>
      )}
    </div>
  )
}
