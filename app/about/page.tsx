import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'About',
  description: 'Physics student, photographer, and writer sharing notes, photos, and thoughts.',
  openGraph: {
    title: 'About',
    description: 'Physics student, photographer, and writer sharing notes, photos, and thoughts.',
    images: ['/og/default.svg'],
  },
}

export default function AboutPage() {
  return (
    <main className="min-h-screen dot-grid-bg relative overflow-hidden">
      {/* Decorative geometric shapes */}
      <div className="absolute top-20 right-10 w-40 h-40 border-2 border-pop/20 rounded-full" />
      <div className="absolute top-32 right-20 w-20 h-20 bg-accent-2/10 rotate-12 rounded-sharp" />
      <div className="absolute bottom-40 left-8 w-32 h-32 border-2 border-cyan/15 rotate-45" />
      <div className="absolute bottom-20 left-24 w-6 h-6 bg-soft-pop/30 rounded-full" />
      <div className="absolute top-1/2 left-4 w-3 h-3 bg-pop/40 rounded-full" />
      <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-accent/30 rounded-full" />

      <div className="max-w-4xl mx-auto px-6 py-16 sm:py-24 relative">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12">
          {/* Profile Photo with colored border accent */}
          <div className="relative flex-shrink-0">
            <div className="absolute -inset-2 bg-gradient-to-b from-pop/40 via-accent/30 to-cyan/40 rounded-sharp blur-sm" />
            <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-sharp overflow-hidden border-2 border-detail">
              <Image
                src="/profile.svg"
                alt="Profile photo"
                fill
                sizes="(max-width: 640px) 160px, 192px"
                className="object-cover"
                priority
              />
            </div>
            {/* Small accent dot */}
            <div className="absolute -bottom-2 -right-2 w-5 h-5 bg-pop rounded-full border-2 border-bg" />
          </div>

          <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
            {/* Name */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-text tracking-tight">
              Your Name
            </h1>

            {/* Multi-color accent bar */}
            <div className="flex gap-1">
              <div className="h-1 w-8 bg-accent rounded-full" />
              <div className="h-1 w-4 bg-pop rounded-full" />
              <div className="h-1 w-6 bg-cyan rounded-full" />
            </div>

            {/* Bio */}
            <p className="text-base sm:text-lg leading-relaxed text-text-muted max-w-2xl">
              Bio
            </p>

            {/* Skill/interest chips */}
            <div className="flex flex-wrap gap-2 pt-1">
              {['Physics', 'Photography', 'Writing'].map((item) => (
                <span key={item} className="px-3 py-1 text-xs font-medium uppercase tracking-wider rounded-sharp bg-surface border border-cyan/25 text-cyan">
                  {item}
                </span>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex gap-3 pt-2">
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
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
