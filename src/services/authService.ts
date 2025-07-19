import {
  LoginResponse,
  RegistrationResponse,
  asApiResponse,
  Session,
} from '@/types/api'
import {
  LoginCredentials,
  RegistrationData,
} from '@/types/auth'
import { postData, deleteData, getData } from './apiService'
import { getErrorMessage, isFile } from '@/context/authUtils'

export const login = async (credentials: LoginCredentials) => {
  try {
    const response = await postData<LoginResponse>(
      '/auth/login',
      credentials as unknown as Record<string, unknown>,
      {
        withCredentials: true,
      }
    )
    return response.data.data
  } catch (error) {
    throw new Error(getErrorMessage(error))
  }
}

export const register = async (registrationData: RegistrationData) => {
  try {
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
      profilePicture,
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
      profilePicture,
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
    return asApiResponse<RegistrationResponse>(response).data
  } catch (error) {
    throw new Error(getErrorMessage(error))
  }
}

export const logout = async () => {
  try {
    await postData(
      '/auth/sessions/logout',
      {},
      {
        headers: { 'x-session-id': localStorage.getItem('sessionId') },
        withCredentials: true,
      }
    )
  } catch (error) {
    throw new Error(getErrorMessage(error))
  }
}

export const getActiveSessions = async () => {
  try {
    const response = await getData<{ success: boolean; data: Session[] }>(
      '/auth/sessions/active'
    )
    return response.data
  } catch (_error) {
    throw new Error('Failed to get active sessions')
  }
}

export const revokeSession = async (sessionId: string) => {
  try {
    await deleteData<{ success: boolean; message: string }>(
      `/auth/sessions/${sessionId}`
    )
  } catch (_error) {
    throw new Error('Failed to revoke session')
  }
}

export const sendOtp = async (identifier: string) => {
  try {
    const response = await postData<{ success: boolean; message: string }>(
      '/auth/register/send-otp',
      { identifier }
    )
    return asApiResponse<{
      success: boolean
      message: string
    }>(response).data
  } catch (error) {
    throw new Error(getErrorMessage(error))
  }
}

export const verifyOtp = async ({
  identifier,
  otp,
}: {
  identifier: string
  otp: string
}) => {
  try {
    const response = await postData<{ success: boolean; message: string }>(
      '/auth/register/verify-otp',
      { identifier, otp }
    )
    return asApiResponse<{
      success: boolean
      message: string
    }>(response).data
  } catch (error) {
    throw new Error(getErrorMessage(error))
  }
}

export const revokeAllOtherSessions = async () => {
  try {
    await deleteData<{ success: boolean; message: string }>(
      '/auth/sessions/logout-others'
    )
  } catch (_error) {
    throw new Error('Failed to revoke other sessions')
  }
}
