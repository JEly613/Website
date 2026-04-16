import fc from 'fast-check'
import { lerp, clampFrame, progressToFrame } from '@/lib/scroll-animation'

/**
 * Property-based tests for scroll-animation pure utility functions.
 *
 * **Validates: Requirements 3.2, 3.3, 3.4, 4.1, 4.2, 4.4, 4.5**
 */

describe('progressToFrame', () => {
  /**
   * Property 1 — progressToFrame Boundedness
   * **Validates: Requirements 3.2, 3.3, 3.4**
   *
   * For any progress in [0,1] and totalFrames > 0, the result is a number
   * in [0, totalFrames-1], and endpoints map correctly (0→0, 1→totalFrames-1).
   */
  it('should return a value in [0, totalFrames-1] for any valid inputs', () => {
    fc.assert(
      fc.property(
        fc.double({ min: 0, max: 1, noNaN: true }),
        fc.integer({ min: 1, max: 10000 }),
        (progress, totalFrames) => {
          const result = progressToFrame(progress, totalFrames)
          expect(result).toBeGreaterThanOrEqual(0)
          expect(result).toBeLessThanOrEqual(totalFrames - 1)
        }
      )
    )
  })

  it('should map progress=0 to frame 0 for any totalFrames', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 10000 }),
        (totalFrames) => {
          expect(progressToFrame(0, totalFrames)).toBe(0)
        }
      )
    )
  })

  it('should map progress=1 to totalFrames-1 for any totalFrames', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 10000 }),
        (totalFrames) => {
          expect(progressToFrame(1, totalFrames)).toBe(totalFrames - 1)
        }
      )
    )
  })
})


describe('lerp', () => {
  /**
   * Property 2 — lerp Range Boundedness
   * **Validates: Requirement 4.2**
   *
   * For any finite start, end, and factor in (0,1], the result is between
   * min(start,end) and max(start,end), and start===end returns start exactly.
   */
  it('should return a value between min(start,end) and max(start,end)', () => {
    fc.assert(
      fc.property(
        fc.double({ min: -10000, max: 10000, noNaN: true }),
        fc.double({ min: -10000, max: 10000, noNaN: true }),
        fc.double({ min: 0.001, max: 1, noNaN: true }),
        (start, end, factor) => {
          const result = lerp(start, end, factor)
          const lo = Math.min(start, end)
          const hi = Math.max(start, end)
          expect(result).toBeGreaterThanOrEqual(lo)
          expect(result).toBeLessThanOrEqual(hi)
        }
      )
    )
  })

  it('should return start exactly when start === end', () => {
    fc.assert(
      fc.property(
        fc.double({ min: -10000, max: 10000, noNaN: true }),
        fc.double({ min: 0.001, max: 1, noNaN: true }),
        (value, factor) => {
          expect(lerp(value, value, factor)).toBe(value)
        }
      )
    )
  })
})

describe('lerp monotonic convergence', () => {
  /**
   * Property 3 — Monotonic Convergence
   * **Validates: Requirement 4.1**
   *
   * For any start, target, and factor in (0,1], iterating lerp produces a
   * sequence where distance to target decreases monotonically.
   */
  it('should produce monotonically decreasing distance to target', () => {
    fc.assert(
      fc.property(
        fc.double({ min: -10000, max: 10000, noNaN: true }),
        fc.double({ min: -10000, max: 10000, noNaN: true }),
        fc.double({ min: 0.001, max: 1, noNaN: true }),
        (start, target, factor) => {
          let current = start
          const iterations = 20

          for (let i = 0; i < iterations; i++) {
            const prevDistance = Math.abs(current - target)
            current = lerp(current, target, factor)
            const newDistance = Math.abs(current - target)
            expect(newDistance).toBeLessThanOrEqual(prevDistance + 1e-10)
          }
        }
      )
    )
  })
})


describe('clampFrame', () => {
  /**
   * Property 4 — clampFrame Boundedness
   * **Validates: Requirement 4.4**
   *
   * For any frame value and totalFrames > 0, the result is a number
   * in [0, totalFrames-1].
   */
  it('should return a value in [0, totalFrames-1] for any inputs', () => {
    fc.assert(
      fc.property(
        fc.double({ min: -1000, max: 10000, noNaN: true }),
        fc.integer({ min: 1, max: 10000 }),
        (frame, totalFrames) => {
          const result = clampFrame(frame, totalFrames)
          expect(result).toBeGreaterThanOrEqual(0)
          expect(result).toBeLessThanOrEqual(totalFrames - 1)
        }
      )
    )
  })

  /**
   * Property 5 — clampFrame Idempotence
   * **Validates: Requirement 4.5**
   *
   * For any frame value and totalFrames > 0,
   * clampFrame(clampFrame(f,n),n) === clampFrame(f,n).
   */
  it('should be idempotent: applying clampFrame twice equals applying it once', () => {
    fc.assert(
      fc.property(
        fc.double({ min: -1000, max: 10000, noNaN: true }),
        fc.integer({ min: 1, max: 10000 }),
        (frame, totalFrames) => {
          const once = clampFrame(frame, totalFrames)
          const twice = clampFrame(once, totalFrames)
          expect(twice).toBe(once)
        }
      )
    )
  })
})
