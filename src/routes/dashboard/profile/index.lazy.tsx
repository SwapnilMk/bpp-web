import { createLazyFileRoute } from '@tanstack/react-router'
import PersonalDetails from '@/features/profile/personal'

export const Route = createLazyFileRoute('/dashboard/profile/')({
  component: PersonalDetails,
})
