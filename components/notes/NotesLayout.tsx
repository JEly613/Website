import { ReactNode } from 'react'
import NotesSidebar from './NotesSidebar'
import { SubjectNotes } from '@/lib/notes'

interface NotesLayoutProps {
  children: ReactNode
  notesTree: SubjectNotes[]
  currentSubject?: string
}

export default function NotesLayout({ children, notesTree, currentSubject }: NotesLayoutProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        <NotesSidebar notesTree={notesTree} currentSubject={currentSubject} />
        <main className="flex-1 min-w-0">
          {children}
        </main>
      </div>
    </div>
  )
}
