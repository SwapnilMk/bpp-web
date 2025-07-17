'use client'

import { useEffect, useRef, useState } from 'react'
import { useMotionValue, useSpring } from 'framer-motion'
import { cn } from '@/lib/utils'

export default function NumberTicker({
  initialValue = 103786,
  incrementOptions = [2, 3, 4],
  delay = 3, // delay in seconds
  className,
  decimalPlaces = 0,
}: {
  initialValue?: number
  incrementOptions?: number[]
  className?: string
  delay?: number
  decimalPlaces?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const [currentValue, setCurrentValue] = useState(initialValue)
  const motionValue = useMotionValue(initialValue)
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  })

  useEffect(() => {
    // Interval to update the number
    const intervalId = setInterval(() => {
      const randomIncrement =
        incrementOptions[Math.floor(Math.random() * incrementOptions.length)]
      setCurrentValue((prev) => prev + randomIncrement)
    }, delay * 1000)

    return () => clearInterval(intervalId) // Cleanup on unmount
  }, [delay, incrementOptions])

  useEffect(() => {
    // Update motion value whenever currentValue changes
    motionValue.set(currentValue)
  }, [currentValue, motionValue])

  useEffect(() => {
    springValue.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = Intl.NumberFormat('en-US', {
          minimumFractionDigits: decimalPlaces,
          maximumFractionDigits: decimalPlaces,
        }).format(Number(latest.toFixed(decimalPlaces)))
      }
    })
  }, [springValue, decimalPlaces])

  return (
    <span
      className={cn(
        'inline-block tabular-nums tracking-wider text-black dark:text-white',
        className
      )}
      ref={ref}
    />
  )
}
