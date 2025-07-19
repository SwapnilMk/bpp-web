import { useQuery } from '@tanstack/react-query'
import { getData } from '@/api/apiClient'
import { DashboardData } from '@/hooks/use-dashboard-data'

const fetchDashboardData = async (): Promise<DashboardData> => {
  const response = await getData('/user-dashboard/stats')
  return response as DashboardData
}

export const useDashboardDataQuery = () => {
  return useQuery<DashboardData, Error>({
    queryKey: ['dashboard', 'stats'],
    queryFn: fetchDashboardData,
  })
}
