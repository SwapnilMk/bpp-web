import Cookies from 'js-cookie'
import { postData } from './apiClient'

interface ApiResponse<T> {
  success: boolean
  message: string
  data?: T
}

interface ForgotPasswordResponse {
  success: boolean
  message: string
}

interface ResetPasswordResponse {
  success: boolean
  message: string
}

export const authService = {
  forgotPassword: async (identifier: { email?: string; phone?: string }) => {
    try {
      const response = await postData<ApiResponse<ForgotPasswordResponse>>(
        '/auth/forgot-password',
        identifier
      )
      return response.data
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message)
      }
      throw error
    }
  },

  resetPassword: async (data: {
    otp: string
    newPassword: string
    email?: string
    phone?: string
  }) => {
    try {
      const response = await postData<ApiResponse<ResetPasswordResponse>>(
        '/auth/reset-password',
        data
      )
      return response.data
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message)
      }
      throw error
    }
  },

  logout: async () => {
    try {
      // Clear auth token and session ID from cookies
      Cookies.remove('authToken')
      Cookies.remove('sessionId')

      // Make a request to the server to invalidate the session
      await postData('/auth/logout', {})

      return { success: true, message: 'Logged out successfully' }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message)
      }
      throw error
    }
  },
}
