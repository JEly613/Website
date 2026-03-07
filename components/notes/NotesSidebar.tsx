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
  const [mobileOpen, setMobileOpen] = useState(false)
  const [expandedSubjects, setExpandedSubjects] = useState<Record<string, boolean>>(() => {
    // Initialize with current subject expanded
    const initial: Record<string, boolean> = {}
    if (currentSubject) {
      initial[currentSubject] = true
    }
    return initial
  })

  const isActive = (subject: string, slug: string) => {
    return pathname === `/notes/${subject}/${slug}`
  }

  const formatSubjectName = (subject: string) => {
    return subject
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  const toggleSubject = (subject: string) => {
    setExpandedSubjects((prev) => ({
      ...prev,
      [subject]: !prev[subject],
    }))
  }

  const isExpanded = (subject: string) => {
    return expandedSubjects[subject] ?? false
  }

  return (
    <>
      {/* Mobile Dropdown */}
      <div className="lg:hidden mb-8">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="w-full flex items-center justify-between px-4 py-3 bg-surface border border-border rounded-lg text-text hover:border-accent transition-colors"
        >
          <span className="font-medium">
            {currentSubject ? formatSubjectName(currentSubject) : 'All Subjects'}
          </span>
          <svg
            className={`w-5 h-5 transition-transform duration-200 ${mobileOpen ? 'rotate-180' : ''}`}
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

        {mobileOpen && (
          <div className="mt-2 p-4 bg-surface border border-border rounded-lg">
            <nav className="space-y-4">
              {notesTree.map((subject) => (
                <div key={subject.subject}>
                  <button
                    onClick={() => toggleSubject(subject.subject)}
                    className="w-full flex items-center justify-between font-display font-semibold text-text py-2"
                  >
                    <span>{formatSubjectName(subject.subject)}</span>
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isExpanded(subject.subject) ? 'rotate-180' : ''
                      }`}
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
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isExpanded(subject.subject) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <ul className="relative pl-4 mt-2 space-y-2">
                      <div
                        className={`absolute left-0 top-0 bottom-0 w-0.5 bg-accent transition-all duration-300 ${
                          isExpanded(subject.subject) ? 'opacity-100' : 'opacity-0'
                        }`}
                      />
                      {subject.notes.map((note) => (
                        <li key={note.slug}>
                          <Link
                            href={`/notes/${subject.subject}/${note.slug}`}
                            onClick={() => setMobileOpen(false)}
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
                </div>
              ))}
            </nav>
          </div>
        )}
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 flex-shrink-0">
        <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
          <nav className="space-y-4">
            {notesTree.map((subject) => (
              <div key={subject.subject}>
                <button
                  onClick={() => toggleSubject(subject.subject)}
                  className="w-full flex items-center justify-between font-display font-semibold text-text text-lg py-2 hover:text-accent transition-colors"
                >
                  <span>{formatSubjectName(subject.subject)}</span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isExpanded(subject.subject) ? 'rotate-180' : ''
                    }`}
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
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isExpanded(subject.subject) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <ul className="relative pl-4 mt-2 space-y-2">
                    <div
                      className={`absolute left-0 top-0 bottom-0 w-0.5 bg-accent transition-all duration-300 ${
                        isExpanded(subject.subject) ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
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
              </div>
            ))}
          </nav>
        </div>
      </aside>
    </>
  )
}
