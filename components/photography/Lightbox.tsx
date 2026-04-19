'use client'

import { useState } from 'react'
import Image from 'next/image'
import Masonry from 'react-masonry-css'
import { motion } from 'framer-motion'
import LightboxComponent from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import { spring } from '@/lib/animation'

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
        className="flex -ml-4 w-auto"
        columnClassName="pl-4 bg-clip-padding"
      >
        {photos.map((photo, index) => (
          <div key={index} className="mb-4">
            <motion.button
              onClick={() => {
                setPhotoIndex(index)
                setIsOpen(true)
              }}
              whileHover={{ scale: 1.02 }}
              transition={spring.default}
              className="relative overflow-hidden rounded-sharp w-full cursor-pointer border border-border/20"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                loading="lazy"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="w-full h-auto"
              />
            </motion.button>
          </div>
        ))}
      </Masonry>

      <LightboxComponent
        open={isOpen}
        close={() => setIsOpen(false)}
        index={photoIndex}
        slides={slides}
        styles={{
          container: { backgroundColor: 'rgba(29, 46, 48, 0.97)' },
        }}
      />
    </>
  )
}
