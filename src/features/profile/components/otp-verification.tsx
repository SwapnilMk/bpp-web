import { useState } from 'react'
import { AxiosError } from 'axios'
import { profileService } from '@/services/profile.service'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'

interface OtpVerificationProps {
  isOpen: boolean
  onClose: () => void
  type: 'email' | 'phone'
  identifier: string
  field: string
  value: string
  onSuccess: () => void
}

export function OtpVerification({
  isOpen,
  onClose,
  type,
  identifier,
  field,
  value,
  onSuccess,
}: OtpVerificationProps) {
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await profileService.verifyOtp({
        field,
        value,
        otp,
      })

      if (response.data.success) {
        toast.success('OTP verified successfully')
        onSuccess()
        onClose()
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>
      toast.error(axiosError.response?.data?.message || 'Failed to verify OTP')
    } finally {
      setLoading(false)
    }
  }

  const handleResendOtp = async () => {
    try {
      setLoading(true)
      const response = await profileService.resendOtp(identifier)

      if (response.data.success) {
        toast.success('OTP resent successfully')
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>
      toast.error(axiosError.response?.data?.message || 'Failed to resend OTP')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Verify OTP</DialogTitle>
          <DialogDescription>
            An OTP has been sent to your {type}: {identifier}. Please enter the
            OTP below to verify.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <Input
            type='text'
            placeholder='Enter OTP'
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            disabled={loading}
          />
          <div className='flex justify-between'>
            <Button
              type='button'
              variant='outline'
              onClick={handleResendOtp}
              disabled={loading}
            >
              Resend OTP
            </Button>
            <Button type='submit' disabled={loading}>
              Verify OTP
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
