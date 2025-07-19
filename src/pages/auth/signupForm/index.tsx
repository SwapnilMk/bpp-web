import { FormEvent, useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from '@tanstack/react-router'
import { useAppDispatch } from '@/store/hooks'
import { register as registerUser, sendOtp, verifyOtp } from '@/store/thunks'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import bpplogo from '@/assets/logo/bppLogo.png'
import { useMultiStepForm } from '@/hooks/useMultiStepForm'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Toaster } from '@/components/ui/sonner'
import { LoadingButton } from '@/components/features/LoadingButton'
import { AddressForm } from './AddressForm'
import { CredentialsForm } from './CredentialsForm'
import { EducationalDetailsForm } from './EducationalDetails'
import { EmailForm } from './EmailForm'
import { OtpVerificationForm } from './OtpVerificationForm'
import { PersonalDetailForm } from './PersonalDetailForm'
import { RegistrationForm } from './RegistrationDetails'
import { RegistrationData } from '@/types/auth'

const INITIAL_DATA: RegistrationData = {
  identifier: '',
  termsAccepted: false,
  partyObjectivesAccepted: false,
  serveCommunityAccepted: false,
  title: '',
  firstName: '',
  middleName: '',
  lastName: '',
  email: '',
  phone: '',
  dateOfBirth: '',
  gender: '',
  age: 0,
  otp: '',
  occupation: '',
  addressLine1: '',
  addressLine2: '',
  cityOrVillage: '',
  area: '',
  district: '',
  state: '',
  pincode: '',
  qualification: '',
  profession: '',
  position: '',
  aadhaarNumber: '',
  aadhaarFront: null,
  aadhaarBack: null,
  voterId: '',
  voterFront: null,
  voterBack: null,
  password: '',
  confirmPassword: '',
  referralCode: '',
  recaptchaToken: '',
  profilePicture: null,
}

const MultiStepForm = () => {
  const [data, setData] = useState<RegistrationData>(INITIAL_DATA)
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(false)

  const handleSendOtp = async (identifier: string) => {
    try {
      setLoading(true)
      await dispatch(sendOtp(identifier)).unwrap()
    } catch (_error) {
      // Error is handled by the thunk with toast
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOtp = async (identifier: string, otp: string) => {
    try {
      setLoading(true)
      await dispatch(verifyOtp({ identifier, otp })).unwrap()
    } catch (_error) {
      // Error is handled by the thunk with toast
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const ref = searchParams.get('ref')
    if (ref) {
      setData((prev) => ({ ...prev, referralCode: ref }))
    }
  }, [location.search])

  const updateFields = (fields: Partial<RegistrationData>) => {
    setData((prev) => ({ ...prev, ...fields }))
  }

  const steps = [
    <EmailForm {...data} updateFields={updateFields} />,
    <OtpVerificationForm {...data} updateFields={updateFields} />,
    <PersonalDetailForm {...data} updateFields={updateFields} />,
    <AddressForm {...data} updateFields={updateFields} />,
    <RegistrationForm {...data} updateFields={updateFields} />,
    ...(data.serveCommunityAccepted
      ? [<EducationalDetailsForm {...data} updateFields={updateFields} />]
      : []),
    <CredentialsForm
      {...data}
      updateFields={updateFields}
      onCaptchaVerified={setIsCaptchaVerified}
    />,
  ]

  const { currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultiStepForm(steps)

  const validateStep = async (stepIndex: number): Promise<boolean> => {
    if (stepIndex === 0) {
      if (!data.termsAccepted || !data.partyObjectivesAccepted) {
        toast.error('Please accept all terms and conditions')
        return false
      }
      if (!/^\d{10}$/.test(data.phone)) {
        toast.error('Please enter a valid 10-digit phone number')
        return false
      }
      try {
        await handleSendOtp(`+91${data.phone}`)
        updateFields({ identifier: `+91${data.phone}` })
        return true
      } catch {
        return false
      }
    }

    if (stepIndex === 1) {
      if (!data.otp || data.otp.length !== 4) {
        toast.error('Please enter a valid 4-digit OTP')
        return false
      }
      try {
        await handleVerifyOtp(data.identifier, data.otp)
        return true
      } catch {
        return false
      }
    }

    if (stepIndex === 2) {
      const requiredFields: (keyof RegistrationData)[] = [
        'title',
        'firstName',
        'lastName',
        'dateOfBirth',
        'age',
        'gender',
        'phone',
        'occupation',
        'profilePicture',
      ]
      const missingFields = requiredFields.filter((field) => !data[field])
      if (missingFields.length > 0) {
        toast.error(`Please fill in: ${missingFields.join(', ')}`)
        return false
      }
      if (
        new Date().getFullYear() - new Date(data.dateOfBirth).getFullYear() <
        18
      ) {
        toast.error('You must be 18 or older to register')
        return false
      }
      if (!/^\d{10}$/.test(data.phone)) {
        toast.error('Please enter a valid 10-digit phone number')
        return false
      }
      return true
    }

    if (stepIndex === 3) {
      const requiredFields: (keyof RegistrationData)[] = [
        'addressLine1',
        'cityOrVillage',
        'area',
        'district',
        'state',
        'pincode',
      ]
      const missingFields = requiredFields.filter((field) => !data[field])
      if (missingFields.length > 0) {
        toast.error(`Please fill in: ${missingFields.join(', ')}`)
        return false
      }
      if (!/^\d{6}$/.test(data.pincode)) {
        toast.error('Please enter a valid 6-digit pincode')
        return false
      }
      return true
    }

    if (stepIndex === 4) {
      const isAadhaarValid =
        data.aadhaarNumber &&
        data.aadhaarFront &&
        data.aadhaarBack &&
        /^\d{12}$/.test(data.aadhaarNumber)
      const isVoterValid =
        data.voterId &&
        data.voterFront &&
        data.voterBack &&
        /^[A-Z]{3}[0-9]{7}$/.test(data.voterId)
      if (!isAadhaarValid && !isVoterValid) {
        toast.error(
          'Please provide either complete Aadhaar or Voter ID details'
        )
        return false
      }
      return true
    }

    if (isLastStep) {
      if (
        !data.password ||
        data.password !== data.confirmPassword ||
        !isCaptchaVerified
      ) {
        toast.error('Please ensure passwords match and CAPTCHA is verified')
        return false
      }
      return true
    }

    return true
  }

  const onSubmitHandler = async (e: FormEvent) => {
    e.preventDefault()
    if (await validateStep(currentStepIndex)) {
      if (isLastStep) {
        try {
          setLoading(true)
          const registrationData = { ...data, phone: `+91${data.phone}` }
          await dispatch(registerUser(registrationData)).unwrap()
          toast.success('Registration Successful! Redirecting to login...', {
            duration: 3000,
          })
          setTimeout(() => navigate({ to: '/sign-in' }), 2000)
        } catch (error) {
          // Error is already handled by the thunk with toast
          // eslint-disable-next-line no-console
          console.error('Registration failed:', error)
        } finally {
          setLoading(false)
        }
      } else {
        next()
      }
    }
  }

  return (
    <section className='flex min-h-screen items-start justify-center bg-background px-4 pt-2 sm:items-center sm:p-8 sm:py-6 md:p-10'>
      <div className='w-full max-w-xl'>
        <Card className='border-0 shadow-none sm:border sm:shadow-md'>
          <CardHeader className='flex flex-col items-center justify-center px-2 pt-2 sm:px-4 sm:pt-6'>
            <img
              src={bpplogo}
              alt='BPP Logo'
              className='w-[90px] rounded-lg object-contain sm:w-[110px]'
            />
            <h2 className='font-Inter text-md font-black text-[#2563ec] sm:text-lg'>
              WELCOME TO
            </h2>
            <h2 className='font-Inter text-xl font-black text-[#e85a32] sm:text-2xl'>
              BHARATIYA POPULAR PARTY
            </h2>
          </CardHeader>
          <CardContent className='px-2 sm:px-6'>
            <form onSubmit={onSubmitHandler}>
              <AnimatePresence mode='wait'>
                <motion.div
                  key={currentStepIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  {step}
                </motion.div>
              </AnimatePresence>
              <div className='mt-4 flex justify-between gap-2'>
                {!isFirstStep && (
                  <Button
                    type='button'
                    size='sm'
                    onClick={back}
                    className='w-full'
                  >
                    Back
                  </Button>
                )}
                <Button
                  type='submit'
                  size='sm'
                  className='w-full'
                  disabled={loading || (isLastStep && !isCaptchaVerified)}
                >
                  {isLastStep ? (
                    <LoadingButton loading={loading}>Register</LoadingButton>
                  ) : currentStepIndex === 1 ? (
                    'Verify OTP'
                  ) : (
                    'Next'
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
        <div className='mt-3 flex justify-center gap-1 text-sm'>
          <Link
            to='/business-sign-up'
            disabled
            className='font-semibold underline'
          >
            sign up as a business
          </Link>{' '}
          <p>or</p>{' '}
          <Link to='/sign-in' className='font-semibold underline'>
            log in
          </Link>
        </div>
        <Toaster />
      </div>
    </section>
  )
}

export default MultiStepForm
