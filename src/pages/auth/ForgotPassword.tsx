import { useState, useEffect } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from '@tanstack/react-router'
import { useAppDispatch } from '@/store/hooks'
import { forgotPassword, resetPassword } from '@/store/thunks'
import { Eye, EyeOff, Mail, Phone } from 'lucide-react'
import { toast } from 'sonner'
import bppLogo from '@/assets/logo/bppLogo.png'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Toaster } from '@/components/ui/sonner'

// Form validation schemas
const initialFormSchema = z.object({
  identifier: z
    .string()
    .nonempty('Email or phone number is required')
    .refine(
      (value) => {
        // Email regex that accepts various email formats
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        // Phone regex for 10 digits
        const phoneRegex = /^\d{10}$/

        return emailRegex.test(value) || phoneRegex.test(value)
      },
      {
        message: 'Please enter a valid email address or 10-digit phone number',
      }
    ),
})

const resetFormSchema = z
  .object({
    otp: z.string().length(4, 'OTP must be 4 digits'),
    newPassword: z.string().min(1, 'Password is required'),
    confirmPassword: z.string().min(1, 'Confirm Password is required'),
    showPassword: z.boolean().default(false),
    showConfirmPassword: z.boolean().default(false),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

type InitialFormData = z.infer<typeof initialFormSchema>
type ResetFormData = z.infer<typeof resetFormSchema>

const ResetPassword = () => {
  const dispatch = useAppDispatch()
  // Form states
  const [step, setStep] = useState(1)
  const [contactInfo, setContactInfo] = useState({ type: '', value: '' })

  // Timer states
  const [timer, setTimer] = useState(300) // 5 minutes in seconds
  const [showResend, setShowResend] = useState(false)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  // Form hooks
  const initialForm = useForm<InitialFormData>({
    resolver: zodResolver(initialFormSchema),
    defaultValues: {
      identifier: '',
    },
  })

  const resetForm = useForm<ResetFormData>({
    resolver: zodResolver(resetFormSchema),
    defaultValues: {
      otp: '',
      newPassword: '',
      confirmPassword: '',
      showPassword: false,
      showConfirmPassword: false,
    },
  })

  const { watch } = initialForm
  const identifierValue = watch('identifier')
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  const phoneRegex = /^\d{10}$/
  const isEmail = emailRegex.test(identifierValue)
  const isPhone = phoneRegex.test(identifierValue)

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined

    if (step === 2 && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1)
      }, 1000)
    } else if (timer === 0) {
      setShowResend(true)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [step, timer])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  // Handle initial form submit (email/phone)
  const handleInitialSubmit = async (data: InitialFormData) => {
    try {
      setLoading(true)

      const identifier = data.identifier.trim()
      const isEmailInput = emailRegex.test(identifier)

      const payload = isEmailInput
        ? { email: identifier }
        : { phone: `+91${identifier}` }

      await dispatch(forgotPassword(payload)).unwrap()

      setContactInfo({
        type: isEmailInput ? 'email' : 'phone',
        value: identifier,
      })
      setStep(2)
      setTimer(300) // Reset timer to 5 minutes
      setShowResend(false)
      toast.success('OTP sent successfully')
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error('Failed to send OTP. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  // Handle resend OTP
  const handleResendOTP = async () => {
    try {
      setLoading(true)
      const payload =
        contactInfo.type === 'email'
          ? { email: contactInfo.value }
          : { phone: `+91${contactInfo.value}` }
      await dispatch(forgotPassword(payload)).unwrap()

      setTimer(300) // Reset timer to 5 minutes
      setShowResend(false)
      toast.success('OTP resent successfully')
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error('Failed to resend OTP. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  // Handle password reset form submit
  const handleResetSubmit = async (data: ResetFormData) => {
    try {
      setLoading(true)
      const payload = {
        otp: data.otp,
        newPassword: data.newPassword,
        [contactInfo.type]:
          contactInfo.type === 'email'
            ? contactInfo.value
            : `+91${contactInfo.value}`,
      }

      await dispatch(resetPassword(payload)).unwrap()

      toast.success('Password reset successfully')
      setTimeout(() => navigate({ to: '/sign-in' }), 3000)
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error('Failed to reset password. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className='flex min-h-screen items-start justify-center bg-background px-4 pt-2 sm:items-center sm:p-8 sm:py-6 md:p-10'>
      <div className='w-full max-w-xl'>
        <Card className='border-0 shadow-none sm:border sm:shadow-md'>
          <CardHeader className='flex flex-col items-center justify-center px-2 pt-2 sm:px-4 sm:pt-6'>
            <div className='flex flex-col items-center justify-center'>
              <img
                src={bppLogo}
                alt='BPP Logo'
                className='w-[90px] rounded-lg object-contain sm:w-[110px]'
              />
              <h2 className='font-Inter text-md font-black text-[#2563ec] sm:text-lg'>
                WELCOME TO
              </h2>
              <h2 className='font-Inter text-xl font-black text-[#e85a32] sm:text-2xl'>
                BHARATIYA POPULAR PARTY
              </h2>
            </div>
          </CardHeader>
          <CardContent className='px-2 sm:px-6'>
            {step === 1 ? (
              <form
                onSubmit={initialForm.handleSubmit(handleInitialSubmit)}
                className='space-y-4'
              >
                <div>
                  <label className='mb-1 block text-sm font-medium'>
                    Email/Phone number
                  </label>
                  <div className='relative'>
                    <Input
                      type='text'
                      placeholder='Enter email or phone'
                      autoComplete='username'
                      {...initialForm.register('identifier')}
                    />
                    <div className='pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 peer-disabled:opacity-50'>
                      {isEmail && (
                        <Mail size={16} strokeWidth={2} aria-hidden='true' />
                      )}
                      {isPhone && (
                        <Phone size={16} strokeWidth={2} aria-hidden='true' />
                      )}
                    </div>
                  </div>
                  {initialForm.formState.errors.identifier && (
                    <p className='mt-1 text-sm text-red-500'>
                      {initialForm.formState.errors.identifier.message}
                    </p>
                  )}
                </div>
                <Button
                  type='submit'
                  size='sm'
                  className='w-full'
                  disabled={loading}
                >
                  {loading ? 'Sending OTP...' : 'Send OTP'}
                </Button>
              </form>
            ) : (
              <form
                onSubmit={resetForm.handleSubmit(handleResetSubmit)}
                className='space-y-4'
              >
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                  <div>
                    <label className='mb-1 block text-sm font-medium'>
                      {contactInfo.type === 'email' ? 'Email' : 'Phone'}
                    </label>
                    <Input value={contactInfo.value} disabled />
                  </div>
                  <div>
                    <label className='mb-1 block text-sm font-medium'>
                      OTP
                    </label>
                    <Input
                      placeholder='Enter 4-digit OTP'
                      maxLength={4}
                      type='text'
                      inputMode='numeric'
                      {...resetForm.register('otp')}
                    />
                    {resetForm.formState.errors.otp && (
                      <p className='mt-1 text-sm text-red-500'>
                        {resetForm.formState.errors.otp.message}
                      </p>
                    )}
                    <div className='mt-2 flex items-center justify-between text-sm'>
                      <span className='text-muted-foreground'>
                        Time remaining: {formatTime(timer)}
                      </span>
                      {showResend && (
                        <Button
                          type='button'
                          variant='link'
                          className='h-auto p-0 text-blue-600'
                          onClick={handleResendOTP}
                          disabled={loading}
                        >
                          Resend OTP
                        </Button>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className='mb-1 block text-sm font-medium'>
                      New Password
                    </label>
                    <div className='relative'>
                      <Input
                        type={
                          resetForm.watch('showPassword') ? 'text' : 'password'
                        }
                        placeholder='Enter new password'
                        {...resetForm.register('newPassword')}
                      />
                      <Button
                        type='button'
                        variant='ghost'
                        size='icon'
                        className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent'
                        onClick={() =>
                          resetForm.setValue(
                            'showPassword',
                            !resetForm.watch('showPassword')
                          )
                        }
                      >
                        {resetForm.watch('showPassword') ? (
                          <EyeOff size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                      </Button>
                    </div>
                    {resetForm.formState.errors.newPassword && (
                      <p className='mt-1 text-sm text-red-500'>
                        {resetForm.formState.errors.newPassword.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className='mb-1 block text-sm font-medium'>
                      Confirm Password
                    </label>
                    <div className='relative'>
                      <Input
                        type={
                          resetForm.watch('showConfirmPassword')
                            ? 'text'
                            : 'password'
                        }
                        placeholder='Confirm new password'
                        {...resetForm.register('confirmPassword')}
                      />
                      <Button
                        type='button'
                        variant='ghost'
                        size='icon'
                        className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent'
                        onClick={() =>
                          resetForm.setValue(
                            'showConfirmPassword',
                            !resetForm.watch('showConfirmPassword')
                          )
                        }
                      >
                        {resetForm.watch('showConfirmPassword') ? (
                          <EyeOff size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                      </Button>
                    </div>
                    {resetForm.formState.errors.confirmPassword && (
                      <p className='mt-1 text-sm text-red-500'>
                        {resetForm.formState.errors.confirmPassword.message}
                      </p>
                    )}
                  </div>
                </div>
                <Button
                  type='submit'
                  size='sm'
                  className='w-full'
                  disabled={loading}
                >
                  {loading ? 'Resetting Password...' : 'Reset Password'}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
        <div className='mt-3 flex justify-center gap-1 text-sm'>
          <p>Remember your password?</p>
          <Link to='/sign-in' className='font-semibold underline'>
            Log in
          </Link>
        </div>
        <Toaster />
      </div>
    </section>
  )
}

export default ResetPassword
