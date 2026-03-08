import type { Metadata } from 'next'
import { notes } from '@/lib/notes'
import SubjectRow from '@/components/notes/SubjectRow'

export const metadata: Metadata = {
  title: 'Notes',
  description: 'Physics notes organized by subject, chapter, and topic.',
}

export default function NotesPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <div className="mb-12">
        <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">Notes</h1>
        <p className="text-text-muted text-lg">
          Physics notes organized by subject, chapter, and topic.
        </p>
      </div>

      <div className="space-y-0">
        {notes.map((subject) => (
          <SubjectRow
            key={subject.subject}
            subject={subject.subject}
            chapterCount={subject.chapters.length}
            href={`/notes/${subject.subject}`}
          />
        ))}
      </div>
    </main>
  )
}
