/**
 * Pure utility functions for scroll-driven Lottie animation.
 * These are stateless math helpers used by the useLottieScroll hook.
 */

/**
 * Linear interpolation between two values.
 *
 * @param start - Starting value
 * @param end - Ending value
 * @param factor - Interpolation factor in (0, 1]
 * @returns A value between min(start, end) and max(start, end)
 */
export function lerp(start: number, end: number, factor: number): number {
  if (start === end) return start
  return start + (end - start) * factor
}

/**
 * Clamp a frame number to the valid range [0, totalFrames - 1].
 * Returns a float for sub-frame precision — lottie-web interpolates between keyframes.
 *
 * @param frame - Raw frame number (may be negative or exceed bounds)
 * @param totalFrames - Total number of frames (positive integer)
 * @returns A number in [0, totalFrames - 1]
 */
export function clampFrame(frame: number, totalFrames: number): number {
  return Math.min(Math.max(frame, 0), totalFrames - 1)
}

/**
 * Convert a scroll progress value to a frame number.
 * Returns a float for sub-frame precision on high refresh rate displays.
 *
 * @param progress - Scroll progress in [0, 1]
 * @param totalFrames - Total number of frames (positive integer)
 * @returns A number in [0, totalFrames - 1]
 */
export function progressToFrame(progress: number, totalFrames: number): number {
  return progress * (totalFrames - 1)
}
