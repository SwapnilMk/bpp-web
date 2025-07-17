import { useState } from 'react'
import { ImageIcon, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface ImageUploadProps {
  value?: string
  onChange: (value: string) => void
  onRemove: () => void
}

export function ImageUpload({ value, onChange, onRemove }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result as string
        setPreview(base64String)
        onChange(base64String)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className='space-y-2'>
      {value || preview ? (
        <div className='relative aspect-video w-full overflow-hidden rounded-md'>
          <img
            src={value || preview || ''}
            alt='Document image'
            className='h-full w-full object-cover'
          />
          <Button
            type='button'
            variant='destructive'
            size='icon'
            className='absolute right-2 top-2'
            onClick={onRemove}
          >
            <X className='h-4 w-4' />
          </Button>
        </div>
      ) : (
        <div className='flex aspect-video w-full items-center justify-center rounded-md border border-dashed'>
          <div className='flex flex-col items-center gap-2'>
            <ImageIcon className='h-10 w-10 text-muted-foreground' />
            <Button type='button' variant='outline' size='sm' asChild>
              <label className='cursor-pointer'>
                <Input
                  type='file'
                  accept='image/*'
                  className='hidden'
                  onChange={handleFileChange}
                />
                Upload Image
              </label>
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
