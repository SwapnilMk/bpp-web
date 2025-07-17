import { createLazyFileRoute } from '@tanstack/react-router'
import ProfessionalDetails from '@/features/profile/professional'

export const Route = createLazyFileRoute('/dashboard/profile/professional')({
  component: ProfessionalDetails,
})
