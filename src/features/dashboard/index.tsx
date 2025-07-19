import { Users, UserCheck, TrendingUp } from 'lucide-react';
import { UserRole, UserStatus } from '@/utils/roleAccess';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { DashboardData, useDashboardData } from '@/hooks/use-dashboard-data';
import { Header } from '@/components/layout/dashboard/header';
import { Main } from '@/components/layout/dashboard/main';
import { NotificationHeaderMenu } from '@/components/layout/dashboard/notification'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { AreaChartComponent } from './components/area-chart'
import LeafletMap from './components/leaflet-map'
import { PieChartComponent } from './components/pie-chart'
import { RecentActivities } from './components/recent-activities'
import { StatsGrid } from './components/stats-grid'
import { StepperStats } from './components/stepper-stats'
import UserCard from './components/user-card'

type StatCardKey = keyof DashboardData | 'activeMembers'

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
export default function Dashboard() {
  const { data: dashboardData, isLoading } = useDashboardData();
  const authUser = useSelector((state: RootState) => state.user.user);

  // --- FAKE DATA OVERRIDE ---
  const fakeDashboardData = {
    ...dashboardData,
    totalMembersIndia: 103824,
    totalMembersState: 393,
    totalPrimaryMembersState: 353,
    totalActiveMembersState: 110,
    referrals: {
      ...(dashboardData?.referrals || {}),
      totalReferrals: 5046,
    },
  }

  const user =
    !isLoading && authUser
      ? {
          firstName: authUser.firstName,
          lastName: authUser.lastName,
          role: (authUser.role as UserRole) || UserRole.MEMBER,
          status: (authUser.status as UserStatus) || UserStatus.PROCESSING,
          membership: dashboardData?.membership?.number || 'N/A',
          address: {
            state: authUser.address?.state,
            district: authUser.address?.district,
            city: authUser.address?.cityOrVillage,
          },
          isVerified: authUser.isVerified || false,
        }
      : null

  const isVerified = user?.isVerified && user?.status === UserStatus.APPROVED

  return (
    <>
      <Header fixed>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <NotificationHeaderMenu />
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <UserCard dashboardData={fakeDashboardData} isLoading={isLoading} />
        <StepperStats />
        <div className='space-y-6'>
          <StatsGrid
            isLoading={isLoading}
            dashboardData={fakeDashboardData}
            isVerified={isVerified || false}
            statCards={statCards}
          />

          <div className='grid grid-cols-1 gap-4 lg:grid-cols-7'>
            <LeafletMap
              city={user?.address?.city || ''}
              state={user?.address?.state || ''}
              district={user?.address?.district || ''}
              totalMembers={dashboardData?.totalMembersState || 0}
              isLoading={isLoading}
            />
            <RecentActivities
              dashboardData={fakeDashboardData}
              isLoading={isLoading}
            />
          </div>

          <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
            <AreaChartComponent
              dashboardData={fakeDashboardData}
              isLoading={isLoading}
            />
            <PieChartComponent
              dashboardData={fakeDashboardData}
              isLoading={isLoading}
            />
          </div>
        </div>
      </Main>
    </>
  )
}
