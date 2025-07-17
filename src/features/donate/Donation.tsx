import { useState } from 'react'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Header } from '@/components/layout/dashboard/header'
import { Main } from '@/components/layout/dashboard/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { DonationForm } from './DonationForm'

// Define the form schema with Zod
const customAmountSchema = z.object({
  amount: z
    .string()
    .min(1, 'Amount is required')
    .refine((val) => !isNaN(Number(val)), 'Amount must be a number')
    .refine((val) => Number(val) > 0, 'Amount must be greater than 0')
    .refine((val) => Number(val) <= 1000000, 'Amount cannot exceed 10 lakhs'),
})

type CustomAmountValues = z.infer<typeof customAmountSchema>

const predefinedAmounts = [
  { label: '₹1,000', value: 1000 },
  { label: '₹2,500', value: 2500 },
  { label: '₹5,000', value: 5000 },
  { label: '₹10,000', value: 10000 },
  { label: '₹25,000', value: 25000 },
  { label: '₹50,000', value: 50000 },
]

const DonatePage = () => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
  const [showCustomAmount, setShowCustomAmount] = useState(false)

  // Initialize form with react-hook-form and zod validation
  const form = useForm<CustomAmountValues>({
    resolver: zodResolver(customAmountSchema),
    defaultValues: {
      amount: '',
    },
  })

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount)
    setShowCustomAmount(false)
  }

  const handleCustomAmountSubmit = (data: CustomAmountValues) => {
    const amount = Number(data.amount)
    if (amount > 0 && amount <= 1000000) {
      setSelectedAmount(amount)
      setShowCustomAmount(false)
    } else {
      toast.error('Please enter a valid amount between ₹1 and ₹10,00,000')
    }
  }

  const handleBack = () => {
    setSelectedAmount(null)
    setShowCustomAmount(false)
    form.reset()
  }

  if (selectedAmount !== null) {
    return <DonationForm amount={selectedAmount} onBack={handleBack} />
  }

  return (
    <>
      <Header fixed>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>
      <Main>
        <div className='mx-auto px-4'>
          <div className='mb-6 flex items-center justify-between'>
            <div>
              <h1 className='text-2xl font-bold'>
                Change begins. Donate today.
              </h1>
              <p className='text-muted-foreground'>
                Make a difference in someone's life today.
              </p>
            </div>
          </div>
          <div className='grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-2'>
            <Card className='mx-auto w-full'>
              <CardHeader>
                <CardTitle className='text-3xl font-bold'>
                  Change begins. Donate today.
                </CardTitle>
              </CardHeader>
              <CardContent className='flex items-center justify-between'>
                <img
                  src='https://placehold.co/800x560'
                  className='w-[300px] object-contain md:w-[500px] lg:w-full'
                  alt='Implementation process'
                />
              </CardContent>
            </Card>

            {/* Right side - Amount Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Select Donation Amount</CardTitle>
                <CardDescription>
                  Choose an amount to donate or enter a custom amount
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='grid grid-cols-2 gap-4 sm:grid-cols-3'>
                  {predefinedAmounts.map((amount) => (
                    <Button
                      key={amount.value}
                      variant='outline'
                      className='h-auto py-4'
                      onClick={() => handleAmountSelect(amount.value)}
                    >
                      <div className='flex flex-col items-center gap-1'>
                        <span className='text-lg font-medium'>
                          {amount.label}
                        </span>
                      </div>
                    </Button>
                  ))}
                </div>

                <div className='mt-6'>
                  {!showCustomAmount ? (
                    <Button
                      variant='outline'
                      className='w-full'
                      onClick={() => setShowCustomAmount(true)}
                    >
                      Enter Custom Amount
                    </Button>
                  ) : (
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(handleCustomAmountSubmit)}
                        className='space-y-4'
                      >
                        <FormField
                          control={form.control}
                          name='amount'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Custom Amount (₹)</FormLabel>
                              <FormControl>
                                <Input
                                  type='number'
                                  placeholder='Enter amount'
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className='flex gap-2'>
                          <Button
                            type='button'
                            variant='outline'
                            className='flex-1'
                            onClick={() => setShowCustomAmount(false)}
                          >
                            Cancel
                          </Button>
                          <Button type='submit' className='flex-1'>
                            Continue
                          </Button>
                        </div>
                      </form>
                    </Form>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Main>
    </>
  )
}

export default DonatePage
