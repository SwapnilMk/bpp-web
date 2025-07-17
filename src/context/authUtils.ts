import Cookies from 'js-cookie'
import { Session } from '@/types/api'
import {
  User as AuthUser,
  LoginCredentials,
  RegistrationData,
} from '@/types/auth'

export interface AuthContextType {
  user: AuthUser | null
  isAuthenticated: boolean
  login: (credentials: LoginCredentials) => Promise<void>
  register: (registrationData: RegistrationData) => Promise<void>
  sendOtp: (identifier: string) => Promise<void>
  verifyOtp: (identifier: string, otp: string) => Promise<void>
  logout: () => void
  loading: boolean
  updateVerification: (isVerified: boolean) => void
  updateUser: (updates: Partial<AuthUser>) => void
  fetchUserData: () => Promise<void>
  getActiveSessions: () => Promise<Session[]>
  revokeSession: (sessionId: string) => Promise<void>
  revokeAllOtherSessions: () => Promise<void>
}

interface CookieOptions {
  expires: number
  secure: boolean
  sameSite: 'strict' | 'lax' | 'none'
  path: string
}

const COOKIE_OPTIONS: CookieOptions = {
  expires: 4,
  secure: import.meta.env.PROD,
  sameSite: 'strict',
  path: '/',
}

export const COOKIE_KEYS = {
  AUTH_TOKEN: 'authToken',
  USER_DETAILS: 'userDetails',
  SESSION_ID: 'sessionId',
} as const

export const isFile = (value: unknown): value is File => {
  return (
    value instanceof File ||
    (typeof value === 'object' &&
      value !== null &&
      'name' in value &&
      'size' in value &&
      'type' in value)
  )
}

export const getErrorMessage = (error: unknown): string => {
  if (
    error &&
    typeof error === 'object' &&
    'response' in error &&
    error.response &&
    typeof error.response === 'object' &&
    'data' in error.response &&
    error.response.data &&
    typeof error.response.data === 'object' &&
    'message' in error.response.data
  ) {
    return String(error.response.data.message)
  }
  if (error instanceof Error) {
    return error.message
  }
  return 'An unexpected error occurred'
}

export const setCookie = (key: string, value: string | object): void => {
  const valueToStore = typeof value === 'object' ? JSON.stringify(value) : value
  Cookies.set(key, valueToStore, COOKIE_OPTIONS)
}

export const removeCookie = (key: string): void => {
  Cookies.remove(key, { path: '/' })
}
