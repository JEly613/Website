'use client'

import { ScrollAnimation } from '@/components/home/ScrollAnimation'

export function HomepageHero() {
  return (
    <ScrollAnimation
      animationPath="/animations/hero.json"
      scrollTrackHeight="300vh"
      smoothingFactor={0.1}
    />
  )
}
