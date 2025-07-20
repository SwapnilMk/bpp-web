import { memo, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { fetchDashboardData } from '@/store/thunks'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import ShiftingCountdown from '@/components/features/countdown-timer'
import { Main } from '@/components/layout/dashboard/main'
import LeafletMap from '@/features/dashboard/components/leaflet-map'
import { CommunityContribution } from './components/community-contribution'
import { StatsSection } from './components/stats-section'

const steps = [
  { id: 'caseRegistration', label: 'Case Registration' },
  { id: 'reviewApproval', label: 'Review & Approval' },
  { id: 'verification', label: 'Verification' },
  { id: 'completion', label: 'Completion' },
] as const

const Contribution = memo(() => {
  const dispatch = useAppDispatch()
  const { data: dashboardData, isLoading } = useAppSelector(
    (state) => state.dashboard
  )
  const authUser = useAppSelector((state) => state.user.user)

  useEffect(() => {
    dispatch(fetchDashboardData())
  }, [dispatch])

  const user =
    !isLoading && authUser
      ? {
          address: {
            state: authUser.address?.state,
            district: authUser.address?.district,
            city: authUser.address?.cityOrVillage,
          },
        }
      : null

  return (
    <Main>
      <div className='mb-6 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center'>
        <div className='w-full'>
          <div className='mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center'>
            <div>
              <h1 className='text-2xl font-bold'>Community Contribution</h1>
              <p className='text-muted-foreground'>
                View community contributions and register new cases
              </p>
            </div>
          </div>
          <div className='w-full'>
            <Card className='w-full'>
              <CardHeader>
                <CardTitle>
                  <ShiftingCountdown />
                </CardTitle>
              </CardHeader>
            </Card>
          </div>
          <div className='my-3 grid w-full grid-cols-1 gap-4 lg:grid-cols-2'>
            <div className='w-full'>
              <LeafletMap
                city={user?.address?.city || ''}
                state={user?.address?.state || ''}
                district={user?.address?.district || ''}
                totalMembers={dashboardData?.totalMembersState || 0}
                isLoading={isLoading}
              />
            </div>
            <Card className='h-full overflow-hidden'>
              <CardHeader>
                <CardTitle className='text-xl font-semibold'>
                  Community Contribution
                </CardTitle>
              </CardHeader>
              <CardContent className='h-[calc(100%-4rem)] overflow-auto p-5'>
                <CommunityContribution setCurrentStep={() => {}} />
              </CardContent>
            </Card>
          </div>
          <StatsSection dashboardData={dashboardData} isLoading={isLoading} />
        </div>
      </div>
    </Main>
  )
})


export default Contribution
