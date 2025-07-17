import { LucideIcon } from 'lucide-react'
import { DashboardData } from '@/hooks/use-dashboard-data'
import { StatCard } from './stat-card'

type StatCardKey = keyof DashboardData | 'activeMembers'

interface StatCardConfig {
  title: string
  icon: LucideIcon
  key: StatCardKey
  subKey?: keyof DashboardData
  subText: (value: number) => string
  showAlways: boolean
  trend?: 'up' | 'down' | 'neutral'
}

interface StatsGridProps {
  isLoading: boolean
  dashboardData: DashboardData
  isVerified: boolean
  statCards: StatCardConfig[]
}

export function StatsGrid({
  isLoading,
  dashboardData,
  isVerified,
  statCards,
}: StatsGridProps) {
  const getValue = (key: StatCardKey): number => {
    if (key === 'activeMembers') {
      return 0
    }

    if (key === 'referrals') {
      return dashboardData.referrals?.totalReferrals || 0
    }

    return (dashboardData[key] as number) || 0
  }

  const getSubValue = (key: keyof DashboardData | undefined): number => {
    if (!key) return 0

    if (key === 'referrals') {
      return dashboardData.referrals?.totalReferrals || 0
    }

    return (dashboardData[key] as number) || 0
  }

  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
      {statCards
        .filter((stat) => stat.showAlways || isVerified)
        .map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            icon={stat.icon}
            value={getValue(stat.key)}
            subValue={getSubValue(stat.subKey)}
            subText={stat.subText}
            isLoading={isLoading}
            trend={stat.trend}
          />
        ))}
    </div>
  )
}
