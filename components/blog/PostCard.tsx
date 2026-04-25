'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { spring } from '@/lib/animation'
import Tag from '@/components/ui/Tag'
import { BlogPost } from '@/types'

interface PostCardProps {
  post: BlogPost
  index: number
}

const blurReveal = {
  hidden: { opacity: 0, filter: 'blur(10px)', y: 20 },
  visible: { opacity: 1, filter: 'blur(0px)', y: 0 },
}

export default function PostCard({ post, index }: PostCardProps) {
  const dateObj = new Date(post.date)
  const day = dateObj.getDate()
  const month = dateObj.toLocaleDateString('en-US', { month: 'short' }).toUpperCase()
  const year = dateObj.getFullYear()

  return (
    <motion.article
      className="group"
      variants={blurReveal}
      transition={{ ...spring.gentle, delay: index * 0.08 }}
    >
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="relative flex gap-0 sm:gap-6 rounded-sharp border border-border/20 bg-surface/30 hover:bg-surface/60 transition-colors overflow-hidden">
          {/* Date sidebar — desktop only */}
          <div className="hidden sm:flex flex-col items-center justify-center w-20 flex-shrink-0 border-r border-border/15 py-6">
            <span className="font-display text-3xl font-bold text-text tracking-tight leading-none">
              {day}
            </span>
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-text-muted mt-1">
              {month}
            </span>
            <span className="text-[10px] text-text-muted/50 mt-0.5">
              {year}
            </span>
          </div>

          {/* Content */}
          <div className="flex-1 p-5 sm:py-5 sm:pr-6 sm:pl-0">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-text group-hover:text-accent tracking-tight transition-colors">
              {post.title}
            </h2>

            {/* Mobile date + reading time */}
            <div className="flex items-center gap-3 text-sm text-text-muted mt-2 sm:mt-1.5">
              <time dateTime={post.date} className="sm:hidden">
                {dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </time>
              <span className="sm:hidden w-1 h-1 rounded-full bg-pop" />
              <span>{post.readingTime}</span>
            </div>

            <p className="text-text-muted text-sm leading-relaxed mt-2 line-clamp-2">
              {post.description}
            </p>

            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {post.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
            )}
          </div>

          {/* Bottom hover accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-pop via-accent to-cyan scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
        </div>
      </Link>
    </motion.article>
  )
}
