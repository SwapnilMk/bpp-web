import { memo } from 'react'
import CommunityContribution from '@/assets/images/community/internalworking.png'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import ShiftingCountdown from '@/components/features/countdown-timer'
import { Main } from '@/components/layout/dashboard/main'
import { CaseHistory } from './components/case-history'
import { CommunityContribution as CommunityContributionComponent } from './components/community-contribution'
import { ContributionMap } from './components/contribution-map'
import { mockCaseStatus } from './data/data'

const Contribution = memo(() => {
  return (
    <Main>
      <div className='mb-4'>
        <h1 className='text-xl font-bold tracking-tight text-foreground text-gray-900 dark:text-white sm:text-2xl lg:text-3xl'>
          Community Contribution
        </h1>
      </div>
      <Separator className='mb-4' />
      <Card className='w-full'>
        <CardHeader>
          <CardTitle className='text-center text-sm font-bold sm:text-xl lg:text-2xl'>
            COMMUNITY CONTRIBUTION START IN
          </CardTitle>
          <CardContent>
            <ShiftingCountdown />
          </CardContent>
        </CardHeader>
      </Card>
      <div className='mt-2 grid grid-cols-1 gap-2 md:grid-cols-2'>
        <CommunityContributionComponent />
        <CaseHistory cases={mockCaseStatus} />
      </div>
      <div className='mt-2 grid grid-cols-1 gap-2 md:grid-cols-2'>
        <ContributionMap />
        <div className='h-full w-full'>
          <Card className='w-full'>
            <CardHeader>
              <CardTitle>Community Contribution</CardTitle>
            </CardHeader>
            <CardContent>
              <img
                src={CommunityContribution}
                alt='Contribution flowchart'
                className='h-full w-full object-cover'
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </Main>
  )
})

export default Contribution
