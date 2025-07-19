import { postData, getData, deleteData } from './apiClient'
import {
  LoginResponse,
  RegistrationResponse,
  Session,
  LoginResponseData,
} from '@/types/api'
import {
  AuthUser,
  LoginCredentials,
  RegistrationData as RegData,
} from '@/types/auth'
import { isFile } from '@/context/authUtils'
import Cookies from 'js-cookie'

export const login = async (
  credentials: LoginCredentials
): Promise<LoginResponseData> => {
  const response = await postData<LoginResponse>(
    '/auth/login',
    credentials as unknown as Record<string, unknown>,
    {
      withCredentials: true,
    }
  )
  return response.data.data as LoginResponseData
}

export const register = async (
  registrationData: RegData
): Promise<RegistrationResponse> => {
  const formData = new FormData()
  const {
    addressLine1,
    addressLine2,
    cityOrVillage,
    district,
    state,
    pincode,
    aadhaarFront,
    aadhaarBack,
    voterFront,
    voterBack,
    ...rest
  } = registrationData

  Object.entries(rest).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      formData.append(key, isFile(value) ? value : String(value))
    }
  })

  const addressFields = {
    addressLine1,
    addressLine2,
    cityOrVillage,
    district,
    state,
    pincode,
  }
  Object.entries(addressFields).forEach(([key, value]) => {
    if (value) formData.append(key, value)
  })

  const files = {
    aadhaarFront,
    aadhaarBack,
    voterFront,
    voterBack,
  }
  Object.entries(files).forEach(([key, value]) => {
    if (value) formData.append(key, value)
  })

  const response = await postData<RegistrationResponse>(
    '/auth/register',
    formData as unknown as Record<string, unknown>,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    }
  )
  return response.data
}

export const sendOtp = async (identifier: string): Promise<void> => {
  await postData('/auth/register/send-otp', { identifier })
}

export const verifyOtp = async (
  identifier: string,
  otp: string
): Promise<void> => {
  await postData('/auth/register/verify-otp', { identifier, otp })
}

export const logout = async (): Promise<void> => {
  try {
    // Make a request to the server to invalidate the session
    await postData(
      '/auth/sessions/logout',
      {},
      {
        headers: { 'x-session-id': localStorage.getItem('sessionId') },
        withCredentials: true,
      }
    )
  } finally {
    // Clear auth token and session ID from cookies
    Cookies.remove('authToken')
    Cookies.remove('sessionId')
    localStorage.removeItem('sessionId')
    localStorage.removeItem('authToken')
    localStorage.removeItem('userDetails')
  }
}

export const getActiveSessions = async (): Promise<Session[]> => {
  const response = await getData<{ success: boolean; data: Session[] }>(
    '/auth/sessions/active'
  )
  return response.data
}

export const revokeSession = async (sessionId: string): Promise<void> => {
  await deleteData(`/auth/sessions/${sessionId}`)
}

export const revokeAllOtherSessions = async (): Promise<void> => {
  await deleteData('/auth/sessions/logout-others')
}

export const fetchUserData = async (): Promise<AuthUser> => {
  const response = await postData<{ data: AuthUser }>('/users/me', {})
  return response.data.data
}

export const forgotPassword = async (identifier: {
  email?: string
  phone?: string
}) => {
  const response = await postData('/auth/forgot-password', identifier)
  return response.data
}

export const resetPassword = async (data: {
  otp: string
  newPassword: string
  email?: string
  phone?: string
}) => {
  const response = await postData('/auth/reset-password', data)
  return response.data
}
