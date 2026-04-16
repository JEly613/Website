'use client'

import { useRef, useState, useCallback, type ReactNode } from 'react'
import { useScroll } from 'framer-motion'
import type { AnimationItem } from 'lottie-web'
import { useLottieScroll } from '@/lib/useLottieScroll'
import { LottieCanvas } from '@/components/home/LottieCanvas'
import { ScrollOverlay, type OverlaySection } from '@/components/home/ScrollOverlay'

interface ScrollAnimationProps {
  /** Path to the Lottie JSON file relative to /public */
  animationPath: string
  /** Height of the scroll track as a CSS value (e.g. "400vh") */
  scrollTrackHeight?: string
  /** Lerp factor for frame smoothing (0–1, lower = smoother) */
  smoothingFactor?: number
  /** Optional overlay sections rendered on top of the animation */
  overlaySections?: OverlaySection[]
  /** Optional children rendered inside the sticky wrapper on top of the canvas */
  children?: ReactNode
}

export function ScrollAnimation({
  animationPath,
  scrollTrackHeight = '400vh',
  smoothingFactor = 0.05,
  overlaySections,
  children,
}: ScrollAnimationProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [animationInstance, setAnimationInstance] = useState<AnimationItem | null>(null)

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  })

  useLottieScroll(animationInstance, scrollYProgress, smoothingFactor)

  const handleReady = useCallback((instance: AnimationItem) => {
    setAnimationInstance(instance)
  }, [])

  return (
    <div ref={trackRef} style={{ height: scrollTrackHeight }} className="relative">
      <div className="sticky top-0 h-screen w-full relative overflow-hidden">
        <div ref={containerRef} className="absolute inset-0" data-lottie-container />
        <LottieCanvas
          containerRef={containerRef}
          animationPath={animationPath}
          onReady={handleReady}
        />
        {overlaySections && (
          <ScrollOverlay progress={scrollYProgress} sections={overlaySections} />
        )}
        {children}
      </div>
    </div>
  )
}
