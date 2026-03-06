'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SubjectNotes } from '@/lib/notes'

interface NotesSidebarProps {
  notesTree: SubjectNotes[]
  currentSubject?: string
}

export default function NotesSidebar({ notesTree, currentSubject }: NotesSidebarProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const isActive = (subject: string, slug: string) => {
    return pathname === `/notes/${subject}/${slug}`
  }

  const formatSubjectName = (subject: string) => {
    return subject
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  return (
    <>
      {/* Mobile Dropdown */}
      <div className="lg:hidden mb-8">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-4 py-3 bg-surface border border-border rounded-lg text-text hover:border-accent transition-colors"
        >
          <span className="font-medium">
            {currentSubject ? formatSubjectName(currentSubject) : 'All Subjects'}
          </span>
          <svg
            className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <div className="mt-2 p-4 bg-surface border border-border rounded-lg">
            <nav className="space-y-6">
              {notesTree.map((subject) => (
                <div key={subject.subject}>
                  <h3 className="font-display font-semibold text-text mb-3">
                    {formatSubjectName(subject.subject)}
                  </h3>
                  <ul className="space-y-2">
                    {subject.notes.map((note) => (
                      <li key={note.slug}>
                        <Link
                          href={`/notes/${subject.subject}/${note.slug}`}
                          onClick={() => setIsOpen(false)}
                          className={`block text-sm transition-colors ${
                            isActive(subject.subject, note.slug)
                              ? 'text-accent font-medium'
                              : 'text-text-muted hover:text-accent'
                          }`}
                        >
                          {note.chapter}. {note.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>
        )}
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 flex-shrink-0">
        <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
          <nav className="space-y-8">
            {notesTree.map((subject) => (
              <div key={subject.subject}>
                <h3 className="font-display font-semibold text-text mb-3 text-lg">
                  {formatSubjectName(subject.subject)}
                </h3>
                <ul className="space-y-2">
                  {subject.notes.map((note) => (
                    <li key={note.slug}>
                      <Link
                        href={`/notes/${subject.subject}/${note.slug}`}
                        className={`block text-sm transition-colors ${
                          isActive(subject.subject, note.slug)
                            ? 'text-accent-2 font-medium'
                            : 'text-text-muted hover:text-accent'
                        }`}
                      >
                        {note.chapter}. {note.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </aside>
    </>
  )
}
