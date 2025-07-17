import { useEffect, useState } from 'react'
import { z } from 'zod'
import { AxiosError } from 'axios'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { profileService } from '@/services/profile.service'
import { toast } from 'sonner'
import { useAuth } from '@/context/AuthContext'
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
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { ImageUpload } from '@/features/profile/components/image-upload'

const ProfessionalFormSchema = z.object({
  occupation: z.string().min(2, { message: 'Occupation is required.' }),
  professional: z
    .object({
      qualification: z.string().optional(),
      profession: z.string().optional(),
      position: z.string().optional(),
      category: z.string().optional(),
      yearsOfExperience: z.number().min(0).max(100).optional(),
      summary: z.string().max(500).optional(),
      university: z.string().optional(),
      passoutYear: z
        .number()
        .min(1900)
        .max(new Date().getFullYear())
        .optional(),
      degreeCert: z.string().optional(),
      experienceCert: z.string().optional(),
    })
    .optional(),
})

type ProfessionalFormValues = z.infer<typeof ProfessionalFormSchema>

export default function ProfessionalForm() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)

  const form = useForm<ProfessionalFormValues>({
    resolver: zodResolver(ProfessionalFormSchema),
    defaultValues: {
      occupation: user?.occupation || '',
      professional: user?.professional || {
        qualification: undefined,
        profession: undefined,
        position: undefined,
        category: undefined,
        yearsOfExperience: undefined,
        summary: undefined,
        university: undefined,
        passoutYear: undefined,
        degreeCert: undefined,
        experienceCert: undefined,
      },
    },
    mode: 'onChange',
  })

  useEffect(() => {
    if (user) {
      form.reset({
        occupation: user.occupation,
        professional: user.professional || {
          qualification: undefined,
          profession: undefined,
          position: undefined,
          category: undefined,
          yearsOfExperience: undefined,
          summary: undefined,
          university: undefined,
          passoutYear: undefined,
          degreeCert: undefined,
          experienceCert: undefined,
        },
      })
      setLoading(false)
    }
  }, [user, form])

  const handleUpdate: SubmitHandler<ProfessionalFormValues> = async (data) => {
    try {
      setLoading(true)

      if (
        JSON.stringify(data.professional) !== JSON.stringify(user?.professional)
      ) {
        const response = await profileService.requestUpdate({
          updates: { professional: data.professional },
          type: 'SENSITIVE',
        })

        if (response.data.success) {
          toast.success('Professional details update request sent for approval')
        }
      } else {
        toast.info('No changes detected in professional details')
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>
      toast.error(
        axiosError.response?.data?.message ||
          'Failed to update professional details'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {loading ? (
        <div className='text-center text-muted-foreground'>
          Loading professional details...
        </div>
      ) : (
        <Form {...form}>
          <form
            id='professional-form'
            onSubmit={form.handleSubmit(handleUpdate)}
            className='space-y-8'
          >
            <div className='space-y-4'>
              <div className='space-y-2'>
                <h2 className='text-2xl font-semibold'>Professional Details</h2>
                <p className='text-sm text-muted-foreground'>
                  Update your professional information (requires admin approval,
                  can only be updated every 3 months)
                </p>
              </div>
              <div className='grid gap-4 sm:grid-cols-2'>
                <FormField
                  control={form.control}
                  name='occupation'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Occupation</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='professional.qualification'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Qualification</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='professional.profession'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Profession</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='professional.position'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Position</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='professional.category'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='professional.yearsOfExperience'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Years of Experience</FormLabel>
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
                  name='professional.university'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>University</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='professional.passoutYear'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Passout Year</FormLabel>
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
                  name='professional.summary'
                  render={({ field }) => (
                    <FormItem className='sm:col-span-2'>
                      <FormLabel>Summary</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='professional.degreeCert'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Degree Certificate</FormLabel>
                      <FormControl>
                        <ImageUpload
                          value={field.value}
                          onChange={field.onChange}
                          onRemove={() => field.onChange('')}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='professional.experienceCert'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Experience Certificate</FormLabel>
                      <FormControl>
                        <ImageUpload
                          value={field.value}
                          onChange={field.onChange}
                          onRemove={() => field.onChange('')}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Separator className='my-6' />

            <div className='flex justify-end'>
              <Button type='submit' disabled={loading}>
                Update professional details
              </Button>
            </div>
          </form>
        </Form>
      )}
    </>
  )
}
