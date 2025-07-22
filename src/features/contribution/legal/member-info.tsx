import { useFormContext, Controller } from 'react-hook-form'
import { MembersInfoFormValues } from '@/features/contribution/legal/schema/case-registration'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { DatePicker } from '@/components/features/DatePicker'

export function MembersInfoForm() {
  const {
    register,
    control,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext<MembersInfoFormValues>()

  // For phone input: only allow 10 digits
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10)
    setValue('phone', value)
  }

  return (
    <div className="w-full">
      <div className='mb-4'>
        <h2 className='text-2xl font-bold text-blue-900'>Member Information</h2>
        <p className='py-2 text-blue-700'>Please provide your details for electronic signature</p>
        <Separator />
      </div>
      <div className='space-y-6 text-start'>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
          <div>
            <Label htmlFor='firstName' className='block text-sm font-medium text-primary'>
              First Name*
            </Label>
            <Input
              id='firstName'
              placeholder='Enter first name'
              {...register('firstName')}
              className='block p-2 w-full rounded-md border'
            />
            {errors.firstName && (
              <span className='text-sm text-destructive'>{errors.firstName.message}</span>
            )}
          </div>
          <div>
            <Label htmlFor='middleName' className='block text-sm font-medium text-primary'>
              Middle Name
            </Label>
            <Input
              id='middleName'
              placeholder='Enter middle name'
              {...register('middleName')}
              className='block p-2 w-full rounded-md border'
            />
            {errors.middleName && (
              <span className='text-sm text-destructive'>{errors.middleName.message}</span>
            )}
          </div>
          <div>
            <Label htmlFor='lastName' className='block text-sm font-medium text-primary'>
              Last Name*
            </Label>
            <Input
              id='lastName'
              placeholder='Enter last name'
              {...register('lastName')}
              className='block p-2 w-full rounded-md border'
            />
            {errors.lastName && (
              <span className='text-sm text-destructive'>{errors.lastName.message}</span>
            )}
          </div>
        </div>

        <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
          <div>
            <Label htmlFor='phone' className='block text-sm font-medium text-primary'>
              Phone Number*
            </Label>
            <div className='relative'>
              <span className='absolute left-2 top-1/2 text-gray-400 -translate-y-1/2'>+91</span>
              <Input
                id='phone'
                placeholder='10 digit phone number'
                maxLength={10}
                {...register('phone')}
                value={watch('phone') || ''}
                onChange={handlePhoneChange}
                className='block p-2 pl-10 w-full rounded-md border'
              />
            </div>
            {errors.phone && (
              <span className='text-sm text-destructive'>{errors.phone.message}</span>
            )}
          </div>
          <div>
            <Label htmlFor='email' className='block text-sm font-medium text-primary'>
              Email (optional)
            </Label>
            <Input
              id='email'
              placeholder='Enter email address'
              {...register('email')}
              className='block p-2 w-full rounded-md border'
            />
            {errors.email && (
              <span className='text-sm text-destructive'>{errors.email.message}</span>
            )}
          </div>
          <div>
            <Label htmlFor='dateOfBirth' className='block text-sm font-medium text-primary'>
              Date of Birth*
            </Label>
            <Controller
              name='dateOfBirth'
              control={control}
              render={({ field }) => (
                <DatePicker
                  date={field.value ? new Date(field.value) : undefined}
                  setDate={(date) => field.onChange(date ? date.toISOString().split('T')[0] : '')}
                />
              )}
            />
            {errors.dateOfBirth && (
              <span className='text-sm text-destructive'>{errors.dateOfBirth.message}</span>
            )}
          </div>
        </div>

        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          <div>
            <Label htmlFor='aadhaarCard' className='block text-sm font-medium text-primary'>
              Aadhaar Card Number*
            </Label>
            <Input
              id='aadhaarCard'
              placeholder='12 digit Aadhaar number'
              maxLength={12}
              {...register('aadhaarCard')}
              className='block p-2 w-full rounded-md border'
            />
            {errors.aadhaarCard && (
              <span className='text-sm text-destructive'>{errors.aadhaarCard.message}</span>
            )}
          </div>
          <div>
            <Label htmlFor='voterId' className='block text-sm font-medium text-primary'>
              Voter ID*
            </Label>
            <Input
              id='voterId'
              placeholder='Enter Voter ID'
              {...register('voterId')}
              className='block p-2 w-full rounded-md border'
            />
            {errors.voterId && (
              <span className='text-sm text-destructive'>{errors.voterId.message}</span>
            )}
          </div>
        </div>
      </div>
      <div className='mt-4 text-xs text-blue-700'>
        *Note: During the case registration process, no changes or modifications to personal information, including voter details, Aadhaar card information, etc., will be accepted.<br />
        All details must match exactly as per the membership records.
      </div>
    </div>
  )
}
