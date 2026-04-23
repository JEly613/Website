'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { spring } from '@/lib/animation'

interface SubjectRowProps {
  subject: string
  chapterCount: number
  href: string
}

export default function SubjectRow({ subject, chapterCount, href }: SubjectRowProps) {
  const [isHovered, setIsHovered] = useState(false)

  const formatSubjectName = (subject: string) => {
    return subject
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  return (
    <Link
      href={href}
      className="group block py-6 relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-2 h-2 rounded-full bg-pop" />
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl text-text group-hover:text-accent transition-colors font-bold tracking-tight">
            {formatSubjectName(subject)}
          </h2>
        </div>
        <span className="text-text-muted text-sm font-medium uppercase tracking-wider flex items-center gap-2">
          <span className="hidden sm:inline-block w-4 h-px bg-cyan" />
          {chapterCount} {chapterCount === 1 ? 'chapter' : 'chapters'}
        </span>
      </div>

      {/* Static border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-border/30" />

      {/* Animated accent border — gradient */}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-pop via-accent to-cyan origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={spring.jentacular}
        style={{ width: '100%' }}
      />
    </Link>
  )
}
