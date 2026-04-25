import type { Metadata } from 'next'
import ContactForm from '@/components/ui/ContactForm'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch. Send me a message about physics, photography, or anything else.',
  openGraph: {
    title: 'Contact',
    description: 'Get in touch. Send me a message about physics, photography, or anything else.',
    images: ['/og/default.svg'],
  },
}

export default function ContactPage() {
  return (
    <main className="min-h-screen dot-grid-bg relative overflow-hidden">
      {/* Decorative geometry */}
      <div className="absolute top-20 left-8 w-32 h-32 border-2 border-pop/15 rounded-full" />
      <div className="absolute top-40 right-12 w-16 h-16 bg-accent-2/10 rotate-12 rounded-sharp" />
      <div className="absolute bottom-24 right-8 w-40 h-40 border border-cyan/10 rounded-full" />
      <div className="absolute bottom-40 left-16 w-4 h-4 bg-soft-pop/30 rounded-full" />
      <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-pop/40 rounded-full" />

      <div className="max-w-5xl mx-auto px-6 pt-20 pb-16 relative">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-16 items-start">
          {/* Left column — heading, description, direct links */}
          <div className="lg:sticky lg:top-24 space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 bg-accent-2 rounded-full" />
                <span className="text-xs font-medium uppercase tracking-widest text-cyan">Get in touch</span>
              </div>
              <h1 className="font-display text-4xl sm:text-5xl font-bold mb-3 tracking-tight">Contact</h1>
              <div className="flex gap-1 mb-4">
                <div className="h-1 w-8 bg-accent rounded-full" />
                <div className="h-1 w-4 bg-pop rounded-full" />
                <div className="h-1 w-6 bg-cyan rounded-full" />
              </div>
              <p className="text-text-muted text-base sm:text-lg leading-relaxed">
                Have a question or want to work together? Send me a message through the form, or reach out directly.
              </p>
            </div>

            {/* Direct contact links */}
            <div className="space-y-3 pt-2">
              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-text-muted/60 block">
                Direct
              </span>
              <a
                href="mailto:jely6@jh.edu"
                className="group/link flex items-center gap-3 p-3 rounded-sharp border border-border/20 bg-surface/30 hover:bg-surface/60 transition-colors"
              >
                <span className="flex items-center justify-center w-9 h-9 rounded-sharp bg-pop/10 text-pop group-hover/link:bg-pop group-hover/link:text-bg transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                <div>
                  <span className="text-sm font-medium text-text block">Email</span>
                  <span className="text-xs text-text-muted">jely6@jh.edu</span>
                </div>
              </a>
              <a
                href="https://github.com/JEly613"
                target="_blank"
                rel="noopener noreferrer"
                className="group/link flex items-center gap-3 p-3 rounded-sharp border border-border/20 bg-surface/30 hover:bg-surface/60 transition-colors"
              >
                <span className="flex items-center justify-center w-9 h-9 rounded-sharp bg-accent-2/10 text-accent-2 group-hover/link:bg-accent-2 group-hover/link:text-bg transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </span>
                <div>
                  <span className="text-sm font-medium text-text block">GitHub</span>
                  <span className="text-xs text-text-muted">JEly613</span>
                </div>
              </a>
            </div>
          </div>

          {/* Right column — form card */}
          <div className="relative rounded-sharp bg-surface/40 border border-border/20 overflow-hidden">
            {/* Top gradient bar */}
            <div className="h-1 w-full bg-gradient-to-r from-pop via-accent to-cyan" />
            <div className="p-6 sm:p-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
