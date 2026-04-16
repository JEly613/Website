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
    <motion.article
      className="w-full max-w-sm rounded-2xl border border-border/30 bg-bg/60 p-8 backdrop-blur-md"
      whileHover={{ scale: 1.03 }}
      transition={spring.snappy}
    >
      <h2 className="font-display text-3xl font-semibold text-text">
        {title}
      </h2>
      <p className="mt-3 text-text-muted">{description}</p>
      <Link
        href={href}
        className="mt-6 inline-block text-accent-2 transition-colors hover:text-accent"
      >
        Explore →
      </Link>
    </motion.article>
  )
}
