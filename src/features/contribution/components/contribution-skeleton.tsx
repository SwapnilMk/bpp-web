import { Main } from '@/components/layout/dashboard/main'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CaseHistorySkeleton } from './case-history-skeleton'
import { CommunityContributionSkeleton } from './community-contribution-skeleton'
import { ContributionMapSkeleton } from './contribution-map-skeleton'
import { ContributionStatsSkeleton } from './contribution-stats-skeleton'

export function ContributionSkeleton() {
  return (
    <Main>
      <div className='mb-4'>
        <Skeleton className='h-10 w-1/3 mx-auto' />
      </div>
      <Separator className='mb-4' />
      <Card className='w-full'>
        <CardHeader>
          <CardTitle className='text-center text-sm font-bold sm:text-xl lg:text-2xl'>
            <Skeleton className='h-8 w-1/2 mx-auto' />
          </CardTitle>
          <CardContent>
            <div className='flex w-full max-w-7xl items-center bg-transparent'>
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className='flex-1 h-20 mx-2 rounded-lg' />
              ))}
            </div>
          </CardContent>
        </CardHeader>
      </Card>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4'>
        <div className='lg:col-span-4'>
          <CommunityContributionSkeleton />
        </div>
        <div className='lg:col-span-3'>
          <CaseHistorySkeleton />
        </div>
      </div>
      <div className='mt-4'>
        <ContributionStatsSkeleton />
      </div>
      <div className='mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
        <div className='lg:col-span-4'>
          <ContributionMapSkeleton />
        </div>
        <div className='lg:col-span-3'>
          <Card className='w-full h-full flex-1'>
            <CardHeader>
              <CardTitle>
                <Skeleton className='h-6 w-1/2' />
              </CardTitle>
            </CardHeader>
            <CardContent className='flex-1'>
              <Skeleton className='h-full w-full rounded-lg' />
            </CardContent>
          </Card>
        </div>
      </div>
    </Main>
  )
}
