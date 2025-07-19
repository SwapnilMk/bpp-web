import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { stateWithDistrictData } from '@/data/states'
import { useAppSelector } from '@/store/hooks'
import { User } from '@/types/auth'
import { CalendarIcon } from 'lucide-react'
import { postData } from '@/api/apiClient'
import { cn } from '@/lib/utils'
import { useToast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface DocumentResubmissionDialogProps {
  unverifiedDocuments: string[]
  rejectionRemark: string
}

interface AddressData {
  line1?: string
  line2?: string
  cityOrVillage?: string
  district?: string
  state?: string
  pincode?: string
}

interface NameData {
  title?: string
  firstName?: string
  middleName?: string
  lastName?: string
}

type FormDataValue = string | AddressData | NameData | Date | number
type FormData = { [key: string]: FormDataValue }

type FileData = Record<string, File>

interface DocumentSubmission {
  field: string
  value?: FormDataValue
}

export function DocumentResubmissionDialog({
  unverifiedDocuments,
  rejectionRemark,
}: DocumentResubmissionDialogProps) {
  const [open, setOpen] = useState(true)
  const [formData, setFormData] = useState<FormData>({})
  const [files, setFiles] = useState<FileData>({})
  const [previewUrls, setPreviewUrls] = useState<Record<string, string>>({})
  const [districts, setDistricts] = useState<string[]>([])
  const [addressErrors, setAddressErrors] = useState<
    Partial<Record<keyof AddressData, string>>
  >({})
  const user = useAppSelector((state) => state.user.user)
  const { toast } = useToast()

  useEffect(() => {
    if (!user) return

    const initialData: FormData = {}
    unverifiedDocuments.forEach((field) => {
      if (field === 'address') {
        initialData.address = {
          line1: user.address?.line1 || '',
          line2: user.address?.line2 || '',
          cityOrVillage: user.address?.cityOrVillage || '',
          district: user.address?.district || '',
          state: user.address?.state || '',
          pincode: user.address?.pincode || '',
        }
      } else if (field === 'name') {
        initialData.name = {
          firstName: user.firstName || '',
          middleName: user.middleName || '',
          lastName: user.lastName || '',
        }
      } else if (field === 'dob') {
        initialData.dob = user.dateOfBirth
          ? new Date(user.dateOfBirth)
          : new Date()
      } else if (field === 'aadhaarNumber') {
        initialData.aadhaarNumber = user.aadhaar?.number || ''
      } else if (field === 'voterIdNumber') {
        initialData.voterIdNumber = user.voter?.number || ''
      } else if (field === 'email') {
        initialData.email = user.email || ''
      } else if (field === 'phone') {
        initialData.phone = user.phone || ''
      } else {
        initialData[field] = (user[field as keyof User] as string) || ''
      }
    })
    setFormData(initialData)
  }, [unverifiedDocuments, user])

  const handleInputChange = (
    field: string,
    value: FormDataValue,
    subField?: string
  ) => {
    setFormData((prev) => {
      if (subField) {
        const currentValue = prev[field] as AddressData | NameData
        if (!currentValue) return prev

        return {
          ...prev,
          [field]: {
            ...currentValue,
            [subField]: value,
          },
        }
      }
      return { ...prev, [field]: value }
    })
  }

  const handleFileChange = (
    field: string,
    file: File | null,
    side: 'front' | 'back'
  ) => {
    if (file) {
      // Validate file type
      if (!file.type.match(/^(image\/|application\/pdf)/)) {
        toast({
          variant: 'destructive',
          title: 'Invalid file type',
          description: 'Please upload an image or PDF file',
        })
        return
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          variant: 'destructive',
          title: 'File too large',
          description: 'File size should be less than 5MB',
        })
        return
      }

      // Create preview URL
      const previewUrl = URL.createObjectURL(file)
      setPreviewUrls((prev) => ({
        ...prev,
        [`${field}${side.charAt(0).toUpperCase() + side.slice(1)}`]: previewUrl,
      }))

      setFiles((prev) => ({
        ...prev,
        [`${field}${side.charAt(0).toUpperCase() + side.slice(1)}`]: file,
      }))
    }
  }

  // Cleanup preview URLs on unmount
  useEffect(() => {
    return () => {
      Object.values(previewUrls).forEach((url) => URL.revokeObjectURL(url))
    }
  }, [previewUrls])

  const handleStateChange = (selectedState: string) => {
    setFormData((prev) => {
      const currentAddress = (prev.address as AddressData) || {}
      return {
        ...prev,
        address: {
          ...currentAddress,
          state: selectedState,
          district: '',
        },
      }
    })
    const stateData = stateWithDistrictData.states.find(
      (s) => s.state === selectedState
    )
    setDistricts(stateData ? stateData.districts : [])
    validateAddressField('state', selectedState)
  }

  const validateAddressField = (field: keyof AddressData, value: string) => {
    const newErrors = { ...addressErrors }

    if (!value && field !== 'line2') {
      newErrors[field] = 'This field is required'
    } else {
      delete newErrors[field]
    }

    if (field === 'pincode' && value && !/^\d{6}$/.test(value)) {
      newErrors.pincode = 'Please enter a valid 6-digit pincode'
    }

    if (field === 'line1' && value && value.length < 5) {
      newErrors.line1 = 'Address line 1 must be at least 5 characters long'
    }

    setAddressErrors(newErrors)
    return !newErrors[field]
  }

  const handleAddressInputChange = (
    field: keyof AddressData,
    value: string
  ) => {
    setFormData((prev) => {
      const currentAddress = (prev.address as AddressData) || {}
      return {
        ...prev,
        address: {
          ...currentAddress,
          [field]: value,
        },
      }
    })
    validateAddressField(field, value)
  }

  const handlePincodeChange = (value: string) => {
    const numericValue = value.replace(/\D/g, '').slice(0, 6)
    handleAddressInputChange('pincode', numericValue)
  }

  const handleSubmit = async () => {
    if (!user?._id) return

    try {
      const formDataToSend = new FormData()
      const documents: DocumentSubmission[] = []

      unverifiedDocuments.forEach((field) => {
        if (
          field === 'aadhaarFront' ||
          field === 'aadhaarBack' ||
          field === 'voterIdFront' ||
          field === 'voterIdBack'
        ) {
          const file = files[field]
          if (file) {
            formDataToSend.append(field, file)
            documents.push({ field })
          }
        } else if (field === 'aadhaarNumber') {
          const aadhaarNumber = (formData[field] as string)?.replace(/\s/g, '')
          documents.push({ field, value: aadhaarNumber })
        } else if (field === 'voterIdNumber') {
          documents.push({ field, value: formData[field] })
        } else if (field === 'dob') {
          const date = formData[field] as Date
          documents.push({ field, value: date.toISOString() })
        } else {
          documents.push({ field, value: formData[field] })
        }
      })

      formDataToSend.append('documents', JSON.stringify(documents))

      await postData<{ success: boolean; message: string }>(
        `/users/${user._id}/resubmit-documents`,
        formDataToSend as unknown as Record<string, unknown>,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      )

      toast({
        title: 'Success',
        description: 'Documents resubmitted successfully',
      })
      setOpen(false)
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description:
          error instanceof Error
            ? error.message
            : 'Failed to resubmit documents',
      })
    }
  }

  const validateField = (field: string, value: FormDataValue): boolean => {
    switch (field) {
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value as string)
      case 'phone':
        return /^\+91[6-9]\d{9}$/.test(value as string)
      case 'aadhaarNumber':
        return /^[2-9]\d{11}$/.test(value as string)
      case 'voterIdNumber':
        return /^[A-Z]{3}[0-9]{7}$/.test(value as string)
      case 'pincode':
        return /^[0-9]{6}$/.test(value as string)
      case 'dob': {
        const date = value as Date
        const age = calculateAge(date)
        return age >= 18 && age <= 100
      }
      case 'address': {
        const address = value as AddressData
        return !!(
          address?.line1?.trim() &&
          address?.cityOrVillage?.trim() &&
          address?.district?.trim() &&
          address?.state?.trim() &&
          address?.pincode?.trim() &&
          validateField('pincode', address.pincode)
        )
      }
      case 'name': {
        const name = value as NameData
        return !!(
          name?.title?.trim() &&
          name?.firstName?.trim() &&
          name?.lastName?.trim()
        )
      }
      default:
        return true
    }
  }

  const getFieldError = (
    field: string,
    value: FormDataValue
  ): string | null => {
    if (!value) return 'This field is required'

    switch (field) {
      case 'email':
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value as string)
          ? 'Please enter a valid email address'
          : null
      case 'phone':
        return !/^\+91[6-9]\d{9}$/.test(value as string)
          ? 'Please enter a valid phone number (e.g., +91XXXXXXXXXX)'
          : null
      case 'aadhaarNumber':
        return !/^[2-9]\d{11}$/.test(value as string)
          ? 'Please enter a valid Aadhaar number (e.g., 2345 6789 0123)'
          : null
      case 'voterIdNumber':
        return !/^[A-Z]{3}[0-9]{7}$/.test(value as string)
          ? 'Please enter a valid Voter ID (e.g., ABC1234567)'
          : null
      case 'pincode':
        return !/^[0-9]{6}$/.test(value as string)
          ? 'Please enter a valid 6-digit pincode'
          : null
      case 'dob': {
        const date = value as Date
        const age = calculateAge(date)
        return age < 18 || age > 100
          ? 'Age must be between 18 and 100 years'
          : null
      }
      case 'name': {
        const name = value as NameData
        if (!name?.title?.trim()) return 'Title is required'
        if (!name?.firstName?.trim()) return 'First name is required'
        if (!name?.lastName?.trim()) return 'Last name is required'
        return null
      }
      default:
        return null
    }
  }

  const isFormValid = () => {
    return unverifiedDocuments.every((field) => {
      if (
        field === 'aadhaarFront' ||
        field === 'aadhaarBack' ||
        field === 'voterIdFront' ||
        field === 'voterIdBack'
      ) {
        return !!files[field]
      } else if (field === 'address') {
        const address = formData.address as AddressData
        return (
          address?.line1 &&
          address?.cityOrVillage &&
          address?.district &&
          address?.state &&
          address?.pincode &&
          validateField('pincode', address.pincode)
        )
      } else if (field === 'name') {
        const name = formData.name as NameData
        return name?.firstName && name?.lastName
      } else {
        const value = formData[field]
        if (value === undefined) return false
        return validateField(field, value)
      }
    })
  }

  const renderDocumentPreview = (
    type: 'aadhaar' | 'voter',
    side: 'front' | 'back'
  ) => {
    const field = `${type}${side.charAt(0).toUpperCase() + side.slice(1)}`
    const existingUrl =
      type === 'aadhaar' ? user?.aadhaar?.[side] : user?.voter?.[side]
    const newPreviewUrl = previewUrls[field]

    if (!existingUrl && !newPreviewUrl) return null

    return (
      <div className='mt-2'>
        <Label className='text-sm text-muted-foreground'>
          {newPreviewUrl ? 'New upload preview:' : 'Current document:'}
        </Label>
        <div className='relative mt-1 h-40 w-full overflow-hidden rounded-md border'>
          <img
            src={newPreviewUrl || existingUrl}
            alt={`${type} ${side}`}
            className='h-full w-full object-contain'
          />
        </div>
      </div>
    )
  }

  const renderField = (field: string) => {
    const error = getFieldError(field, formData[field])
    const isInvalid = error !== null

    switch (field) {
      case 'name':
        return (
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-12'>
            <div className='col-span-1 sm:col-span-2'>
              <Label>
                Title <span className='text-red-700'>*</span>
              </Label>
              <Select
                required
                onValueChange={(value) =>
                  handleInputChange('name', value, 'title')
                }
                value={(formData.name as NameData)?.title || ''}
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select title' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='Mr'>Mr</SelectItem>
                  <SelectItem value='Ms'>Ms</SelectItem>
                  <SelectItem value='Mrs'>Mrs</SelectItem>
                  <SelectItem value='Dr'>Dr</SelectItem>
                  <SelectItem value='CA'>CA</SelectItem>
                  <SelectItem value='CS'>CS</SelectItem>
                  <SelectItem value='Adv'>Adv</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className='col-span-1 sm:col-span-5'>
              <Label>
                First Name <span className='text-red-700'>*</span>
              </Label>
              <Input
                placeholder='First name'
                required
                value={(formData.name as NameData)?.firstName || ''}
                onChange={(e) =>
                  handleInputChange('name', e.target.value, 'firstName')
                }
                className={isInvalid ? 'border-red-500' : ''}
              />
            </div>
            <div className='col-span-1 sm:col-span-5'>
              <Label>Middle Name</Label>
              <Input
                placeholder='Middle name'
                value={(formData.name as NameData)?.middleName || ''}
                onChange={(e) =>
                  handleInputChange('name', e.target.value, 'middleName')
                }
              />
            </div>
            <div className='col-span-1 sm:col-span-12'>
              <Label>
                Last Name <span className='text-red-700'>*</span>
              </Label>
              <Input
                placeholder='Last name'
                required
                value={(formData.name as NameData)?.lastName || ''}
                onChange={(e) =>
                  handleInputChange('name', e.target.value, 'lastName')
                }
                className={isInvalid ? 'border-red-500' : ''}
              />
            </div>
          </div>
        )
      case 'dob':
        return (
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-12'>
            <div className='col-span-1 sm:col-span-6'>
              <Label>
                Date of Birth <span className='text-red-700'>*</span>
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant='outline'
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !formData.dob && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className='mr-2 h-4 w-4' />
                    {formData.dob
                      ? format(formData.dob as Date, 'PPP')
                      : 'Pick a date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0'>
                  <Calendar
                    mode='single'
                    selected={formData.dob as Date}
                    onSelect={(date) => {
                      if (date) {
                        const age = calculateAge(date)
                        handleInputChange('dob', date)
                        handleInputChange('age', age)
                      }
                    }}
                    disabled={(date) => {
                      const age = new Date().getFullYear() - date.getFullYear()
                      return age < 18 || age > 100
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {error && <p className='text-sm text-red-500'>{error}</p>}
            </div>
            <div className='col-span-1 sm:col-span-6'>
              <Label>
                Age <span className='text-red-700'>*</span>
              </Label>
              <Input
                type='number'
                placeholder='Age'
                value={formData.age?.toString() || ''}
                required
                readOnly
              />
            </div>
          </div>
        )
      case 'aadhaarNumber':
        return (
          <div className='space-y-2'>
            <Label>
              Aadhaar Number <span className='text-red-700'>*</span>
            </Label>
            <Input
              type='text'
              placeholder='eg 2345 6789 0123'
              value={formatAadhaarNumber(formData[field] as string)}
              onChange={(e) => {
                const value = e.target.value.replace(/[^\d]/g, '')
                handleInputChange(field, value)
              }}
              className={isInvalid ? 'border-red-500' : ''}
              maxLength={14}
            />
            {isInvalid && <p className='text-sm text-red-500'>{error}</p>}
          </div>
        )
      case 'voterIdNumber':
        return (
          <div className='space-y-2'>
            <Label>Voter ID Number</Label>
            <Input
              type='text'
              placeholder='Enter Voter ID (e.g., ABC1234567)'
              value={(formData[field] as string)?.toUpperCase() || ''}
              onChange={(e) =>
                handleInputChange(field, e.target.value.toUpperCase())
              }
              className={isInvalid ? 'border-red-500' : ''}
              maxLength={10}
            />
            {isInvalid && <p className='text-sm text-red-500'>{error}</p>}
          </div>
        )
      case 'aadhaarFront':
      case 'aadhaarBack':
      case 'voterIdFront':
      case 'voterIdBack': {
        const type = field.startsWith('aadhaar') ? 'aadhaar' : 'voter'
        const side = field.endsWith('Front') ? 'front' : 'back'
        return (
          <div className='space-y-2'>
            <Label>
              {type === 'aadhaar' ? 'Aadhaar' : 'Voter ID'}{' '}
              {side === 'front' ? 'Front' : 'Back'} Image
            </Label>
            {renderDocumentPreview(type, side)}
            <Input
              type='file'
              accept='image/*,.pdf'
              onChange={(e) =>
                handleFileChange(type, e.target.files?.[0] || null, side)
              }
            />
            <p className='text-sm text-muted-foreground'>
              Accepted formats: JPG, PNG, PDF (max 5MB)
            </p>
          </div>
        )
      }
      case 'email':
        return (
          <div className='space-y-2'>
            <Label>Email Address</Label>
            <Input
              type='email'
              placeholder='Enter your email address'
              value={(formData[field] as string) || ''}
              onChange={(e) => handleInputChange(field, e.target.value)}
              className={isInvalid ? 'border-red-500' : ''}
            />
            {isInvalid && <p className='text-sm text-red-500'>{error}</p>}
          </div>
        )
      case 'phone':
        return (
          <div className='space-y-2'>
            <Label>Phone Number</Label>
            <Input
              type='tel'
              placeholder='Enter 10-digit phone number'
              value={(formData[field] as string) || ''}
              onChange={(e) => handleInputChange(field, e.target.value)}
              className={isInvalid ? 'border-red-500' : ''}
            />
            {isInvalid && <p className='text-sm text-red-500'>{error}</p>}
          </div>
        )
      case 'address':
        return (
          <div className='grid gap-4'>
            <div className='text-semibold text-center text-xs text-muted-foreground'>
              * Provide Address as given in Aadhaar Card
            </div>
            <div>
              <Label>
                Address Line 1 <span className='text-red-700'>*</span>
              </Label>
              <Input
                placeholder='Enter address line 1'
                value={(formData.address as AddressData)?.line1 || ''}
                onChange={(e) =>
                  handleAddressInputChange('line1', e.target.value)
                }
                className={
                  addressErrors.line1 ? 'border-red-500 focus:ring-red-500' : ''
                }
              />
              {addressErrors.line1 && (
                <p className='mt-1 text-xs text-red-500'>
                  {addressErrors.line1}
                </p>
              )}
            </div>

            <div>
              <Label>Address Line 2</Label>
              <Input
                placeholder='Area, Landmark'
                value={(formData.address as AddressData)?.line2 || ''}
                onChange={(e) =>
                  handleAddressInputChange('line2', e.target.value)
                }
              />
            </div>

            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
              <div>
                <Label>
                  City/Village <span className='text-red-700'>*</span>
                </Label>
                <Input
                  placeholder='Enter city/village'
                  value={(formData.address as AddressData)?.cityOrVillage || ''}
                  required
                  onChange={(e) =>
                    handleAddressInputChange('cityOrVillage', e.target.value)
                  }
                  className={
                    addressErrors.cityOrVillage
                      ? 'border-red-500 focus:ring-red-500'
                      : ''
                  }
                />
                {addressErrors.cityOrVillage && (
                  <p className='mt-1 text-xs text-red-500'>
                    {addressErrors.cityOrVillage}
                  </p>
                )}
              </div>
              <div>
                <Label>
                  State <span className='text-red-700'>*</span>
                </Label>
                <Select
                  onValueChange={handleStateChange}
                  value={(formData.address as AddressData)?.state || ''}
                >
                  <SelectTrigger
                    className={`w-full ${addressErrors.state ? 'border-red-500 focus:ring-red-500' : ''}`}
                  >
                    <SelectValue placeholder='Select your state' />
                  </SelectTrigger>
                  <SelectContent>
                    {stateWithDistrictData.states.map(({ state }) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {addressErrors.state && (
                  <p className='mt-1 text-xs text-red-500'>
                    {addressErrors.state}
                  </p>
                )}
              </div>
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <div>
                <Label>
                  District <span className='text-red-700'>*</span>
                </Label>
                <Select
                  onValueChange={(value) =>
                    handleAddressInputChange('district', value)
                  }
                  value={(formData.address as AddressData)?.district || ''}
                  disabled={!districts.length}
                >
                  <SelectTrigger
                    className={`w-full ${addressErrors.district ? 'border-red-500 focus:ring-red-500' : ''}`}
                  >
                    <SelectValue placeholder='Select your district' />
                  </SelectTrigger>
                  <SelectContent>
                    {districts.map((districtName) => (
                      <SelectItem key={districtName} value={districtName}>
                        {districtName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {addressErrors.district && (
                  <p className='mt-1 text-xs text-red-500'>
                    {addressErrors.district}
                  </p>
                )}
              </div>
              <div>
                <Label>
                  Pincode <span className='text-red-700'>*</span>
                </Label>
                <Input
                  placeholder='Enter pincode'
                  value={(formData.address as AddressData)?.pincode || ''}
                  required
                  maxLength={6}
                  onChange={(e) => handlePincodeChange(e.target.value)}
                  className={
                    addressErrors.pincode
                      ? 'border-red-500 focus:ring-red-500'
                      : ''
                  }
                />
                {addressErrors.pincode && (
                  <p className='mt-1 text-xs text-red-500'>
                    {addressErrors.pincode}
                  </p>
                )}
              </div>
            </div>
          </div>
        )
      default:
        return (
          <div className='space-y-2'>
            <Label className='capitalize'>
              {field.replace(/([A-Z])/g, ' $1').trim()}
            </Label>
            <Input
              type='text'
              placeholder={`Enter ${field.replace(/([A-Z])/g, ' $1').trim()}`}
              value={(formData[field] as string) || ''}
              onChange={(e) => handleInputChange(field, e.target.value)}
              className={isInvalid ? 'border-red-500' : ''}
            />
            {isInvalid && <p className='text-sm text-red-500'>{error}</p>}
          </div>
        )
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='max-h-[90vh] overflow-y-auto sm:max-w-[800px]'>
        <DialogHeader>
          <DialogTitle>Resubmit Documents</DialogTitle>
          <DialogDescription>
            Your account was rejected due to issues with the following
            documents. Please provide the correct information.
          </DialogDescription>
          {rejectionRemark && (
            <div className='mt-2 rounded-md border border-red-200 bg-red-50 p-3'>
              <p className='text-sm text-red-600'>
                <strong>Reason for rejection:</strong> {rejectionRemark}
              </p>
            </div>
          )}
        </DialogHeader>
        <div className='space-y-6 py-4'>
          {unverifiedDocuments.map((field) => (
            <div key={field} className='space-y-4'>
              {renderField(field)}
            </div>
          ))}
        </div>
        <DialogFooter className='sm:justify-start'>
          <Button
            type='button'
            variant='outline'
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            type='button'
            onClick={handleSubmit}
            disabled={!isFormValid()}
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

const calculateAge = (dob: Date): number => {
  const today = new Date()
  const birthDate = new Date(dob)
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDifference = today.getMonth() - birthDate.getMonth()
  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--
  }
  return age
}

const formatAadhaarNumber = (value: string | undefined): string => {
  if (!value) return ''
  // Remove all spaces and non-digit characters
  const digitsOnly = value.replace(/[^\d]/g, '')
  // Limit to 12 digits
  const truncated = digitsOnly.slice(0, 12)
  // Add spaces after every 4 digits
  return truncated.replace(/(\d{4})/g, '$1 ').trim()
}
