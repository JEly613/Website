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
    <main className="min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="mb-12 sm:mb-16">
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">Blog</h1>
          <p className="text-text-muted text-base sm:text-lg">
            Thoughts on physics, photography, and learning in public.
          </p>
        </div>

        {posts.length === 0 ? (
          <p className="text-text-muted">No posts yet. Check back soon!</p>
        ) : (
          <div className="space-y-16">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
