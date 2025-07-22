import { memo, useEffect, useState } from 'react'
import CommunityContribution from '@/assets/images/community/internalworking.png'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import ShiftingCountdown from '@/components/features/countdown-timer'
import { Main } from '@/components/layout/dashboard/main'
import { CaseHistory } from './components/case-history'
import { CommunityContribution as CommunityContributionComponent } from './components/community-contribution'
import { ContributionMap } from './components/contribution-map'
import { ContributionStats } from './components/contribution-stats'
import { getCommunityContributionData } from '@/services/contribution.service'
import { mockDashboardStats, mockUserAddress } from './data/data'
import type { CaseStatus } from './components/case-history'
import { Skeleton } from '@/components/ui/skeleton'

type DashboardStats = typeof mockDashboardStats
// Use the type of mockUserAddress for userAddress
type UserAddress = typeof mockUserAddress

type CommunityContributionData = {
  caseHistory: CaseStatus[]
  dashboardStats: DashboardStats
  userAddress: UserAddress
}

const CARD_HEIGHT_CLASSES = 'h-full min-h-[420px] max-h-[530px] flex flex-col'

function ContributionSkeleton() {
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
      <div className='mt-2 grid grid-cols-1 gap-2 md:grid-cols-2'>
        <div className={CARD_HEIGHT_CLASSES}>
          <Card className='w-full h-full flex-1'>
            <CardHeader>
              <CardTitle><Skeleton className='h-6 w-1/2' /></CardTitle>
            </CardHeader>
            <CardContent>
              <Skeleton className='h-32 w-full mb-4' />
              <div className='grid grid-cols-2 gap-2'>
                <Skeleton className='h-10 w-full' />
                <Skeleton className='h-10 w-full' />
              </div>
              <Skeleton className='h-6 w-3/4 mt-4' />
              <Skeleton className='h-10 w-full mt-4' />
            </CardContent>
          </Card>
        </div>
        <div className={CARD_HEIGHT_CLASSES}>
          <Card className='w-full h-full flex-1'>
            <CardHeader>
              <CardTitle><Skeleton className='h-6 w-1/2' /></CardTitle>
            </CardHeader>
            <CardContent>
              {[...Array(3)].map((_, i) => (
                <div key={i} className='mb-6'>
                  <Skeleton className='h-6 w-1/3 mb-2' />
                  <Skeleton className='h-4 w-1/2 mb-2' />
                  <Skeleton className='h-8 w-full' />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
      <div className='mt-2'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {[...Array(3)].map((_, i) => (
            <Card key={i} className='w-full'>
              <CardHeader>
                <CardTitle><Skeleton className='h-6 w-1/2' /></CardTitle>
              </CardHeader>
              <CardContent>
                <Skeleton className='h-10 w-1/2 mb-2' />
                <Skeleton className='h-4 w-3/4' />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <div className='mt-2 grid grid-cols-1 gap-2 md:grid-cols-2'>
        <div className={CARD_HEIGHT_CLASSES}>
          <Card className='w-full h-full flex-1'>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <Skeleton className='h-6 w-1/3' />
              <Skeleton className='h-6 w-1/4' />
            </CardHeader>
            <CardContent>
              <Skeleton className='h-6 w-1/2 mb-4' />
              <Skeleton className='h-[380px] w-full rounded-lg' />
            </CardContent>
          </Card>
        </div>
        <div className={CARD_HEIGHT_CLASSES}>
          <Card className='w-full h-full flex-1'>
            <CardHeader>
              <CardTitle><Skeleton className='h-6 w-1/2' /></CardTitle>
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

const Contribution = memo(() => {
  const [caseHistory, setCaseHistory] = useState<CaseStatus[]>([])
  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(null)
  const [userAddress, setUserAddress] = useState<UserAddress | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    getCommunityContributionData().then((data: CommunityContributionData) => {
      if (mounted) {
        setCaseHistory(data.caseHistory)
        setDashboardStats(data.dashboardStats)
        setUserAddress(data.userAddress)
        setLoading(false)
      }
    })
    return () => { mounted = false }
  }, [])

  if (loading || !dashboardStats || !userAddress) {
    return <ContributionSkeleton />
  }

  // Prepare user address for map (only district, state, coordinates)
  const mapUserAddress = {
    district: userAddress.district,
    state: userAddress.state,
    coordinates: [userAddress.coordinates[0], userAddress.coordinates[1]] as [number, number],
  }
  // For demo, use totalMembers as totalCases (or you can use a real member count if available)
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
      <div className='mt-2 grid grid-cols-1 gap-2 md:grid-cols-2'>
        <div className={CARD_HEIGHT_CLASSES}>
          <CommunityContributionComponent />
        </div>
        <div className={CARD_HEIGHT_CLASSES}>
          <CaseHistory cases={caseHistory} />
        </div>
      </div>
      <div className='mt-2'>
        <ContributionStats stats={dashboardStats} />
      </div>
      <div className='mt-2 grid grid-cols-1 gap-2 md:grid-cols-2'>
        <div className={CARD_HEIGHT_CLASSES}>
          <ContributionMap userAddress={mapUserAddress} totalMembers={totalMembers} />
        </div>
        <div className={CARD_HEIGHT_CLASSES}>
          <Card className='w-full h-full flex-1'>
            <CardHeader>
              <CardTitle>Community Contribution</CardTitle>
            </CardHeader>
            <CardContent className='flex-1'>
              <img
                src={CommunityContribution}
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

export default Contribution
