'use client'

import { useState } from 'react'
import Image from 'next/image'
import Masonry from 'react-masonry-css'
import LightboxComponent from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'

interface Photo {
  src: string
  alt: string
  width: number
  height: number
}

interface LightboxProps {
  photos: Photo[]
}

export default function Lightbox({ photos }: LightboxProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [photoIndex, setPhotoIndex] = useState(0)

  const breakpointColumns = {
    default: 3,
    1024: 2,
    640: 1,
  }

  const slides = photos.map((photo) => ({
    src: photo.src,
    alt: photo.alt,
    width: photo.width,
    height: photo.height,
  }))

  return (
    <>
      <Masonry
        breakpointCols={breakpointColumns}
        className="flex -ml-6 w-auto"
        columnClassName="pl-6 bg-clip-padding"
      >
        {photos.map((photo, index) => (
          <div key={index} className="mb-6">
            <button
              onClick={() => {
                setPhotoIndex(index)
                setIsOpen(true)
              }}
              className="relative overflow-hidden rounded-lg w-full cursor-pointer group"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                loading="lazy"
                className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
              />
            </button>
          </div>
        ))}
      </Masonry>

      <LightboxComponent
        open={isOpen}
        close={() => setIsOpen(false)}
        index={photoIndex}
        slides={slides}
        styles={{
          container: { backgroundColor: 'rgba(0, 0, 0, 0.95)' },
        }}
      />
    </>
  )
}
