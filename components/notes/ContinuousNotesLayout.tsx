import { ReactNode } from 'react'
import ScrollTrackingSidebar from './ScrollTrackingSidebar'
import { SubjectNotes } from '@/lib/notes'

interface Chapter {
  slug: string
  title: string
  chapter: number
}

interface ContinuousNotesLayoutProps {
  children: ReactNode
  notesTree: SubjectNotes[]
  currentSubject: string
  chapters: Chapter[]
}

export default function ContinuousNotesLayout({
  children,
  notesTree,
  currentSubject,
  chapters,
}: ContinuousNotesLayoutProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        <ScrollTrackingSidebar
          notesTree={notesTree}
          currentSubject={currentSubject}
          chapters={chapters}
        />
        <main className="flex-1 min-w-0 max-w-3xl">
          {children}
        </main>
      </div>
    </div>
  )
}
