import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function CaseHistorySkeleton() {
  return (
    <Card className='w-full h-full flex flex-col'>
      <CardHeader>
        <CardTitle>
          <Skeleton className='h-6 w-1/2' />
        </CardTitle>
      </CardHeader>
      <CardContent className='flex-1 overflow-y-auto space-y-6'>
        {[...Array(3)].map((_, i) => (
          <div key={i} className='p-4 bg-gray-50 rounded-lg border dark:bg-gray-800/50'>
            <div className='flex flex-col mb-4 sm:flex-row sm:items-center sm:justify-between'>
              <div>
                <Skeleton className='h-6 w-3/4 mb-2' />
                <Skeleton className='h-4 w-1/2' />
              </div>
              <Skeleton className='h-8 w-1/4' />
            </div>
            <div>
              <Skeleton className='h-5 w-1/3 mb-2' />
              <div className='relative ml-2 border-l-2 border-blue-200 dark:border-blue-700'>
                {[...Array(2)].map((_, j) => (
                  <div key={j} className='mb-4 ml-6'>
                    <Skeleton className='h-4 w-4 absolute -left-2 rounded-full' />
                    <Skeleton className='h-5 w-1/2 mb-1' />
                    <Skeleton className='h-3 w-1/4' />
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
