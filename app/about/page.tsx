import type { Metadata } from 'next'
import AboutContent from '@/components/about/AboutContent'

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

      <AboutContent />
    </main>
  )
}
