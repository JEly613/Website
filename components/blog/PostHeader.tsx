import Tag from '@/components/ui/Tag'

interface PostHeaderProps {
  title: string
  date: string
  tags: string[]
  readingTime: string
}

export default function PostHeader({ title, date, tags, readingTime }: PostHeaderProps) {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <header className="mb-12">
      <h1 className="font-display text-5xl font-bold text-text mb-6">
        {title}
      </h1>
      
      <div className="flex items-center gap-3 text-sm text-text-muted mb-6">
        <time dateTime={date}>{formattedDate}</time>
        <span>•</span>
        <span>{readingTime}</span>
      </div>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      )}
    </header>
  )
}
