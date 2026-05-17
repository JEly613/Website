'use client'

import { ScrollAnimation } from '@/components/home/ScrollAnimation'
import { SectionCard } from '@/components/home/SectionCard'
import type { OverlaySection } from '@/components/home/ScrollOverlay'

const lottieSections: {
  animationPath: string
  overlays: OverlaySection[]
}[] = [
  {
    animationPath: '/animations/notes.json',
    overlays: [
      {
        id: 'notes',
        enterAt: 0.5,
        exitAt: 0.65,
        content: (
          <SectionCard
            title="Physics Notes"
            description="Handwritten derivations and notes covering classical mechanics, thermodynamics, and more."
            href="/notes"
          />
        ),
      },
      {
        id: 'projects',
        enterAt: 0.75,
        exitAt: 0.9,
        content: (
          <SectionCard
            title="Projects"
            description="A showcase of things I've built — completed work and experiments in progress."
            href="/projects"
          />
        ),
      },
    ],
  },
  {
    animationPath: '/animations/Photography.json',
    overlays: [
      {
        id: 'photography',
        enterAt: 0.3,
        exitAt: 0.8,
        content: (
          <SectionCard
            title="Photography"
            description="A collection of moments captured through the lens — landscapes, street, and everything in between."
            href="/photography"
          />
        ),
      },
    ],
  },
]

export function HomepageSections() {
  return (
    <>
      {lottieSections.map((section) => (
        <ScrollAnimation
          key={section.overlays[0].id}
          animationPath={section.animationPath}
          scrollTrackHeight="300vh"
          overlaySections={section.overlays}
          seamless
        />
      ))}
    </>
  )
}
