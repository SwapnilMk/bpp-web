import { useState, useEffect } from 'react'
import { InfoIcon, Phone } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { FormWrapper } from './components/FormWrapper'
import { TermsDialog } from './components/terms-dialog'

type PhoneData = {
  phone?: string
  termsAccepted?: boolean
  partyObjectivesAccepted?: boolean
}

type PhoneFormProps = PhoneData & {
  updateFields: (fields: Partial<PhoneData>) => void
}

export function EmailForm({
  phone,
  termsAccepted,
  partyObjectivesAccepted,
  updateFields,
}: PhoneFormProps) {
  const [inputValue, setInputValue] = useState(phone || '')
  const [error, setError] = useState('')
  const [isTermsDialogOpen, setTermsDialogOpen] = useState(false)

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const phoneParam = searchParams.get('phone')
    if (phoneParam && /^\d{10}$/.test(phoneParam) && !phone) {
      setInputValue(phoneParam)
      updateFields({ phone: phoneParam })
    }
  }, [phone, updateFields])

  const handleInputChange = (value: string) => {
    const cleanedValue = value.replace(/\D/g, '').slice(0, 10)
    setInputValue(cleanedValue)
    if (cleanedValue.length === 10) {
      setError('')
      updateFields({ phone: cleanedValue })
    } else {
      setError('Please enter a valid 10-digit phone number')
      updateFields({ phone: '' })
    }
  }

  return (
    <FormWrapper title='Contact Information'>
      <div className='flex items-center'>
        <Label className='mr-2'>
          Phone Number <span className='text-red-700'>*</span>
        </Label>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <InfoIcon className='h-4 w-4 text-muted-foreground' />
            </TooltipTrigger>
            <TooltipContent side='right' align='center'>
              <p>Enter your 10-digit phone number for OTP verification.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className='relative'>
        <Input
          autoFocus
          type='text'
          value={inputValue}
          placeholder='Phone Number'
          onChange={(e) => handleInputChange(e.target.value)}
          className={error ? 'border-red-500 focus:ring-red-500' : ''}
          maxLength={10}
        />
        <div className='pointer-events-none absolute inset-y-0 end-0 flex items-center pe-3 text-muted-foreground/80'>
          {inputValue.length === 10 && (
            <Phone size={16} strokeWidth={2} aria-hidden='true' />
          )}
        </div>
      </div>
      {error && <p className='mt-1 text-xs text-red-500'>{error}</p>}
      <div className='flex flex-row items-center space-x-3 space-y-0'>
        <Checkbox
          checked={termsAccepted}
          onCheckedChange={(checked) =>
            updateFields({ termsAccepted: !!checked })
          }
          className='border-blue-700 data-[state=checked]:bg-blue-700 data-[state=checked]:text-white'
        />
        <Label className='text-xs'>
          I accept the Bharatiya Popular Party's Membership,{' '}
          <span
            className='cursor-pointer text-blue-600 underline'
            onClick={() => setTermsDialogOpen(true)}
          >
            Terms & Conditions
          </span>{' '}
          & Constitution and confirm I am 18+ and not a member of any other
          political party.
        </Label>
      </div>
      <div className='flex flex-row items-center space-x-3 space-y-0'>
        <Checkbox
          checked={partyObjectivesAccepted}
          onCheckedChange={(checked) =>
            updateFields({ partyObjectivesAccepted: !!checked })
          }
          className='border-blue-700 data-[state=checked]:bg-blue-700 data-[state=checked]:text-white'
        />
        <Label className='text-xs'>
          I wish to enroll as a Primary Member of the Bharatiya Popular Party
          and accept Party's Objectives.
        </Label>
      </div>
      <div className='text-center text-xs text-red-500 text-opacity-80'>
        * Keep your Aadhaar & Voter ID handy before proceeding
      </div>
      <TermsDialog
        isOpen={isTermsDialogOpen}
        onOpenChange={setTermsDialogOpen}
        onAccept={() => updateFields({ termsAccepted: true })}
      />
    </FormWrapper>
  )
}
