import { getData } from './apiService'
import { asApiResponse } from '@/types/api'
import { DashboardData } from '@/hooks/use-dashboard-data'

export const fetchDashboardData = async (): Promise<DashboardData> => {
  try {
    const response = await getData('/user-dashboard/stats')
    const typedResponse = asApiResponse<DashboardData>(response)
    return typedResponse.data
  } catch (err) {
    const error =
      err instanceof Error ? err : new Error('Failed to load dashboard data')
    throw error
  }
}
