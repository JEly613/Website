interface TagProps {
  children: React.ReactNode
}

export default function Tag({ children }: TagProps) {
  return (
    <span className="inline-block px-3 py-1 text-xs font-medium uppercase tracking-wider bg-surface text-detail rounded-sharp border border-border/30">
      {children}
    </span>
  )
}
