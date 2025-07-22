import { Controller, useFormContext } from 'react-hook-form'
import { CaseRegistrationFormValues } from '@/features/contribution/legal/schema/case-registration'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { DatePicker } from '@/components/features/DatePicker'
import { SelectNative } from '@/components/ui/select-native'
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
import { Button } from '@/components/ui/button'
import { CloudUpload, X } from 'lucide-react'
import { useState } from 'react'

const MAX_FILE_SIZE = 3 * 1024 * 1024
const ACCEPTED_FILE_TYPES = '.pdf,.jpg,.jpeg,.png'

export function CaseRegistrationForm() {
  const {
    register,
    control,
    formState: { errors },
    watch,
  } = useFormContext<CaseRegistrationFormValues>()

  const [briefCount, setBriefCount] = useState(watch('briefYourCase')?.length || 0)
  const [fileError, setFileError] = useState<string | undefined>(undefined)

  // Options for type of case
  const typeOfCaseOptions = [
    'Criminal Cases',
    'Civil Cases',
    'Constitutional Cases',
    'Administrative Cases',
    'Family Law Cases',
    'Commercial Cases',
    'Labor and Employment Cases',
    'Environmental Cases',
    'Property Cases',
    'Consumer Cases',
  ]

  return (
    <div className="w-full">
      <div className='mb-4'>
        <h2 className='text-2xl font-bold text-blue-900'>Case Registration</h2>
        <p className='py-2 text-blue-700'>Please provide your case details</p>
        <Separator />
      </div>
      <div className='space-y-6 text-start'>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          <div>
            <Label htmlFor='typeOfSupport' className='block text-sm font-medium text-primary'>
              Type of Support*
            </Label>
            <Input
              id='typeOfSupport'
              placeholder='Enter type of support'
              {...register('typeOfSupport', { required: true })}
              className='block p-2 w-full rounded-md border'
            />
            {errors.typeOfSupport && (
              <span className='text-sm text-destructive'>{errors.typeOfSupport.message}</span>
            )}
          </div>
          <div>
            <Label htmlFor='category' className='block text-sm font-medium text-primary'>
              Category*
            </Label>
            <Input
              id='category'
              placeholder='Enter category'
              {...register('category', { required: true })}
              className='block p-2 w-full rounded-md border'
            />
            {errors.category && (
              <span className='text-sm text-destructive'>{errors.category.message}</span>
            )}
          </div>
        </div>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          <div>
            <Label htmlFor='typeOfCase' className='block text-sm font-medium text-primary'>
              Type of Case*
            </Label>
            <Controller
              name='typeOfCase'
              control={control}
              render={({ field }) => (
                <SelectNative
                  value={field.value || ''}
                  onChange={e => field.onChange(e.target.value)}
                >
                  <option value='' disabled>Select...</option>
                  {typeOfCaseOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </SelectNative>
              )}
            />
            {errors.typeOfCase && (
              <span className='text-sm text-destructive'>{errors.typeOfCase.message}</span>
            )}
          </div>
          <div>
            <Label htmlFor='dateOfDispute' className='block text-sm font-medium text-primary'>
              Date of Dispute*
            </Label>
            <Controller
              name='dateOfDispute'
              control={control}
              render={({ field }) => (
                <DatePicker
                  date={field.value ? new Date(field.value) : undefined}
                  setDate={(date) => field.onChange(date ? date.toISOString().split('T')[0] : '')}
                />
              )}
            />
            {errors.dateOfDispute && (
              <span className='text-sm text-destructive'>{errors.dateOfDispute.message}</span>
            )}
          </div>
        </div>
        <div>
          <Label htmlFor='briefYourCase' className='block text-sm font-medium text-primary'>
            Brief your case* (max 1000 characters)
          </Label>
          <textarea
            id='briefYourCase'
            maxLength={1000}
            rows={5}
            {...register('briefYourCase', { required: true, maxLength: 1000, onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => setBriefCount(e.target.value.length) })}
            className='block p-2 w-full rounded-md border'
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              setBriefCount(e.target.value.length)
              register('briefYourCase').onChange(e)
            }}
            value={watch('briefYourCase') || ''}
          />
          <div className='text-xs text-right text-gray-500'>{briefCount}/1000</div>
          {errors.briefYourCase && (
            <span className='text-sm text-destructive'>{errors.briefYourCase.message}</span>
          )}
        </div>
        <div>
          <Label htmlFor='additionalDocument' className='block text-sm font-medium text-primary'>
            Additional Document*
          </Label>
          <Controller
            name='additionalDocument'
            control={control}
            render={({ field }) => (
              <FileUpload
                value={field.value ? [field.value] : []}
                onValueChange={files => {
                  if (files[0] && files[0].size > MAX_FILE_SIZE) {
                    setFileError('File size must be less than 3MB')
                    field.onChange(null)
                  } else {
                    setFileError(undefined)
                    field.onChange(files[0] || null)
                  }
                }}
                accept={ACCEPTED_FILE_TYPES}
                maxFiles={1}
                maxSize={MAX_FILE_SIZE}
                onFileReject={(_file, message) => setFileError(message === 'File too large' ? 'File size must be less than 3MB' : message)}
              >
                <FileUploadDropzone className='flex-row flex-wrap px-3 py-2 h-10 text-center border-dotted'>
                  <CloudUpload className='size-4' />
                  <FileUploadTrigger asChild>
                    <Button variant='link' size='sm' className='p-0 h-auto'>
                      Upload
                    </Button>
                  </FileUploadTrigger>
                </FileUploadDropzone>
                <FileUploadList>
                  {field.value && (
                    <FileUploadItem value={field.value}>
                      <FileUploadItemPreview />
                      <FileUploadItemMetadata />
                      <FileUploadItemDelete asChild>
                        <Button variant='ghost' size='icon' className='size-7'>
                          <X />
                          <span className='sr-only'>Delete</span>
                        </Button>
                      </FileUploadItemDelete>
                    </FileUploadItem>
                  )}
                </FileUploadList>
              </FileUpload>
            )}
          />
          {(fileError || typeof errors.additionalDocument?.message === 'string') && (
            <span className='text-sm text-destructive'>
              {fileError || (typeof errors.additionalDocument?.message === 'string' ? errors.additionalDocument.message : '')}
            </span>
          )}
        </div>
        <div>
          <Label className='block text-sm font-medium text-primary'>
            Financial Aid*
          </Label>
          <Controller
            name='financialAid'
            control={control}
            defaultValue='no'
            render={({ field }) => (
              <div className='flex gap-4 items-center mt-2'>
                <label className='flex gap-2 items-center'>
                  <input type='checkbox' checked={field.value === 'no'} readOnly /> No
                </label>
              </div>
            )}
          />
          <div className='text-xs text-gray-500'>Financial Aid is currently unavailable</div>
          {errors.financialAid && (
            <span className='text-sm text-destructive'>{errors.financialAid.message}</span>
          )}
        </div>
      </div>
    </div>
  )
}
