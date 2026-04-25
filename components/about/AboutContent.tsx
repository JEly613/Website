'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { spring } from '@/lib/animation'

const blurReveal = {
  hidden: { opacity: 0, filter: 'blur(12px)', y: 16 },
  visible: { opacity: 1, filter: 'blur(0px)', y: 0 },
}

const stats = [
  { value: '7', label: 'Subjects' },
  { value: '40+', label: 'Derivations' },
  { value: '∞', label: 'Curiosity' },
]

export default function AboutContent() {
  return (
    <div className="max-w-5xl mx-auto px-6 pt-20 pb-16 sm:pt-24 sm:pb-24 relative">
      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-12 lg:gap-16">
        {/* Left column — photo, chips, socials (sticky on desktop) */}
        <motion.div
          className="lg:sticky lg:top-24 lg:self-start space-y-6"
          initial="hidden"
          animate="visible"
          variants={blurReveal}
          transition={{ ...spring.gentle, delay: 0 }}
        >
          {/* Profile Photo */}
          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-b from-pop/40 via-accent/30 to-cyan/40 rounded-sharp blur-sm" />
            <div className="relative w-full aspect-square max-w-[280px] rounded-sharp overflow-hidden border-2 border-detail">
              <Image
                src="/profile.svg"
                alt="Profile photo"
                fill
                sizes="280px"
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute -bottom-2 -right-2 w-5 h-5 bg-pop rounded-full border-2 border-bg" />
          </div>

          {/* Chips */}
          <motion.div
            className="flex flex-wrap gap-2"
            variants={blurReveal}
            transition={{ ...spring.gentle, delay: 0.15 }}
          >
            {['Physics', 'Photography', 'Writing'].map((item) => (
              <span
                key={item}
                className="px-3 py-1 text-xs font-medium uppercase tracking-wider rounded-sharp bg-surface border border-cyan/25 text-cyan"
              >
                {item}
              </span>
            ))}
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="flex gap-3"
            variants={blurReveal}
            transition={{ ...spring.gentle, delay: 0.25 }}
          >
            <a
              href="https://github.com/JEly613"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 rounded-sharp bg-surface border border-border/30 text-text hover:text-bg hover:bg-accent-2 hover:border-accent-2 transition-colors"
              aria-label="GitHub"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>
            <a
              href="mailto:jely6@jh.edu"
              className="flex items-center justify-center w-10 h-10 rounded-sharp bg-surface border border-border/30 text-text hover:text-bg hover:bg-pop hover:border-pop transition-colors"
              aria-label="Email"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          </motion.div>
        </motion.div>

        {/* Right column — name, bio, stats */}
        <div className="space-y-8">
          {/* Name */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={blurReveal}
            transition={{ ...spring.gentle, delay: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-3 h-3 bg-accent rounded-full" />
              <span className="text-xs font-medium uppercase tracking-widest text-text-muted">About</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-text tracking-tight">
              Your Name
            </h1>
            <div className="flex gap-1 mt-3">
              <div className="h-1 w-8 bg-accent rounded-full" />
              <div className="h-1 w-4 bg-pop rounded-full" />
              <div className="h-1 w-6 bg-cyan rounded-full" />
            </div>
          </motion.div>

          {/* Bio */}
          <motion.p
            className="text-base sm:text-lg leading-relaxed text-text-muted max-w-xl"
            initial="hidden"
            animate="visible"
            variants={blurReveal}
            transition={{ ...spring.gentle, delay: 0.2 }}
          >
            Bio
          </motion.p>

          {/* Stat highlights */}
          <motion.div
            className="grid grid-cols-3 gap-4 pt-2"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } } }}
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                className="relative rounded-sharp border border-border/20 bg-surface/40 p-5 overflow-hidden"
                variants={blurReveal}
                transition={spring.gentle}
              >
                <div className="absolute top-0 left-0 w-6 h-[2px] bg-cyan/50 rounded-full" />
                <div className="absolute top-0 left-0 w-[2px] h-6 bg-cyan/50 rounded-full" />
                <span className="block font-display text-2xl sm:text-3xl font-bold text-text tracking-tight">
                  {stat.value}
                </span>
                <span className="text-xs font-medium uppercase tracking-widest text-text-muted mt-1 block">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
