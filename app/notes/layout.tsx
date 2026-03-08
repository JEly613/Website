export default function NotesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div data-section="notes" className="min-h-screen bg-bg text-text">
      {children}
    </div>
  )
}
