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
    <main className="min-h-screen">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <div className="mb-8 sm:mb-12">
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">Contact</h1>
          <p className="text-text-muted text-base sm:text-lg">
            Have a question or want to work together? Send me a message.
          </p>
        </div>
        <ContactForm />
      </div>
    </main>
  )
}
