interface ProfileUpdateRequest {
  _id: string
  user: string
  field:
    | 'profilePicture'
    | 'personal'
    | 'email'
    | 'phone'
    | 'address'
    | 'aadhaar'
    | 'voter'
    | 'professional'
  oldValue: string | ProfileFormData | null
  newValue: string | ProfileFormData | null
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED'
  type: 'SENSITIVE' | 'NON_SENSITIVE' | 'OTP_REQUIRED'
  remark?: string
  approvedBy?: string
  metadata?: Record<string, unknown>
  createdAt: string
  updatedAt: string
  isPending: boolean
}

interface ProfileUpdateTracker {
  lastPersonalUpdate?: string
  lastAddressUpdate?: string
  lastProfessionalUpdate?: string
  documentUpdates: {
    aadhaar: {
      updateCount: number
      lastUpdated?: string
    }
    voter: {
      updateCount: number
      lastUpdated?: string
    }
  }
  contactUpdates: {
    email: {
      lastUpdated?: string
      verificationStatus: 'PENDING' | 'VERIFIED' | 'UNVERIFIED'
    }
    phone: {
      lastUpdated?: string
      verificationStatus: 'PENDING' | 'VERIFIED' | 'UNVERIFIED'
    }
  }
  canUpdatePersonal: boolean
  canUpdateAddress: boolean
  canUpdateProfessional: boolean
  canUpdateAadhaar: boolean
  canUpdateVoter: boolean
}

interface ProfileFormData {
  title?: string
  firstName: string
  middleName?: string
  lastName: string
  dateOfBirth: string
  age: number
  gender: string
  profilePicture?: string
  email?: string
  emailVerified?: boolean
  phone: string
  phoneVerified?: boolean
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
  occupation?: string
  professional?: {
    qualification?: string
    profession?: string
    position?: string
    category?: string
    yearsOfExperience?: number
    summary?: string
    university?: string
    passoutYear?: number
    degreeCert?: string
    experienceCert?: string
  }
}

export interface ProfileUpdateResponse {
  success: boolean
  message: string
  data?: {
    updateRequestId?: string
    field?: string
    status?: string
    requiresOtp?: boolean
  }
}

export interface UpdateRequestsResponse {
  success: boolean
  data: {
    requests: ProfileUpdateRequest[]
    pagination: {
      total: number
      page: number
      limit: number
      pages: number
    }
  }
}

export interface UpdateRequestDetailsResponse {
  success: boolean
  data: ProfileUpdateRequest
}

export interface ProfileUpdateRequestPayload {
  [key: string]: unknown
  updates: Record<string, unknown>
  type: 'SENSITIVE' | 'NON_SENSITIVE' | 'OTP_REQUIRED'
}

export interface VerifyOtpPayload {
  [key: string]: unknown
  field: string
  value: string
  otp: string
}

export interface CancelUpdateRequestResponse {
  success: boolean
  message: string
  data: ProfileUpdateRequest
}

export interface ResendOtpResponse {
  success: boolean
  message: string
  data: ProfileUpdateRequest
}
