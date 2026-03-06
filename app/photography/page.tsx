import Lightbox from '@/components/photography/Lightbox'

export default function PhotographyPage() {
  const photos = [
    {
      src: '/photos/photo-1.svg',
      alt: 'Photography sample 1',
      width: 800,
      height: 1200,
    },
    {
      src: '/photos/photo-2.svg',
      alt: 'Photography sample 2',
      width: 1200,
      height: 800,
    },
    {
      src: '/photos/photo-3.svg',
      alt: 'Photography sample 3',
      width: 800,
      height: 800,
    },
    {
      src: '/photos/photo-4.svg',
      alt: 'Photography sample 4',
      width: 800,
      height: 1200,
    },
    {
      src: '/photos/photo-5.svg',
      alt: 'Photography sample 5',
      width: 1200,
      height: 800,
    },
    {
      src: '/photos/photo-6.svg',
      alt: 'Photography sample 6',
      width: 800,
      height: 1200,
    },
  ]

  return (
    <main className="min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h1 className="font-display text-5xl font-bold mb-12">Photography</h1>
        <Lightbox photos={photos} />
      </div>
    </main>
  )
}
