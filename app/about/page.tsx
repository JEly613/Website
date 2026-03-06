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
    <main className="min-h-screen flex items-center py-12 sm:py-16">
      <div className="max-w-3xl mx-auto px-6 w-full">
        <div className="flex flex-col items-center text-center space-y-6 sm:space-y-8">
          {/* Profile Photo */}
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-2 border-border">
            <Image
              src="/profile.svg"
              alt="Profile photo"
              fill
              sizes="(max-width: 640px) 128px, 160px"
              className="object-cover"
              priority
            />
          </div>

          {/* Name */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-text">
            Your Name
          </h1>

          {/* Bio */}
          <p className="text-base sm:text-lg leading-relaxed text-text max-w-2xl">
            Bio
          </p>

          {/* Social Links */}
          <div className="flex gap-6 pt-2 sm:pt-4">
            <a
              href="https://github.com/JEly613"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text hover:text-accent transition-colors"
              aria-label="GitHub"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
            </a>

            <a
              href="mailto:jely6@jh.edu"
              className="text-text hover:text-accent transition-colors"
              aria-label="Email"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
