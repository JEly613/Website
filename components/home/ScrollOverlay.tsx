'use client'

import { motion, useTransform, type MotionValue } from 'framer-motion'

export interface OverlaySection {
  /** Label or key for the section */
  id: string
  /** Progress value where this section starts appearing */
  enterAt: number
  /** Progress value where this section finishes disappearing */
  exitAt: number
  /** React node to render */
  content: React.ReactNode
}

interface ScrollOverlayProps {
  /** Current scroll progress 0–1 */
  progress: MotionValue<number>
  /** Array of content sections keyed to progress ranges */
  sections: OverlaySection[]
}

const FADE_BUFFER = 0.02

function OverlaySectionItem({
  section,
  progress,
}: {
  section: OverlaySection
  progress: MotionValue<number>
}) {
  const opacity = useTransform(
    progress,
    [
      section.enterAt - FADE_BUFFER,
      section.enterAt + FADE_BUFFER,
      section.exitAt - FADE_BUFFER,
      section.exitAt + FADE_BUFFER,
    ],
    [0, 1, 1, 0]
  )

  const pointerEvents = useTransform(opacity, (v) =>
    v === 0 ? 'none' : 'auto'
  )

  return (
    <motion.div
      key={section.id}
      className="absolute inset-0 flex items-center justify-end pr-12 md:pr-24"
      style={{ opacity, pointerEvents }}
    >
      {section.content}
    </motion.div>
  )
}

export function ScrollOverlay({ progress, sections }: ScrollOverlayProps) {
  return (
    <div className="absolute inset-0">
      {sections.map((section) => (
        <OverlaySectionItem
          key={section.id}
          section={section}
          progress={progress}
        />
      ))}
    </div>
  )
}
