'use client'

import { motion } from 'framer-motion'
import { spring } from '@/lib/animation'

interface ProjectCardProps {
  title: string
  description: string
  tags: string[]
  status: 'live' | 'in-progress' | 'archived'
  href?: string
  featured?: boolean
}

const statusConfig = {
  live: { label: 'Live', dotClass: 'bg-accent-2', pulseClass: 'bg-accent-2/40' },
  'in-progress': { label: 'In Progress', dotClass: 'bg-pop', pulseClass: 'bg-pop/40' },
  archived: { label: 'Archived', dotClass: 'bg-text-muted', pulseClass: 'bg-text-muted/40' },
}

export function ProjectCard({
  title,
  description,
  tags,
  status,
  href,
  featured = false,
}: ProjectCardProps) {
  const { label, dotClass, pulseClass } = statusConfig[status]

  const Wrapper = href ? 'a' : 'div'
  const wrapperProps = href ? { href, target: '_blank', rel: 'noopener noreferrer' } : {}

  return (
    <Wrapper {...wrapperProps} className={`block ${href ? 'cursor-pointer' : ''}`}>
      <motion.article
        className={`group relative overflow-hidden rounded-sharp border border-border/30 bg-surface/50 h-full
          ${featured ? 'p-8' : 'p-6'}`}
        whileHover={{ scale: 1.015, y: -3 }}
        transition={spring.snappy}
      >
        {/* Left gradient stripe on featured cards */}
        {featured && (
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-pop via-accent to-cyan" />
        )}

        {/* Top-left corner accent */}
        <div className={`absolute top-0 left-0 w-8 h-[2px] ${featured ? 'bg-accent' : 'bg-cyan/60'} rounded-full`} />
        <div className={`absolute top-0 left-0 w-[2px] h-8 ${featured ? 'bg-accent' : 'bg-cyan/60'} rounded-full`} />

        {/* Hover glow — subtle diagonal gradient that shifts on hover */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, var(--pop) 0%, transparent 40%, transparent 60%, var(--cyan) 100%)',
            opacity: 0,
          }}
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 0.06 }}
          transition={spring.gentle}
        />

        {/* Status indicator */}
        <div className="flex items-center gap-2 mb-4">
          <span className="relative flex h-2 w-2">
            {status === 'live' && (
              <span className={`absolute inline-flex h-full w-full animate-ping rounded-full ${pulseClass}`} />
            )}
            <span className={`relative inline-flex h-2 w-2 rounded-full ${dotClass}`} />
          </span>
          <span className="text-xs font-medium uppercase tracking-widest text-text-muted">
            {label}
          </span>
        </div>

        {/* Title */}
        <h3 className={`font-display font-bold tracking-tight text-text group-hover:text-accent transition-colors duration-300
          ${featured ? 'text-2xl sm:text-3xl' : 'text-lg'}`}>
          {title}
        </h3>

        {/* Accent bar under title */}
        <div className="flex gap-1 mt-2 mb-3">
          <motion.div
            className="h-[2px] w-6 bg-accent/60 rounded-full"
            whileHover={{ width: 32 }}
            transition={spring.snappy}
          />
          <div className="h-[2px] w-3 bg-pop/40 rounded-full" />
        </div>

        {/* Description */}
        <p className={`text-text-muted leading-relaxed ${featured ? 'text-base' : 'text-sm'}`}>
          {description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-xs rounded-sharp bg-border/10 text-text-muted border border-border/20"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Arrow indicator for linked cards */}
        {href && (
          <motion.div
            className="absolute bottom-4 right-4 flex h-7 w-7 items-center justify-center rounded-sharp border border-cyan/40 bg-cyan/10 text-cyan opacity-0 group-hover:opacity-100"
            initial={{ opacity: 0, x: -4 }}
            whileHover={{ opacity: 1, x: 0 }}
            transition={spring.snappy}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7" />
              <path d="M7 7h10v10" />
            </svg>
          </motion.div>
        )}
      </motion.article>
    </Wrapper>
  )
}
