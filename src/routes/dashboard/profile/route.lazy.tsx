import { createLazyFileRoute } from '@tanstack/react-router'
import Profile from '@/features/profile'

export const Route = createLazyFileRoute('/dashboard/profile')({
  component: Profile,
})
