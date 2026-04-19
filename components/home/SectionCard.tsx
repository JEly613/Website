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
        className="max-w-md overflow-hidden rounded-2xl bg-accent-2 px-10 py-9 shadow-2xl"
        whileHover={{ scale: 1.02, y: -2 }}
        transition={spring.snappy}
      >
        <h2 className="font-display text-5xl font-bold tracking-tight text-white sm:text-6xl">
          <span className="italic font-normal text-accent">Explore</span>{' '}
          {title}
        </h2>

        <div className="mt-3 h-px w-full bg-white/25" />

        <p className="mt-4 text-base leading-relaxed text-white/70">
          {description}
        </p>

        <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-accent">
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-accent/60 bg-accent/10">
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
