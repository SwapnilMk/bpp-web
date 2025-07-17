import React, { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Slide1 } from './slide1'
import { Slide2 } from './slide2'
import { Slide3 } from './slide3'
import { Slide4 } from './slide4'
import { Slide5 } from './slide5'
import { Slide6 } from './slide6'
import { Slide7 } from './slide7'
import { Slide8 } from './slide8'
import { Slide9 } from './slide9'
import { Slide10 } from './slide10'
import { Slide11 } from './slide11'
import { Slide12 } from './slide12'

const SLIDE_DURATION = 5000

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
  }),
}

export function HomeSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isTouching, setIsTouching] = useState(false)
  const [touchStart, setTouchStart] = useState(0)
  const slides = [
    Slide1,
    Slide2,
    Slide3,
    Slide4,
    Slide5,
    Slide6,
    Slide7,
    Slide8,
    Slide9,
    Slide10,
    Slide11,
    Slide12,
  ]

  const nextSlide = useCallback(() => {
    setDirection(1)
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }, [slides.length])

  const previousSlide = useCallback(() => {
    setDirection(-1)
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }, [slides.length])

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsTouching(true)
    setTouchStart(e.touches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isTouching) return

    const currentTouch = e.touches[0].clientX
    const diff = touchStart - currentTouch

    // Threshold for swipe (50px)
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide()
      } else {
        previousSlide()
      }
      setIsTouching(false)
    }
  }

  const handleTouchEnd = () => {
    setIsTouching(false)
  }

  useEffect(() => {
    if (!isPaused && !isTouching) {
      const timer = setInterval(nextSlide, SLIDE_DURATION)
      return () => clearInterval(timer)
    }
  }, [isPaused, isTouching, nextSlide])

  return (
    <div
      className='relative h-[80vh] w-full overflow-hidden bg-black sm:h-[80vh]'
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial='enter'
          animate='center'
          exit='exit'
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          className='absolute inset-0 h-full w-full'
        >
          {slides[currentSlide] && React.createElement(slides[currentSlide])}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows - Hidden on mobile, visible on larger screens */}
      <div className='hidden md:block'>
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.1 }}
          onClick={previousSlide}
          className='absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white transition-colors duration-300 hover:bg-black/50 md:p-3'
          aria-label='Previous slide'
        >
          <ChevronLeft className='h-4 w-4 md:h-6 md:w-6' />
        </motion.button>

        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.1 }}
          onClick={nextSlide}
          className='absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white transition-colors duration-300 hover:bg-black/50 md:p-3'
          aria-label='Next slide'
        >
          <ChevronRight className='h-4 w-4 md:h-6 md:w-6' />
        </motion.button>
      </div>

      {/* Bullet Navigation - Centered and Responsive */}
      <div className='absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 space-x-2'>
        {slides.map((_, index) => (
          <button
            key={index}
            className={`h-2 rounded-full transition-all duration-300 focus:outline-none ${
              index === currentSlide ? 'w-8 bg-white' : 'w-2 bg-gray-400'
            }`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Pause Indicator - Responsive positioning */}
      <AnimatePresence>
        {isPaused && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className='absolute right-2 top-2 z-10 rounded-full bg-black/30 px-2 py-1 text-xs text-white md:right-4 md:top-4 md:px-3 md:text-sm'
          >
            Paused
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
