interface TagProps {
  children: React.ReactNode
}

export default function Tag({ children }: TagProps) {
  return (
    <span className="inline-block px-3 py-1 text-sm bg-surface text-text-muted rounded-full border border-border">
      {children}
    </span>
  )
}
