import type { Metadata } from 'next'
import { getNotesTree } from '@/lib/notes'
import SubjectRow from '@/components/notes/SubjectRow'

export const metadata: Metadata = {
  title: 'Notes',
  description: 'Physics notes organized by subject and chapter, covering classical mechanics, electromagnetism, and more.',
  openGraph: {
    title: 'Notes',
    description: 'Physics notes organized by subject and chapter, covering classical mechanics, electromagnetism, and more.',
    images: ['/og/default.svg'],
  },
}

export default function NotesPage() {
  const notesTree = getNotesTree()

  return (
    <main className="min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="mb-12 sm:mb-16">
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">Notes</h1>
          <p className="text-text-muted text-base sm:text-lg">
            Physics notes organized by subject and chapter.
          </p>
        </div>

        {notesTree.length === 0 ? (
          <p className="text-text-muted">No notes yet. Check back soon!</p>
        ) : (
          <div className="space-y-1">
            {notesTree.map((subject) => (
              <SubjectRow
                key={subject.subject}
                subject={subject.subject}
                chapterCount={subject.notes.length}
                href={`/notes/${subject.subject}`}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
