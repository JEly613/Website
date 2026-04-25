'use client'

import { motion } from 'framer-motion'
import PostCard from '@/components/blog/PostCard'
import { BlogPost } from '@/types'

interface BlogListingProps {
  posts: BlogPost[]
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

export default function BlogListing({ posts }: BlogListingProps) {
  if (posts.length === 0) {
    return (
      <div className="p-12 rounded-sharp border border-border/20 bg-surface/20 text-center">
        <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-pop/10 flex items-center justify-center">
          <div className="w-4 h-4 bg-pop/40 rounded-full" />
        </div>
        <p className="text-text-muted">No posts yet. Check back soon!</p>
      </div>
    )
  }

  return (
    <motion.div
      className="space-y-4"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      {posts.map((post, i) => (
        <PostCard key={post.slug} post={post} index={i} />
      ))}
    </motion.div>
  )
}
