import type { Metadata } from 'next'
import Lightbox from '@/components/photography/Lightbox'

export const metadata: Metadata = {
  title: 'Photography',
  description: 'Personal photography portfolio showcasing moments captured through my lens.',
  openGraph: {
    title: 'Photography',
    description: 'Personal photography portfolio showcasing moments captured through my lens.',
    images: ['/og/default.svg'],
  },
}

export default function PhotographyPage() {
  const photos = [
    { src: '/photos/photo-1.svg', alt: 'Photography sample 1', width: 800, height: 1200 },
    { src: '/photos/photo-2.svg', alt: 'Photography sample 2', width: 1200, height: 800 },
    { src: '/photos/photo-3.svg', alt: 'Photography sample 3', width: 800, height: 800 },
    { src: '/photos/photo-4.svg', alt: 'Photography sample 4', width: 800, height: 1200 },
    { src: '/photos/photo-5.svg', alt: 'Photography sample 5', width: 1200, height: 800 },
    { src: '/photos/photo-6.svg', alt: 'Photography sample 6', width: 800, height: 1200 },
  ]

  return (
    <div data-section="photography" className="min-h-screen bg-bg text-text relative overflow-hidden">
      {/* Decorative geometry for dark bg */}
      <div className="absolute top-16 right-12 w-48 h-48 border border-accent/10 rounded-full" />
      <div className="absolute top-28 right-24 w-20 h-20 border border-accent-2/10 rounded-full" />
      <div className="absolute bottom-32 left-8 w-24 h-24 bg-accent/5 rotate-45 rounded-sharp" />
      <div className="absolute top-1/2 left-6 w-3 h-3 bg-accent-2/30 rounded-full" />
      <div className="absolute bottom-48 right-16 w-2 h-2 bg-accent/30 rounded-full" />

      <main>
        <div className="max-w-7xl mx-auto px-6 py-16 relative">
          <div className="mb-12 sm:mb-16">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-3 h-3 bg-accent rounded-full" />
              <span className="text-xs font-medium uppercase tracking-widest text-accent-2">Portfolio</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-3 tracking-tight">Photography</h1>
            <div className="flex gap-1">
              <div className="h-1 w-8 bg-accent rounded-full" />
              <div className="h-1 w-4 bg-accent-2 rounded-full" />
              <div className="h-1 w-6 bg-text-muted rounded-full" />
            </div>
          </div>
          <Lightbox photos={photos} />
        </div>
      </main>
    </div>
  )
}
