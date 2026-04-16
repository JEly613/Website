import { renderHook, cleanup } from '@testing-library/react'
import type { AnimationItem } from 'lottie-web'
import type { MotionValue } from 'framer-motion'
import { useLottieScroll } from '@/lib/useLottieScroll'

// Mock requestAnimationFrame / cancelAnimationFrame
let rafCallbacks: Array<FrameRequestCallback> = []
let rafIdCounter = 0
let cancelledIds: Set<number> = []

beforeEach(() => {
  rafCallbacks = []
  rafIdCounter = 0
  cancelledIds = new Set()

  jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
    const id = ++rafIdCounter
    rafCallbacks.push(cb)
    return id
  })

  jest.spyOn(window, 'cancelAnimationFrame').mockImplementation((id) => {
    cancelledIds.add(id)
  })
})

afterEach(() => {
  cleanup()
  jest.restoreAllMocks()
})

function createMockMotionValue(value: number): MotionValue<number> {
  return { get: () => value } as unknown as MotionValue<number>
}

function createMockAnimationInstance(totalFrames: number): AnimationItem {
  return {
    totalFrames,
    goToAndStop: jest.fn(),
    destroy: jest.fn(),
  } as unknown as AnimationItem
}

describe('useLottieScroll', () => {
  it('starts RAF loop when a valid animation instance is provided', () => {
    const instance = createMockAnimationInstance(100)
    const progress = createMockMotionValue(0)

    renderHook(() => useLottieScroll(instance, progress, 0.1))

    expect(window.requestAnimationFrame).toHaveBeenCalled()
  })

  it('does NOT start RAF loop when instance is null', () => {
    const progress = createMockMotionValue(0)

    renderHook(() => useLottieScroll(null, progress, 0.1))

    expect(window.requestAnimationFrame).not.toHaveBeenCalled()
  })

  it('calls cancelAnimationFrame on cleanup/unmount', () => {
    const instance = createMockAnimationInstance(100)
    const progress = createMockMotionValue(0)

    const { unmount } = renderHook(() => useLottieScroll(instance, progress, 0.1))

    unmount()

    expect(window.cancelAnimationFrame).toHaveBeenCalled()
  })

  it('calls goToAndStop on the animation instance when RAF fires', () => {
    const instance = createMockAnimationInstance(100)
    const progress = createMockMotionValue(0.5)

    renderHook(() => useLottieScroll(instance, progress, 1.0))

    // Fire the RAF callback
    if (rafCallbacks.length > 0) {
      rafCallbacks[0](performance.now())
    }

    expect(instance.goToAndStop).toHaveBeenCalled()
  })

  it('does NOT start RAF loop when totalFrames is 0', () => {
    const instance = createMockAnimationInstance(0)
    const progress = createMockMotionValue(0)

    renderHook(() => useLottieScroll(instance, progress, 0.1))

    // The hook should early-return when totalFrames <= 0
    expect(window.requestAnimationFrame).not.toHaveBeenCalled()
  })
})
