import { createFileRoute } from '@tanstack/react-router'
import Login from '@/pages/auth/loginForm'

export const Route = createFileRoute('/(auth)/sign-in')({
  component: Login,
})
