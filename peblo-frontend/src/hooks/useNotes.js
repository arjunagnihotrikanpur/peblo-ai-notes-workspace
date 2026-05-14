import { useState, useEffect, useCallback } from 'react'
import toast from 'react-hot-toast'
import * as noteService from '../services/noteService'
import useDebounce from './useDebounce'

export default function useNotes() {
  const [notes, setNotes]       = useState([])
  const [loading, setLoading]   = useState(true)
  const [search, setSearch]     = useState('')
  const [tag, setTag]           = useState('')
  const [sort, setSort]         = useState('newest')

  const debouncedSearch = useDebounce(search, 400)

  const fetchNotes = useCallback(async () => {
    setLoading(true)
    try {
      const params = {}
      if (debouncedSearch) params.search = debouncedSearch
      if (tag)             params.tag    = tag
      if (sort !== 'newest') params.sort = sort
      const data = await noteService.getNotes(params)
      setNotes(data)
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to load notes')
    } finally {
      setLoading(false)
    }
  }, [debouncedSearch, tag, sort])

  useEffect(() => { fetchNotes() }, [fetchNotes])

  const archiveNote = useCallback(async (id) => {
    try {
      await noteService.archiveNote(id)
      setNotes((prev) => prev.filter((n) => n._id !== id))
      toast.success('Note archived')
    } catch {
      toast.error('Failed to archive note')
    }
  }, [])

  return {
    notes,
    loading,
    search, setSearch,
    tag,    setTag,
    sort,   setSort,
    refetch: fetchNotes,
    archiveNote,
  }
}
