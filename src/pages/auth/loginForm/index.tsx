import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from '@tanstack/react-router'
import { Phone } from 'lucide-react'
import bppLogo from '@/assets/logo/bppLogo.png'
import { useAuth } from '@/context/AuthContext'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Toaster } from '@/components/ui/sonner'
import { LoadingButton } from '@/components/features/LoadingButton'
import { PasswordInput } from '@/components/features/password-input'

const loginSchema = z.object({
  identifier: z
    .string()
    .nonempty('Phone number is required')
    .refine((value) => /^\d{10}$/.test(value), {
      message: 'Please enter a valid 10-digit phone number',
    }),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
})

type LoginFormValues = z.infer<typeof loginSchema>

const Login = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: '',
      password: '',
    },
  })

  const { watch, handleSubmit, control } = form
  const identifierValue = watch('identifier')
  const phoneRegex = /^\d{10}$/
  const isPhone = phoneRegex.test(identifierValue)

  async function onSubmit(values: LoginFormValues) {
    try {
      setIsLoading(true)
      let identifier = values.identifier
      if (isPhone) {
        identifier = `+91${identifier}`
      }
      const payload = { phone: identifier, password: values.password }
      await login(payload)
      setTimeout(() => {
        navigate({ to: '/dashboard' })
      }, 2000)
    } catch (_error) {
      // Error handling
    } finally {
      setIsLoading(false)
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
            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                <div className='grid gap-4'>
                  <FormField
                    control={control}
                    name='identifier'
                    render={({ field }) => (
                      <FormItem className='grid gap-2'>
                        <FormLabel htmlFor='identifier'>Phone number</FormLabel>
                        <div className='relative'>
                          <FormControl>
                            <Input
                              id='identifier'
                              placeholder='Enter 10-digit phone number'
                              type='text'
                              autoComplete='username'
                              {...field}
                            />
                          </FormControl>
                          <div className='pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 peer-disabled:opacity-50'>
                            {isPhone && (
                              <Phone
                                size={16}
                                strokeWidth={2}
                                aria-hidden='true'
                              />
                            )}
                          </div>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name='password'
                    render={({ field }) => (
                      <FormItem className='grid gap-2'>
                        <div className='flex items-center justify-between'>
                          <FormLabel htmlFor='password'>Password</FormLabel>
                          <Link
                            to='/forgot-password'
                            className='ml-auto inline-block text-sm underline hover:text-blue-950'
                          >
                            Forgot password?
                          </Link>
                        </div>
                        <FormControl>
                          <PasswordInput
                            id='password'
                            autoComplete='current-password'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <LoadingButton
                    type='submit'
                    className='w-full'
                    variant='default'
                    loading={isLoading}
                    size='sm'
                  >
                    Login
                  </LoadingButton>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
        <div className='mt-3 flex justify-center gap-1 text-sm'>
          <p>Don&apos;t have an account yet?</p>
          <Link to='/sign-up' className='font-semibold underline'>
            Sign up
          </Link>
        </div>
        <Toaster />
      </div>
    </section>
  )
}

export default Login
