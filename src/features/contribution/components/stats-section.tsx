import { DashboardData } from '@/types/api'
import { ActivityIcon, PlusIcon, User2Icon, UsersIcon } from 'lucide-react'
import internalWorking from '@/assets/images/community/internalworking.png'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { StatCard } from '@/features/dashboard/components/stat-card'

interface StatsSectionProps {
  dashboardData: DashboardData | null
  isLoading: boolean
}

export const StatsSection = ({
  dashboardData,
  isLoading,
}: StatsSectionProps) => {
  return (
    <div className='my-3 grid w-full grid-cols-1 gap-4 lg:grid-cols-2'>
      <Card>
        <CardHeader>
          <CardTitle className='text-2xl font-bold'>
            {dashboardData?.user?.address?.state || ''}
          </CardTitle>
        </CardHeader>
        <div className='grid grid-cols-1 gap-6 p-5 sm:grid-cols-2'>
          <StatCard
            title='Total Members'
            icon={UsersIcon}
            value={dashboardData?.totalMembersState || 0}
            subText={(value) => `+${value} in your state`}
            isLoading={isLoading}
            trend='up'
          />
          <StatCard
            title='Primary Members'
            icon={ActivityIcon}
            value={dashboardData?.totalPrimaryMembersState || 0}
            subText={() => 'Primary Members in your state'}
            isLoading={isLoading}
            trend='up'
          />
          <StatCard
            title='New Members This Month'
            icon={PlusIcon}
            value={
              dashboardData?.recentMembersState?.filter((member) => {
                const memberDate = new Date(member.createdAt || '')
                const now = new Date()
                return (
                  memberDate.getMonth() === now.getMonth() &&
                  memberDate.getFullYear() === now.getFullYear()
                )
              }).length || 0
            }
            subText={() => 'New members this month'}
            isLoading={isLoading}
            trend='up'
          />
          <StatCard
            title='Active Now'
            icon={User2Icon}
            value={dashboardData?.totalActiveMembersState || 0}
            subText={() => 'Active members now'}
            isLoading={isLoading}
            trend='up'
          />
        </div>
      </Card>
      <Card>
        <div className='cursor-pointer'>
          <img
            src={internalWorking}
            alt='BPP Card'
            className='h-full w-full object-cover'
          />
        </div>
      </Card>
    </div>
  )
}
