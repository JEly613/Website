export type Topic = { slug: string; title: string; order: number }
export type Chapter = { slug: string; title: string; order: number; topics: Topic[] }
export type Subject = { subject: string; label: string; chapters: Chapter[] }

export const notes: Subject[] = [
  {
    subject: 'classical-mechanics',
    label: 'Classical Mechanics',
    chapters: [
      {
        slug: 'kinematics',
        title: 'Kinematics',
        order: 1,
        topics: [
          { slug: 'kinematics-equations', title: 'The Kinematics Equations', order: 1 },
          { slug: 'range-equation', title: 'The Range Equation', order: 2 },
          { slug: 'trajectory-equation', title: 'The Projectile Trajectory Equation', order: 3 },
        ],
      },
      {
        slug: 'dynamics',
        title: 'Dynamics',
        order: 2,
        topics: [
          { slug: 'extension-of-f-equals-ma', title: 'Extension of F = ma', order: 1 },
          { slug: 'f-equals-dp-dt', title: 'F = dp/dt', order: 2 },
          { slug: 'centripetal-acceleration', title: 'Centripetal Acceleration', order: 3 },
          { slug: 'accelerated-reference-frames', title: 'Accelerated Reference Frames', order: 4 },
          { slug: 'reduced-mass', title: 'Reduced Mass Approach', order: 5 },
          { slug: 'rubber-bands', title: 'Rubber Bands', order: 6 },
        ],
      },
      {
        slug: 'energy-and-momentum',
        title: 'Energy and Momentum',
        order: 3,
        topics: [
          { slug: 'conservative-forces', title: 'Conservative Forces', order: 1 },
          { slug: 'energy-balance', title: 'Energy Balance & Conservation of Energy', order: 2 },
          { slug: 'conservation-of-momentum', title: 'Conservation of Momentum', order: 3 },
          { slug: 'elastic-collisions', title: 'Relative Velocity for Elastic Collisions', order: 4 },
          { slug: 'total-kinetic-energy', title: 'Total Kinetic Energy of Any System', order: 5 },
          { slug: 'two-body-kinetic-energy', title: 'Total Kinetic Energy of a Two-Body System', order: 6 },
          { slug: 'equations-of-motion-from-energy', title: 'Obtaining Equations of Motion Using Energy', order: 7 },
        ],
      },
      {
        slug: 'rotation',
        title: 'Rotation',
        order: 4,
        topics: [
          { slug: 'angular-quantities', title: 'Angular Quantities Are the Same About Any Pivot', order: 1 },
          { slug: 'rotational-ke', title: 'Kinetic Energy of Rigid Bodies', order: 2 },
          { slug: 'parallel-axis-theorem', title: 'Parallel Axis Theorem', order: 3 },
          { slug: 'common-moments-of-inertia', title: 'Common Moments of Inertia', order: 4 },
          { slug: 'perpendicular-axis-theorem', title: 'Perpendicular Axis Theorem', order: 5 },
        ],
      },
      {
        slug: 'gravitation',
        title: 'Gravitation',
        order: 5,
        topics: [
          { slug: 'gravitational-pe', title: 'Gravitational Potential Energy', order: 1 },
          { slug: 'elliptical-orbits', title: 'Energy and Angular Momentum in Elliptical Orbits', order: 2 },
          { slug: 'keplers-second-law', title: "Kepler's Second Law", order: 3 },
          { slug: 'keplers-third-law', title: "Kepler's Third Law", order: 4 },
          { slug: 'shell-theorem', title: 'Shell Theorem', order: 5 },
        ],
      },
      {
        slug: 'oscillations',
        title: 'Oscillations',
        order: 6,
        topics: [
          { slug: 'simple-harmonic-motion', title: 'Simple Harmonic Motion', order: 1 },
          { slug: 'spring-oscillator', title: 'Period of a Spring Oscillator', order: 2 },
          { slug: 'simple-pendulum', title: 'Period of a Simple Pendulum', order: 3 },
          { slug: 'damped-oscillations', title: 'Damped Oscillations', order: 4 },
          { slug: 'quality-factor', title: 'Quality Factor', order: 5 },
          { slug: 'driven-oscillations', title: 'Driven Oscillations', order: 6 },
        ],
      },
      {
        slug: 'fluids',
        title: 'Fluids',
        order: 7,
        topics: [
          { slug: 'hydrostatic-pressure', title: 'Hydrostatic Pressure', order: 1 },
          { slug: 'buoyant-force', title: 'Buoyant Force', order: 2 },
          { slug: 'continuity-equation', title: 'Continuity Equation', order: 3 },
          { slug: 'bernoullis-equation', title: "Bernoulli's Equation", order: 4 },
        ],
      },
    ],
  },
  {
    subject: 'thermodynamics',
    label: 'Thermodynamics',
    chapters: [
      {
        slug: 'statistical-thermodynamics',
        title: 'Statistical Thermodynamics',
        order: 1,
        topics: [
          { slug: 'maxwell-boltzmann', title: 'The Maxwell-Boltzmann Distribution', order: 1 },
          { slug: 'rms-velocity', title: 'Root Mean Square Velocity', order: 2 },
          { slug: 'internal-energy', title: 'Internal Energy', order: 3 },
          { slug: 'ideal-gas-law', title: 'Ideal Gas Law', order: 4 },
        ],
      },
      {
        slug: 'macroscopic-thermodynamics',
        title: 'Macroscopic Thermodynamics',
        order: 2,
        topics: [
          { slug: 'work-on-ideal-gas', title: 'Work Done on an Ideal Gas', order: 1 },
          { slug: 'heat-capacity', title: "Heat Capacity of Gases and Meyer's Relation", order: 2 },
          { slug: 'adiabatic-curve', title: 'The Adiabatic Curve', order: 3 },
          { slug: 'carnots-theorem', title: "Carnot's Theorem", order: 4 },
          { slug: 'carnot-efficiency', title: 'Efficiency of a Carnot Engine', order: 5 },
        ],
      },
    ],
  },
]

// Returns all [subject, chapter, topic] param combos for generateStaticParams
export function getAllTopicParams() {
  return notes.flatMap((s) =>
    s.chapters.flatMap((c) =>
      c.topics.map((t) => ({
        subject: s.subject,
        chapter: c.slug,
        topic: t.slug,
      }))
    )
  )
}

// Finds the Subject object by subject slug
export function getSubject(subject: string): Subject | undefined {
  return notes.find((s) => s.subject === subject)
}

// Finds the Chapter object by subject + chapter slug
export function getChapter(subject: string, chapter: string): Chapter | undefined {
  return getSubject(subject)?.chapters.find((c) => c.slug === chapter)
}

// Finds the Topic object by subject + chapter + topic slug
export function getTopic(subject: string, chapter: string, topic: string): Topic | undefined {
  return getChapter(subject, chapter)?.topics.find((t) => t.slug === topic)
}
