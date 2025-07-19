// Define a shared User interface for both AuthContext and Redux store
export type AuthUser = User
export interface User {
  _id?: string
  id?: string
  title?: 'Mr' | 'Ms' | 'Mrs' | 'Dr' | 'CA' | 'CS' | 'Adv'
  firstName?: string
  lastName?: string
  middleName?: string
  name?: string
  email?: string
  phone?: string
  password?: string
  profilePicture?: string
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
    updateCount?: number
    lastUpdated?: string
  }
  voter?: {
    number?: string
    front?: string
    back?: string
    updateCount?: number
    lastUpdated?: string
  }
  dateOfBirth?: string
  age?: number
  gender?: 'male' | 'female' | 'other'
  occupation?: string
  role?: 'MEMBER' | 'PRIMARY MEMBER' | 'ACTIVE MEMBER'
  status?: 'PROCESSING' | 'APPROVED' | 'REJECTED' | 'SUSPENDED'
  isVerified?: boolean
  rejectionRemark?: string
  unverifiedDocuments?: (
    | 'aadhaarNumber'
    | 'aadhaarFront'
    | 'aadhaarBack'
    | 'voterIdNumber'
    | 'voterIdFront'
    | 'voterIdBack'
    | 'address'
    | 'name'
    | 'dob'
    | 'email'
    | 'phone'
  )[]
  wallet?: {
    _id?: string
    user?: string
    balance?: number
    isActive?: boolean
    createdAt?: string
    updatedAt?: string
  }
  notificationPreferences?: {
    email?: boolean
    sms?: boolean
    push?: boolean
  }
  membership?: {
    _id?: string
    user?: string
    type?: string
    status?: string
    amount?: number
    cardUrl?: string
    validity?: {
      startDate?: string
      expiryDate?: string
    }
    membershipNumber?: string
    renewals?: unknown[]
    createdAt?: string
    updatedAt?: string
  }
  professional?: {
    _id?: string
    user?: string
    qualification?: string
    profession?: string
    position?: string
    createdAt?: string
    updatedAt?: string
  } | null
  referralProfile?: {
    _id?: string
    user?: string
    referralCode?: string
    referralLink?: string
    totalReferrals?: number
    successfulReferrals?: number
    pendingReferrals?: number
    createdAt?: string
    updatedAt?: string
  } | null
  referredBy?: User | null
  createdAt?: string
  updatedAt?: string
  [key: string]: unknown // Allow for additional properties
}

export interface LoginCredentials {
  email?: string
  phone?: string
  password: string
}

export interface RegistrationData {
  title?: string
  firstName?: string
  middleName?: string
  lastName?: string
  email?: string
  phone?: string
  dateOfBirth?: string
  age?: number
  gender?: string
  occupation?: string
  addressLine1?: string
  addressLine2?: string
  cityOrVillage?: string
  district?: string
  state?: string
  pincode?: string
  qualification?: string
  profession?: string
  position?: string
  aadhaarNumber?: string
  voterId?: string
  aadhaarFront?: File | null
  aadhaarBack?: File | null
  voterFront?: File | null
  voterBack?: File | null
  password?: string
  referralCode?: string
  identifier?: string
  otp?: string
}

export interface LoginResponseData {
  user: User
  accessToken: string
  sessionId: string
}
