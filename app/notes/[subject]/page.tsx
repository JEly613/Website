import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAllSubjects, getNotesBySubject } from '@/lib/notes'

interface PageProps {
  params: {
    subject: string
  }
}

export async function generateStaticParams() {
  const subjects = getAllSubjects()
  return subjects.map((subject) => ({
    subject,
  }))
}

export default function SubjectPage({ params }: PageProps) {
  const notes = getNotesBySubject(params.subject)

  if (notes.length === 0) {
    notFound()
  }

  const formatSubjectName = (subject: string) => {
    return subject
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  return (
    <main className="min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="mb-12">
          <Link
            href="/notes"
            className="text-text-muted hover:text-accent transition-colors text-sm mb-4 inline-block"
          >
            ← Back to all subjects
          </Link>
          <h1 className="font-display text-5xl font-bold mb-4">
            {formatSubjectName(params.subject)}
          </h1>
          <p className="text-text-muted text-lg">
            {notes.length} {notes.length === 1 ? 'chapter' : 'chapters'}
          </p>
        </div>

        <div className="space-y-4">
          {notes.map((note) => (
            <Link
              key={note.slug}
              href={`/notes/${params.subject}/${note.slug}`}
              className="block group"
            >
              <div className="p-6 bg-surface border border-border rounded-lg hover:border-accent transition-colors">
                <div className="flex items-baseline gap-3">
                  <span className="text-text-muted text-sm font-medium">
                    Chapter {note.chapter}
                  </span>
                  <h2 className="font-display text-2xl font-semibold text-text group-hover:text-accent transition-colors">
                    {note.title}
                  </h2>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
