import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { FormWrapper } from './components/FormWrapper'

type EducationalDetailsData = {
  qualification?: string
  profession?: string
  position?: string
}

type EducationalDetailsFormProps = EducationalDetailsData & {
  updateFields: (fields: Partial<EducationalDetailsData>) => void
}

export function EducationalDetailsForm({
  qualification,
  profession,
  position,
  updateFields,
}: EducationalDetailsFormProps) {
  return (
    <FormWrapper title='Educational Details'>
      <div className='grid gap-4'>
        <div>
          <Label>
            Qualification <span className='text-red-700'>*</span>
          </Label>
          <Input
            placeholder='Enter your qualification'
            value={qualification}
            required
            onChange={(e) => updateFields({ qualification: e.target.value })}
          />
        </div>
        <div>
          <Label>
            Professional Category <span className='text-red-700'>*</span>
          </Label>
          <Select
            required
            onValueChange={(value) => updateFields({ profession: value })}
            value={profession}
          >
            <SelectTrigger>
              <SelectValue placeholder='Select profession' />
            </SelectTrigger>
            <SelectContent>
              {['Medical', 'Legal', 'Social', 'Other'].map((p) => (
                <SelectItem key={p} value={p}>
                  {p}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>
            Position <span className='text-red-700'>*</span>
          </Label>
          <Input
            placeholder='Enter your position'
            value={position}
            required
            onChange={(e) => updateFields({ position: e.target.value })}
          />
        </div>
      </div>
    </FormWrapper>
  )
}
