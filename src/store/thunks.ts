import * as authService from '@/services/auth.service'
import { caseService } from '@/services/case.service'
import * as dashboardService from '@/services/dashboard.service'
import * as membershipService from '@/services/membership.service'
import { disconnectWebSocket } from '@/services/socket.service'
import * as userService from '@/services/user.service'
import { LoginCredentials, RegistrationData, User } from '@/types/auth'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'sonner'
import {
  setCookie,
  removeCookie,
  COOKIE_KEYS,
  getErrorMessage,
} from '@/context/authUtils'
import { setCredentials, clearCredentials } from './slice/authSlice'
import {
  setDashboardData,
  setDashboardLoading,
  setDashboardError,
} from './slice/dashboardSlice'
import {
  setMembershipData,
  setMembershipLoading,
  setMembershipError,
} from './slice/membershipSlice'
import { setUser, clearUser } from './slice/userSlice'
import { persistor } from './store'

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials, { dispatch }) => {
    try {
      const loginResponse = await authService.login(credentials)
      const userData = loginResponse.user as unknown as User
      const sessionId = loginResponse.sessionId
      const accessToken = loginResponse.accessToken

      if (!accessToken || !sessionId) {
        throw new Error('No token or session ID received from server')
      }

      dispatch(setCredentials({ token: accessToken, sessionId }))
      dispatch(setUser(userData))
      setCookie(COOKIE_KEYS.AUTH_TOKEN, accessToken)
      setCookie(COOKIE_KEYS.SESSION_ID, sessionId)
      localStorage.setItem('sessionId', sessionId)
      localStorage.setItem(COOKIE_KEYS.USER_DETAILS, JSON.stringify(userData))

      toast.success('Login Successful!', {
        description: 'Redirecting to the dashboard page...',
      })
      return { token: accessToken, user: userData, sessionId }
    } catch (error) {
      const errorMessage = getErrorMessage(error)
      toast.error(errorMessage)
      throw new Error(errorMessage)
    }
  }
)

export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (payload: { email?: string; phone?: string }) => {
    try {
      const response = await authService.forgotPassword(payload)
      if (response.success) {
        toast.success(response.message)
        return response
      }
      throw new Error(response.message || 'Failed to send OTP')
    } catch (error) {
      const errorMessage = getErrorMessage(error)
      toast.error(errorMessage)
      throw new Error(errorMessage)
    }
  }
)

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (payload: {
    otp: string
    newPassword: string
    email?: string
    phone?: string
  }) => {
    try {
      const response = await authService.resetPassword(payload)
      if (response.success) {
        toast.success(response.message)
        return response
      }
      throw new Error(response.message || 'Failed to reset password')
    } catch (error) {
      const errorMessage = getErrorMessage(error)
      toast.error(errorMessage)
      throw new Error(errorMessage)
    }
  }
)

export const fetchDashboardData = createAsyncThunk(
  'dashboard/fetchDashboardData',
  async (_, { dispatch }) => {
    try {
      dispatch(setDashboardLoading(true))
      const dashboardData = await dashboardService.fetchDashboardData()
      dispatch(setDashboardData(dashboardData))
      return dashboardData
    } catch (error) {
      const errorMessage = getErrorMessage(error)
      dispatch(setDashboardError(errorMessage))
      toast.error(errorMessage)
      throw new Error(errorMessage)
    }
  }
)

export const register = createAsyncThunk(
  'auth/register',
  async (registrationData: RegistrationData, { dispatch }) => {
    try {
      const response = await authService.register(registrationData)
      if (response.success) {
        const userData = response as unknown as User
        if (response.token) {
          dispatch(setCredentials({ token: response.token }))
          dispatch(setUser(userData))
          setCookie(COOKIE_KEYS.AUTH_TOKEN, response.token)
          localStorage.setItem(
            COOKIE_KEYS.USER_DETAILS,
            JSON.stringify(userData)
          )
        }
        toast.success('Registration successful!')
        return
      }
      throw new Error(response.message || 'Registration failed')
    } catch (error) {
      const errorMessage = getErrorMessage(error)
      toast.error(errorMessage)
      throw error
    }
  }
)

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { dispatch }) => {
    try {
      await authService.logout()
      disconnectWebSocket()
      removeCookie(COOKIE_KEYS.AUTH_TOKEN)
      removeCookie(COOKIE_KEYS.SESSION_ID)
      localStorage.removeItem('sessionId')
      localStorage.removeItem('authToken')
      localStorage.removeItem(COOKIE_KEYS.USER_DETAILS)
      dispatch(clearCredentials())
      dispatch(clearUser())
      await persistor.purge()
      toast.success('Logged out successfully')
    } catch (error) {
      const errorMessage = getErrorMessage(error)
      toast.error(errorMessage)
      throw new Error(errorMessage)
    }
  }
)

export const fetchUserData = createAsyncThunk(
  'user/fetchUserData',
  async (_, { dispatch }) => {
    try {
      const userData = await userService.fetchUserData()
      dispatch(setUser(userData))
      return userData
    } catch (error) {
      const errorMessage = getErrorMessage(error)
      toast.error(errorMessage)
      throw new Error(errorMessage)
    }
  }
)

export const getActiveSessions = createAsyncThunk(
  'auth/getActiveSessions',
  async () => {
    try {
      return await authService.getActiveSessions()
    } catch (_error) {
      throw new Error('Failed to get active sessions')
    }
  }
)

export const revokeSession = createAsyncThunk(
  'auth/revokeSession',
  async (sessionId: string) => {
    try {
      await authService.revokeSession(sessionId)
    } catch (_error) {
      throw new Error('Failed to revoke session')
    }
  }
)

export const sendOtp = createAsyncThunk(
  'auth/sendOtp',
  async (identifier: string) => {
    try {
      const response = await authService.sendOtp(identifier)
      if (response.success) {
        toast.success(
          `OTP sent successfully to your ${identifier.includes('@') ? 'email' : 'phone'}!`
        )
        return response
      }
      throw new Error(response.message || 'Failed to send OTP')
    } catch (error) {
      const errorMessage = getErrorMessage(error)
      toast.error(errorMessage)
      throw new Error(errorMessage)
    }
  }
)

export const verifyOtp = createAsyncThunk(
  'auth/verifyOtp',
  async ({ identifier, otp }: { identifier: string; otp: string }) => {
    try {
      const response = await authService.verifyOtp({ identifier, otp })
      if (response.success) {
        toast.success('OTP verified successfully!')
        return response
      }
      throw new Error(response.message || 'Failed to verify OTP')
    } catch (error) {
      const errorMessage = getErrorMessage(error)
      toast.error(errorMessage)
      throw new Error(errorMessage)
    }
  }
)

export const revokeAllOtherSessions = createAsyncThunk(
  'auth/revokeAllOtherSessions',
  async () => {
    try {
      await authService.revokeAllOtherSessions()
    } catch (_error) {
      throw new Error('Failed to revoke other sessions')
    }
  }
)

export const fetchMembershipData = createAsyncThunk(
  'membership/fetchMembershipData',
  async (_, { dispatch }) => {
    try {
      dispatch(setMembershipLoading(true))
      const membershipData = await membershipService.fetchMembershipData()
      dispatch(setMembershipData(membershipData))
      return membershipData
    } catch (error) {
      const errorMessage = getErrorMessage(error)
      dispatch(setMembershipError(errorMessage))
      toast.error(errorMessage)
      throw new Error(errorMessage)
    }
  }
)

export const submitCase = createAsyncThunk(
  'case/submitCase',
  async (allFormData: Record<string, unknown>, { rejectWithValue }) => {
    try {
      const formData = new FormData()
      Object.entries(allFormData).forEach(([key, value]) => {
        if (value instanceof FileList) {
          if (value.length > 0) formData.append(key, value[0])
        } else if (typeof value === 'object' && value !== null && !(value instanceof File)) {
          Object.entries(value).forEach(([k, v]) => formData.append(k, v as unknown as string))
        } else if (value !== undefined && value !== null) {
          formData.append(key, value as unknown as string)
        }
      })
      const result = await caseService.createCase(formData)
      toast.success('Case submitted successfully!')
      return result
    } catch (error: unknown) {
      const errMsg = error instanceof Error ? error.message : 'Submission failed';
      toast.error(errMsg)
      return rejectWithValue(errMsg)
    }
  }
)
