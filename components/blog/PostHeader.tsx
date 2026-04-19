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

      <div className="h-1 w-12 bg-accent rounded-full mb-4 sm:mb-6" />

      <div className="flex items-center gap-3 text-sm text-text-muted mb-4 sm:mb-6">
        <time dateTime={date}>{formattedDate}</time>
        <span className="w-1 h-1 rounded-full bg-cyan" />
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
