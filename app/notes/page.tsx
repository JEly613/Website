import type { Metadata } from 'next'
import Link from 'next/link'
import { getNotesTree } from '@/lib/notes'

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

  const formatSubjectName = (subject: string) => {
    return subject
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  return (
    <main className="min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="mb-12 sm:mb-16">
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">Notes</h1>
          <p className="text-text-muted text-base sm:text-lg">
            Physics notes organized by subject and chapter.
          </p>
        </div>

        {notesTree.length === 0 ? (
          <p className="text-text-muted">No notes yet. Check back soon!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notesTree.map((subject) => (
              <Link
                key={subject.subject}
                href={`/notes/${subject.subject}`}
                className="group"
              >
                <div className="p-6 bg-surface border border-border rounded-lg hover:border-accent transition-colors h-full">
                  <h2 className="font-display text-2xl font-semibold text-text group-hover:text-accent transition-colors mb-3">
                    {formatSubjectName(subject.subject)}
                  </h2>
                  <p className="text-text-muted text-sm">
                    {subject.notes.length} {subject.notes.length === 1 ? 'chapter' : 'chapters'}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
