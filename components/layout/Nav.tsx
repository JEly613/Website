import Link from 'next/link'

export default function Nav() {
  return (
    <nav className="sticky top-0 z-50 bg-bg/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-display font-semibold text-text hover:text-accent transition-colors">
            JE
          </Link>
          <div className="flex gap-8">
            <Link href="/about" className="text-text hover:text-accent transition-colors">
              About
            </Link>
            <Link href="/notes" className="text-text hover:text-accent transition-colors">
              Notes
            </Link>
            <Link href="/photography" className="text-text hover:text-accent transition-colors">
              Photography
            </Link>
            <Link href="/blog" className="text-text hover:text-accent transition-colors">
              Blog
            </Link>
            <Link href="/contact" className="text-text hover:text-accent transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
