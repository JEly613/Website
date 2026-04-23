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
    <header className="mb-8 sm:mb-12">
      <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-text mb-4 sm:mb-6 tracking-tight">
        {title}
      </h1>

      {/* Multi-color accent bar */}
      <div className="flex gap-1 mb-4 sm:mb-6">
        <div className="h-1 w-8 bg-accent rounded-full" />
        <div className="h-1 w-4 bg-pop rounded-full" />
        <div className="h-1 w-6 bg-cyan rounded-full" />
      </div>

      <div className="flex items-center gap-3 text-sm text-text-muted mb-4 sm:mb-6">
        <time dateTime={date}>{formattedDate}</time>
        <span className="w-1.5 h-1.5 rounded-full bg-pop" />
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
