import { createLazyFileRoute } from '@tanstack/react-router'
import MultiStepForm from '@/pages/auth/signupForm'

export const Route = createLazyFileRoute('/(auth)/sign-up')({
  component: MultiStepForm,
})
