import { useState } from 'react'
import { CloudUpload, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadList,
  FileUploadTrigger,
} from '@/components/ui/file-upload'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { FormWrapper } from './components/FormWrapper'

type RegistrationData = {
  aadhaarNumber?: string
  voterId?: string
  aadhaarFront?: File | null
  aadhaarBack?: File | null
  voterFront?: File | null
  voterBack?: File | null
  serveCommunityAccepted?: boolean
}

type RegistrationFormProps = RegistrationData & {
  updateFields: (fields: Partial<RegistrationData>) => void
}

const MAX_FILE_SIZE = 3 * 1024 * 1024
const ACCEPTED_FILE_TYPES = 'image/*,.pdf'

export function RegistrationForm({
  aadhaarNumber,
  voterId,
  aadhaarFront,
  aadhaarBack,
  voterFront,
  voterBack,
  serveCommunityAccepted,
  updateFields,
}: RegistrationFormProps) {
  const [errors, setErrors] = useState<{
    aadhaarNumber?: string
    voterId?: string
    aadhaarFront?: string
    aadhaarBack?: string
    voterFront?: string
    voterBack?: string
  }>({})
  // Add idType state
  const [idType, setIdType] = useState<'aadhaar' | 'voter'>('aadhaar')

  const validateFile = (file: File) => {
    if (file.size > MAX_FILE_SIZE) return 'File size must be less than 3MB'
    if (!file.type.startsWith('image/') && file.type !== 'application/pdf')
      return 'Only images and PDF files are allowed'
    return ''
  }

  const handleFileChange =
    (field: keyof RegistrationData) => (files: File[]) => {
      const file = files[0]
      if (!file) {
        setErrors((prev) => ({ ...prev, [field]: undefined }))
        updateFields({ [field]: null })
        return
      }
      const error = validateFile(file)
      if (field === 'aadhaarFront' || field === 'aadhaarBack') {
        if (!aadhaarNumber) {
          setErrors((prev) => ({
            ...prev,
            [field]: 'Enter Aadhaar number first',
          }))
          return
        }
      } else if (field === 'voterFront' || field === 'voterBack') {
        if (!voterId) {
          setErrors((prev) => ({ ...prev, [field]: 'Enter Voter ID first' }))
          return
        }
      }
      setErrors((prev) => ({ ...prev, [field]: error }))
      updateFields({ [field]: error ? null : file })
    }

  const handleAadhaarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 12)
    updateFields({ aadhaarNumber: value })
    if (!value) {
      updateFields({ aadhaarFront: null, aadhaarBack: null })
      setErrors((prev) => ({
        ...prev,
        aadhaarNumber: undefined,
        aadhaarFront: undefined,
        aadhaarBack: undefined,
      }))
    } else if (!/^\d{12}$/.test(value)) {
      setErrors((prev) => ({
        ...prev,
        aadhaarNumber: 'Aadhaar number must be 12 digits',
      }))
    } else {
      setErrors((prev) => ({ ...prev, aadhaarNumber: undefined }))
    }
  }

  const handleVoterIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase().slice(0, 10)
    updateFields({ voterId: value })
    if (!value) {
      updateFields({ voterFront: null, voterBack: null })
      setErrors((prev) => ({
        ...prev,
        voterId: undefined,
        voterFront: undefined,
        voterBack: undefined,
      }))
    } else if (!/^[A-Z]{3}[0-9]{7}$/.test(value)) {
      setErrors((prev) => ({
        ...prev,
        voterId: 'Invalid Voter ID format (e.g., ABC1234567)',
      }))
    } else {
      setErrors((prev) => ({ ...prev, voterId: undefined }))
    }
  }

  return (
    <FormWrapper title='User Details'>
      <div className='grid gap-4'>
        {/* ID Type Selection */}
        <div className='flex flex-col items-center gap-2'>
          <span className='text-sm font-semibold'>Select ID Type</span>
          <div className='inline-flex h-9 max-w-[400px] rounded-lg bg-input/50 p-0.5'>
            <RadioGroup
              value={idType}
              onValueChange={(val) => setIdType(val as 'aadhaar' | 'voter')}
              className='group relative inline-grid grid-cols-[1fr_1fr] items-center gap-0 text-sm font-medium after:absolute after:inset-y-0 after:w-1/2 after:rounded-md after:bg-background after:shadow-sm after:shadow-black/5 after:outline-offset-2 after:transition-transform after:duration-300 after:[transition-timing-function:cubic-bezier(0.16,1,0.3,1)] has-[:focus-visible]:after:outline has-[:focus-visible]:after:outline-2 has-[:focus-visible]:after:outline-ring/70 data-[state=aadhaar]:after:translate-x-0 data-[state=voter]:after:translate-x-full'
              data-state={idType}
            >
              <label className='relative z-10 inline-flex h-full min-w-8 cursor-pointer select-none items-center justify-center whitespace-nowrap px-4 transition-colors group-data-[state=voter]:text-muted-foreground/70'>
                Aadhaar
                <RadioGroupItem
                  id='aadhaar-radio'
                  value='aadhaar'
                  className='sr-only'
                />
              </label>
              <label className='relative z-10 inline-flex h-full min-w-8 cursor-pointer select-none items-center justify-center whitespace-nowrap px-4 transition-colors group-data-[state=aadhaar]:text-muted-foreground/70'>
                Voter
                <RadioGroupItem
                  id='voter-radio'
                  value='voter'
                  className='sr-only'
                />
              </label>
            </RadioGroup>
          </div>
        </div>
        {/* Only show Aadhaar fields if selected */}
        {idType === 'aadhaar' && (
          <div className='space-y-4'>
            <div>
              <Label>Aadhaar Number</Label>
              <Input
                placeholder='eg 234567890123'
                value={aadhaarNumber || ''}
                onChange={handleAadhaarChange}
                maxLength={12}
                className={
                  errors.aadhaarNumber
                    ? 'border-red-500 focus:ring-red-500'
                    : ''
                }
              />
              {errors.aadhaarNumber && (
                <p className='mt-1 text-xs font-semibold text-red-600'>
                  {errors.aadhaarNumber}
                </p>
              )}
            </div>
            <div>
              <Label>Aadhaar Card (Front & Back)</Label>
              <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                <FileUpload
                  value={aadhaarFront ? [aadhaarFront] : []}
                  onValueChange={handleFileChange('aadhaarFront')}
                  accept={ACCEPTED_FILE_TYPES}
                  maxFiles={1}
                  maxSize={MAX_FILE_SIZE}
                  onFileReject={(_file, message) =>
                    setErrors((prev) => ({
                      ...prev,
                      aadhaarFront:
                        message === 'File too large'
                          ? 'File size must be less than 3MB'
                          : message,
                    }))
                  }
                >
                  <FileUploadDropzone className='h-10 flex-row flex-wrap border-dotted px-3 py-2 text-center'>
                    <CloudUpload className='size-4' />
                    <FileUploadTrigger asChild>
                      <Button variant='link' size='sm' className='h-auto p-0'>
                        Upload Front
                      </Button>
                    </FileUploadTrigger>
                  </FileUploadDropzone>
                  <FileUploadList>
                    {aadhaarFront && (
                      <FileUploadItem value={aadhaarFront}>
                        <FileUploadItemPreview />
                        <FileUploadItemMetadata />
                        <FileUploadItemDelete asChild>
                          <Button
                            variant='ghost'
                            size='icon'
                            className='size-7'
                          >
                            <X />
                            <span className='sr-only'>Delete</span>
                          </Button>
                        </FileUploadItemDelete>
                      </FileUploadItem>
                    )}
                  </FileUploadList>
                  {errors.aadhaarFront && (
                    <p className='mt-1 text-xs font-semibold text-red-600'>
                      {errors.aadhaarFront}
                    </p>
                  )}
                </FileUpload>
                <FileUpload
                  value={aadhaarBack ? [aadhaarBack] : []}
                  onValueChange={handleFileChange('aadhaarBack')}
                  accept={ACCEPTED_FILE_TYPES}
                  maxFiles={1}
                  maxSize={MAX_FILE_SIZE}
                  onFileReject={(_file, message) =>
                    setErrors((prev) => ({
                      ...prev,
                      aadhaarBack:
                        message === 'File too large'
                          ? 'File size must be less than 3MB'
                          : message,
                    }))
                  }
                >
                  <FileUploadDropzone className='h-10 flex-row flex-wrap border-dotted px-3 py-2 text-center'>
                    <CloudUpload className='size-4' />
                    <FileUploadTrigger asChild>
                      <Button variant='link' size='sm' className='h-auto p-0'>
                        Upload Back
                      </Button>
                    </FileUploadTrigger>
                  </FileUploadDropzone>
                  <FileUploadList>
                    {aadhaarBack && (
                      <FileUploadItem value={aadhaarBack}>
                        <FileUploadItemPreview />
                        <FileUploadItemMetadata />
                        <FileUploadItemDelete asChild>
                          <Button
                            variant='ghost'
                            size='icon'
                            className='size-7'
                          >
                            <X />
                            <span className='sr-only'>Delete</span>
                          </Button>
                        </FileUploadItemDelete>
                      </FileUploadItem>
                    )}
                  </FileUploadList>
                  {errors.aadhaarBack && (
                    <p className='mt-1 text-xs font-semibold text-red-600'>
                      {errors.aadhaarBack}
                    </p>
                  )}
                </FileUpload>
              </div>
            </div>
          </div>
        )}
        {/* Only show Voter fields if selected */}
        {idType === 'voter' && (
          <div className='space-y-4'>
            <div>
              <Label>Voter ID / Electoral Card</Label>
              <Input
                placeholder='eg ABC1234567'
                value={voterId || ''}
                onChange={handleVoterIdChange}
                maxLength={10}
                className={
                  errors.voterId ? 'border-red-500 focus:ring-red-500' : ''
                }
              />
              {errors.voterId && (
                <p className='mt-1 text-xs font-semibold text-red-600'>
                  {errors.voterId}
                </p>
              )}
            </div>
            <div>
              <Label>Voter Card (Front & Back)</Label>
              <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                <FileUpload
                  value={voterFront ? [voterFront] : []}
                  onValueChange={handleFileChange('voterFront')}
                  accept={ACCEPTED_FILE_TYPES}
                  maxFiles={1}
                  maxSize={MAX_FILE_SIZE}
                  onFileReject={(_file, message) =>
                    setErrors((prev) => ({
                      ...prev,
                      voterFront:
                        message === 'File too large'
                          ? 'File size must be less than 3MB'
                          : message,
                    }))
                  }
                >
                  <FileUploadDropzone className='h-10 flex-row flex-wrap border-dotted px-3 py-2 text-center'>
                    <CloudUpload className='size-4' />
                    <FileUploadTrigger asChild>
                      <Button variant='link' size='sm' className='h-auto p-0'>
                        Upload Front
                      </Button>
                    </FileUploadTrigger>
                  </FileUploadDropzone>
                  <FileUploadList>
                    {voterFront && (
                      <FileUploadItem value={voterFront}>
                        <FileUploadItemPreview />
                        <FileUploadItemMetadata />
                        <FileUploadItemDelete asChild>
                          <Button
                            variant='ghost'
                            size='icon'
                            className='size-7'
                          >
                            <X />
                            <span className='sr-only'>Delete</span>
                          </Button>
                        </FileUploadItemDelete>
                      </FileUploadItem>
                    )}
                  </FileUploadList>
                  {errors.voterFront && (
                    <p className='mt-1 text-xs font-semibold text-red-600'>
                      {errors.voterFront}
                    </p>
                  )}
                </FileUpload>
                <FileUpload
                  value={voterBack ? [voterBack] : []}
                  onValueChange={handleFileChange('voterBack')}
                  accept={ACCEPTED_FILE_TYPES}
                  maxFiles={1}
                  maxSize={MAX_FILE_SIZE}
                  onFileReject={(_file, message) =>
                    setErrors((prev) => ({
                      ...prev,
                      voterBack:
                        message === 'File too large'
                          ? 'File size must be less than 3MB'
                          : message,
                    }))
                  }
                >
                  <FileUploadDropzone className='h-10 flex-row flex-wrap border-dotted px-3 py-2 text-center'>
                    <CloudUpload className='size-4' />
                    <FileUploadTrigger asChild>
                      <Button variant='link' size='sm' className='h-auto p-0'>
                        Upload Back
                      </Button>
                    </FileUploadTrigger>
                  </FileUploadDropzone>
                  <FileUploadList>
                    {voterBack && (
                      <FileUploadItem value={voterBack}>
                        <FileUploadItemPreview />
                        <FileUploadItemMetadata />
                        <FileUploadItemDelete asChild>
                          <Button
                            variant='ghost'
                            size='icon'
                            className='size-7'
                          >
                            <X />
                            <span className='sr-only'>Delete</span>
                          </Button>
                        </FileUploadItemDelete>
                      </FileUploadItem>
                    )}
                  </FileUploadList>
                  {errors.voterBack && (
                    <p className='mt-1 text-xs font-semibold text-red-600'>
                      {errors.voterBack}
                    </p>
                  )}
                </FileUpload>
              </div>
            </div>
          </div>
        )}
        {/* Remove the old divider and both fields together logic */}
        <div className='mt-4'>
          <div className='text-sm font-medium'>
            Do you want to serve the community as a professional?{' '}
            <span className='text-red-700'>*</span>
          </div>
          <div className='mt-1 text-xs text-muted-foreground'>
            <em>
              Serving the community as a professional member can help win
              confidence and increase your chances of being nominated as block
              head.
            </em>
          </div>
          <div className='mt-2 flex flex-wrap gap-4'>
            <Label className='flex items-center'>
              <Checkbox
                checked={serveCommunityAccepted === true}
                onCheckedChange={() =>
                  updateFields({ serveCommunityAccepted: true })
                }
              />
              <span className='ms-1'>Yes</span>
            </Label>
            <Label className='flex items-center'>
              <Checkbox
                checked={serveCommunityAccepted === false}
                onCheckedChange={() =>
                  updateFields({ serveCommunityAccepted: false })
                }
              />
              <span className='ms-1'>No</span>
            </Label>
          </div>
        </div>
      </div>
    </FormWrapper>
  )
}
