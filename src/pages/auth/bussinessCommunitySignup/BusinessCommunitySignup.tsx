import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type BusinessCommunityData = {
  title: string
  firstName: string
  middleName: string
  lastName: string
  dateOfBirth: string
  age: string
  gender: string
  phone?: string
  email?: string
}

type PBusinessCommunityFormProps = BusinessCommunityData & {
  updateFields: (fields: Partial<BusinessCommunityData>) => void
}

export function BusinessCommunity({
  firstName,
  lastName,
  age,
  phone,
  email,
  updateFields,
}: PBusinessCommunityFormProps) {
  return (
    <div>
      <div className='grid gap-6'>
        {/* Row 1: Name Fields */}
        <div className='text-semibold text-center text-sm text-muted-foreground'>
          Join As a Business community{' '}
        </div>
        <div className='grid grid-cols-1 gap-4'>
          <div>
            <Label>
              Owners Name <span className='text-red-700'>*</span>
            </Label>
            <Input
              placeholder=''
              required
              value={firstName}
              onChange={(e) => updateFields({ firstName: e.target.value })}
            />
          </div>
        </div>

        <div className='grid grid-cols-2 gap-2'>
          <div>
            <Label>
              GST Number <span className='text-red-700'>*</span>
            </Label>
            <Input
              placeholder='GST'
              required
              value={lastName}
              onChange={(e) => updateFields({ lastName: e.target.value })}
            />
          </div>
          <div>
            <Label>
              Bill Number <span className='text-red-700'>*</span>
            </Label>
            <Input
              placeholder='Bill Number'
              required
              value={lastName}
              onChange={(e) => updateFields({ lastName: e.target.value })}
            />
          </div>
        </div>

        {/* Row 2: DOB and Age */}
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <Label>
              Registration Number <span className='text-red-700'>*</span>
            </Label>
            <Input type='text' placeholder='' value={age} required readOnly />
          </div>
          <div>
            <Label>
              Contact <span className='text-red-700'>*</span>
            </Label>
            <Input type='number' placeholder='' value={age} required readOnly />
          </div>
        </div>

        {/* Row 3: Additional Fields */}
        <div className='grid grid-cols-2 gap-4'>
          <div>
            {email && (
              <div>
                <Label>
                  Phone Number <span className='text-red-700'>*</span>
                </Label>
                <Input
                  placeholder='Enter phone number'
                  value={phone}
                  required
                  onChange={(e) => updateFields({ phone: e.target.value })}
                />
              </div>
            )}
            {phone && (
              <div>
                <Label>
                  Email Address <span className='text-red-700'>*</span>
                </Label>
                <Input
                  placeholder='Enter email address'
                  value={email}
                  required
                  onChange={(e) => updateFields({ email: e.target.value })}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
