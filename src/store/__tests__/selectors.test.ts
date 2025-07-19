import { describe, it, expect } from 'vitest'
import { RootState } from '../store'
import {
  selectToken,
  selectUser,
  selectIsAuthenticated,
  selectSessionId,
  selectUserProfile,
  selectDashboardData,
  selectMembershipDetails,
  selectWalletTransactions,
  selectReferrals,
  selectQueryState,
} from '../selectors'
import { User } from '@/types/auth'
import { DashboardData } from '@/hooks/use-dashboard-data'
import { UserRole, UserStatus } from '@/utils/roleAccess'

const initialUser: User = {
  _id: '1',
  firstName: 'Test',
  lastName: 'User',
  email: 'test@example.com',
  phone: '1234567890',
  role: 'MEMBER',
  isVerified: true,
  profilePicture: '',
  address: {
    line1: '',
    cityOrVillage: '',
    district: '',
    state: '',
    pincode: '',
  },
}

const dashboardData: DashboardData = {
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

const mockState: RootState = {
  auth: {
    token: 'test-token',
    user: initialUser,
    isAuthenticated: true,
    sessionId: 'test-session-id',
    loading: false,
    error: null,
  },
  user: {
    profile: initialUser,
  },
  dashboard: {
    data: dashboardData,
    loading: false,
    error: null,
  },
  membership: {
    details: { type: 'premium' },
  },
  wallet: {
    transactions: [{ id: '1', amount: 100 }],
  },
  referral: {
    referrals: [{ id: '1', name: 'test' }],
  },
  query: {
    testQuery: {
      status: 'success',
    },
  },
  _persist: {
    version: 1,
    rehydrated: true,
  },
}

describe('selectors', () => {
  it('should select token from auth state', () => {
    expect(selectToken(mockState)).toBe('test-token')
  })

  it('should select user from auth state', () => {
    expect(selectUser(mockState)).toEqual(initialUser)
  })

  it('should select isAuthenticated from auth state', () => {
    expect(selectIsAuthenticated(mockState)).toBe(true)
  })

  it('should select sessionId from auth state', () => {
    expect(selectSessionId(mockState)).toBe('test-session-id')
  })

  it('should select user profile from user state', () => {
    expect(selectUserProfile(mockState)).toEqual(initialUser)
  })

  it('should select dashboard data from dashboard state', () => {
    expect(selectDashboardData(mockState)).toEqual(dashboardData)
  })

  it('should select membership details from membership state', () => {
    expect(selectMembershipDetails(mockState)).toEqual({ type: 'premium' })
  })

  it('should select wallet transactions from wallet state', () => {
    expect(selectWalletTransactions(mockState)).toEqual([{ id: '1', amount: 100 }])
  })

  it('should select referrals from referral state', () => {
    expect(selectReferrals(mockState)).toEqual([{ id: '1', name: 'test' }])
  })

  it('should select query state from query state', () => {
    expect(selectQueryState('testQuery')(mockState)).toEqual({
      status: 'success',
    })
  })
})
