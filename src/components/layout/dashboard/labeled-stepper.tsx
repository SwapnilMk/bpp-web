'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface StepperProps {
  value: number
  onValueChange: (value: number) => void
  separatorWidth?: number
  children: React.ReactNode
  className?: string
}

interface StepperItemProps {
  step: number
  children: React.ReactNode
  className?: string
}

interface StepperTriggerProps {
  asChild?: boolean
  children: React.ReactNode
  className?: string
}

interface StepperTitleProps {
  children: React.ReactNode
  className?: string
}

interface StepperDescriptionProps {
  children: React.ReactNode
  className?: string
}

interface StepperSeparatorProps {
  className?: string
}

const StepperContext = React.createContext<{
  value: number
  onValueChange: (value: number) => void
} | null>(null)

const useStepper = () => {
  const context = React.useContext(StepperContext)
  if (!context) {
    throw new Error('useStepper must be used within a Stepper')
  }
  return context
}

const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  (
    { value, onValueChange, separatorWidth = 100, children, className },
    ref
  ) => {
    return (
      <StepperContext.Provider value={{ value, onValueChange }}>
        <div
          ref={ref}
          className={cn('flex items-center justify-center', className)}
          style={
            {
              '--separator-width': `${separatorWidth}px`,
            } as React.CSSProperties
          }
        >
          {children}
        </div>
      </StepperContext.Provider>
    )
  }
)
Stepper.displayName = 'Stepper'

const StepperItem = React.forwardRef<HTMLDivElement, StepperItemProps>(
  ({ step, children, className }, ref) => {
    const { value } = useStepper()
    const isCompleted = step < value
    const isActive = step === value

    return (
      <div
        ref={ref}
        className={cn(
          'group/step flex items-center',
          isCompleted && 'data-[state=completed]',
          isActive && 'data-[state=active]',
          className
        )}
        data-state={
          isCompleted ? 'completed' : isActive ? 'active' : 'inactive'
        }
      >
        {children}
      </div>
    )
  }
)
StepperItem.displayName = 'StepperItem'

const StepperTrigger = React.forwardRef<HTMLDivElement, StepperTriggerProps>(
  ({ children, className }, ref) => {
    return (
      <div ref={ref} className={cn('cursor-pointer', className)}>
        {children}
      </div>
    )
  }
)
StepperTrigger.displayName = 'StepperTrigger'

const StepperTitle = React.forwardRef<HTMLHeadingElement, StepperTitleProps>(
  ({ children, className }, ref) => (
    <h3 ref={ref} className={cn('text-sm font-medium', className)}>
      {children}
    </h3>
  )
)
StepperTitle.displayName = 'StepperTitle'

const StepperDescription = React.forwardRef<
  HTMLParagraphElement,
  StepperDescriptionProps
>(({ children, className }, ref) => (
  <p ref={ref} className={cn('text-sm text-muted-foreground', className)}>
    {children}
  </p>
))
StepperDescription.displayName = 'StepperDescription'

const StepperSeparator = React.forwardRef<
  HTMLDivElement,
  StepperSeparatorProps
>(({ className }, ref) => (
  <div
    ref={ref}
    className={cn(
      'mx-4 h-[1px] bg-muted group-data-[state=completed]/step:bg-[#2563ec]',
      className
    )}
    style={{ width: 'var(--separator-width)' }}
  />
))
StepperSeparator.displayName = 'StepperSeparator'

// Attach sub-components to Stepper
const StepperWithSubComponents = Object.assign(Stepper, {
  Item: StepperItem,
  Trigger: StepperTrigger,
  Title: StepperTitle,
  Description: StepperDescription,
  Separator: StepperSeparator,
})

export { StepperWithSubComponents as Stepper }
