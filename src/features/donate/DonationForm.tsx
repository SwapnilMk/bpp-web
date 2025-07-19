import { useState } from 'react'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { postData } from '@/services/api.service'
import { useAppSelector } from '@/store/hooks'
import { CheckCircle2 } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { Header } from '@/components/layout/dashboard/header'
import { Main } from '@/components/layout/dashboard/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'

// Define the form schema with Zod
const donationFormSchema = z.object({
  accountName: z.string().min(1, 'Account name is required'),
  mobile: z.string().min(10, 'Mobile number must be at least 10 digits'),
  email: z.string().email('Invalid email address'),
  bankName: z.string().min(1, 'Bank name is required'),
  accountNumber: z
    .string()
    .min(10, 'Account number must be at least 10 digits'),
  ifscCode: z.string().min(1, 'IFSC code is required'),
  transactionId: z.string().min(1, 'Transaction ID is required'),
  paymentMode: z.string().min(1, 'Payment mode is required'),
  remarks: z.string().optional(),
})

type DonationFormValues = z.infer<typeof donationFormSchema>

interface DonationFormProps {
  amount: number
  onBack: () => void
}

export function DonationForm({ amount, onBack }: DonationFormProps) {
  const user = useAppSelector((state) => state.user.user)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [paymentScreenshot, setPaymentScreenshot] = useState<File | null>(null)

  // Initialize form with react-hook-form and zod validation
  const form = useForm<DonationFormValues>({
    resolver: zodResolver(donationFormSchema),
    defaultValues: {
      accountName: '',
      mobile: '',
      email: '',
      bankName: '',
      accountNumber: '',
      ifscCode: '',
      transactionId: '',
      paymentMode: '',
      remarks: '',
    },
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPaymentScreenshot(e.target.files[0])
    }
  }

  const onSubmit = async (data: DonationFormValues) => {
    if (!paymentScreenshot) {
      toast.error('Please upload a payment screenshot')
      return
    }

    setLoading(true)

    try {
      // Create FormData object for multipart/form-data
      const formDataToSend = new FormData()

      // Add all form fields
      Object.entries(data).forEach(([key, value]) => {
        if (value) {
          formDataToSend.append(key, value)
        }
      })

      // Add donation amount
      formDataToSend.append('amount', amount.toString())

      // Add payment screenshot file
      formDataToSend.append('screenshot', paymentScreenshot)

      // Get user ID from auth context
      const userId = user?._id
      if (!userId) {
        throw new Error('User ID not found')
      }

      // Use API client to submit donation
      await postData(
        `/donations/user/add-donation`,
        formDataToSend as unknown as Record<string, unknown>,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      )

      // Show success dialog
      setShowSuccessDialog(true)

      // Refresh user data
      // await fetchUserData()
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : 'Failed to submit donation details. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  const handleDialogClose = () => {
    setShowSuccessDialog(false)
    // Navigate to donation history when dialog is closed
    navigate({ to: '/dashboard/donate' })
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
        <div className='mx-auto'>
          <div className='mb-8'>
            <h1 className='mb-2 text-xl font-bold'>Donation Payment</h1>
            <p className='text-muted-foreground'>
              Complete your donation of Rs {amount.toLocaleString()}
            </p>
          </div>

          {/* User Details Card */}
          <Card className='mb-6'>
            <CardHeader>
              <CardTitle>Your Account Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
                <div>
                  <p className='text-sm text-muted-foreground'>Name</p>
                  <p className='font-medium'>
                    {user?.firstName && user?.lastName
                      ? `${user.firstName} ${user.middleName ? user.middleName + ' ' : ''}${user.lastName}`
                      : user?.name || 'Not available'}
                  </p>
                </div>
                <div>
                  <p className='text-sm text-muted-foreground'>
                    Donation Amount
                  </p>
                  <p className='font-medium'>Rs {amount.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bank Account Details Card */}
          <Card className='mb-6'>
            <CardHeader>
              <CardTitle>Bank Account Details</CardTitle>
              <CardDescription>
                Please transfer the donation to the following account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='rounded-md bg-muted p-4'>
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                  <div>
                    <p className='text-sm font-medium'>Account Name</p>
                    <p className='text-lg'>BPP India</p>
                  </div>
                  <div>
                    <p className='text-sm font-medium'>Account Number</p>
                    <p className='text-lg'>XXXXXXXXXXXX</p>
                  </div>
                  <div>
                    <p className='text-sm font-medium'>IFSC Code</p>
                    <p className='text-lg'>XXXXXXXX</p>
                  </div>
                  <div>
                    <p className='text-sm font-medium'>Bank</p>
                    <p className='text-lg'>XXXXX Bank</p>
                  </div>
                </div>
                <div className='mt-4'>
                  <p className='text-sm font-medium'>Donation Amount</p>
                  <p className='text-lg font-bold'>
                    Rs {amount.toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Donation Form */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Details</CardTitle>
              <CardDescription>
                Please provide your payment details to complete the donation
              </CardDescription>
            </CardHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent className='space-y-4'>
                  <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                    <FormField
                      control={form.control}
                      name='accountName'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Account Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder='Enter your account name'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name='mobile'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mobile Number</FormLabel>
                          <FormControl>
                            <Input
                              placeholder='Enter your mobile number'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name='email'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              type='email'
                              placeholder='Enter your email'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name='bankName'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bank Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder='Enter your bank name'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name='accountNumber'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Account Number</FormLabel>
                          <FormControl>
                            <Input
                              placeholder='Enter your account number'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name='ifscCode'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>IFSC Code</FormLabel>
                          <FormControl>
                            <Input placeholder='Enter IFSC code' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name='transactionId'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Transaction ID</FormLabel>
                          <FormControl>
                            <Input
                              placeholder='Enter transaction ID'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name='paymentMode'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Payment Mode</FormLabel>
                          <FormControl>
                            <Input
                              placeholder='Enter payment mode (UPI, NEFT, etc.)'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name='remarks'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Remarks (Optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder='Any additional information about your donation'
                            className='resize-none'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className='space-y-2'>
                    <Label htmlFor='paymentScreenshot'>
                      Payment Screenshot
                    </Label>
                    <Input
                      id='paymentScreenshot'
                      name='paymentScreenshot'
                      type='file'
                      onChange={handleFileChange}
                      accept='image/*,.pdf'
                      required
                    />
                    <p className='text-xs text-muted-foreground'>
                      Upload a screenshot or PDF of your payment confirmation
                    </p>
                  </div>
                </CardContent>

                <Separator className='my-4' />

                <CardFooter className='flex justify-between'>
                  <Button type='button' variant='outline' onClick={onBack}>
                    Back
                  </Button>
                  <Button type='submit' disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit Donation Details'}
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </Card>
        </div>
      </Main>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={handleDialogClose}>
        <DialogContent className='sm:max-w-md'>
          <DialogHeader>
            <div className='mb-4 flex justify-center'>
              <CheckCircle2 className='h-12 w-12 text-green-500' />
            </div>
            <DialogTitle className='text-center'>
              Donation Successful!
            </DialogTitle>
            <DialogDescription className='text-center'>
              Your donation of Rs {amount.toLocaleString()} has been submitted
              successfully and is pending approval. You will be notified once
              your donation is verified.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className='flex justify-center'>
            <Button onClick={handleDialogClose}>View Donation History</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
