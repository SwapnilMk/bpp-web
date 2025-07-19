import { useQuery } from '@tanstack/react-query'
import { RootState } from '@/store/store'
import { asApiResponse } from '@/types/api'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
import { getData } from '@/api/apiClient'
import { UserRole, UserStatus } from '@/utils/roleAccess'

// Define types for dashboard data
export interface DashboardData {
  totalMembersIndia: number
  totalMembersState: number
  totalMembersDistrict: number
  totalPrimaryMembersState: number
  totalActiveMembersState: number
  recentMembersState: Array<{
    address: {
      line1?: string
      line2?: string
      cityOrVillage?: string
      district?: string
      state?: string
      pincode?: string
    }
    aadhaar?: {
      number?: string
      front?: string
      back?: string
    }
    voter?: {
      number?: string
      front?: string
      back?: string
    }
    _id: string
    title?: string
    firstName: string
    middleName?: string
    lastName: string
    email?: string
    phone?: string
    dateOfBirth?: string
    age?: number
    role: string
    occupation?: string
    status: string
    isVerified?: boolean
    professional?: string
    referredBy?: string | null
    createdAt?: string
    updatedAt?: string
    wallet?: string
    membership?: string
    referralProfile?: string
  }>
  referrals: {
    totalReferrals: number
    successfulReferrals: number
    pendingReferrals: number
    referralEarnings: number
    referralCode: string | null
    referralLink: string | null
  }
  wallet: {
    balance: number
    totalContributions: number
    recentTransactions: Array<{
      _id: string
      amount: number
      type: string
      description: string
      status: string
      category: string
      createdAt: string
    }>
  }
  membership?: {
    number: string
    type: string
    status: string
    cardUrl?: string
    startDate?: string
    expiryDate?: string
  } | null
  user: {
    title?: string
    firstName: string
    middleName?: string
    lastName: string
    role: UserRole
    email?: string
    phone?: string
    dateOfBirth?: string
    occupation?: string
    status: UserStatus
    address: {
      line1?: string
      line2?: string
      cityOrVillage?: string
      district?: string
      state?: string
      pincode?: string
    }
  }
  recentActivities: Array<{
    _id: string
    user: {
      _id: string
      firstName: string
      lastName: string
      email?: string
      phone?: string
    }
    activityType: string
    details: Record<string, unknown>
    status: string
    ipAddress: string
    userAgent: string
    createdAt: string
    updatedAt: string
  }>
  charts: {
    pieStats: Array<{
      name: string
      value: number
    }>
    barStats: Array<{
      date: string
      primary: number
      active: number
    }>
    areaStats: Array<{
      date: string
      primary: number
      active: number
    }>
  }
}

// Default data for initial render
const defaultData: DashboardData = {
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
    title: '',
    middleName: '',
    role: UserRole.MEMBER,
    status: UserStatus.PROCESSING,
    email: '',
    phone: '',
    dateOfBirth: '',
    occupation: '',
    address: {},
  },
  recentActivities: [],
  charts: {
    pieStats: [],
    barStats: [],
    areaStats: [],
  },
}

const fetchDashboardData = async (): Promise<DashboardData> => {
  try {
    const response = await getData('/user-dashboard/stats')
    const typedResponse = asApiResponse<DashboardData>(response)
    return typedResponse.data
  } catch (err) {
    const error =
      err instanceof Error ? err : new Error('Failed to load dashboard data')
    toast.error(error.message)
    throw error
  }
}

// Custom hook to fetch dashboard data
export function useDashboardData() {
  const user = useSelector((state: RootState) => state.user.user)

  const {
    data = defaultData,
    isLoading,
    error,
  } = useQuery<DashboardData, Error>({
    queryKey: ['dashboard', 'stats'],
    queryFn: fetchDashboardData,
    enabled: !!user,
  })

  return { data, isLoading, error }
}
