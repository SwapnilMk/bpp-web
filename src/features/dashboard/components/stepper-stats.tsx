import { useEffect, useRef } from 'react'
import { useAppSelector } from '@/store/hooks'
import {
  UserIcon,
  CheckCircleIcon,
  CreditCardIcon,
  IdCardIcon,
  TrophyIcon,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Stepper } from '@/components/layout/dashboard/labeled-stepper'

const steps = [
  {
    step: 1,
    icon: UserIcon,
    label: 'Account Created',
    description: 'Your account has been successfully created',
  },
  {
    step: 2,
    icon: CheckCircleIcon,
    label: 'Account Verified',
    description: 'Your account has been verified and approved',
  },
  {
    step: 3,
    icon: CreditCardIcon,
    label: 'Payment Process',
    description: 'Payment processing and notification sent',
  },
  {
    step: 4,
    icon: IdCardIcon,
    label: 'Membership Card',
    description: 'Your membership card has been generated',
  },
  {
    step: 5,
    icon: TrophyIcon,
    label: 'Primary Member',
    description: 'You are now a complete primary member',
  },
]

export const StepperStats = () => {
  const user = useAppSelector((state) => state.user.user)
  const loading = useAppSelector((state) => state.dashboard.isLoading)
  const stepperRef = useRef<HTMLDivElement>(null)
  const currentStepRef = useRef<HTMLDivElement>(null)

  const getCurrentStep = () => {
    if (!user) return 1

    let currentStep = 1

    if (user.status === 'APPROVED') {
      currentStep = 2
    }

    if (
      user.role === 'PRIMARY MEMBER' &&
      user.referralProfile &&
      user.membership
    ) {
      currentStep = 3
    }

    if (
      user.status === 'APPROVED' &&
      user.role === 'PRIMARY MEMBER' &&
      user.membership?.cardUrl &&
      user.profilePicture
    ) {
      currentStep = 4
    }

    if (
      user.status === 'APPROVED' &&
      user.role === 'PRIMARY MEMBER' &&
      user.membership?.cardUrl &&
      user.profilePicture &&
      user.referralProfile
    ) {
      currentStep = 5
    }

    return currentStep
  }

  const currentStep = getCurrentStep()

  // Auto-scroll to current step
  useEffect(() => {
    if (currentStepRef.current && stepperRef.current) {
      const scrollContainer = stepperRef.current
      const targetElement = currentStepRef.current

      // Calculate scroll position to center the current step
      const containerWidth = scrollContainer.offsetWidth
      const targetLeft = targetElement.offsetLeft
      const targetWidth = targetElement.offsetWidth
      const scrollLeft = targetLeft - containerWidth / 2 + targetWidth / 2

      // Smooth scroll to the current step
      scrollContainer.scrollTo({
        left: scrollLeft,
        behavior: 'smooth',
      })
    }
  }, [currentStep])

  if (loading) {
    return (
      <Card className='mb-6 overflow-hidden'>
        <CardContent className='p-4 sm:p-6'>
          <div className='scrollbar-none w-full overflow-x-auto'>
            <div className='inline-flex space-x-4 sm:w-max sm:space-x-2'>
              {steps.map(({ step }) => (
                <div
                  key={step}
                  className='flex flex-1 items-center sm:min-w-[150px]'
                >
                  <Skeleton className='size-8 rounded-lg bg-muted' />
                  <div className='ml-2 space-y-1'>
                    <Skeleton className='h-4 w-24 bg-muted' />
                    <Skeleton className='h-3 w-32 bg-muted' />
                  </div>
                  {step < steps.length && (
                    <Skeleton className='mx-4 h-[1px] w-20 bg-muted' />
                  )}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className='mb-6 overflow-hidden'>
      <CardContent className='p-4 sm:p-6'>
        <div
          ref={stepperRef}
          className='scrollbar-none w-full overflow-x-auto scroll-smooth [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden'
        >
          <div className='mx-auto w-full min-w-max space-y-8 text-center'>
            <Stepper
              value={currentStep}
              onValueChange={() => {}} // Read-only stepper
              separatorWidth={80}
            >
              {steps.map(({ step, icon: Icon, label, description }, index) => (
                <Stepper.Item
                  key={step}
                  step={step}
                  ref={step === currentStep ? currentStepRef : null}
                >
                  <Stepper.Trigger asChild>
                    <div className='flex flex-col items-center'>
                      <div
                        className={`flex size-8 items-center justify-center rounded-lg p-2 transition-all duration-300 ${
                          step <= currentStep
                            ? 'scale-110 bg-[#2563ec] text-white shadow-lg'
                            : 'scale-100 bg-muted text-muted-foreground'
                        }`}
                      >
                        <Icon className='size-4' />
                      </div>
                      <div className='mt-2 space-y-1 sm:w-32'>
                        <Stepper.Title
                          className={`${
                            step <= currentStep
                              ? 'text-[#2563ec] dark:text-blue-400'
                              : 'text-muted-foreground'
                          } text-xs font-medium transition-colors duration-300 sm:text-sm`}
                        >
                          {label}
                        </Stepper.Title>
                        <Stepper.Description
                          className={`max-sm:hidden ${
                            step <= currentStep
                              ? 'text-[#2563ec]/70 dark:text-blue-400/70'
                              : 'text-muted-foreground/70'
                          } text-xs transition-colors duration-300`}
                        >
                          {description}
                        </Stepper.Description>
                      </div>
                    </div>
                  </Stepper.Trigger>
                  {index < steps.length - 1 && (
                    <Stepper.Separator className='group-data-[state=completed]/step:bg-[#2563ec]' />
                  )}
                </Stepper.Item>
              ))}
            </Stepper>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
