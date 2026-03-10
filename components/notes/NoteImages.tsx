import Image from 'next/image'

interface NoteImagesProps {
  images: string[]
  topicTitle: string
}

export default function NoteImages({ images, topicTitle }: NoteImagesProps) {
  if (!images || images.length === 0) {
    return (
      <div className="py-12 text-center text-text-muted">
        No images available for this topic
      </div>
    )
  }

  return (
    <div className="space-y-0">
      {images.map((imagePath, index) => (
        <div key={imagePath} className="relative w-full">
          <Image
            src={imagePath}
            alt={`${topicTitle} - Page ${index + 1}`}
            width={2048}
            height={2048}
            className="w-full h-auto"
            loading="lazy"
            quality={95}
            style={{ display: 'block' }}
          />
        </div>
      ))}
    </div>
  )
}
