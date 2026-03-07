import { SpringOptions } from 'framer-motion'

export const spring = {
  // Default: smooth and responsive, good for most UI elements
  default: { type: 'spring', stiffness: 300, damping: 30 } as SpringOptions,

  // Gentle: slow and calm, good for page transitions and large elements
  gentle: { type: 'spring', stiffness: 120, damping: 20 } as SpringOptions,

  // Gentle: slow and calm, good for page transitions and large elements
  jentacular: { type: 'spring', stiffness: 120, damping: 30 } as SpringOptions,

  // Snappy: fast and tight, good for hover states and small interactive elements
  snappy: { type: 'spring', stiffness: 500, damping: 40 } as SpringOptions,

  // Bouncy: slight overshoot, good for modals, lightbox open, or playful moments
  bouncy: { type: 'spring', stiffness: 400, damping: 20 } as SpringOptions,
}
