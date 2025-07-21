import { Control, useFormContext } from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { FundRequirementFormValues } from './schema'

interface PercentageAmountInputProps {
  form: { control: Control<FundRequirementFormValues> }
  name: string
  label: string
}

export function PercentageAmountInput({
  form,
  name,
  label,
}: PercentageAmountInputProps) {
  const { watch, setValue } = useFormContext()
  const totalCost = watch('totalCost')

  const handlePercentageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const percentage = parseFloat(e.target.value)
    if (!isNaN(percentage) && !isNaN(totalCost)) {
      const amount = (totalCost * percentage) / 100
      setValue(`${name}Amount`, amount)
    }
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amount = parseFloat(e.target.value)
    if (!isNaN(amount) && !isNaN(totalCost) && totalCost > 0) {
      const percentage = (amount / totalCost) * 100
      setValue(`${name}Percentage`, percentage.toFixed(2))
    }
  }

  return (
    <div className='grid grid-cols-2 gap-4'>
      <FormField
        control={form.control}
        name={`${name}Percentage` as keyof FundRequirementFormValues}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label} (%)</FormLabel>
            <FormControl>
              <Input
                type='number'
                {...field}
                onChange={handlePercentageChange}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`${name}Amount` as keyof FundRequirementFormValues}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label} (Amount)</FormLabel>
            <FormControl>
              <Input type='number' {...field} onChange={handleAmountChange} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}
