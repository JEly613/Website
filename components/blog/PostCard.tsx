import Link from 'next/link'
import Tag from '@/components/ui/Tag'
import { BlogPost } from '@/types'

interface PostCardProps {
  post: BlogPost
}

export default function PostCard({ post }: PostCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <article className="group">
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="relative p-6 rounded-sharp border border-border/20 bg-surface/30 hover:bg-surface/60 transition-colors overflow-hidden">
          {/* Left accent stripe */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-pop via-accent to-cyan" />

          <div className="pl-4">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-text group-hover:text-accent tracking-tight transition-colors">
              {post.title}
            </h2>

            <div className="flex items-center gap-3 text-sm text-text-muted mt-3">
              <time dateTime={post.date}>{formattedDate}</time>
              <span className="w-1.5 h-1.5 rounded-full bg-pop" />
              <span>{post.readingTime}</span>
            </div>

            <p className="text-text-muted leading-relaxed mt-3">
              {post.description}
            </p>

            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-4">
                {post.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
            )}
          </div>
        </div>
      </Link>
    </article>
  )
}
