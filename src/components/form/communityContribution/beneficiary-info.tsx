import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { BeneficiaryFormValues } from '@/schema/communityContributionSchema'
import { useFormContext, useWatch } from 'react-hook-form'

export function BeneficiaryForm() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<BeneficiaryFormValues>()

  const beneficiaryType = useWatch({ control, name: 'beneficiaryType' })

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-2xl font-bold'>Beneficiary Information</CardTitle>
        <CardDescription className='py-2'>
          Organization/Individual Information
        </CardDescription>
        <Separator />
      </CardHeader>
      <CardContent>
        <div className='space-y-4 text-start'>
          {/* Radio Buttons Section */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='flex items-center space-x-4'>
              <input
                type='radio'
                id='lawFirms'
                value='lawFirms'
                {...register('beneficiaryType')}
                className='radio'
              />
              <Label htmlFor='lawFirms' className='block text-sm font-medium text-primary'>
                Law Firms
              </Label>

              <input
                type='radio'
                id='independentAdvocate'
                value='independentAdvocate'
                {...register('beneficiaryType')}
                className='radio'
              />
              <Label
                htmlFor='independentAdvocate'
                className='block text-sm font-medium text-primary'
              >
                Independent Advocate
              </Label>
            </div>
          </div>

          {/* Conditional Inputs */}
          {beneficiaryType === 'lawFirms' && (
            <div>
              <Label
                htmlFor='nameOfLawFirm'
                className='block text-sm font-medium text-primary'
              >
                Name of Law Firm*
              </Label>
              <Input
                id='nameOfLawFirm'
                {...register('nameOfLawFirm')}
                className='block w-full p-2 border rounded-md'
              />
              {errors.nameOfLawFirm && (
                <span className='text-sm text-destructive'>
                  {errors.nameOfLawFirm.message}
                </span>
              )}
            </div>
          )}

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <Label
                htmlFor='nameOfAdvocate'
                className='block text-sm font-medium text-primary'
              >
                Name of Advocate*
              </Label>
              <Input
                id='nameOfAdvocate'
                {...register('nameOfAdvocate')}
                className='block w-full p-2 border rounded-md'
              />
              {errors.nameOfAdvocate && (
                <span className='text-sm text-destructive'>
                  {errors.nameOfAdvocate.message}
                </span>
              )}
            </div>
            <div>
              <Label
                htmlFor='enrollmentNumber'
                className='block text-sm font-medium text-primary'
              >
                Enrollment Number*
              </Label>
              <Input
                id='enrollmentNumber'
                {...register('enrollmentNumber')}
                className='block w-full p-2 border rounded-md'
              />
              {errors.enrollmentNumber && (
                <span className='text-sm text-destructive'>
                  {errors.enrollmentNumber.message}
                </span>
              )}
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <Label
                htmlFor='stateBarCouncil'
                className='block text-sm font-medium text-primary'
              >
                State Bar Council*
              </Label>
              <Input
                id='stateBarCouncil'
                {...register('stateBarCouncil')}
                className='block w-full p-2 border rounded-md'
              />
              {errors.stateBarCouncil && (
                <span className='text-sm text-destructive'>
                  {errors.stateBarCouncil.message}
                </span>
              )}
            </div>
            {beneficiaryType === 'lawFirms' && (
              <div>
                <Label htmlFor='gstNumber' className='block text-sm font-medium text-primary'>
                  GST Number
                </Label>
                <Input
                  id='gstNumber'
                  {...register('gstNumber')}
                  className='block w-full p-2 border rounded-md'
                />
                {errors.gstNumber && (
                  <span className='text-sm text-destructive'>{errors.gstNumber.message}</span>
                )}
              </div>
            )}
          </div>
          {/* Bank Details */}
          <div className='space-y-4'>
            <h3 className='text-xl font-bold'>Bank Details</h3>
            <Separator />
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <Label htmlFor='bankName' className='block text-sm font-medium text-primary'>
                  Bank Name*
                </Label>
                <Input
                  id='bankName'
                  {...register('bankName')}
                  className='block w-full p-2 border rounded-md'
                />
                {errors.bankName && (
                  <span className='text-sm text-destructive'>{errors.bankName.message}</span>
                )}
              </div>
              <div>
                <Label
                  htmlFor='accountNumber'
                  className='block text-sm font-medium text-primary'
                >
                  Account Number*
                </Label>
                <Input
                  id='accountNumber'
                  {...register('accountNumber')}
                  className='block w-full p-2 border rounded-md'
                />
                {errors.accountNumber && (
                  <span className='text-sm text-destructive'>
                    {errors.accountNumber.message}
                  </span>
                )}
              </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <Label
                  htmlFor='accountHolderName'
                  className='block text-sm font-medium text-primary'
                >
                  Account Holder Name*
                </Label>
                <Input
                  id='accountHolderName'
                  {...register('accountHolderName')}
                  className='block w-full p-2 border rounded-md'
                />
                {errors.accountHolderName && (
                  <span className='text-sm text-destructive'>
                    {errors.accountHolderName.message}
                  </span>
                )}
              </div>
              <div>
                <Label htmlFor='ifscCode' className='block text-sm font-medium text-primary'>
                  IFSC Code*
                </Label>
                <Input
                  id='ifscCode'
                  {...register('ifscCode')}
                  className='block w-full p-2 border rounded-md'
                />
                {errors.ifscCode && (
                  <span className='text-sm text-destructive'>{errors.ifscCode.message}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
