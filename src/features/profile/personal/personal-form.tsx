import { useEffect, useState, useRef } from 'react'
import { z } from 'zod'
import { AxiosError } from 'axios'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { profileService } from '@/services/profile.service'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { setUser } from '@/store/userSlice'
import { ImagePlus } from 'lucide-react'
import { toast } from 'sonner'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { EnhancedDatePicker } from '@/components/features/EnhancedDatePicker'

type Title = 'Mr' | 'Ms' | 'Mrs' | 'Dr' | 'CA' | 'CS' | 'Adv'
type Gender = 'male' | 'female' | 'other'

const PersonalFormSchema = z.object({
  profilePicture: z.string().optional(),
  title: z.enum(['Mr', 'Ms', 'Mrs', 'Dr', 'CA', 'CS', 'Adv']).optional(),
  firstName: z
    .string()
    .min(2, { message: 'First name must be at least 2 characters.' }),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .min(2, { message: 'Last name must be at least 2 characters.' }),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Date must be in YYYY-MM-DD format.',
  }),
  age: z.number().min(18, { message: 'Age must be at least 18.' }).max(120),
  gender: z.enum(['male', 'female', 'other'], {
    required_error: 'Please select a gender.',
  }),
})

type PersonalFormValues = z.infer<typeof PersonalFormSchema>

export default function PersonalForm() {
  const user = useAppSelector((state) => state.user.user)
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(true)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const form = useForm<PersonalFormValues>({
    resolver: zodResolver(PersonalFormSchema),
    defaultValues: {
      profilePicture: '',
      title: undefined,
      firstName: '',
      middleName: '',
      lastName: '',
      dateOfBirth: '',
      age: 18,
      gender: 'male',
    },
    mode: 'onChange',
  })

  useEffect(() => {
    if (user) {
      form.reset({
        profilePicture: user.profilePicture?.toString() ?? '',
        title: user.title as Title | undefined,
        firstName: user.firstName,
        middleName: user.middleName,
        lastName: user.lastName,
        dateOfBirth: user.dateOfBirth,
        age: user.age,
        gender: user.gender as Gender,
      })
    }
    setLoading(false)
  }, [user, form])

  const handleUpdate: SubmitHandler<PersonalFormValues> = async (data) => {
    try {
      setLoading(true)

      // Handle profile picture (NON_SENSITIVE, no approval required)
      if (data.profilePicture !== user?.profilePicture) {
        const response = await profileService.requestUpdate({
          updates: { profilePicture: data.profilePicture },
          type: 'NON_SENSITIVE',
        })

        if (response.data.success && response.data.data) {
          // Update user in context (assuming backend returns updated user)
          dispatch(setUser({ ...user!, profilePicture: data.profilePicture }))
          toast.success('Profile picture updated successfully')
        }
      }

      // Handle personal details (SENSITIVE, requires approval)
      const personalData = {
        title: data.title,
        firstName: data.firstName,
        middleName: data.middleName,
        lastName: data.lastName,
        dateOfBirth: data.dateOfBirth,
        age: data.age,
        gender: data.gender,
      }

      if (
        JSON.stringify(personalData) !==
        JSON.stringify({
          title: user?.title,
          firstName: user?.firstName,
          middleName: user?.middleName,
          lastName: user?.lastName,
          dateOfBirth: user?.dateOfBirth,
          age: user?.age,
          gender: user?.gender,
        })
      ) {
        const response = await profileService.requestUpdate({
          updates: { personal: personalData },
          type: 'SENSITIVE',
        })

        if (response.data.success) {
          toast.success('Personal details update request sent for approval')
        }
      } else {
        toast.info('No changes detected in personal details')
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>
      toast.error(
        axiosError.response?.data?.message ||
          'Failed to update personal details'
      )
    } finally {
      setLoading(false)
    }
  }

  // Custom handler to trigger file input
  const handleAvatarClick = () => {
    fileInputRef.current?.click()
  }

  // Custom handler for file change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result as string
        form.setValue('profilePicture', base64String)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <>
      {loading ? (
        <div className='text-center text-muted-foreground'>
          Loading personal details...
        </div>
      ) : (
        <Form {...form}>
          <form
            id='personal-form'
            onSubmit={form.handleSubmit(handleUpdate)}
            className='space-y-8'
          >
            {/* Modern Profile Picture UI */}
            <div>
              <div
                className='h-36 px-6 py-4'
                style={{
                  background:
                    'radial-gradient(circle, rgba(238, 174, 202, 1) 0%, rgba(148, 187, 233, 1) 100%)',
                }}
              />
              <div className='-mt-14 flex justify-center'>
                <div className='relative'>
                  <Avatar className='h-24 w-24 rounded-full border-4 border-background shadow-lg'>
                    <AvatarImage
                      src={
                        form.watch('profilePicture') ||
                        'https://github.com/shadcn.png'
                      }
                      alt='Profile'
                    />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <button
                    onClick={handleAvatarClick}
                    className='absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80'
                    aria-label='Change profile picture'
                    type='button'
                  >
                    <ImagePlus size={16} />
                  </button>
                  <input
                    type='file'
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className='hidden'
                    accept='image/*'
                  />
                </div>
              </div>
            </div>
            <div className='space-y-4'>
              <div className='space-y-2'>
                <h2 className='text-2xl font-semibold'>Personal Details</h2>
                <p className='text-sm text-muted-foreground'>
                  Update your personal information (requires admin approval, can
                  only be updated every 3 months)
                </p>
              </div>
              <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
                <FormField
                  control={form.control}
                  name='title'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={!!user?.title}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Select title' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value='Mr'>Mr</SelectItem>
                          <SelectItem value='Ms'>Ms</SelectItem>
                          <SelectItem value='Mrs'>Mrs</SelectItem>
                          <SelectItem value='Dr'>Dr</SelectItem>
                          <SelectItem value='CA'>CA</SelectItem>
                          <SelectItem value='CS'>CS</SelectItem>
                          <SelectItem value='Adv'>Adv</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='firstName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='middleName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Middle Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='lastName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='dateOfBirth'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of Birth</FormLabel>
                      <FormControl>
                        <EnhancedDatePicker
                          date={field.value ? new Date(field.value) : undefined}
                          setDate={(date) => {
                            field.onChange(
                              date ? date.toISOString().split('T')[0] : ''
                            )
                          }}
                          minDate={new Date(1900, 0, 1)}
                          maxDate={new Date()}
                          className='w-full'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='age'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age</FormLabel>
                      <FormControl>
                        <Input
                          type='number'
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value, 10))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='gender'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Select gender' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value='male'>Male</SelectItem>
                          <SelectItem value='female'>Female</SelectItem>
                          <SelectItem value='other'>Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Separator className='my-6' />

            <div className='flex justify-end'>
              <Button type='submit' disabled={loading}>
                Update personal details
              </Button>
            </div>
          </form>
        </Form>
      )}
    </>
  )
}
