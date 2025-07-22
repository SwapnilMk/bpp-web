import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export type CaseStatus = {
  id: string;
  date: string;
  status: string;
  category: string;
  history: { status: string; date: string }[];
  assignedLawyer?: string;
};

export const CaseHistory = ({ cases }: { cases: CaseStatus[] }) => {
  const getStatusVariant = (status: string) => {
    if (status.includes('Resolved') || status.includes('Closed'))
      return 'default'
    if (status.includes('Review') || status.includes('Pending'))
      return 'secondary'
    return 'outline'
  }

  // Only show top 3 cases
  const topCases = cases.slice(0, 3)

  return (
    <Card className='w-full h-full min-h-[420px] max-h-[530px] flex flex-col'>
      <CardHeader>
        <CardTitle>Your Case History</CardTitle>
      </CardHeader>
      <CardContent className='flex-1 overflow-y-auto space-y-6'>
        {topCases.length === 0 ? (
          <div className='py-8 text-center text-gray-500 dark:text-gray-400'>No case history found.</div>
        ) : (
          topCases.map((caseItem) => (
            <div
              key={caseItem.id}
              className='p-4 bg-gray-50 rounded-lg border dark:bg-gray-800/50'
            >
              <div className='flex flex-col mb-4 sm:flex-row sm:items-center sm:justify-between'>
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
                      <span className='flex absolute -left-2 justify-center items-center w-4 h-4 bg-blue-100 rounded-full ring-4 ring-white dark:bg-blue-900 dark:ring-gray-900'></span>
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
          ))
        )}
      </CardContent>
    </Card>
  )
}
