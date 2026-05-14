import NoteCard      from './NoteCard'
import LoadingSpinner from '../common/LoadingSpinner'
import EmptyState     from '../common/EmptyState'

export default function NotesList({ notes, loading, onArchive, hasFilters }) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (notes.length === 0) {
    return (
      <EmptyState
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        }
        title={hasFilters ? 'No notes match your search' : 'No notes yet'}
        description={
          hasFilters
            ? 'Try adjusting your search or tag filter.'
            : 'Create your first note to get started.'
        }
      />
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {notes.map((note) => (
        <NoteCard key={note._id} note={note} onArchive={onArchive} />
      ))}
    </div>
  )
}
