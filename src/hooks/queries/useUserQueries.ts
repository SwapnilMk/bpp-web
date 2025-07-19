import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchUserData } from '@/api/authService'
import { updateUser as updateUserData } from '@/api/userService'
import { User } from '@/types/auth'

export const useUser = () => {
  return useQuery<User, Error>({
    queryKey: ['auth', 'user'],
    queryFn: fetchUserData,
    enabled: false, // Will be enabled by the auth flow
  })
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: Partial<User>) => updateUserData(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth', 'user'] })
    },
  })
}
