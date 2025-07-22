import { memo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Main } from '@/components/layout/dashboard/main'
import { Separator } from '@/components/ui/separator'
import ShiftingCountdown from '@/components/features/countdown-timer'
import { CaseHistory } from './components/case-history'
import { CommunityContribution } from './components/community-contribution'
import { ContributionMap } from './components/contribution-map'
import { ContributionStats } from './components/contribution-stats'
import { ContributionSkeleton } from './components/contribution-skeleton'
import { fetchContributionData } from '@/store/slices/contribution.slice'
import CommunityContributionImage from '@/assets/images/community/internalworking.png'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'


const ContributionPage = memo(() => {
  const dispatch = useDispatch()
  const { caseHistory, dashboardStats, userAddress, loading } = useSelector(
    (state) => state.contribution
  )

  useEffect(() => {
    dispatch(fetchContributionData())
  }, [dispatch])

  if (loading || !dashboardStats || !userAddress) {
    return <ContributionSkeleton />
  }

  const mapUserAddress = {
    district: userAddress.district,
    state: userAddress.state,
    coordinates: [userAddress.coordinates[0], userAddress.coordinates[1]] as [number, number],
  }
  const totalMembers = dashboardStats.totalCases

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
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
        <div className='lg:col-span-4'>
          <CommunityContribution />
        </div>
        <div className='lg:col-span-3'>
          <CaseHistory cases={caseHistory} />
        </div>
      </div>
      <div className='mt-4'>
        <ContributionStats stats={dashboardStats} />
      </div>
      <div className='mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
        <div className='lg:col-span-4'>
          <ContributionMap userAddress={mapUserAddress} totalMembers={totalMembers} />
        </div>
        <div className='lg:col-span-3'>
          <Card className='w-full h-full flex-1'>
            <CardHeader>
              <CardTitle>Community Contribution</CardTitle>
            </CardHeader>
            <CardContent className='flex-1'>
              <img
                src={CommunityContributionImage}
                alt='Contribution flowchart'
                className='h-full w-full object-cover rounded-lg'
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </Main>
  )
})

export default ContributionPage
