import { Button } from '@/components/ui/button';

interface ReviewStepProps {
  formData: Record<string, unknown>;
  onBack: () => void;
  onSubmit: () => void;
}

export function ReviewStep({ formData, onBack, onSubmit }: ReviewStepProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Review Your Information</h2>
      <pre className="p-4 bg-gray-100 rounded-md">{JSON.stringify(formData, null, 2)}</pre>
      <div className="flex justify-between mt-4">
        <Button type="button" onClick={onBack}>Back</Button>
        <Button type="button" onClick={onSubmit}>Submit</Button>
      </div>
    </div>
  );
}
