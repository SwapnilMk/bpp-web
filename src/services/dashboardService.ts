import { getData } from './apiService'
import { asApiResponse, DashboardData } from '@/types/api'

export const fetchDashboardData = async (): Promise<DashboardData> => {
  try {
    const response = await getData('/user-dashboard/stats')
    
    // getData returns { data: T } structure, so we need to access response.data
    if (response && typeof response === 'object' && 'data' in response) {
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
