import { useEffect, useState } from 'react'
import { z } from 'zod'
import { AxiosError } from 'axios'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { profileService } from '@/services/profile.service'
import { useAppSelector } from '@/store/hooks'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { OtpVerification } from '@/features/profile/components/otp-verification'

const ContactFormSchema = z.object({
  email: z
    .string()
    .email({ message: 'Please enter a valid email.' })
    .optional(),
  phone: z.string().regex(/^\+91\d{10}$/, {
    message: 'Phone number must be in the format +91XXXXXXXXXX',
  }),
})

type ContactFormValues = z.infer<typeof ContactFormSchema>

interface OtpDialogState {
  isOpen: boolean
  type: 'email' | 'phone'
  identifier: string
  field: string
  value: string
  onSuccess: () => void
}

export default function ContactForm() {
  const user = useAppSelector((state) => state.user.user)
  const [loading, setLoading] = useState(false)
  const [otpDialog, setOtpDialog] = useState<OtpDialogState | null>(null)

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      email: '',
      phone: '',
    },
    mode: 'onChange',
  })

  useEffect(() => {
    if (user) {
      form.reset({
        email: user.email ?? '',
        phone: user.phone ?? '',
      })
    }
    setLoading(false)
  }, [user, form])

  const handleOtpSuccess = () => {
    setOtpDialog(null)
  }

  const handleUpdate: SubmitHandler<ContactFormValues> = async (data) => {
    try {
      setLoading(true)

      if (data.email !== user?.email || data.phone !== user?.phone) {
        const field = data.email !== user?.email ? 'email' : 'phone'
        const value = field === 'email' ? data.email : data.phone

        if (value) {
          const response = await profileService.requestUpdate({
            updates: { [field]: value },
            type: 'OTP_REQUIRED',
          })

          if (response.data.success && response.data.data?.requiresOtp) {
            setOtpDialog({
              isOpen: true,
              type: field as 'email' | 'phone',
              identifier: value,
              field,
              value,
              onSuccess: handleOtpSuccess,
            })
          }
        }
      } else {
        toast.info('No changes detected')
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>
      toast.error(
        axiosError.response?.data?.message || 'Failed to initiate update'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {otpDialog && (
        <OtpVerification
          isOpen={otpDialog.isOpen}
          onClose={() => setOtpDialog(null)}
          type={otpDialog.type}
          identifier={otpDialog.identifier}
          field={otpDialog.field}
          value={otpDialog.value}
          onSuccess={otpDialog.onSuccess}
        />
      )}

      {loading ? (
        <div className='text-center text-muted-foreground'>
          Loading contact details...
        </div>
      ) : (
        <Form {...form}>
          <form
            id='contact-form'
            onSubmit={form.handleSubmit(handleUpdate)}
            className='space-y-8'
          >
            <div className='grid gap-4 sm:grid-cols-2'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type='email' {...field} />
                    </FormControl>
                    <FormDescription>
                      {user?.emailVerified
                        ? 'Email is verified'
                        : 'Email is not verified'}
                      <br />
                      Changing email requires OTP verification and admin
                      approval
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='phone'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <div className='flex gap-2'>
                        <Input value='+91' disabled className='w-16' />
                        <Input {...field} />
                      </div>
                    </FormControl>
                    <FormDescription>
                      {user?.phoneVerified
                        ? 'Phone is verified'
                        : 'Phone is not verified'}
                      <br />
                      Changing phone number requires OTP verification and admin
                      approval
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type='submit' disabled={loading}>
              Update contact details
            </Button>
          </form>
        </Form>
      )}
    </>
  )
}
