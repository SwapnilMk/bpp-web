import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'
import { caseRegisterSchema, CaseRegistrationFormValues } from './schema'

interface CaseInfoFormProps {
  onNext: (data: CaseRegistrationFormValues) => void
  onBack: () => void
  typeOfSupport: string | null
  category: string | null
}

export function CaseInfoForm({
  onNext,
  onBack,
  typeOfSupport,
  category,
}: CaseInfoFormProps) {
  const form = useForm<CaseRegistrationFormValues>({
    resolver: zodResolver(caseRegisterSchema),
    defaultValues: {
      typeOfSupport: typeOfSupport || '',
      category: category || '',
    },
  })

  const onSubmit = (data: CaseRegistrationFormValues) => {
    onNext(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='typeOfSupport'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type of Support</FormLabel>
              <FormControl>
                <Input {...field} readOnly />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='category'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Input {...field} readOnly />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='typeOfCase'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type of Case</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='dateOfDispute'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date of Dispute</FormLabel>
              <FormControl>
                <Input type='date' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='briefYourCase'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Brief Your Case</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='additionalDocument'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Document</FormLabel>
              <FormControl>
                <Input
                  type='file'
                  name={field.name}
                  ref={field.ref}
                  onChange={(e) => field.onChange(e.target.files)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='financialAid'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Financial Aid</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className='flex space-x-4'
                >
                  <FormItem className='flex items-center space-x-2'>
                    <FormControl>
                      <RadioGroupItem value='yes' />
                    </FormControl>
                    <FormLabel>Yes</FormLabel>
                  </FormItem>
                  <FormItem className='flex items-center space-x-2'>
                    <FormControl>
                      <RadioGroupItem value='no' />
                    </FormControl>
                    <FormLabel>No</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex justify-between'>
          <Button type='button' onClick={onBack}>
            Back
          </Button>
          <Button type='submit'>Next</Button>
        </div>
      </form>
    </Form>
  )
}
