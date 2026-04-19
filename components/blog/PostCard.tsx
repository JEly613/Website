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
        <div className="p-6 rounded-sharp border border-border/20 bg-surface/30 hover:bg-surface/60 transition-colors">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-text group-hover:text-accent tracking-tight transition-colors">
            {post.title}
          </h2>

          <div className="flex items-center gap-3 text-sm text-text-muted mt-3">
            <time dateTime={post.date}>{formattedDate}</time>
            <span className="w-1 h-1 rounded-full bg-cyan" />
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
      </Link>
    </article>
  )
}
