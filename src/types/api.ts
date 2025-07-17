// Generic API response type
export interface ApiResponse<T> {
  data: T
  success?: boolean
  message?: string
  token?: string
}

// Login response type
export interface LoginResponse {
  success: boolean
  message: string
  data: {
    user: User
    accessToken: string
    sessionId: string
  }
}

// Registration response type
export interface RegistrationResponse {
  success: boolean
  message: string
  data: User
  token: string
}

// User type for API responses
export interface User {
  _id: string
  title?: string
  firstName: string
  middleName?: string
  lastName: string
  email: string
  phone: string
  address?: {
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
  dateOfBirth?: string
  age?: number
  occupation?: string
  role?: string
  status?: string
  isVerified?: boolean
  wallet?: {
    _id: string
    user: string
    balance: number
    isActive: boolean
    createdAt: string
    updatedAt: string
  }
  membership?: {
    _id: string
    user: string
    type: string
    status: string
    amount: number
    cardUrl?: string
    validity: {
      startDate: string
      expiryDate: string
    }
    membershipNumber: string
    renewals: unknown[]
    createdAt: string
    updatedAt: string
  }
  professional?: {
    _id: string
    user: string
    qualification?: string
    profession?: string
    position?: string
    createdAt: string
    updatedAt: string
  } | null
  referralProfile?: {
    _id: string
    user: string
    referralCode: string
    referralLink: string
    totalReferrals: number
    successfulReferrals: number
    pendingReferrals: number
    createdAt: string
    updatedAt: string
  } | null
  referredBy?: User | null
  createdAt?: string
  updatedAt?: string
}

// Helper function to type API responses
export function asApiResponse<T>(response: unknown): ApiResponse<T> {
  return response as ApiResponse<T>
}

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
    role: string
    email?: string
    phone?: string
    dateOfBirth?: string
    occupation?: string
    status: string
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

export interface Session {
  _id: string
  userId: string
  userAgent: string
  deviceType: string
  ipAddress: string
  location: string
  isActive: boolean
  status: 'online' | 'offline' | 'away'
  expiresAt: string
  lastActiveAt: string
  createdAt: string
  updatedAt: string
  __v?: number
}
