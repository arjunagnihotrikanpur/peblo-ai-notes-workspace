import useNotes    from '../hooks/useNotes'
import SearchBar   from '../components/notes/SearchBar'
import NotesList   from '../components/notes/NotesList'

export default function NotesPage() {
  const {
    notes, loading,
    search, setSearch,
    tag,    setTag,
    sort,   setSort,
    archiveNote,
  } = useNotes()

  const hasFilters = !!search || !!tag

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">My Notes</h2>
          <p className="text-xs text-gray-600 mt-0.5">
            {loading ? 'Loading…' : `${notes.length} note${notes.length !== 1 ? 's' : ''}`}
            {tag && ` · filtered by #${tag}`}
          </p>
        </div>
      </div>

      {/* Search + filters */}
      <SearchBar
        search={search} setSearch={setSearch}
        tag={tag}       setTag={setTag}
        sort={sort}     setSort={setSort}
      />

      {/* Notes grid */}
      <NotesList
        notes={notes}
        loading={loading}
        onArchive={archiveNote}
        hasFilters={hasFilters}
      />
    </div>
  )
}
