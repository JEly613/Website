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
    <div data-section="photography" className="min-h-screen bg-bg text-text">
      <main>
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="mb-12 sm:mb-16">
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-3 tracking-tight">Photography</h1>
            <div className="h-1 w-12 bg-accent rounded-full" />
          </div>
          <Lightbox photos={photos} />
        </div>
      </main>
    </div>
  )
}
