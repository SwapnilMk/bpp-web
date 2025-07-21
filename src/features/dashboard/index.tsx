import { memo, useEffect } from 'react'
import { AppDispatch, RootState } from '@/store/store'
import { fetchDashboardData } from '@/store/thunks'
import { DashboardData } from '@/types/api'
import { Users, UserCheck, TrendingUp } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { UserRole, UserStatus } from '@/utils/role-access'
import { Main } from '@/components/layout/dashboard/main'
import { AreaChartComponent } from './components/area-chart'
import LeafletMap from './components/leaflet-map'
import { PieChartComponent } from './components/pie-chart'
import { RecentActivities } from './components/recent-activities'
import { StatsGrid } from './components/stats-grid'
// import { StepperStats } from './components/stepper-stats'
import UserCard from './components/user-card'

type StatCardKey =
  | 'totalMembersIndia'
  | 'totalPrimaryMembersState'
  | 'totalActiveMembersState'
  | 'referrals'
  | 'activeMembers'

// Stat card configuration
const statCards = [
  {
    title: 'Total Members',
    icon: Users,
    key: 'totalMembersIndia' as StatCardKey,
    subKey: 'totalMembersState' as keyof DashboardData,
    subText: (value: number) => `+${value} in your state`,
    showAlways: true,
    trend: 'up' as const,
  },
  {
    title: 'Primary Members',
    icon: UserCheck,
    key: 'totalPrimaryMembersState' as StatCardKey,
    subText: () => 'Primary Members in your state',
    showAlways: true,
    trend: 'up' as const,
  },
  {
    title: 'Active Members',
    icon: TrendingUp,
    key: 'totalActiveMembersState' as StatCardKey,
    subText: () => 'Active professionals in your state',
    showAlways: true,
    trend: 'up' as const,
  },
  {
    title: 'Total Referrals',
    icon: Users,
    key: 'referrals' as StatCardKey,
    subKey: 'referrals' as keyof DashboardData,
    subText: () => 'Total referrals you made',
    showAlways: true,
    trend: 'neutral' as const,
  },
]

// Main Dashboard Component
const Dashboard = memo(() => {
  const dispatch: AppDispatch = useDispatch()
  const { data: dashboardData, isLoading } = useSelector(
    (state: RootState) => state.dashboard
  )

  useEffect(() => {
    dispatch(fetchDashboardData())
  }, [dispatch])

  const user =
    !isLoading && dashboardData
      ? {
          firstName: dashboardData.user?.firstName,
          lastName: dashboardData.user?.lastName,
          role: (dashboardData.user?.role as UserRole) || UserRole.MEMBER,
          status:
            (dashboardData.user?.status as UserStatus) || UserStatus.PROCESSING,
          membership: dashboardData.membership?.number || 'N/A',
          address: {
            state: dashboardData.user?.address?.state,
            district: dashboardData.user?.address?.district,
            city: dashboardData.user?.address?.cityOrVillage,
          },
        }
      : null

  // If you want to use isVerified, you can set it based on status or role
  const isVerified = user?.status === UserStatus.APPROVED

  // Provide fallback data when dashboardData is null
  const safeDashboardData = dashboardData || {
    totalMembersIndia: 0,
    totalMembersState: 0,
    totalMembersDistrict: 0,
    totalPrimaryMembersState: 0,
    totalActiveMembersState: 0,
    recentMembersState: [],
    referrals: {
      totalReferrals: 0,
      successfulReferrals: 0,
      pendingReferrals: 0,
      referralEarnings: 0,
      referralCode: null,
      referralLink: null,
    },
    wallet: {
      balance: 0,
      totalContributions: 0,
      recentTransactions: [],
    },
    membership: null,
    user: {
      firstName: '',
      lastName: '',
      role: '',
      status: '',
      address: {},
    },
    recentActivities: [],
    charts: {
      pieStats: [],
      barStats: [],
      areaStats: [],
    },
  }

  return (
    <Main>
      <div className='space-y-3'>
        <UserCard dashboardData={safeDashboardData} isLoading={isLoading} />
        {/* <StepperStats /> */}
        <StatsGrid
          isLoading={isLoading}
          dashboardData={safeDashboardData}
          isVerified={isVerified || false}
          statCards={statCards}
        />

        <div className='grid grid-cols-1 gap-3 lg:grid-cols-12'>
          <LeafletMap
            city={user?.address?.city || ''}
            state={user?.address?.state || ''}
            district={user?.address?.district || ''}
            totalMembers={dashboardData?.totalMembersState || 0}
            isLoading={isLoading}
            className='lg:col-span-6'
          />
          <RecentActivities
            dashboardData={safeDashboardData}
            isLoading={isLoading}
            className='lg:col-span-6'
          />
        </div>

        <div className='grid grid-cols-1 gap-3 lg:grid-cols-2'>
          <AreaChartComponent
            dashboardData={safeDashboardData}
            isLoading={isLoading}
          />
          <PieChartComponent
            dashboardData={safeDashboardData}
            isLoading={isLoading}
          />
        </div>
      </div>
    </Main>
  )
})
export default Dashboard
