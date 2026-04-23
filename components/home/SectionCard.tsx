'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { spring } from '@/lib/animation'

interface SectionCardProps {
  title: string
  description: string
  href: string
}

export function SectionCard({ title, description, href }: SectionCardProps) {
  return (
    <Link href={href} className="block">
      <motion.article
        className="relative max-w-md overflow-hidden rounded-sharp bg-text border border-border/30 px-10 py-9 shadow-2xl"
        whileHover={{ scale: 1.02, y: -2 }}
        transition={spring.snappy}
      >
        {/* Left gradient stripe */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-pop via-accent to-cyan" />

        {/* Corner geometric accents */}
        <div className="absolute top-0 right-0 w-16 h-16 bg-pop/10" />
        <div className="absolute top-0 right-0 w-8 h-1 bg-pop/60 rounded-full" />
        <div className="absolute top-0 right-0 w-1 h-8 bg-pop/60 rounded-full" />
        <div className="absolute bottom-0 left-0 w-12 h-12 bg-cyan/8" />

        <h2 className="font-display text-5xl font-bold tracking-tight text-bg sm:text-6xl relative">
          <span className="font-normal text-accent-2">Explore</span>{' '}
          {title}
        </h2>

        <div className="mt-3 flex gap-1">
          <div className="h-px flex-1 bg-pop/40" />
          <div className="h-px w-8 bg-cyan/40" />
        </div>

        <p className="mt-4 text-base leading-relaxed text-bg/60">
          {description}
        </p>

        <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-pop">
          <span className="flex h-8 w-8 items-center justify-center rounded-sharp border border-pop/60 bg-pop/10">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </span>
          View Section
        </span>
      </motion.article>
    </Link>
  )
}
