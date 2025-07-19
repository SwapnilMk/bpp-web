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

const AddressFormSchema = z.object({
  address: z.object({
    line1: z.string().min(5, { message: 'Address Line 1 is required.' }),
    line2: z.string().optional(),
    cityOrVillage: z
      .string()
      .min(2, { message: 'City or village is required.' }),
    district: z.string().min(2, { message: 'District is required.' }),
    state: z.string().min(2, { message: 'State is required.' }),
    pincode: z
      .string()
      .regex(/^\d{6}$/, { message: 'Pincode must be 6 digits.' }),
  }),
})

type AddressFormValues = z.infer<typeof AddressFormSchema>

export default function AddressForm() {
  const user = useAppSelector((state) => state.user.user)
  const [loading, setLoading] = useState(true)

  const form = useForm<AddressFormValues>({
    resolver: zodResolver(AddressFormSchema),
    defaultValues: {
      address: {
        line1: '',
        line2: '',
        cityOrVillage: '',
        district: '',
        state: '',
        pincode: '',
      },
    },
    mode: 'onChange',
  })

  useEffect(() => {
    if (user && user.address) {
      form.reset({ address: user.address })
    }
    setLoading(false)
  }, [user, form])

  const handleUpdate: SubmitHandler<AddressFormValues> = async (data) => {
    try {
      setLoading(true)

      if (JSON.stringify(data.address) !== JSON.stringify(user?.address)) {
        const response = await profileService.requestUpdate({
          updates: { address: data.address },
          type: 'SENSITIVE',
        })

        if (response.data.success) {
          toast.success('Address update request sent for approval')
        }
      } else {
        toast.info('No changes detected in address')
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>
      toast.error(
        axiosError.response?.data?.message || 'Failed to update address'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {loading ? (
        <div className='text-center text-muted-foreground'>
          Loading address details...
        </div>
      ) : (
        <Form {...form}>
          <form
            id='address-form'
            onSubmit={form.handleSubmit(handleUpdate)}
            className='space-y-8'
          >
            <div className='grid gap-4 sm:grid-cols-2'>
              <FormField
                control={form.control}
                name='address.line1'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address Line 1</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Address changes require admin approval and can only be
                      updated every 3 months
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='address.line2'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address Line 2</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='address.cityOrVillage'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City/Village</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='address.district'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>District</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='address.state'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='address.pincode'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pincode</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type='submit' disabled={loading}>
              Update address
            </Button>
          </form>
        </Form>
      )}
    </>
  )
}
