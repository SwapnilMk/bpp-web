import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function ReferralSkeleton() {
  return (
    <div className='space-y-8'>
      {/* Stats Grid Skeleton */}
      <div className='grid gap-4 md:grid-cols-3'>
        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <CardHeader className='pb-2'>
              <Skeleton className='h-6 w-32' />
              <Skeleton className='h-4 w-24' />
            </CardHeader>
            <CardContent>
              <Skeleton className='h-8 w-16' />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Referral Code Section Skeleton */}
      <Card>
        <CardHeader>
          <Skeleton className='h-6 w-48' />
          <Skeleton className='h-4 w-72' />
        </CardHeader>
        <CardContent>
          <div className='flex flex-col gap-4'>
            <div className='flex items-center gap-2'>
              <Skeleton className='h-12 flex-1' />
              <Skeleton className='h-10 w-10' />
            </div>
            <div className='flex items-center gap-2'>
              <Skeleton className='h-12 flex-1' />
              <Skeleton className='h-10 w-10' />
              <Skeleton className='h-10 w-10' />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Referral History Skeleton */}
      <Card>
        <CardHeader>
          <Skeleton className='h-6 w-48' />
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            {[...Array(5)].map((_, i) => (
              <div key={i} className='flex items-center gap-4'>
                <Skeleton className='h-4 w-8' />
                <Skeleton className='h-4 w-24' />
                <Skeleton className='h-4 w-48' />
                <Skeleton className='h-4 w-24' />
                <Skeleton className='h-4 w-32' />
                <Skeleton className='h-8 w-8' />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
