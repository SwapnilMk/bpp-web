import { getData } from './apiService'
import { asApiResponse } from '@/types/api'
import { User } from '@/types/auth'
import { getErrorMessage } from '@/context/authUtils'

export const fetchUserData = async (): Promise<User> => {
  try {
    const response = await getData<{ data: User }>('/users/me')
    const typedResponse = asApiResponse<{ data: User }>(response)
    return typedResponse.data as User
  } catch (error) {
    const errorMessage = getErrorMessage(error)
    throw new Error(errorMessage)
  }
}
