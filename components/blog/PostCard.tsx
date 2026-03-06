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
        <div className="space-y-3">
          <h2 className="font-display text-3xl font-semibold text-text group-hover:text-accent transition-colors">
            {post.title}
          </h2>
          
          <div className="flex items-center gap-3 text-sm text-text-muted">
            <time dateTime={post.date}>{formattedDate}</time>
            <span>•</span>
            <span>{post.readingTime}</span>
          </div>

          <p className="text-text-muted leading-relaxed">
            {post.description}
          </p>

          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
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
