import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { mockCaseStatus } from '@/features/contribution/data/data'

export const CaseHistory = ({ cases }: { cases: typeof mockCaseStatus }) => {
  const getStatusVariant = (status: string) => {
    if (status.includes('Resolved') || status.includes('Closed'))
      return 'default'
    if (status.includes('Review') || status.includes('Pending'))
      return 'secondary'
    return 'outline'
  }

  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle>Your Case History</CardTitle>
      </CardHeader>
      <CardContent className='space-y-6'>
        {cases.map((caseItem) => (
          <div
            key={caseItem.id}
            className='rounded-lg border bg-gray-50 p-4 dark:bg-gray-800/50'
          >
            <div className='mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between'>
              <div>
                <p className='text-lg font-bold text-gray-900 dark:text-white'>
                  {caseItem.id}
                </p>
                <p className='text-sm text-gray-500 dark:text-gray-400'>
                  Submitted on: {caseItem.date}
                </p>
              </div>
              <Badge variant={getStatusVariant(caseItem.status)}>
                {caseItem.status}
              </Badge>
            </div>
            <div>
              <h4 className='mb-2 font-semibold text-gray-800 dark:text-gray-200'>
                Case Timeline
              </h4>
              <div className='relative ml-2 border-l-2 border-blue-200 dark:border-blue-700'>
                {caseItem.history.map((event, index) => (
                  <div key={index} className='mb-4 ml-6'>
                    <span className='absolute -left-2 flex h-4 w-4 items-center justify-center rounded-full bg-blue-100 ring-4 ring-white dark:bg-blue-900 dark:ring-gray-900'></span>
                    <h5 className='font-medium text-gray-800 dark:text-gray-100'>
                      {event.status}
                    </h5>
                    <p className='text-xs text-gray-500 dark:text-gray-400'>
                      {event.date}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
