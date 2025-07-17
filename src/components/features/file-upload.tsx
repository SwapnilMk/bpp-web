'use client'

import * as React from 'react'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { X } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

const MAX_FILE_SIZE = 3 * 1024 * 1024 // 3MB
const ACCEPTED_FILE_TYPES = 'image/*,.pdf'

const formSchema = z.object({
  files: z
    .array(z.custom<File>())
    .min(1, 'Please select at least one file')
    .max(2, 'Please select up to 2 files')
    .refine((files) => files.every((file) => file.size <= MAX_FILE_SIZE), {
      message: 'File size must be less than 3MB',
      path: ['files'],
    })
    .refine(
      (files) =>
        files.every(
          (file) =>
            file.type.startsWith('image/') || file.type === 'application/pdf'
        ),
      {
        message: 'Only images and PDF files are allowed',
        path: ['files'],
      }
    ),
})

type FormValues = z.infer<typeof formSchema>

export function FileUploadForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      files: [],
    },
  })

  const onSubmit = React.useCallback((data: FormValues) => {
    toast('Submitted values:', {
      description: (
        <pre className='mt-2 w-80 rounded-md bg-accent/30 p-4 text-accent-foreground'>
          <code>
            {JSON.stringify(
              data.files.map((file) => ({
                name:
                  file.name.length > 25
                    ? `${file.name.slice(0, 25)}...`
                    : file.name,
                type: file.type,
                size: `${(file.size / 1024 / 1024).toFixed(2)}MB`,
              })),
              null,
              2
            )}
          </code>
        </pre>
      ),
    })
  }, [])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full max-w-md'>
        <FormField
          control={form.control}
          name='files'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Attachments</FormLabel>
              <FormControl>
                <FileUpload
                  value={field.value}
                  onValueChange={field.onChange}
                  accept={ACCEPTED_FILE_TYPES}
                  maxFiles={2}
                  maxSize={MAX_FILE_SIZE}
                  onFileReject={(_, message) => {
                    form.setError('files', {
                      message,
                    })
                  }}
                  multiple
                >
                  <FileUploadDropzone className='flex-row flex-wrap border-dotted text-center'>
                    <FileUploadTrigger asChild>
                      <Button variant='link' size='sm' className='p-0'>
                        choose files
                      </Button>
                    </FileUploadTrigger>
                  </FileUploadDropzone>
                  <FileUploadList>
                    {field.value.map((file, index) => (
                      <FileUploadItem key={index} value={file}>
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
                    ))}
                  </FileUploadList>
                </FileUpload>
              </FormControl>
              <FormDescription>
                Upload up to 2 files (images or PDF) up to 3MB each.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' className='mt-4'>
          Submit
        </Button>
      </form>
    </Form>
  )
}
