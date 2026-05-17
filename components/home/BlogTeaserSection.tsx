'use client'

import Link from 'next/link'
import {
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
} from 'react'
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { spring } from '@/lib/animation'
import type { BlogPost } from '@/types'

interface BlogTeaserSectionProps {
  posts: BlogPost[]
}

const WORDMARK = ['B', 'L', 'O', 'G']

/**
 * Final homepage section. Renders in normal flow after the last sticky
 * lottie animation and invites the reader into the blog with an interactive,
 * type-driven layout: an oversized scroll-revealing wordmark, a cursor-tracking
 * gradient blob, magnetic post cards, and an animated tag ticker.
 */
export function BlogTeaserSection({ posts }: BlogTeaserSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)

  // Scroll-linked progress for the giant wordmark reveal.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 85%', 'center center'],
  })

  // Cursor-tracking blob position. Smoothed with a spring so it trails the
  // pointer rather than snapping.
  const pointerX = useMotionValue(0.5)
  const pointerY = useMotionValue(0.5)
  const blobX = useSpring(pointerX, { stiffness: 80, damping: 20, mass: 0.6 })
  const blobY = useSpring(pointerY, { stiffness: 80, damping: 20, mass: 0.6 })
  const blobLeft = useTransform(blobX, (v) => `${v * 100}%`)
  const blobTop = useTransform(blobY, (v) => `${v * 100}%`)

  function handleMouseMove(e: ReactMouseEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    pointerX.set((e.clientX - rect.left) / rect.width)
    pointerY.set((e.clientY - rect.top) / rect.height)
  }

  // Pull the freshest few posts; fall back gracefully if there are fewer.
  const featured = posts.slice(0, 3)
  const tagPool = Array.from(
    new Set(posts.flatMap((p) => p.tags).filter(Boolean))
  ).slice(0, 8)

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      data-section="blog"
      className="relative overflow-hidden bg-bg text-text"
    >
      {/* Cursor-tracking gradient blob */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-3xl"
        style={{
          left: blobLeft,
          top: blobTop,
          background:
            'radial-gradient(circle at 50% 50%, var(--pop) 0%, var(--accent-2) 40%, transparent 70%)',
        }}
      />

      {/* Diagonal corner accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rotate-45 border border-border/20"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-32 left-8 h-3 w-3 rounded-full bg-accent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-32 left-24 h-2 w-24 bg-pop/60"
      />

      <div className="relative mx-auto max-w-7xl px-6 pt-32 pb-40 sm:px-10 lg:px-16">
        <Eyebrow />

        <div className="mt-10 grid gap-16 lg:grid-cols-12 lg:gap-20">
          {/* Wordmark column */}
          <div className="lg:col-span-5">
            <ScrollWordmark progress={scrollYProgress} />

            <p className="mt-10 max-w-md text-lg leading-relaxed text-text-muted">
              Long-form writing on physics, photography, the things I&rsquo;m
              learning in public, and the occasional tangent worth chasing.
            </p>

            <BrushCta />
          </div>

          {/* Posts column */}
          <div className="lg:col-span-7">
            <div className="mb-6 flex items-end justify-between gap-4">
              <h3 className="font-display text-sm uppercase tracking-[0.3em] text-text-muted">
                Latest Posts
              </h3>
              <span className="hidden text-xs uppercase tracking-[0.25em] text-text-muted/60 sm:inline">
                {posts.length > 0
                  ? `${posts.length} ${posts.length === 1 ? 'post' : 'posts'}`
                  : 'New writing soon'}
              </span>
            </div>

            <div className="space-y-4">
              {featured.length === 0 ? (
                <EmptyPostsCard />
              ) : (
                featured.map((post, i) => (
                  <MagneticPostRow key={post.slug} post={post} index={i} />
                ))
              )}
            </div>
          </div>
        </div>

        {tagPool.length > 0 && <TagTicker tags={tagPool} />}
      </div>
    </section>
  )
}

function Eyebrow() {
  return (
    <div className="flex items-center gap-3">
      <span className="h-2 w-2 rounded-full bg-pop" />
      <span className="font-display text-xs uppercase tracking-[0.35em] text-text-muted">
        The Blog
      </span>
      <span className="h-px flex-1 max-w-32 bg-border/30" />
    </div>
  )
}

function ScrollWordmark({
  progress,
}: {
  progress: ReturnType<typeof useScroll>['scrollYProgress']
}) {
  return (
    <h2 className="font-display font-bold tracking-tighter leading-[0.85] text-[clamp(5rem,14vw,11rem)]">
      <span className="sr-only">Blog</span>
      <span aria-hidden="true" className="block">
        {WORDMARK.map((letter, i) => (
          <WordmarkLetter
            key={letter}
            letter={letter}
            index={i}
            total={WORDMARK.length}
            progress={progress}
            highlight={i === WORDMARK.length - 1}
          />
        ))}
      </span>
    </h2>
  )
}

function WordmarkLetter({
  letter,
  index,
  total,
  progress,
  highlight,
}: {
  letter: string
  index: number
  total: number
  progress: ReturnType<typeof useScroll>['scrollYProgress']
  highlight: boolean
}) {
  const start = index / total
  const end = Math.min(start + 0.45, 1)
  // Each letter slides up and fades in over its slice of progress, so the
  // word builds itself as the section enters view.
  const y = useTransform(progress, [start, end], ['55%', '0%'])
  const opacity = useTransform(progress, [start, end], [0, 1])
  const rotate = useTransform(progress, [start, end], [-6, 0])

  return (
    <motion.span className="inline-block" style={{ y, opacity, rotate }}>
      <span className={highlight ? 'text-accent' : ''}>{letter}</span>
    </motion.span>
  )
}

function MagneticPostRow({
  post,
  index,
}: {
  post: BlogPost
  index: number
}) {
  const ref = useRef<HTMLAnchorElement>(null)
  const [isHovered, setHovered] = useState(false)
  // Magnetic offset — title nudges toward the cursor while the row is
  // hovered, then springs back to centre when the cursor leaves.
  const offsetX = useMotionValue(0)
  const offsetY = useMotionValue(0)
  const x = useSpring(offsetX, spring.snappy)
  const y = useSpring(offsetY, spring.snappy)

  function handleMove(e: ReactMouseEvent<HTMLAnchorElement>) {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const dx = (e.clientX - (rect.left + rect.width / 2)) / rect.width
    const dy = (e.clientY - (rect.top + rect.height / 2)) / rect.height
    offsetX.set(dx * 18)
    offsetY.set(dy * 6)
  }

  function handleLeave() {
    setHovered(false)
    offsetX.set(0)
    offsetY.set(0)
  }

  const formatted = formatDate(post.date)

  return (
    <Link
      ref={ref}
      href={`/blog/${post.slug}`}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleLeave}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      className="group relative block overflow-hidden rounded-sharp border border-border/30 bg-surface/60 px-6 py-6 backdrop-blur-sm transition-colors hover:border-accent/60 sm:px-8 sm:py-7"
    >
      {/* Index numeral floating in the background */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-2 -top-6 font-display text-[7rem] font-bold leading-none text-text/5 sm:text-[9rem]"
      >
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Sliding accent fill */}
      <motion.span
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-1 origin-top bg-gradient-to-b from-pop via-accent to-cyan"
        animate={{ scaleY: isHovered ? 1 : 0.35 }}
        transition={spring.snappy}
      />

      <div className="relative flex items-baseline gap-4 text-xs uppercase tracking-[0.25em] text-text-muted">
        <span>{formatted}</span>
        {post.readingTime && (
          <>
            <span className="h-px w-6 bg-border/40" />
            <span>{post.readingTime}</span>
          </>
        )}
      </div>

      <motion.h4
        className="relative mt-3 font-display text-2xl font-bold tracking-tight sm:text-3xl"
        style={{ x, y }}
      >
        {post.title}
      </motion.h4>

      <p className="relative mt-2 max-w-xl text-sm leading-relaxed text-text-muted sm:text-base">
        {post.description}
      </p>

      <div className="relative mt-5 flex flex-wrap items-center gap-2">
        {post.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="rounded-sharp border border-border/30 bg-bg/40 px-2.5 py-1 text-[0.65rem] uppercase tracking-widest text-text-muted"
          >
            {tag}
          </span>
        ))}
        <span className="ml-auto inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-accent transition-colors group-hover:text-pop">
          Read
          <motion.svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={{ x: isHovered ? 4 : 0 }}
            transition={spring.snappy}
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </motion.svg>
        </span>
      </div>
    </Link>
  )
}

function EmptyPostsCard() {
  return (
    <div className="rounded-sharp border border-dashed border-border/40 bg-surface/40 px-8 py-10 text-center">
      <p className="font-display text-lg font-bold tracking-tight">
        New writing in the pipeline.
      </p>
      <p className="mt-2 text-sm text-text-muted">
        Check back soon — or wander the rest of the site in the meantime.
      </p>
    </div>
  )
}

function BrushCta() {
  return (
    <Link
      href="/blog"
      className="group relative mt-10 inline-flex items-center gap-3 overflow-hidden rounded-sharp border border-border/40 bg-text px-6 py-3 font-display text-sm uppercase tracking-[0.25em] text-bg transition-colors hover:border-accent"
    >
      {/* Sliding accent wash on hover */}
      <span
        aria-hidden="true"
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-accent via-pop to-accent-2 transition-transform duration-500 ease-out group-hover:translate-x-0"
      />
      <span className="relative">Read the Blog</span>
      <motion.span
        className="relative inline-flex h-7 w-7 items-center justify-center rounded-sharp border border-bg/30 bg-bg/10"
        whileHover={{ rotate: -8 }}
        transition={spring.snappy}
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M7 17 17 7" />
          <path d="M7 7h10v10" />
        </svg>
      </motion.span>
    </Link>
  )
}

function TagTicker({ tags }: { tags: string[] }) {
  // Duplicate the list so the marquee can wrap seamlessly.
  const doubled = [...tags, ...tags]
  return (
    <div
      aria-hidden="true"
      className="relative mt-24 overflow-hidden border-y border-border/20 py-6"
    >
      <motion.div
        className="flex shrink-0 gap-10 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {doubled.map((tag, i) => (
          <span
            key={`${tag}-${i}`}
            className="inline-flex items-center gap-4 font-display text-3xl font-bold uppercase tracking-tight text-text-muted/70 sm:text-4xl"
          >
            <span className="h-2 w-2 rounded-full bg-accent" />
            {tag}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

function formatDate(value: string) {
  if (!value) return ''
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return value
  return d
    .toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
    .toUpperCase()
}
