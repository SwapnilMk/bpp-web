import { getData } from './apiService'
import { asApiResponse, DashboardData } from '@/types/api'

export const fetchDashboardData = async (): Promise<DashboardData> => {
  try {
    const response = await getData('/users/dashboard/stats')
    if (response && typeof response === 'object' && 'data' in response) {
      const apiData = response.data
      if (apiData && typeof apiData === 'object' && 'success' in apiData && 'data' in apiData) {
        return apiData.data as DashboardData
      }
      const typedResponse = asApiResponse<DashboardData>(response)
      return typedResponse.data
    }
    // If response is already the data object (fallback)
    if (response && typeof response === 'object' && 'totalMembersIndia' in response) {
      return response as DashboardData
    }
    throw new Error('Invalid response format from dashboard API')
  } catch (err) {
    const error =
      err instanceof Error ? err : new Error('Failed to load dashboard data')
    throw error
  }
}
