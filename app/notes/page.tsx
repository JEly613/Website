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
            {notesTree.map((subject) => {
              // Get the first chapter (already sorted by order)
              const firstChapter = subject.notes[0]
              
              return (
                <Link
                  key={subject.subject}
                  href={`/notes/${subject.subject}/${firstChapter.slug}`}
                  className="group block py-4 border-b border-border hover:border-accent transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <h2 className="font-display text-xl sm:text-2xl text-text group-hover:text-accent transition-colors">
                      {formatSubjectName(subject.subject)}
                    </h2>
                    <span className="text-text-muted text-sm">
                      {subject.notes.length} {subject.notes.length === 1 ? 'chapter' : 'chapters'}
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </main>
  )
}
