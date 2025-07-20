import { Button } from '@/components/ui/button'

interface ReviewStepProps {
  formData: Record<string, unknown>
  onBack: () => void
  onSubmit: () => void
}

export function ReviewStep({ formData, onBack, onSubmit }: ReviewStepProps) {
  return (
    <div>
      <h2 className='mb-4 text-2xl font-bold'>Review Your Information</h2>
      <pre className='rounded-md bg-gray-100 p-4'>
        {JSON.stringify(formData, null, 2)}
      </pre>
      <div className='mt-4 flex justify-between'>
        <Button type='button' onClick={onBack}>
          Back
        </Button>
        <Button type='button' onClick={onSubmit}>
          Submit
        </Button>
      </div>
    </div>
  )
}
