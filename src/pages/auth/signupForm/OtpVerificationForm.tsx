import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { OtpStyledInput } from '@/components/features/otp-input'
import { FormWrapper } from './components/FormWrapper'

type OtpVerificationData = {
  otp: string
  phone?: string
}

type OtpVerificationProps = OtpVerificationData & {
  updateFields: (fields: Partial<OtpVerificationData>) => void
}

declare global {
  interface Credential {
    code?: string
  }
  interface CredentialRequestOptions {
    otp?: { transport: string[] }
  }
}

export function OtpVerificationForm({
  otp,
  phone,
  updateFields,
}: OtpVerificationProps) {
  const [timer, setTimer] = useState(180)
  const [showResend, setShowResend] = useState(false)
  const { sendOtp } = useAuth()
  const identifier = phone?.startsWith('+91') ? phone : `+91${phone || ''}`

  useEffect(() => {
    if (
      'OTPCredential' in window &&
      /Android|iPhone|iPad/.test(navigator.userAgent)
    ) {
      const abortController = new AbortController()
      navigator.credentials
        .get({
          otp: { transport: ['sms'] },
          signal: abortController.signal,
        } as CredentialRequestOptions)
        .then((otpCredential) => {
          if (otpCredential && otpCredential.code) {
            const otpValue = otpCredential.code.trim()
            if (otpValue.length === 4) {
              // Assuming 4-digit OTP
              updateFields({ otp: otpValue })
            }
          }
        })
        .catch((_err) => {
          // console.error('OTP retrieval failed:', err)
        })
      return () => abortController.abort()
    }
  }, [updateFields])

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          setShowResend(true)
          clearInterval(interval)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleResendOTP = async () => {
    if (!identifier) {
      toast.error('No phone number provided')
      return
    }
    try {
      await sendOtp(identifier)
      setTimer(180)
      setShowResend(false)
      toast.success('OTP resent successfully')
    } catch {
      toast.error('Failed to resend OTP')
    }
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  return (
    <FormWrapper title='OTP Verification'>
      <Label className='text-center'>
        Enter OTP sent to your phone:{' '}
        {phone ? `${phone.slice(0, 2)}******${phone.slice(-2)}` : ''}
      </Label>
      <div className='space-y-4'>
        <OtpStyledInput
          numInputs={4}
          inputType='tel'
          value={otp}
          onChange={(value) => updateFields({ otp: value })}
        />
        <div className='text-center text-sm text-gray-500'>
          Time remaining: {formatTime(timer)}
        </div>
        {showResend && (
          <Button
            type='button'
            variant='link'
            className='w-full text-blue-600'
            onClick={handleResendOTP}
          >
            Resend OTP
          </Button>
        )}
      </div>
    </FormWrapper>
  )
}
