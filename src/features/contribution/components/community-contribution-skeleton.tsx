import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function CommunityContributionSkeleton() {
  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle>
          <Skeleton className='h-6 w-1/2' />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='p-4 mt-2 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-md'>
          <Skeleton className='h-6 w-3/4 mb-4' />
          <Skeleton className='h-4 w-full mb-2' />
          <Skeleton className='h-4 w-full mb-2' />
          <Skeleton className='h-4 w-2/3' />
        </div>
        <div className='mt-4'>
          <div className='grid grid-cols-1 gap-2 sm:grid-cols-2'>
            <Skeleton className='h-8 w-full' />
            <Skeleton className='h-8 w-full' />
          </div>
          <div className='grid grid-cols-1 gap-2 sm:grid-cols-2 mt-2'>
            <Skeleton className='h-10 w-full' />
            <Skeleton className='h-10 w-full' />
          </div>
          <div className='flex gap-2 items-center mt-4 text-md'>
            <Skeleton className='h-6 w-6' />
            <Skeleton className='h-6 w-3/4' />
          </div>
        </div>
        <Skeleton className='h-10 w-full mt-4' />
      </CardContent>
    </Card>
  )
}
