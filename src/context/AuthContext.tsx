import React, { createContext, ReactNode, useContext, useState } from 'react'
import Cookies from 'js-cookie'
import { clearCredentials, setCredentials } from '@/store/authSlice'
import { persistor } from '@/store/store'
import {
  LoginResponse,
  RegistrationResponse,
  asApiResponse,
  User as ApiUser,
  Session,
} from '@/types/api'
import {
  User as AuthUser,
  LoginCredentials,
  RegistrationData,
  LoginResponseData,
} from '@/types/auth'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'
import { postData, getData, deleteData } from '@/api/apiClient'
import { useWebSocket } from '@/hooks/useWebSocket'
import {
  COOKIE_KEYS,
  setCookie,
  removeCookie,
  getErrorMessage,
  isFile,
  AuthContextType,
} from './authUtils'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const userDetails = localStorage.getItem(COOKIE_KEYS.USER_DETAILS)
    return userDetails ? JSON.parse(userDetails) : null
  })
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return !!Cookies.get(COOKIE_KEYS.AUTH_TOKEN)
  })
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  const refreshSessions = async (): Promise<void> => {
    try {
      await getData<{ success: boolean; data: Session[] }>(
        '/auth/sessions/active'
      )
    } catch (_error) {
      // Error is handled by the caller
    }
  }

  useWebSocket({ user, getActiveSessions: refreshSessions })

  const getActiveSessions = async (): Promise<Session[]> => {
    try {
      const response = await getData<{ success: boolean; data: Session[] }>(
        '/auth/sessions/active'
      )
      return response.data
    } catch (_error) {
      throw new Error('Failed to get active sessions')
    }
  }

  const handleAuthSuccess = (
    token: string,
    userData: AuthUser,
    sessionId?: string
  ): void => {
    dispatch(setCredentials({ token, user: userData }))
    setCookie(COOKIE_KEYS.AUTH_TOKEN, token)
    localStorage.setItem(COOKIE_KEYS.USER_DETAILS, JSON.stringify(userData))
    if (sessionId) {
      setCookie(COOKIE_KEYS.SESSION_ID, sessionId)
      localStorage.setItem('sessionId', sessionId)
    }
    setUser(userData)
    setIsAuthenticated(true)
  }

  const login = async (credentials: LoginCredentials): Promise<void> => {
    try {
      setLoading(true)
      const response = await postData<LoginResponse>(
        '/auth/login',
        credentials as unknown as Record<string, unknown>,
        {
          withCredentials: true,
        }
      )
      const loginResponse = response.data.data as LoginResponseData
      const userData = loginResponse.user as unknown as AuthUser
      const sessionId = loginResponse.sessionId
      const accessToken = loginResponse.accessToken

      if (!accessToken || !sessionId) {
        throw new Error('No token or session ID received from server')
      }

      handleAuthSuccess(accessToken, userData, sessionId)
      toast.success('Login Successful!', {
        description: 'Redirecting to the dashboard page...',
      })
    } catch (error) {
      const errorMessage = getErrorMessage(error)
      toast.error(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const register = async (
    registrationData: RegistrationData
  ): Promise<void> => {
    try {
      setLoading(true)

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
      const typedResponse = asApiResponse<RegistrationResponse>(response)

      if (typedResponse.data.success) {
        const userData = typedResponse.data as unknown as AuthUser
        if (typedResponse.data.token) {
          handleAuthSuccess(typedResponse.data.token, userData)
        }
        toast.success('Registration successful!')
        return
      }
      throw new Error(typedResponse.data.message || 'Registration failed')
    } catch (error) {
      const errorMessage = getErrorMessage(error)
      toast.error(errorMessage)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const sendOtp = async (identifier: string): Promise<void> => {
    try {
      setLoading(true)
      await postData('/auth/register/send-otp', { identifier })
      toast.success(
        `OTP sent successfully to your ${identifier.includes('@') ? 'email' : 'phone'}!`
      )
    } catch (error) {
      const errorMessage = getErrorMessage(error)
      toast.error(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const verifyOtp = async (identifier: string, otp: string): Promise<void> => {
    try {
      setLoading(true)
      await postData('/auth/register/verify-otp', { identifier, otp })
      toast.success('OTP verified successfully!')
    } catch (error) {
      const errorMessage = getErrorMessage(error)
      toast.error(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const logout = async (): Promise<void> => {
    try {
      await postData(
        '/auth/sessions/logout',
        {},
        {
          headers: { 'x-session-id': localStorage.getItem('sessionId') },
          withCredentials: true,
        }
      )

      // Disconnect WebSocket and clean up session
      const sessionId = localStorage.getItem('sessionId')
      if (sessionId && window.currentSocket?.connected) {
        window.currentSocket.emit('session:disconnect', { sessionId })
        window.currentSocket.disconnect()
        delete window.currentSocket
      }

      // Clear all authentication data
      const cookieOptions = { path: '/' }
      removeCookie(COOKIE_KEYS.AUTH_TOKEN)
      removeCookie(COOKIE_KEYS.SESSION_ID)
      // Force expire cookies to be certain
      Cookies.set(COOKIE_KEYS.AUTH_TOKEN, '', { ...cookieOptions, expires: -1 })
      Cookies.set(COOKIE_KEYS.SESSION_ID, '', { ...cookieOptions, expires: -1 })

      localStorage.removeItem('sessionId')
      localStorage.removeItem('authToken')
      localStorage.removeItem(COOKIE_KEYS.USER_DETAILS)

      // Clear Redux state
      setUser(null)
      setIsAuthenticated(false)
      dispatch(clearCredentials())

      // Purge persisted state
      await persistor.purge()

      toast.success('Logged out successfully')
    } catch (error) {
      const errorMessage = getErrorMessage(error)
      toast.error(errorMessage)
      throw new Error(errorMessage)
    }
  }

  const updateVerification = (isVerified: boolean): void => {
    if (user) {
      const updatedUser = { ...user, isVerified }
      setUser(updatedUser)
      localStorage.setItem(
        COOKIE_KEYS.USER_DETAILS,
        JSON.stringify(updatedUser)
      )
    }
  }

  const updateUser = (updates: Partial<AuthUser>): void => {
    if (user) {
      const updatedUser = { ...user, ...updates }
      setUser(updatedUser)
      localStorage.setItem(
        COOKIE_KEYS.USER_DETAILS,
        JSON.stringify(updatedUser)
      )
    }
  }

  const fetchUserData = async (): Promise<void> => {
    try {
      setLoading(true)
      const response = await postData<{ data: ApiUser }>('/users/me', {})
      const typedResponse = asApiResponse<{ data: ApiUser }>(response)
      const userData = typedResponse.data as AuthUser

      const token = Cookies.get(COOKIE_KEYS.AUTH_TOKEN)
      if (!token) {
        throw new Error('No authentication token found')
      }

      handleAuthSuccess(
        token,
        userData,
        localStorage.getItem('sessionId') || undefined
      )
    } catch (error) {
      const errorMessage = getErrorMessage(error)
      toast.error(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const revokeSession = async (sessionId: string) => {
    try {
      await deleteData<{ success: boolean; message: string }>(
        `/auth/sessions/${sessionId}`
      )
    } catch (_error) {
      throw new Error('Failed to revoke session')
    }
  }

  const revokeAllOtherSessions = async () => {
    try {
      await deleteData<{ success: boolean; message: string }>(
        '/auth/sessions/logout-others'
      )
    } catch (_error) {
      throw new Error('Failed to revoke other sessions')
    }
  }

  const contextValue: AuthContextType = {
    user,
    isAuthenticated,
    login,
    register,
    sendOtp,
    verifyOtp,
    logout,
    loading,
    updateVerification,
    updateUser,
    fetchUserData,
    getActiveSessions,
    revokeSession,
    revokeAllOtherSessions,
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
