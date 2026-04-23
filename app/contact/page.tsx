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

      <div className="max-w-2xl mx-auto px-6 py-16 relative">
        <div className="mb-8 sm:mb-12">
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
          <p className="text-text-muted text-base sm:text-lg">
            Have a question or want to work together? Send me a message.
          </p>
        </div>
        <div className="relative p-6 sm:p-8 rounded-sharp bg-surface/40 border border-border/20 overflow-hidden">
          {/* Left gradient stripe */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-pop via-accent to-cyan" />
          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-8 h-1 bg-pop rounded-full" />
          <div className="absolute top-0 left-0 w-1 h-8 bg-pop rounded-full" />
          <div className="absolute bottom-0 right-0 w-8 h-1 bg-cyan rounded-full" />
          <div className="absolute bottom-0 right-0 w-1 h-8 bg-cyan rounded-full" />
          <ContactForm />
        </div>
      </div>
    </main>
  )
}
