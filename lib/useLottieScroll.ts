'use client'

import { useEffect, useRef } from 'react'
import type { MotionValue } from 'framer-motion'
import type { AnimationItem } from 'lottie-web'
import { lerp, clampFrame, progressToFrame } from '@/lib/scroll-animation'

/**
 * Maps scroll progress to Lottie animation frames using a lerp-based
 * requestAnimationFrame loop for smooth, jitter-free playback.
 *
 * @param animationInstance - The loaded Lottie AnimationItem, or null if not yet ready
 * @param scrollProgress - A Framer Motion MotionValue in [0, 1] tracking scroll position
 * @param smoothingFactor - Lerp factor in (0, 1]; lower = smoother. Defaults to 0.1
 */
export function useLottieScroll(
  animationInstance: AnimationItem | null,
  scrollProgress: MotionValue<number>,
  smoothingFactor: number = 0.1
): void {
  const frameRef = useRef(0)

  useEffect(() => {
    if (!animationInstance) return

    const totalFrames = animationInstance.totalFrames
    if (totalFrames <= 0) return

    let rafId: number

    function tick() {
      const rawProgress = scrollProgress.get()
      const targetFrame = progressToFrame(rawProgress, totalFrames)

      frameRef.current = lerp(frameRef.current, targetFrame, smoothingFactor)

      // Snap to target when close enough to avoid sub-pixel jitter
      if (Math.abs(frameRef.current - targetFrame) < 0.5) {
        frameRef.current = targetFrame
      }

      const clampedFrame = clampFrame(frameRef.current, totalFrames)
      animationInstance!.goToAndStop(clampedFrame, true)

      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(rafId)
  }, [animationInstance, scrollProgress, smoothingFactor])
}
