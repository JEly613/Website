'use client'

import Image from 'next/image'
import { notes } from '@/lib/notes'
import SubjectRow from '@/components/notes/SubjectRow'
import { motion, useScroll, useTransform } from 'framer-motion'
import { spring } from '@/lib/animation'
import { useRef } from 'react'

interface NotesLandingClientProps {
  introductionContent: React.ReactNode
}

export default function NotesLandingClient({ introductionContent }: NotesLandingClientProps) {
  const titleWords = ['Notes', 'Sorted', 'By', 'Topic']
  const heroRef = useRef<HTMLElement>(null)

  const { scrollY } = useScroll()

  const maxScroll = typeof window !== 'undefined' ? window.innerHeight - 650 : 400
  const titleY = useTransform(scrollY, [0, maxScroll], [0, maxScroll])

  return (
    <main>
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={spring.jentacular}
        className="relative h-screen w-full overflow-hidden"
      >
        <Image
          src="/notes-banner.JPG"
          alt="Physics Notes banner"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-text/40" />

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring.jentacular, delay: 0.2 }}
          style={{ y: titleY, mixBlendMode: 'difference' }}
          className="absolute top-64 left-0 right-0 z-10 font-display text-6xl sm:text-8xl md:text-9xl font-bold text-white text-center tracking-tight"
        >
          Physics Notes
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ...spring.jentacular, delay: 0.6 }}
          className="absolute bottom-28 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-0"
        >
          {[0, 1, 2].map((i) => (
            <motion.svg
              key={i}
              width="48"
              height="20"
              viewBox="0 0 48 20"
              fill="none"
              className="text-bg"
              animate={{ y: [0, 6, 0], opacity: [0.3, 1, 0.3] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.15,
                ease: 'easeInOut',
              }}
            >
              <path
                d="M4 4L24 16L44 4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          ))}
        </motion.div>
      </motion.section>

      {/* Subject Section */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          <div className="lg:w-1/3">
            <div className="lg:sticky lg:top-24">
              {titleWords.map((word, index) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ ...spring.jentacular, delay: index * 0.1 }}
                  className="block font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-text leading-tight tracking-tight"
                >
                  {word}
                </motion.span>
              ))}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ ...spring.jentacular, delay: 0.4 }}
                className="h-1 w-16 bg-accent rounded-full origin-left mt-4"
              />
            </div>
          </div>

          <div className="lg:w-2/3">
            <div className="space-y-0">
              {notes.map((subject, index) => (
                <motion.div
                  key={subject.subject}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ ...spring.jentacular, delay: index * 0.1 }}
                >
                  <SubjectRow
                    subject={subject.subject}
                    chapterCount={subject.chapters.length}
                    href={`/notes/${subject.subject}`}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="max-w-4xl mx-auto px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ ...spring.jentacular, duration: 0.8 }}
          className="prose prose-lg max-w-none"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ ...spring.jentacular, delay: 0.2 }}
            className="h-px bg-border/40 origin-left mb-12"
          />
          {introductionContent}
        </motion.div>
      </section>
    </main>
  )
}
