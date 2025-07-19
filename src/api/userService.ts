import { putData } from './apiClient'
import { User } from '@/types/auth'

export const updateUser = async (data: Partial<User>): Promise<User> => {
  const response = await putData<{ data: User }>('/users/me', data as any)
  return response.data
}
