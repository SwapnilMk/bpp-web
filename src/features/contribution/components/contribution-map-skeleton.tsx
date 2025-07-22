import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function ContributionMapSkeleton() {
  return (
    <Card className='w-full'>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <div>
          <Skeleton className='h-6 w-1/3' />
        </div>
        <Skeleton className='h-6 w-1/4' />
      </CardHeader>
      <CardContent>
        <div className='mb-4 flex items-center justify-between'>
          <div className='flex items-center space-x-2'>
            <Skeleton className='h-6 w-6' />
            <Skeleton className='h-6 w-1/2' />
          </div>
        </div>
        <Skeleton className='h-[380px] w-full rounded-lg' />
      </CardContent>
    </Card>
  )
}
