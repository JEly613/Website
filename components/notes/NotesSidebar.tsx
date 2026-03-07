'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { SubjectNotes } from '@/lib/notes'
import { spring } from '@/lib/animation'

interface NotesSidebarProps {
  notesTree: SubjectNotes[]
  currentSubject?: string
}

export default function NotesSidebar({ notesTree, currentSubject }: NotesSidebarProps) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [expandedSubjects, setExpandedSubjects] = useState<Record<string, boolean>>(() => {
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

  const chapterListVariants = {
    collapsed: { height: 0, opacity: 0 },
    expanded: { height: 'auto', opacity: 1 },
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
          <motion.svg
            animate={{ rotate: mobileOpen ? 180 : 0 }}
            transition={spring.default}
            className="w-5 h-5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 9l-7 7-7-7" />
          </motion.svg>
        </button>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={spring.default}
              className="mt-2 overflow-hidden"
            >
              <div className="p-4 bg-surface border border-border rounded-lg">
                <nav className="space-y-4">
                  {notesTree.map((subject) => (
                    <div key={subject.subject}>
                      <button
                        onClick={() => toggleSubject(subject.subject)}
                        className="w-full flex items-center justify-between font-display font-semibold text-text py-2"
                      >
                        <span>{formatSubjectName(subject.subject)}</span>
                        <motion.svg
                          animate={{ rotate: isExpanded(subject.subject) ? 180 : 0 }}
                          transition={spring.default}
                          className="w-4 h-4"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M19 9l-7 7-7-7" />
                        </motion.svg>
                      </button>
                      <AnimatePresence>
                        {isExpanded(subject.subject) && (
                          <motion.div
                            initial="collapsed"
                            animate="expanded"
                            exit="collapsed"
                            variants={chapterListVariants}
                            transition={spring.default}
                            className="overflow-hidden"
                          >
                            <ul className="relative pl-4 mt-2 space-y-2">
                              <motion.div
                                initial={{ scaleY: 0 }}
                                animate={{ scaleY: 1 }}
                                exit={{ scaleY: 0 }}
                                transition={spring.default}
                                className="absolute left-0 top-0 bottom-0 w-0.5 bg-accent origin-top"
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
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
                  <motion.svg
                    animate={{ rotate: isExpanded(subject.subject) ? 0 : 90 }}
                    transition={spring.default}
                    className="w-4 h-4"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M19 9l-7 7-7-7" />
                  </motion.svg>
                </button>
                <AnimatePresence>
                  {isExpanded(subject.subject) && (
                    <motion.div
                      initial="collapsed"
                      animate="expanded"
                      exit="collapsed"
                      variants={chapterListVariants}
                      transition={spring.default}
                      className="overflow-hidden"
                    >
                      <ul className="relative pl-4 mt-2 space-y-2">
                        <motion.div
                          initial={{ scaleY: 0 }}
                          animate={{ scaleY: 1 }}
                          exit={{ scaleY: 0 }}
                          transition={spring.default}
                          className="absolute left-0 top-0 bottom-0 w-0.5 bg-accent origin-top"
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
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>
        </div>
      </aside>
    </>
  )
}
