import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  login as loginApi,
  register as registerApi,
  sendOtp as sendOtpApi,
  verifyOtp as verifyOtpApi,
  logout as logoutApi,
  getActiveSessions as getActiveSessionsApi,
  revokeSession as revokeSessionApi,
  revokeAllOtherSessions as revokeAllOtherSessionsApi,
} from '@/api/authService'
import { LoginCredentials, RegistrationData } from '@/types/auth'

export const useLogin = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (credentials: LoginCredentials) => loginApi(credentials),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth', 'user'] })
    },
  })
}

export const useRegister = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: RegistrationData) => registerApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth', 'user'] })
    },
  })
}

export const useSendOtp = () => {
  return useMutation({
    mutationFn: (identifier: string) => sendOtpApi(identifier),
  })
}

export const useVerifyOtp = () => {
  return useMutation({
    mutationFn: (data: { identifier: string; otp: string }) =>
      verifyOtpApi(data.identifier, data.otp),
  })
}

export const useLogout = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => logoutApi(),
    onSuccess: () => {
      queryClient.clear()
    },
  })
}

export const useActiveSessions = () => {
  return useQuery({
    queryKey: ['auth', 'sessions'],
    queryFn: getActiveSessionsApi,
  })
}

export const useRevokeSession = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (sessionId: string) => revokeSessionApi(sessionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth', 'sessions'] })
    },
  })
}

export const useRevokeAllOtherSessions = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => revokeAllOtherSessionsApi(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth', 'sessions'] })
    },
  })
}
