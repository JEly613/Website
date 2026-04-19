'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { spring } from '@/lib/animation'
import type { Subject, Chapter } from '@/lib/notes'

interface ScrollTrackingSidebarProps {
  notes: Subject[]
  currentSubject: string
}

function ChapterButton({
  chapter,
  isExpanded,
  isActiveChapter,
  onToggle,
}: {
  chapter: Chapter
  isExpanded: boolean
  isActiveChapter: boolean
  onToggle: () => void
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <button
      onClick={onToggle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`w-full flex items-center justify-between py-2 text-left transition-colors relative ${
        isActiveChapter ? 'text-accent' : 'text-text hover:text-accent'
      }`}
    >
      <span className="text-sm font-medium tracking-tight">
        {chapter.order}. {chapter.title}
      </span>
      <motion.svg
        animate={{ rotate: isExpanded ? 0 : 90 }}
        transition={spring.default}
        className="w-4 h-4 flex-shrink-0 ml-2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </motion.svg>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-border/20" />
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-accent origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered || isActiveChapter ? 1 : 0 }}
        transition={spring.jentacular}
        style={{ width: '100%' }}
      />
    </button>
  )
}

export default function ScrollTrackingSidebar({
  notes,
  currentSubject,
}: ScrollTrackingSidebarProps) {
  const [activeChapter, setActiveChapter] = useState<string>('')
  const [activeTopic, setActiveTopic] = useState<string>('')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [expandedChapters, setExpandedChapters] = useState<Record<string, boolean>>({})
  const isScrollingRef = useRef(false)

  const subject = notes.find((s) => s.subject === currentSubject)
  const chapters = subject?.chapters || []

  useEffect(() => {
    if (chapters.length > 0 && !activeChapter) {
      const firstChapter = chapters[0]
      setActiveChapter(firstChapter.slug)
      setExpandedChapters({ [firstChapter.slug]: true })
      if (firstChapter.topics.length > 0) {
        setActiveTopic(firstChapter.topics[0].slug)
      }
    }
  }, [chapters, activeChapter])

  useEffect(() => {
    const handleScroll = () => {
      if (isScrollingRef.current) return

      let foundChapter = ''
      let foundTopic = ''

      for (const chapter of chapters) {
        for (const topic of chapter.topics) {
          const element = document.getElementById(`topic-${chapter.slug}-${topic.slug}`)
          if (element) {
            const rect = element.getBoundingClientRect()
            if (rect.top <= window.innerHeight / 3) {
              foundChapter = chapter.slug
              foundTopic = topic.slug
            }
          }
        }
      }

      if (foundChapter && foundChapter !== activeChapter) {
        setActiveChapter(foundChapter)
        setExpandedChapters((prev) => ({
          ...prev,
          [foundChapter]: true,
        }))
      }
      if (foundTopic && foundTopic !== activeTopic) {
        setActiveTopic(foundTopic)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [chapters, activeChapter, activeTopic])

  const toggleChapter = (chapterSlug: string) => {
    setExpandedChapters((prev) => ({
      ...prev,
      [chapterSlug]: !prev[chapterSlug],
    }))
  }

  const isChapterExpanded = (chapterSlug: string) => {
    return expandedChapters[chapterSlug] ?? false
  }

  const scrollToTopic = (chapterSlug: string, topicSlug: string) => {
    const element = document.getElementById(`topic-${chapterSlug}-${topicSlug}`)
    if (element) {
      isScrollingRef.current = true
      setActiveChapter(chapterSlug)
      setActiveTopic(topicSlug)
      setExpandedChapters((prev) => ({ ...prev, [chapterSlug]: true }))
      element.scrollIntoView({ behavior: 'smooth' })
      setMobileOpen(false)

      const checkScrollEnd = () => {
        let scrollTimeout: ReturnType<typeof setTimeout>
        const onScroll = () => {
          clearTimeout(scrollTimeout)
          scrollTimeout = setTimeout(() => {
            isScrollingRef.current = false
            window.removeEventListener('scroll', onScroll)
          }, 100)
        }
        window.addEventListener('scroll', onScroll, { passive: true })
        setTimeout(() => {
          isScrollingRef.current = false
          window.removeEventListener('scroll', onScroll)
        }, 2000)
      }
      checkScrollEnd()
    }
  }

  const allTopics = chapters.flatMap((chapter) =>
    chapter.topics.map((topic) => ({
      chapterSlug: chapter.slug,
      topicSlug: topic.slug,
      label: `${chapter.order}. ${chapter.title} › ${topic.title}`,
    }))
  )

  const handleMobileChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    if (value) {
      const [chapterSlug, topicSlug] = value.split('/')
      scrollToTopic(chapterSlug, topicSlug)
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
        <select
          value={activeChapter && activeTopic ? `${activeChapter}/${activeTopic}` : ''}
          onChange={handleMobileChange}
          className="w-full px-4 py-3 bg-surface border border-border/30 rounded-sharp text-text focus:outline-none focus:border-accent text-sm"
        >
          <option value="">Jump to topic...</option>
          {allTopics.map((topic) => (
            <option key={`${topic.chapterSlug}/${topic.topicSlug}`} value={`${topic.chapterSlug}/${topic.topicSlug}`}>
              {topic.label}
            </option>
          ))}
        </select>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-72 flex-shrink-0">
        <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-4">
          <Link
            href="/notes"
            className="inline-flex items-center text-text-muted hover:text-accent transition-colors mb-6 text-sm uppercase tracking-wider"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            All Subjects
          </Link>

          <h2 className="font-display font-bold text-text text-lg mb-4 tracking-tight">
            {subject?.label}
          </h2>

          <nav className="space-y-1">
            {chapters.map((chapter) => {
              const isExpanded = isChapterExpanded(chapter.slug)
              const isActiveChapter = activeChapter === chapter.slug

              return (
                <div key={chapter.slug}>
                  <ChapterButton
                    chapter={chapter}
                    isExpanded={isExpanded}
                    isActiveChapter={isActiveChapter}
                    onToggle={() => toggleChapter(chapter.slug)}
                  />

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial="collapsed"
                        animate="expanded"
                        exit="collapsed"
                        variants={chapterListVariants}
                        transition={spring.default}
                        className="overflow-hidden"
                      >
                        <ul className="pl-4 border-l border-border/20 space-y-1 py-1">
                          {chapter.topics.map((topic) => {
                            const isActive = activeChapter === chapter.slug && activeTopic === topic.slug

                            return (
                              <li key={topic.slug} className="relative">
                                {isActive && (
                                  <motion.div
                                    layoutId="activeTopicIndicator"
                                    className="absolute -left-4 top-0 bottom-0 w-0.5 bg-accent"
                                    transition={spring.jentacular}
                                  />
                                )}
                                <button
                                  onClick={() => scrollToTopic(chapter.slug, topic.slug)}
                                  className={`block w-full text-left py-1 text-sm transition-colors ${
                                    isActive
                                      ? 'text-accent font-medium'
                                      : 'text-text-muted hover:text-accent'
                                  }`}
                                >
                                  {topic.title}
                                </button>
                              </li>
                            )
                          })}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </nav>
        </div>
      </aside>
    </>
  )
}
