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
import { PercentageAmountInput } from './PercentageAmountInput'
import { fundRequirementSchema, FundRequirementFormValues } from './schema'

interface FundRequirementFormProps {
  onNext: (data: FundRequirementFormValues) => void
  onBack: () => void
}

export function FundRequirementForm({
  onNext,
  onBack,
}: FundRequirementFormProps) {
  const form = useForm<FundRequirementFormValues>({
    resolver: zodResolver(fundRequirementSchema),
  })

  const onSubmit = (data: FundRequirementFormValues) => {
    onNext(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='totalCost'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total Cost</FormLabel>
              <FormControl>
                <Input type='number' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <PercentageAmountInput form={form} name='self' label='Self' />
        <PercentageAmountInput
          form={form}
          name='familyFriends'
          label='Family & Friends'
        />
        <PercentageAmountInput form={form} name='workplace' label='Workplace' />
        <PercentageAmountInput
          form={form}
          name='otherInstitutes'
          label='Other Institutes'
        />
        <FormField
          control={form.control}
          name='totalAmountRequested'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total Amount Requested</FormLabel>
              <FormControl>
                <Input type='number' {...field} />
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
