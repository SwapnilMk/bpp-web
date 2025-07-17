import { createFileRoute } from '@tanstack/react-router'
import BussinessCommunitySignup from '@/pages/auth/bussinessCommunitySignup'

export const Route = createFileRoute('/(auth)/business-sign-up')({
  component: BussinessCommunitySignup,
})
