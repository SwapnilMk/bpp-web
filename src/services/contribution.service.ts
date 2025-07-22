import { apiClient } from '@/services/api-client'

export const getCommunityContributionData = async (_userId?: string) => {
  // Replace with real API call when available
  const response = await apiClient.get('/contribution/community-data')
  return response.data
}