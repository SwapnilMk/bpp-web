import { mockCaseStatus, mockDashboardStats, mockUserAddress } from '@/features/contribution/data/data'

export const getCommunityContributionData = async (_userId?: string) => {
  // Replace with real API call when available
  try {
    // Example: const response = await getData(`/contribution/community-data?userId=${userId}`)
    // return response.data
    return {
      caseHistory: mockCaseStatus,
      dashboardStats: mockDashboardStats,
      userAddress: mockUserAddress,
    }
  } catch {
    return {
      caseHistory: mockCaseStatus,
      dashboardStats: mockDashboardStats,
      userAddress: mockUserAddress,
    }
  }
}

// Optionally keep the old functions for backward compatibility
export const getCaseHistory = async () => mockCaseStatus
export const getDashboardStats = async () => mockDashboardStats
export const getUserAddress = async () => mockUserAddress 