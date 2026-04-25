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
    <div className="fixed top-0 left-0 right-0 z-50 px-4 pt-3 pointer-events-none">
      <nav className="max-w-3xl mx-auto pointer-events-auto rounded-full bg-[#1D2E30]/80 backdrop-blur-xl border border-white/10 shadow-lg shadow-black/20">
        <div className="px-5 py-1.5">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="group flex items-center gap-2 text-xl font-display font-bold text-[#F9FBF2] tracking-tight hover:text-[#F6BD60] transition-colors"
            >
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#F6BD60] text-[#1D2E30] text-sm font-bold">
                J
              </span>
              <span>E</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex gap-0.5">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3 py-1.5 text-sm font-medium tracking-wide uppercase transition-colors rounded-full ${
                    isActive(link.href)
                      ? 'text-[#F6BD60]'
                      : 'text-[#F9FBF2]/70 hover:text-[#6BD2A6]'
                  }`}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <motion.div
                      layoutId="navIndicator"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-[#F6BD60] via-[#E15A72] to-[#4A99A8] rounded-full"
                      transition={spring.snappy}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-[#F9FBF2]/70 hover:text-[#F6BD60] transition-colors"
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
              <div className="px-5 pb-4 flex flex-col gap-1 border-t border-white/10 pt-3">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`px-3 py-2 text-sm font-medium uppercase tracking-wide rounded-full transition-colors ${
                      isActive(link.href)
                        ? 'text-[#F6BD60] bg-white/10'
                        : 'text-[#F9FBF2]/70 hover:text-[#6BD2A6] hover:bg-white/5'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  )
}
