import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { SelectNative } from '@/components/ui/select-native'
import TermsDialog from './terms-dialog'

export const CommunityContribution = () => {
  const [isDialogOpen, setDialogOpen] = useState(false)
  const [typeOfSupport, setTypeOfSupport] = useState<string | null>(null)
  const [category, setCategory] = useState<string | null>(null)
  const [termsAccepted, setTermsAccepted] = useState(false)
  const navigate = useNavigate()

  const handleGetStarted = () => {
    if (typeOfSupport && category && termsAccepted) {
      navigate({ to: '/dashboard/community-contribution/legal-assistance' })
    }
  }

  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle>Community Contribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='p-4 mt-2 bg-gray-100 rounded-lg shadow-md'>
          <h3 className='text-lg font-bold text-gray-800'>
            Community Contribution Launch <br />
            Announcement
          </h3>
          <p className='mt-2 text-sm text-gray-700'>
            The Community Contribution App Services will be operational soon,
            depending upon the masses joining the party so that maximum benefit
            can be taken from the Party's initiative.
          </p>
          <p className='mt-2 text-sm text-gray-700'>
            Our target is to reach to the mass by 01.01.2026. allowing a large
            number of citizens to be the part of movement during this one year.
          </p>
          <p className='mt-2 text-sm text-gray-700'>
            Meanwhile,{' '}
            <span className='font-bold'>
              Bharatiya Popular Party's Legal wing
            </span>{' '}
            is available for 'Free Legal Guidance' to its primary and active
            members. Because this is being provided by the party's wing so no
            voting is required for the purpose and can be started to avail by{' '}
            <span className='font-bold'>01.02.2025.</span>
          </p>
        </div>

        <div className='mt-4'>
          <div className='grid grid-cols-1 gap-2 sm:grid-cols-2'>
            <Label className='my-2 text-xl font-bold text-blue-900'>
              Type of Support
            </Label>
            <Label className='my-2 text-xl font-bold text-blue-900'>
              Category
            </Label>
          </div>
          <div className='grid grid-cols-1 gap-2 sm:grid-cols-2'>
            <SelectNative
              value={typeOfSupport ?? ''}
              onChange={e => setTypeOfSupport(e.target.value)}
            >
              <option value='' disabled>Select...</option>
              <option value='BPP Support'>BPP Support (Free)</option>
              <option value='Legal Cases' disabled>Legal Cases</option>
              <option value='Medical Cases' disabled>Medical Cases</option>
              <option value='Social Needs' disabled>Social Needs</option>
              <option value='Educational Cases' disabled>Educational Cases</option>
            </SelectNative>
            <SelectNative
              value={category ?? ''}
              onChange={e => setCategory(e.target.value)}
            >
              <option value='' disabled>Select...</option>
              <option value='Legal Assistance'>Legal Assistance</option>
              <option value='Legal Aid' disabled>Legal Aid</option>
            </SelectNative>
          </div>
          <div className='flex gap-2 items-center mt-4 text-md'>
            <input
              type='checkbox'
              id='termsAccepted'
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className='w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500'
            />
            <label htmlFor='termsAccepted' className='text-sm text-gray-600'>
              I have read and accept the{' '}
              <span
                className='ml-1 text-blue-700 underline cursor-pointer'
                onClick={() => setDialogOpen(true)}
              >
                Terms and Conditions
              </span>
            </label>
          </div>
        </div>

        <Button
          className='mt-4 w-full'
          disabled={!typeOfSupport || !category || !termsAccepted}
          onClick={handleGetStarted}
        >
          Get Started
        </Button>

        <TermsDialog isOpen={isDialogOpen} onOpenChange={setDialogOpen} />
      </CardContent>
    </Card>
  )
}
