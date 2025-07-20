import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { fetchCaseStatus } from '@/store/thunks'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { LegalContribution } from '@/features/legal-contribution'
import TermsDialog from './terms-dialog'

interface CommunityContributionProps {
  setCurrentStep: (step: number) => void
}

export const CommunityContribution = ({
  setCurrentStep,
}: CommunityContributionProps) => {
  const [isDialogOpen, setDialogOpen] = useState(false)
  const [typeOfSupport, setTypeOfSupport] = useState<string | null>(null)
  const [category, setCategory] = useState<string | null>(null)
  const [formStarted, setFormStarted] = useState(false)
  const dispatch = useAppDispatch()
  const { status, isLoading } = useAppSelector((state) => state.case)

  useEffect(() => {
    dispatch(fetchCaseStatus())
  }, [dispatch])

  const handleGetStarted = () => {
    setFormStarted(true)
  }

  if (formStarted) {
    return (
      <div className='fixed inset-0 z-50 bg-background'>
        <LegalContribution
          typeOfSupport={typeOfSupport}
          category={category}
          setCurrentStep={setCurrentStep}
        />
      </div>
    )
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
          <Select onValueChange={(value) => setTypeOfSupport(value)}>
            <SelectTrigger className='w-full'>
              <SelectValue placeholder='Select...' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='BPP Support'>BPP Support (Free)</SelectItem>
              <SelectItem value='Legal Cases' disabled>Legal Cases</SelectItem>
              <SelectItem value='Medical Cases' disabled>
                Medical Cases
              </SelectItem>
              <SelectItem value='Social Needs' disabled>
                Social Needs
              </SelectItem>
              <SelectItem value='Educational Cases' disabled>
                Educational Cases
              </SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={(value) => setCategory(value)}>
            <SelectTrigger className='w-full'>
              <SelectValue placeholder='Select...' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='Legal Assistance'>Legal Assistance</SelectItem>
              <SelectItem value='Legal Aid' disabled>
                Legal Aid
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className='text-md'>
          <a
            className='mt-4 w-full cursor-pointer text-sm text-blue-700'
            onClick={() => setDialogOpen(true)}
          >
            Terms and Conditions
          </a>
        </div>
      </div>

      <Button
        className='mt-4 w-full'
        disabled={!typeOfSupport || !category}
        onClick={handleGetStarted}
      >
        Get Started
      </Button>

      <TermsDialog isOpen={isDialogOpen} onOpenChange={setDialogOpen} />
    </div>
  )
}
