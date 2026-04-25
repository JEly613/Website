import Link from 'next/link'

const navColumns = [
  {
    label: 'Explore',
    links: [
      { href: '/about', text: 'About' },
      { href: '/notes', text: 'Notes' },
      { href: '/projects', text: 'Projects' },
    ],
  },
  {
    label: 'More',
    links: [
      { href: '/photography', text: 'Photography' },
      { href: '/blog', text: 'Blog' },
      { href: '/contact', text: 'Contact' },
    ],
  },
]

const socials = [
  {
    href: 'https://github.com/JEly613',
    label: 'GitHub',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    href: 'mailto:jely6@jh.edu',
    label: 'Email',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
]

export default function Footer() {
  return (
    <footer className="mt-24 bg-[#1D2E30] relative overflow-hidden">
      {/* Top gradient border */}
      <div className="h-1 w-full bg-gradient-to-r from-[#F6BD60] via-[#E15A72] to-[#4A99A8]" />

      {/* Geometric accent shapes */}
      <div className="absolute top-0 left-0 w-24 h-24 bg-[#E15A72]/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-12 w-16 h-16 bg-[#F6BD60]/15 rotate-45" />
      <div className="absolute top-1/2 right-1/3 w-2 h-2 rounded-full bg-[#6BD2A6]/40" />

      <div className="max-w-7xl mx-auto px-6 pt-14 pb-8 relative">
        {/* 3-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-8">
          {/* Column 1: Brand */}
          <div>
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-sharp bg-[#F6BD60] text-[#1D2E30] text-sm font-bold">
                J
              </span>
              <span className="font-display text-lg font-bold text-[#F9FBF2] tracking-tight">E</span>
            </Link>
            <p className="text-[#F9FBF2]/50 text-sm leading-relaxed max-w-xs">
              Physics notes, photography, and writing — a personal corner of the internet.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div className="flex gap-12 sm:gap-8 sm:justify-center">
            {navColumns.map((col) => (
              <div key={col.label}>
                <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#F9FBF2]/30 block mb-3">
                  {col.label}
                </span>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-[#F9FBF2]/60 hover:text-[#F6BD60] transition-colors"
                      >
                        {link.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Column 3: Social */}
          <div className="sm:text-right">
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#F9FBF2]/30 block mb-3">
              Connect
            </span>
            <div className="flex gap-2 sm:justify-end">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith('mailto') ? undefined : '_blank'}
                  rel={s.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                  aria-label={s.label}
                  className="flex items-center justify-center w-8 h-8 rounded-sharp border border-[#F9FBF2]/15 text-[#F9FBF2]/50 hover:text-[#F6BD60] hover:border-[#F6BD60]/40 transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-5 border-t border-[#F9FBF2]/10 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E15A72]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#6BD2A6]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#F6BD60]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#4A99A8]" />
          </div>
          <span className="text-[#F9FBF2]/30 text-xs">
            © {new Date().getFullYear()} All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  )
}
