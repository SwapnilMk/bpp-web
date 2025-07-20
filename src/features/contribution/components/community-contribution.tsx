import { useState, useEffect } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { fetchCaseStatus } from '@/store/thunks'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Label } from '@/components/ui/label'
import TermsDialog from './terms-dialog'

export const CommunityContribution = () => {
  const [isDialogOpen, setDialogOpen] = useState(false)
  const [typeOfSupport, setTypeOfSupport] = useState<string | null>(null)
  const [category, setCategory] = useState<string | null>(null)
  const [termsAccepted, setTermsAccepted] = useState(false)
  const dispatch = useAppDispatch()
  const { status, isLoading } = useAppSelector((state) => state.case)
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchCaseStatus())
  }, [dispatch])

  const handleGetStarted = () => {
    if (
      typeOfSupport === 'BPP Support' &&
      category === 'Legal Assistance' &&
      termsAccepted
    ) {
      navigate({ to: '/dashboard/community-contribution/legal-assistance' })
    }
  }

  return (
    <div className='space-y-4'>
      {isLoading ? (
        <p>Loading case status...</p>
      ) : (
        status.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Case Status</CardTitle>
            </CardHeader>
            <CardContent>
              {status.map((caseStatus) => (
                <div
                  key={caseStatus.id}
                  className='flex items-center justify-between'
                >
                  <div>
                    <p className='font-bold'>{caseStatus.id}</p>
                    <p className='text-sm text-muted-foreground'>
                      {caseStatus.date}
                    </p>
                  </div>
                  <Badge>{caseStatus.status}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        )
      )}

      <div className='mt-6 rounded-lg bg-gray-100 p-4 shadow-md'>
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

      <div>
        <div className='grid grid-cols-1 gap-2 sm:grid-cols-2'>
          <Label className='my-2 text-xl font-bold text-blue-900'>
            Type of Support
          </Label>
          <Label className='my-2 text-xl font-bold text-blue-900'>
            Category
          </Label>
        </div>
        <div className='grid grid-cols-1 gap-2 sm:grid-cols-2'>
          {/* Type of Support Dropdown */}
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' className='w-full justify-between'>
                {typeOfSupport || 'Select...'}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='start' className='w-full'>
              <DropdownMenuItem
                onClick={() => setTypeOfSupport('BPP Support')}
                disabled={false}
                className={typeOfSupport === 'BPP Support' ? 'font-bold' : ''}
              >
                BPP Support (Free)
              </DropdownMenuItem>
              <DropdownMenuItem disabled>Legal Cases</DropdownMenuItem>
              <DropdownMenuItem disabled>Medical Cases</DropdownMenuItem>
              <DropdownMenuItem disabled>Social Needs</DropdownMenuItem>
              <DropdownMenuItem disabled>Educational Cases</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {/* Category Dropdown */}
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' className='w-full justify-between'>
                {category || 'Select...'}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='start' className='w-full'>
              <DropdownMenuItem
                onClick={() => setCategory('Legal Assistance')}
                disabled={false}
                className={category === 'Legal Assistance' ? 'font-bold' : ''}
              >
                Legal Assistance
              </DropdownMenuItem>
              <DropdownMenuItem disabled>Legal Aid</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className='text-md flex items-center gap-2'>
          <input
            type='checkbox'
            id='termsAccepted'
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            className='mr-2'
          />
          <label htmlFor='termsAccepted' className='text-sm'>
            I have read and accept the
            <span
              className='ml-1 cursor-pointer text-blue-700 underline'
              onClick={() => setDialogOpen(true)}
            >
              Terms and Conditions
            </span>
          </label>
        </div>
      </div>

      <Button
        className='mt-4 w-full'
        disabled={
          !(
            typeOfSupport === 'BPP Support' &&
            category === 'Legal Assistance' &&
            termsAccepted
          )
        }
        onClick={handleGetStarted}
      >
        Get Started
      </Button>

      <TermsDialog isOpen={isDialogOpen} onOpenChange={setDialogOpen} />
    </div>
  )
}
