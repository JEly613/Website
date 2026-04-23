import type { Metadata } from 'next'
import { getAllPosts } from '@/lib/blog'
import PostCard from '@/components/blog/PostCard'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Thoughts on physics, photography, and learning in public.',
  openGraph: {
    title: 'Blog',
    description: 'Thoughts on physics, photography, and learning in public.',
    images: ['/og/default.svg'],
  },
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Decorative geometry */}
      <div className="absolute top-16 right-8 w-48 h-48 border border-pop/15 rounded-full" />
      <div className="absolute top-24 right-16 w-24 h-24 border border-accent-2/15 rounded-full" />
      <div className="absolute bottom-32 left-6 w-20 h-20 bg-cyan/5 rotate-45 rounded-sharp" />
      <div className="absolute top-1/3 left-4 w-3 h-3 bg-pop/30 rounded-full" />

      <div className="max-w-4xl mx-auto px-6 py-16 relative">
        <div className="mb-12 sm:mb-16">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-3 h-3 bg-pop rounded-full" />
            <span className="text-xs font-medium uppercase tracking-widest text-cyan">Writing</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-3 tracking-tight">Blog</h1>
          <div className="flex gap-1 mb-4">
            <div className="h-1 w-8 bg-accent rounded-full" />
            <div className="h-1 w-4 bg-pop rounded-full" />
            <div className="h-1 w-6 bg-accent-2 rounded-full" />
          </div>
          <p className="text-text-muted text-base sm:text-lg">
            Welcome to my personal blog! This is a space where I share my random thoughts (mostly related to math and science).
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="p-12 rounded-sharp border border-border/20 bg-surface/20 text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-pop/10 flex items-center justify-center">
              <div className="w-4 h-4 bg-pop/40 rounded-full" />
            </div>
            <p className="text-text-muted">No posts yet. Check back soon!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
