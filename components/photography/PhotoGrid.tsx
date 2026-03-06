'use client'

import Image from 'next/image'
import Masonry from 'react-masonry-css'

interface Photo {
  src: string
  alt: string
  width: number
  height: number
}

interface PhotoGridProps {
  photos: Photo[]
}

export default function PhotoGrid({ photos }: PhotoGridProps) {
  const breakpointColumns = {
    default: 3,
    1024: 2,
    640: 1,
  }

  return (
    <Masonry
      breakpointCols={breakpointColumns}
      className="flex -ml-6 w-auto"
      columnClassName="pl-6 bg-clip-padding"
    >
      {photos.map((photo, index) => (
        <div key={index} className="mb-6">
          <div className="relative overflow-hidden rounded-lg">
            <Image
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              loading="lazy"
              className="w-full h-auto"
            />
          </div>
        </div>
      ))}
    </Masonry>
  )
}
