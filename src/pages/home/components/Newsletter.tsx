'use client'

import { useState } from 'react'
import { ArrowRight, LoaderCircle } from 'lucide-react'
import { postData } from '@/services/apiService'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

// Email validation helper
function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

interface NewsletterSectionProps extends React.HTMLAttributes<HTMLElement> {
  onSubscribe?: (email: string) => Promise<{ success: boolean; error?: string }>
  backgroundEffect?: boolean
}

export default function NewsletterSection({
  onSubscribe,
  backgroundEffect = true,
  className,
  ...props
}: NewsletterSectionProps) {
  const [formState, setFormState] = useState({
    email: '',
    status: 'idle' as FormStatus,
    message: '',
  })

  const isLoading = formState.status === 'loading'

  // Default subscribe handler if not provided
  const handleSubscribe = async (email: string) => {
    if (!validateEmail(email)) {
      return { success: false, error: 'Please enter a valid email address.' }
    }
    try {
      await postData<{ success: boolean; error?: string }>(
        '/newsletter/subscribe',
        { email }
      )
      return { success: true }
    } catch (error: unknown) {
      if (error instanceof Error) {
        return { success: false, error: error.message }
      }
      return { success: false, error: 'Failed to subscribe' }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const subscribe = onSubscribe || handleSubscribe
    setFormState((prev) => ({ ...prev, status: 'loading', message: '' }))
    try {
      const result = await subscribe(formState.email)
      if (!result.success) {
        setFormState((prev) => ({
          ...prev,
          status: 'error',
          message: result.error || '',
        }))
      } else {
        setFormState({
          email: '',
          status: 'success',
          message: 'Thanks for subscribing!',
        })
      }
    } catch (error) {
      setFormState((prev) => ({
        ...prev,
        status: 'error',
        message: error instanceof Error ? error.message : 'Failed to subscribe',
      }))
    }
  }

  return (
    <section
      className={cn(
        'relative bg-background text-foreground',
        'overflow-hidden px-4 py-12 md:py-6 lg:py-6',
        className
      )}
      {...props}
    >
      <div className='flex w-full justify-center'>
        <div className='relative w-full max-w-6xl overflow-hidden rounded-xl bg-blue-800 px-4 py-10 sm:px-8'>
          {backgroundEffect && <BackgroundEffect />}
          <div className='relative z-10 mb-6 w-full text-center'>
            <p className='mb-2 text-sm font-medium text-blue-200'>
              Subscribe to our Newsletter
            </p>
            <h2 className='mb-2 text-2xl font-bold text-white sm:text-3xl'>
              Stay Updated with the Latest News
            </h2>
            <div className='text-sm text-blue-100 sm:text-base'>
              Get exclusive updates, news, and more delivered straight to your
              inbox.
            </div>
          </div>
          <form
            onSubmit={handleSubmit}
            className='relative z-10 flex w-full flex-col items-center space-y-4'
          >
            <div className='mx-auto flex w-full flex-col items-center space-y-2'>
              <div className='inline-flex w-full max-w-xl items-center justify-center gap-2'>
                <Input
                  id='subscribe-form'
                  className='flex-1 border-blue-600/65 bg-blue-700/30 text-white placeholder:text-blue-200 md:min-w-64 [&:-webkit-autofill]:bg-blue-700/30 [&:-webkit-autofill]:[-webkit-text-fill-color:#fff] [&:-webkit-autofill]:[transition:background-color_5000000s_ease-in-out_0s]'
                  placeholder='Your email'
                  type='email'
                  value={formState.email}
                  onChange={(e) =>
                    setFormState((prev) => ({ ...prev, email: e.target.value }))
                  }
                  disabled={isLoading}
                  aria-label='Subscribe to the newsletter'
                  required
                />
                <Button
                  type='submit'
                  className='group relative bg-blue-600 text-white hover:bg-blue-700'
                  disabled={isLoading}
                  data-loading={isLoading}
                >
                  <span
                    className={cn(
                      'inline-flex items-center',
                      isLoading && 'text-transparent'
                    )}
                  >
                    Subscribe
                    <ArrowRight
                      className='-me-1 ms-2 h-4 w-4 opacity-60 transition-transform group-hover:translate-x-0.5'
                      aria-hidden='true'
                    />
                  </span>
                  {isLoading && (
                    <div className='absolute inset-0 flex items-center justify-center'>
                      <LoaderCircle
                        className='animate-spin'
                        size={16}
                        strokeWidth={2}
                        aria-hidden='true'
                      />
                    </div>
                  )}
                </Button>
              </div>
              {formState.message && (
                <p
                  className={cn(
                    'mt-2 text-xs',
                    formState.status === 'error'
                      ? 'text-red-400'
                      : 'text-blue-200'
                  )}
                  role='alert'
                  aria-live='polite'
                >
                  {formState.message}
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

function BackgroundEffect() {
  return (
    <div
      className='pointer-events-none absolute -right-64 -top-48'
      aria-hidden='true'
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='856'
        height='745'
        fill='none'
      >
        <g filter='url(#ill-a)'>
          <path
            fill='url(#ill-b)'
            fillRule='evenodd'
            d='m56 88 344 212-166 188L56 88Z'
            clipRule='evenodd'
          />
        </g>
        <g filter='url(#ill-c)'>
          <path
            fill='url(#ill-d)'
            fillRule='evenodd'
            d='m424 257 344 212-166 188-178-400Z'
            clipRule='evenodd'
          />
        </g>
        <defs>
          <linearGradient
            id='ill-b'
            x1='210.5'
            x2='210.5'
            y1='88'
            y2='467'
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor='#fff' stopOpacity='0.64' />
            <stop offset='1' stopColor='#fff' stopOpacity='0' />
          </linearGradient>
          <linearGradient
            id='ill-d'
            x1='578.5'
            x2='578.5'
            y1='257'
            y2='636'
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor='#fff' stopOpacity='0.64' />
            <stop offset='1' stopColor='#fff' stopOpacity='0' />
          </linearGradient>
          <filter
            id='ill-a'
            width='520'
            height='576'
            x='-32'
            y='0'
            colorInterpolationFilters='sRGB'
            filterUnits='userSpaceOnUse'
          >
            <feFlood floodOpacity='0' result='BackgroundImageFix' />
            <feBlend
              in='SourceGraphic'
              in2='BackgroundImageFix'
              result='shape'
            />
            <feGaussianBlur
              result='effect1_foregroundBlur_244_5'
              stdDeviation='44'
            />
          </filter>
          <filter
            id='ill-c'
            width='520'
            height='576'
            x='336'
            y='169'
            colorInterpolationFilters='sRGB'
            filterUnits='userSpaceOnUse'
          >
            <feFlood floodOpacity='0' result='BackgroundImageFix' />
            <feBlend
              in='SourceGraphic'
              in2='BackgroundImageFix'
              result='shape'
            />
            <feGaussianBlur
              result='effect1_foregroundBlur_244_5'
              stdDeviation='44'
            />
          </filter>
        </defs>
      </svg>
    </div>
  )
}
