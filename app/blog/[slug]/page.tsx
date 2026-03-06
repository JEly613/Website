import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAllPosts, getPostBySlug } from '@/lib/blog'
import PostHeader from '@/components/blog/PostHeader'

interface PageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug)

  if (!post || !post.published) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      tags: post.tags,
      images: ['/og/default.svg'],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: ['/og/default.svg'],
    },
  }
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default function BlogPostPage({ params }: PageProps) {
  const post = getPostBySlug(params.slug)

  if (!post || !post.published) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      <article className="max-w-2xl mx-auto px-6 py-12 sm:py-16">
        <PostHeader
          title={post.title}
          date={post.date}
          tags={post.tags}
          readingTime={post.readingTime || ''}
        />

        <div className="prose prose-base sm:prose-lg prose-headings:font-display prose-headings:font-semibold prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-strong:text-text prose-code:text-text prose-code:bg-surface prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none max-w-none">
          <MDXRemote source={post.content} />
        </div>
      </article>
    </main>
  )
}
