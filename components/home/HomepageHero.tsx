'use client'

import { motion } from 'framer-motion'
import { spring } from '@/lib/animation'

const chevronTransition = {
  y: {
    repeat: Infinity,
    repeatType: 'loop' as const,
    duration: 2,
    ease: 'easeInOut' as const,
  },
}

export function HomepageHero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <motion.h1
        className="font-display text-6xl font-bold tracking-tight text-text sm:text-8xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={spring.gentle}
      >
        Hi, I&apos;m Justin
      </motion.h1>

      <motion.p
        className="mt-6 max-w-md text-lg text-text-muted"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...spring.gentle, delay: 0.2 }}
      >
        Physics, photography, and everything in between.
      </motion.p>

      <motion.div
        className="absolute bottom-12 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ...spring.gentle, delay: 0.6 }}
      >
        <span className="text-sm text-text-muted">Scroll to explore</span>
        <motion.svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-accent"
          animate={{ y: [0, 10, 0] }}
          transition={chevronTransition}
        >
          <polyline points="6 9 12 15 18 9" />
        </motion.svg>
      </motion.div>
    </section>
  )
}
