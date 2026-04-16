import React from 'react'
import { render, cleanup, act } from '@testing-library/react'
import { LottieCanvas } from '@/components/home/LottieCanvas'

// Mock lottie-web
const mockDestroy = jest.fn()
const mockRemoveEventListener = jest.fn()
let eventListeners: Record<string, Function> = {}

const mockInstance = {
  destroy: mockDestroy,
  addEventListener: jest.fn((event: string, cb: Function) => {
    eventListeners[event] = cb
  }),
  removeEventListener: mockRemoveEventListener,
  totalFrames: 100,
  goToAndStop: jest.fn(),
}

const mockLoadAnimation = jest.fn(() => mockInstance)

jest.mock('lottie-web', () => ({
  __esModule: true,
  default: {
    loadAnimation: (...args: unknown[]) => mockLoadAnimation(...args),
  },
}))

beforeEach(() => {
  eventListeners = {}
  mockLoadAnimation.mockClear()
  mockDestroy.mockClear()
  mockRemoveEventListener.mockClear()
  mockInstance.addEventListener.mockClear()
  mockInstance.addEventListener.mockImplementation((event: string, cb: Function) => {
    eventListeners[event] = cb
  })
})

afterEach(() => {
  cleanup()
})

function createContainerRef(): React.RefObject<HTMLDivElement> {
  const div = document.createElement('div')
  return { current: div } as React.RefObject<HTMLDivElement>
}

describe('LottieCanvas', () => {
  it('calls loadAnimation with correct config (autoplay: false, loop: false, renderer: svg)', () => {
    const containerRef = createContainerRef()

    render(
      <LottieCanvas
        containerRef={containerRef}
        animationPath="/animations/homepage.json"
      />
    )

    expect(mockLoadAnimation).toHaveBeenCalledWith(
      expect.objectContaining({
        container: containerRef.current,
        renderer: 'svg',
        loop: false,
        autoplay: false,
        path: '/animations/homepage.json',
      })
    )
  })

  it('invokes onReady callback when DOMLoaded event fires', () => {
    const containerRef = createContainerRef()
    const onReady = jest.fn()

    render(
      <LottieCanvas
        containerRef={containerRef}
        animationPath="/animations/homepage.json"
        onReady={onReady}
      />
    )

    // Simulate DOMLoaded event
    expect(eventListeners['DOMLoaded']).toBeDefined()
    eventListeners['DOMLoaded']()

    expect(onReady).toHaveBeenCalledWith(mockInstance)
  })

  it('calls destroy on the lottie instance when unmounting', () => {
    const containerRef = createContainerRef()

    const { unmount } = render(
      <LottieCanvas
        containerRef={containerRef}
        animationPath="/animations/homepage.json"
      />
    )

    unmount()

    expect(mockDestroy).toHaveBeenCalled()
  })

  it('handles data_failed event without crashing', () => {
    const containerRef = createContainerRef()
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})

    render(
      <LottieCanvas
        containerRef={containerRef}
        animationPath="/animations/bad.json"
      />
    )

    // Simulate data_failed event (triggers state update, wrap in act)
    expect(eventListeners['data_failed']).toBeDefined()
    act(() => {
      eventListeners['data_failed']()
    })

    // Should not throw — component handles the error gracefully
    warnSpy.mockRestore()
  })
})
