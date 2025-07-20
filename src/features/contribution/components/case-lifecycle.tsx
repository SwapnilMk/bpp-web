import { useEffect, useState } from 'react'
import { contributionService } from '@/services/contribution.service'
import { Pagination, PagedResponse } from '@/services/contribution.service'
import { CaseSummary } from '@/types/contribution'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Stepper, StepperItem, StepperTitle } from '@/components/ui/stepper'

const caseLifecycleSteps = [
  'Case Registration',
  'Review & Approval',
  'Verification',
  'Completion',
]

export function CaseLifecycle() {
  const [cases, setCases] = useState<CaseSummary[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCase, setSelectedCase] = useState<CaseSummary | null>(null)

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const pagination: Pagination = { page: 1, limit: 10 }
        const response: PagedResponse<CaseSummary> =
          await contributionService.getCaseSummaries(pagination)
        setCases(response.data)
      } catch (_error) {
        // TODO: handle error
      } finally {
        setLoading(false)
      }
    }

    fetchCases()
  }, [])

  const handleStepClick = (caseSummary: CaseSummary) => {
    setSelectedCase(caseSummary)
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Case Lifecycle</CardTitle>
      </CardHeader>
      <CardContent>
        {cases.map((caseSummary) => (
          <div key={caseSummary.id} className='mb-8'>
            <h3 className='text-lg font-semibold'>{caseSummary.title}</h3>
            <Stepper>
              {caseLifecycleSteps.map((label, index) => (
                <StepperItem
                  key={label}
                  step={index}
                  onClick={() => handleStepClick(caseSummary)}
                >
                  <StepperTitle>{label}</StepperTitle>
                </StepperItem>
              ))}
            </Stepper>
          </div>
        ))}
        {selectedCase && (
          <div className='mt-8'>
            <h3 className='text-lg font-semibold'>Case Details</h3>
            <p>ID: {selectedCase.id}</p>
            <p>Title: {selectedCase.title}</p>
            <p>Status: {selectedCase.status}</p>
            <p>Created At: {selectedCase.createdAt}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
