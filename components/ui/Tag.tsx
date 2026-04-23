interface TagProps {
  children: React.ReactNode
}

export default function Tag({ children }: TagProps) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium uppercase tracking-wider bg-cyan/10 text-cyan rounded-sharp border border-cyan/25">
      <span className="w-1.5 h-1.5 rounded-full bg-pop" />
      {children}
    </span>
  )
}
