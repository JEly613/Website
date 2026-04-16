import React from 'react'
import { render } from '@testing-library/react'
import { ScrollAnimation } from '@/components/home/ScrollAnimation'

// Mock framer-motion useScroll
const mockScrollYProgress = { get: () => 0 }
jest.mock('framer-motion', () => ({
  useScroll: () => ({ scrollYProgress: mockScrollYProgress }),
  useTransform: jest.fn(() => ({ get: () => 0 })),
  motion: {
    div: React.forwardRef(
      (props: React.HTMLAttributes<HTMLDivElement>, ref: React.Ref<HTMLDivElement>) => (
        <div ref={ref} {...props} />
      )
    ),
  },
}))

// Mock useLottieScroll
jest.mock('@/lib/useLottieScroll', () => ({
  useLottieScroll: jest.fn(),
}))

// Mock LottieCanvas to capture props
let capturedLottieCanvasProps: Record<string, unknown> = {}
jest.mock('@/components/home/LottieCanvas', () => ({
  LottieCanvas: (props: Record<string, unknown>) => {
    capturedLottieCanvasProps = props
    return <div data-testid="lottie-canvas" />
  },
}))

// Mock ScrollOverlay
jest.mock('@/components/home/ScrollOverlay', () => ({
  ScrollOverlay: () => <div data-testid="scroll-overlay" />,
}))

beforeEach(() => {
  capturedLottieCanvasProps = {}
})

describe('ScrollAnimation', () => {
  it('renders scroll track with correct height', () => {
    const { container } = render(
      <ScrollAnimation animationPath="/animations/homepage.json" scrollTrackHeight="500vh" />
    )

    const trackDiv = container.firstElementChild as HTMLElement
    expect(trackDiv.style.height).toBe('500vh')
  })

  it('renders scroll track with default height of 400vh', () => {
    const { container } = render(
      <ScrollAnimation animationPath="/animations/homepage.json" />
    )

    const trackDiv = container.firstElementChild as HTMLElement
    expect(trackDiv.style.height).toBe('400vh')
  })

  it('renders sticky wrapper with correct classes', () => {
    const { container } = render(
      <ScrollAnimation animationPath="/animations/homepage.json" />
    )

    const trackDiv = container.firstElementChild as HTMLElement
    const stickyWrapper = trackDiv.firstElementChild as HTMLElement
    expect(stickyWrapper.classList.contains('sticky')).toBe(true)
    expect(stickyWrapper.classList.contains('top-0')).toBe(true)
    expect(stickyWrapper.classList.contains('h-screen')).toBe(true)
    expect(stickyWrapper.classList.contains('w-full')).toBe(true)
  })

  it('passes animationPath to LottieCanvas', () => {
    render(
      <ScrollAnimation animationPath="/animations/test.json" />
    )

    expect(capturedLottieCanvasProps.animationPath).toBe('/animations/test.json')
  })

  it('passes onReady callback to LottieCanvas', () => {
    render(
      <ScrollAnimation animationPath="/animations/homepage.json" />
    )

    expect(capturedLottieCanvasProps.onReady).toBeDefined()
    expect(typeof capturedLottieCanvasProps.onReady).toBe('function')
  })
})
