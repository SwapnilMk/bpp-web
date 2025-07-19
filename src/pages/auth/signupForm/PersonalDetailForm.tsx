import { useState, useEffect, useCallback } from 'react'
import { useRef } from 'react'
import { occupationData } from '@/data/occupation'
import { ChevronDown } from 'lucide-react'
import { ImagePlus } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Combobox,
  ComboboxAnchor,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxTrigger,
} from '@/components/ui/combobox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { EnhancedDatePicker } from '@/components/features/EnhancedDatePicker'
import CropperModal from './components/CropperModal'
import { FormWrapper } from './components/FormWrapper'

type PersonalDetailData = {
  title?: string
  firstName: string
  middleName?: string
  lastName: string
  dateOfBirth: string
  age: number
  gender: string
  phone: string
  email?: string
  occupation: string
  profilePicture: File | null
}

type PersonalDetailFormProps = PersonalDetailData & {
  updateFields: (fields: Partial<PersonalDetailData>) => void
}

export function PersonalDetailForm({
  title,
  firstName,
  middleName,
  lastName,
  dateOfBirth,
  age,
  gender,
  phone,
  email,
  occupation,
  profilePicture,
  updateFields,
}: PersonalDetailFormProps) {
  const [errors, setErrors] = useState<
    Partial<Record<keyof PersonalDetailData, string>>
  >({})
  const [search, setSearch] = useState(occupation || '')
  const [filteredOccupations, setFilteredOccupations] = useState([
    'Others',
    ...occupationData.occupations,
  ])
  const [showOtherOccupation, setShowOtherOccupation] = useState(
    occupation === 'Others'
  )
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [showCropper, setShowCropper] = useState(false)
  const [rawImage, setRawImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (
      profilePicture &&
      profilePicture instanceof File &&
      profilePicture.size > 0
    ) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImage(reader.result as string)
      }
      reader.readAsDataURL(profilePicture)
    }
  }, [profilePicture])

  const validateField = useCallback(
    (
      field: keyof PersonalDetailData,
      value: PersonalDetailData[keyof PersonalDetailData]
    ) => {
      setErrors((prev) => {
        const newErrors = { ...prev }
        if (!value && field !== 'middleName' && field !== 'email') {
          newErrors[field] = `${field} is required`
        } else if (
          field === 'phone' &&
          (typeof value !== 'string' || !/^\d{10}$/.test(value))
        ) {
          newErrors[field] = 'Phone number must be 10 digits'
        } else {
          delete newErrors[field]
        }
        return newErrors
      })
    },
    []
  )

  const debouncedSearch = useCallback((value: string) => {
    const results = occupationData.occupations.filter((occ) =>
      occ.toLowerCase().includes(value.toLowerCase())
    )
    setFilteredOccupations(['Others', ...results])
  }, [])

  useEffect(() => {
    if (occupation === 'Others') setShowOtherOccupation(true)
    else if (occupation && occupationData.occupations.includes(occupation)) {
      setShowOtherOccupation(false)
      setSearch(occupation)
    }
  }, [occupation])

  const calculateAge = (dob: Date | undefined): number => {
    if (!dob) return 0
    const today = new Date()
    const age =
      today.getFullYear() -
      dob.getFullYear() -
      (today.getMonth() < dob.getMonth() ||
      (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())
        ? 1
        : 0)
    setErrors((prev) => ({
      ...prev,
      age: age < 18 ? 'Must be 18 or older' : undefined,
    }))
    return age
  }

  const handleAvatarClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 3 * 1024 * 1024) {
        // 3MB
        setErrors((prev) => ({
          ...prev,
          profilePicture: 'Profile photo must be less than 3MB',
        }))
        return
      }
      setErrors((prev) => ({ ...prev, profilePicture: undefined }))
      const reader = new FileReader()
      reader.onloadend = () => {
        setRawImage(reader.result as string)
        setShowCropper(true)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCropDone = (cropped: string) => {
    setProfileImage(cropped)
    // Convert base64 to File
    function dataURLtoFile(dataurl: string, filename: string) {
      const arr = dataurl.split(',')
      const mime = arr[0].match(/:(.*?);/)?.[1] || ''
      const bstr = atob(arr[1])
      let n = bstr.length
      const u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new File([u8arr], filename, { type: mime })
    }
    const file = dataURLtoFile(cropped, 'profile.jpg')
    updateFields({ profilePicture: file })
    setShowCropper(false)
  }

  return (
    <FormWrapper title='User Details'>
      <div className='text-semibold text-center text-xs text-muted-foreground'>
        * Enter your details exactly as per your Aadhaar & Voter ID
      </div>
      <div className='mb-4 flex justify-center'>
        <div className='relative'>
          <Avatar className='h-28 w-28 rounded-full border-4 border-background shadow-lg'>
            <AvatarImage src={profileImage || ''} alt='Profile' />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <button
            onClick={handleAvatarClick}
            className='absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80'
            aria-label='Change profile picture'
            type='button'
          >
            <ImagePlus size={16} />
          </button>
          <input
            type='file'
            ref={fileInputRef}
            onChange={handleFileChange}
            className='hidden'
            accept='image/*'
          />
        </div>
      </div>
      {errors.profilePicture && (
        <p className='mt-1 text-center text-xs font-semibold text-red-600'>
          {errors.profilePicture}
        </p>
      )}
      {/* Upload photo or image text */}
      <div className='mb-2 text-center text-sm font-medium text-muted-foreground'>
        Upload photo or image
      </div>
      {showCropper && rawImage && (
        <CropperModal
          open={showCropper}
          image={rawImage}
          onClose={() => setShowCropper(false)}
          onDone={handleCropDone}
        />
      )}

      <div className='grid grid-cols-1 gap-4 sm:grid-cols-12'>
        <div className='col-span-1 sm:col-span-2'>
          <Label>
            Title <span className='text-red-700'>*</span>
          </Label>
          <Select
            required
            onValueChange={(value) => updateFields({ title: value })}
            value={title}
          >
            <SelectTrigger>
              <SelectValue placeholder='Select title' />
            </SelectTrigger>
            <SelectContent>
              {['Mr', 'Ms', 'Mrs', 'Dr', 'CA', 'CS', 'Adv'].map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.title && (
            <p className='mt-1 text-xs text-red-500'>{errors.title}</p>
          )}
        </div>
        <div className='col-span-1 sm:col-span-5'>
          <Label>
            First Name <span className='text-red-700'>*</span>
          </Label>
          <Input
            placeholder='First name'
            required
            value={firstName}
            onChange={(e) => {
              updateFields({ firstName: e.target.value })
              validateField('firstName', e.target.value)
            }}
            className={
              errors.firstName ? 'border-red-500 focus:ring-red-500' : ''
            }
          />
          {errors.firstName && (
            <p className='mt-1 text-xs text-red-500'>{errors.firstName}</p>
          )}
        </div>
        <div className='col-span-1 sm:col-span-5'>
          <Label>Middle Name</Label>
          <Input
            placeholder='Middle name'
            value={middleName}
            onChange={(e) => updateFields({ middleName: e.target.value })}
          />
        </div>
      </div>
      <div className='mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2'>
        <div>
          <Label>
            Last Name <span className='text-red-700'>*</span>
          </Label>
          <Input
            placeholder='Last name'
            required
            value={lastName}
            onChange={(e) => {
              updateFields({ lastName: e.target.value })
              validateField('lastName', e.target.value)
            }}
            className={
              errors.lastName ? 'border-red-500 focus:ring-red-500' : ''
            }
          />
          {errors.lastName && (
            <p className='mt-1 text-xs text-red-500'>{errors.lastName}</p>
          )}
        </div>
        <div>
          <Label>
            Gender <span className='text-red-700'>*</span>
          </Label>
          <Select
            required
            onValueChange={(value) => updateFields({ gender: value })}
            value={gender}
          >
            <SelectTrigger>
              <SelectValue placeholder='Select gender' />
            </SelectTrigger>
            <SelectContent>
              {['male', 'female', 'other'].map((g) => (
                <SelectItem key={g} value={g}>
                  {g.charAt(0).toUpperCase() + g.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.gender && (
            <p className='mt-1 text-xs text-red-500'>{errors.gender}</p>
          )}
        </div>
      </div>
      <div className='mt-4 grid grid-cols-1 gap-4 sm:grid-cols-12'>
        <div className='col-span-1 sm:col-span-6'>
          <Label>
            Date of Birth <span className='text-red-700'>*</span>
          </Label>
          <EnhancedDatePicker
            date={dateOfBirth ? new Date(dateOfBirth) : undefined}
            setDate={(date) => {
              updateFields({
                dateOfBirth: date ? date.toLocaleDateString('en-CA') : '',
                age: calculateAge(date),
              })
              validateField(
                'dateOfBirth',
                date ? date.toLocaleDateString('en-CA') : ''
              )
            }}
            maxDate={new Date()}
            minDate={new Date(1900, 0, 1)}
          />
          {errors.age && (
            <p className='mt-1 text-xs text-red-500'>{errors.age}</p>
          )}
        </div>
        <div className='col-span-1 sm:col-span-6'>
          <Label>
            Age <span className='text-red-700'>*</span>
          </Label>
          <Input type='number' value={age} disabled readOnly />
        </div>
      </div>
      <div className='mt-4 grid grid-cols-1 gap-4 sm:grid-cols-12'>
        <div className='col-span-1 sm:col-span-6'>
          <Label>
            Phone Number <span className='text-red-700'>*</span>
          </Label>
          <div className='relative'>
            <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground'>
              +91
            </div>
            <Input
              placeholder='Enter 10 digit phone number'
              value={phone}
              maxLength={10}
              required
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '').slice(0, 10)
                updateFields({ phone: value })
                validateField('phone', value)
              }}
              disabled
              className='pl-10'
            />
          </div>
          {errors.phone && (
            <p className='mt-1 text-xs text-red-500'>{errors.phone}</p>
          )}
        </div>
        <div className='col-span-1 sm:col-span-6'>
          <Label>Email Address (optional)</Label>
          <Input
            placeholder='Enter email address'
            value={email}
            onChange={(e) => updateFields({ email: e.target.value })}
          />
        </div>
      </div>
      <div className='mt-4'>
        <Label>
          Occupation <span className='text-red-700'>*</span>
        </Label>
        {showOtherOccupation ? (
          <Input
            placeholder='Please specify your occupation'
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              updateFields({ occupation: e.target.value })
              validateField('occupation', e.target.value)
            }}
            required
            autoFocus
          />
        ) : (
          <Combobox
            value={occupation}
            onValueChange={(value) => {
              updateFields({ occupation: value })
              setShowOtherOccupation(value === 'Others')
              validateField('occupation', value)
            }}
            inputValue={search}
            onInputValueChange={(value) => {
              setSearch(value)
              debouncedSearch(value)
            }}
            manualFiltering
          >
            <ComboboxAnchor>
              <ComboboxInput placeholder='Search occupation...' />
              <ComboboxTrigger>
                <ChevronDown className='h-4 w-4' />
              </ComboboxTrigger>
            </ComboboxAnchor>
            <ComboboxContent className='max-h-[300px] overflow-y-auto'>
              <ComboboxEmpty keepVisible={filteredOccupations.length === 0}>
                No occupation found.
              </ComboboxEmpty>
              {filteredOccupations.map((occ) => (
                <ComboboxItem key={occ} value={occ} outset>
                  {occ}
                </ComboboxItem>
              ))}
            </ComboboxContent>
          </Combobox>
        )}
        {errors.occupation && (
          <p className='mt-1 text-xs text-red-500'>{errors.occupation}</p>
        )}
      </div>
    </FormWrapper>
  )
}
