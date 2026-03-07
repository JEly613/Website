'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { SubjectNotes } from '@/lib/notes'
import { spring } from '@/lib/animation'

interface Chapter {
  slug: string
  title: string
  chapter: number
}

interface ScrollTrackingSidebarProps {
  notesTree: SubjectNotes[]
  currentSubject: string
  chapters: Chapter[]
}

export default function ScrollTrackingSidebar({
  notesTree,
  currentSubject,
  chapters,
}: ScrollTrackingSidebarProps) {
  const [activeChapter, setActiveChapter] = useState<string>(chapters[0]?.slug || '')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [expandedSubjects, setExpandedSubjects] = useState<Record<string, boolean>>({
    [currentSubject]: true,
  })

  useEffect(() => {
    const handleScroll = () => {
      const chapterElements = chapters.map((ch) => ({
        slug: ch.slug,
        element: document.getElementById(ch.slug),
      }))

      // Find the chapter that's currently most visible
      let currentChapter = chapters[0]?.slug || ''
      
      for (const { slug, element } of chapterElements) {
        if (element) {
          const rect = element.getBoundingClientRect()
          // Check if the top of the element is above the middle of the viewport
          if (rect.top <= window.innerHeight / 3) {
            currentChapter = slug
          }
        }
      }

      setActiveChapter(currentChapter)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial check

    return () => window.removeEventListener('scroll', handleScroll)
  }, [chapters])

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

  const scrollToChapter = (slug: string) => {
    const element = document.getElementById(slug)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setMobileOpen(false)
    }
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
            {chapters.find((ch) => ch.slug === activeChapter)?.title || 'Chapters'}
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
                <nav className="space-y-2">
                  {chapters.map((chapter) => (
                    <button
                      key={chapter.slug}
                      onClick={() => scrollToChapter(chapter.slug)}
                      className={`block w-full text-left text-sm transition-colors ${
                        activeChapter === chapter.slug
                          ? 'text-accent font-medium'
                          : 'text-text-muted hover:text-accent'
                      }`}
                    >
                      {chapter.chapter}. {chapter.title}
                    </button>
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
                {subject.subject === currentSubject ? (
                  // Current subject - show chapters with scroll tracking
                  <>
                    <button
                      onClick={() => toggleSubject(subject.subject)}
                      className="w-full flex items-center justify-between font-display font-semibold text-accent text-lg py-2"
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
                              className="absolute left-0 top-0 bottom-0 w-0.5 bg-border origin-top"
                            />
                            {chapters.map((chapter) => (
                              <li key={chapter.slug} className="relative">
                                {activeChapter === chapter.slug && (
                                  <motion.div
                                    layoutId="activeIndicator"
                                    className="absolute -left-4 top-0 bottom-0 w-0.5 bg-accent"
                                    transition={spring.default}
                                  />
                                )}
                                <button
                                  onClick={() => scrollToChapter(chapter.slug)}
                                  className={`block w-full text-left text-sm transition-colors ${
                                    activeChapter === chapter.slug
                                      ? 'text-accent font-medium'
                                      : 'text-text-muted hover:text-accent'
                                  }`}
                                >
                                  {chapter.chapter}. {chapter.title}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  // Other subjects - link to their page
                  <Link
                    href={`/notes/${subject.subject}`}
                    className="block font-display font-semibold text-text text-lg py-2 hover:text-accent transition-colors"
                  >
                    {formatSubjectName(subject.subject)}
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </div>
      </aside>
    </>
  )
}
