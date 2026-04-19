'use client'

import { ScrollAnimation } from '@/components/home/ScrollAnimation'
import { SectionCard } from '@/components/home/SectionCard'
import type { OverlaySection } from '@/components/home/ScrollOverlay'

const sections: {
  animationPath: string
  overlay: OverlaySection
}[] = [
  {
    animationPath: '/animations/notes.json',
    overlay: {
      id: 'notes',
      enterAt: 0.60,
      exitAt: 0.98,
      content: (
        <SectionCard
          title="Physics Notes"
          description="Handwritten derivations and notes covering classical mechanics, thermodynamics, and more."
          href="/notes"
        />
      ),
    },
  },
  {
    animationPath: '/animations/projects.json',
    overlay: {
      id: 'projects',
      enterAt: 0.85,
      exitAt: 0.98,
      content: (
        <SectionCard
          title="Projects"
          description="A showcase of things I've built — completed work and experiments in progress."
          href="/projects"
        />
      ),
    },
  },
  {
    animationPath: '/animations/photography.json',
    overlay: {
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
  },
  {
    animationPath: '/animations/blog.json',
    overlay: {
      id: 'blog',
      enterAt: 0.3,
      exitAt: 0.8,
      content: (
        <SectionCard
          title="Blog"
          description="Long-form writing on physics, photography, and the things I find interesting."
          href="/blog"
        />
      ),
    },
  },
  {
    animationPath: '/animations/contact.json',
    overlay: {
      id: 'contact',
      enterAt: 0.3,
      exitAt: 0.8,
      content: (
        <SectionCard
          title="Contact"
          description="Want to get in touch? Drop me a message."
          href="/contact"
        />
      ),
    },
  },
]

export function HomepageSections() {
  return (
    <>
      {sections.map((section) => (
        <ScrollAnimation
          key={section.overlay.id}
          animationPath={section.animationPath}
          scrollTrackHeight="300vh"
          overlaySections={[section.overlay]}
        />
      ))}
    </>
  )
}
