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
        <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl text-text group-hover:text-accent-2 transition-colors font-semibold">
          {formatSubjectName(subject)}
        </h2>
        <span className="text-text-muted text-base">
          {chapterCount} {chapterCount === 1 ? 'chapter' : 'chapters'}
        </span>
      </div>
      
      {/* Static border */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-border" />
      
      {/* Animated accent border */}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-accent-2 origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={spring.jentacular}
        style={{ width: '100%' }}
      />
    </Link>
  )
}
