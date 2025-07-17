import { createLazyFileRoute } from '@tanstack/react-router'
import ResetPassword from '@/pages/auth/ForgotPassword'

export const Route = createLazyFileRoute('/(auth)/forgot-password')({
  component: ResetPassword,
})
