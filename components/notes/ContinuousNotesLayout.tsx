'use client'

import { ReactNode } from 'react'
import ScrollTrackingSidebar from './ScrollTrackingSidebar'
import type { Subject } from '@/lib/notes'

interface ContinuousNotesLayoutProps {
  children: ReactNode
  notes: Subject[]
  currentSubject: string
}

export default function ContinuousNotesLayout({
  children,
  notes,
  currentSubject,
}: ContinuousNotesLayoutProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        <ScrollTrackingSidebar
          notes={notes}
          currentSubject={currentSubject}
        />
        <main className="flex-1 min-w-0">
          {children}
        </main>
      </div>
    </div>
  )
}
