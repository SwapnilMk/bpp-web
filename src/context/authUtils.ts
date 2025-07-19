import { AxiosError } from 'axios'
import Cookies from 'js-cookie'

// Cookie keys used throughout the application
export const COOKIE_KEYS = {
  AUTH_TOKEN: 'authToken',
  SESSION_ID: 'sessionId',
  USER_DETAILS: 'userDetails',
} as const

/**
 * Set a cookie with proper configuration
 */
export const setCookie = (
  name: string,
  value: string,
  options?: Cookies.CookieAttributes
) => {
  const isProd = import.meta.env.PROD
  const defaultOptions: Cookies.CookieAttributes = {
    expires: 30, // 30 days
    secure: isProd,
    sameSite: isProd ? 'none' : 'lax',
    ...options,
  }

  Cookies.set(name, value, defaultOptions)
}

/**
 * Remove a cookie
 */
export const removeCookie = (name: string) => {
  Cookies.remove(name)
}

/**
 * Get a cookie value
 */
export const getCookie = (name: string) => {
  return Cookies.get(name)
}

/**
 * Check if a value is a File object
 */
export const isFile = (value: unknown): value is File => {
  return value instanceof File
}

/**
 * Extract error message from various error types
 */
export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message
  }

  if (error instanceof AxiosError) {
    // Handle Axios errors
    const responseData = error.response?.data
    if (responseData) {
      if (typeof responseData === 'string') {
        return responseData
      }
      if (typeof responseData === 'object' && responseData !== null) {
        // Handle different response data structures
        if (
          'message' in responseData &&
          typeof responseData.message === 'string'
        ) {
          return responseData.message
        }
        if ('error' in responseData && typeof responseData.error === 'string') {
          return responseData.error
        }
        if ('title' in responseData && typeof responseData.title === 'string') {
          return responseData.title
        }
        // Handle array of errors
        if ('errors' in responseData && Array.isArray(responseData.errors)) {
          const errorMessages = responseData.errors
            .map((err: unknown) => {
              if (typeof err === 'object' && err !== null) {
                return (
                  (err as { msg?: string; message?: string }).msg ||
                  (err as { msg?: string; message?: string }).message ||
                  String(err)
                )
              }
              return String(err)
            })
            .filter(Boolean)
          if (errorMessages.length > 0) {
            return errorMessages.join(', ')
          }
        }
      }
    }

    // Fallback to status text or default message
    return (
      error.response?.statusText || error.message || 'Network error occurred'
    )
  }

  if (typeof error === 'string') {
    return error
  }

  if (error && typeof error === 'object' && 'message' in error) {
    return String(error.message)
  }

  return 'An unexpected error occurred'
}

/**
 * Clear all authentication-related cookies and localStorage
 */
export const clearAuthData = () => {
  // Clear cookies
  removeCookie(COOKIE_KEYS.AUTH_TOKEN)
  removeCookie(COOKIE_KEYS.SESSION_ID)

  // Clear localStorage
  localStorage.removeItem('sessionId')
  localStorage.removeItem('authToken')
  localStorage.removeItem(COOKIE_KEYS.USER_DETAILS)
}

/**
 * Check if user is authenticated based on token presence
 */
export const isAuthenticated = (): boolean => {
  const token = getCookie(COOKIE_KEYS.AUTH_TOKEN)
  return !!token
}

/**
 * Get authentication token from cookies
 */
export const getAuthToken = (): string | undefined => {
  return getCookie(COOKIE_KEYS.AUTH_TOKEN)
}

/**
 * Get session ID from cookies
 */
export const getSessionId = (): string | undefined => {
  return getCookie(COOKIE_KEYS.SESSION_ID)
}
