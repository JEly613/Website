'use client'

import { useEffect, useState } from 'react'
import lottie from 'lottie-web'
import type { AnimationItem } from 'lottie-web'

interface LottieCanvasProps {
  /** Ref to the DOM element where Lottie renders */
  containerRef: React.RefObject<HTMLDivElement>
  /** Path to animation JSON */
  animationPath: string
  /** Callback fired once animation data is loaded */
  onReady?: (instance: AnimationItem) => void
}

export function LottieCanvas({
  containerRef,
  animationPath,
  onReady,
}: LottieCanvasProps) {
  const [loadFailed, setLoadFailed] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const instance = lottie.loadAnimation({
      container,
      renderer: 'svg',
      loop: false,
      autoplay: false,
      path: animationPath,
    })

    const handleDOMLoaded = () => {
      onReady?.(instance)
    }

    const handleDataFailed = () => {
      setLoadFailed(true)
      if (process.env.NODE_ENV === 'development') {
        console.warn(
          `[LottieCanvas] Failed to load animation: ${animationPath}`
        )
      }
    }

    instance.addEventListener('DOMLoaded', handleDOMLoaded)
    instance.addEventListener('data_failed', handleDataFailed)

    return () => {
      instance.removeEventListener('DOMLoaded', handleDOMLoaded)
      instance.removeEventListener('data_failed', handleDataFailed)
      instance.destroy()
    }
  }, [containerRef, animationPath, onReady])

  if (loadFailed) {
    return null
  }

  return null
}
