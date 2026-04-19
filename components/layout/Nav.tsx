'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { spring } from '@/lib/animation'

export default function Nav() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const links = [
    { href: '/about', label: 'About' },
    { href: '/notes', label: 'Notes' },
    { href: '/projects', label: 'Projects' },
    { href: '/photography', label: 'Photography' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ]

  const isActive = (href: string) => {
    if (href === '/about' && pathname === '/') return true
    return pathname.startsWith(href)
  }

  return (
    <nav className="sticky top-0 z-50 bg-bg/90 backdrop-blur-sm border-b border-border/20">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-xl font-display font-bold text-text tracking-tight hover:text-accent transition-colors"
          >
            JE
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3 py-1.5 text-sm font-medium tracking-wide uppercase transition-colors rounded-sharp ${
                  isActive(link.href)
                    ? 'text-accent'
                    : 'text-text hover:text-accent-2'
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <motion.div
                    layoutId="navIndicator"
                    className="absolute bottom-0 left-1 right-1 h-0.5 bg-accent"
                    transition={spring.snappy}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-text hover:text-accent transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={spring.snappy}
              className="md:hidden overflow-hidden"
            >
              <div className="mt-4 pb-4 flex flex-col gap-2 border-t border-border/20 pt-4">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`px-3 py-2 text-sm font-medium uppercase tracking-wide rounded-sharp transition-colors ${
                      isActive(link.href)
                        ? 'text-accent bg-surface'
                        : 'text-text hover:text-accent-2 hover:bg-surface/50'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}
