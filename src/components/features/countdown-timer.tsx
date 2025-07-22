import { useEffect, useRef, useState } from 'react'
import { useAnimate } from 'framer-motion'

// Change this date to your target countdown date
const COUNTDOWN_FROM = '2025-12-31T23:59:59'

const SECOND = 1000
const MINUTE = SECOND * 60
const HOUR = MINUTE * 60
const DAY = HOUR * 24

type Unit = 'Day' | 'Hour' | 'Minute' | 'Second'

export default function ShiftingCountdown() {
  return (
    <section className='flex items-center justify-center bg-background p-4 text-foreground transition-colors duration-500'>
      <div className='flex w-full max-w-7xl items-center bg-transparent'>
        <CountdownItem unit='Day' label='Days' />
        <CountdownItem unit='Hour' label='Hours' />
        <CountdownItem unit='Minute' label='Minutes' />
        <CountdownItem unit='Second' label='Seconds' />
      </div>
    </section>
  )
}

function CountdownItem({ unit, label }: { unit: Unit; label: string }) {
  const { ref, time } = useTimer(unit)
  // For seconds, ensure two digits (00–59)
  const display = unit === 'Second' ? String(time).padStart(2, '0') : time

  return (
    <div className='flex flex-1 flex-col items-center justify-center gap-1 px-2 py-2 md:gap-2 md:py-3'>
      <div className='relative w-full overflow-hidden text-center'>
        <span
          ref={ref}
          className='block font-mono text-3xl font-semibold text-foreground transition-colors duration-500 md:text-5xl lg:text-7xl'
        >
          {display}
        </span>
      </div>
      <span className='text-sm font-light text-muted-foreground transition-colors duration-500 md:text-base lg:text-lg'>
        {label}
      </span>
      <div className='mt-4 h-px w-full bg-border transition-colors duration-500'></div>
    </div>
  )
}

function useTimer(unit: Unit) {
  const [ref, animate] = useAnimate()
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const timeRef = useRef<number>(0)
  const [time, setTime] = useState<number>(0)

  useEffect(() => {
    handleCountdown()
    intervalRef.current = setInterval(handleCountdown, 1000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleCountdown = async () => {
    const end = new Date(COUNTDOWN_FROM)
    const now = new Date()
    const distance = end.getTime() - now.getTime()

    let newTime = 0
    switch (unit) {
      case 'Day':
        newTime = Math.max(0, Math.floor(distance / DAY))
        break
      case 'Hour':
        newTime = Math.max(0, Math.floor((distance % DAY) / HOUR))
        break
      case 'Minute':
        newTime = Math.max(0, Math.floor((distance % HOUR) / MINUTE))
        break
      default:
        newTime = Math.max(0, Math.floor((distance % MINUTE) / SECOND))
    }

    if (newTime !== timeRef.current) {
      if (ref.current) {
        await animate(
          ref.current,
          { y: ['0%', '-50%'], opacity: [1, 0] },
          { duration: 0.35 }
        )
      }

      timeRef.current = newTime
      setTime(newTime)

      if (ref.current) {
        await animate(
          ref.current,
          { y: ['50%', '0%'], opacity: [0, 1] },
          { duration: 0.35 }
        )
      }
    }
  }

  return { ref, time }
}
