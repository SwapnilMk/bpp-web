import { createLazyFileRoute } from '@tanstack/react-router'
import ContactDetails from '@/features/profile/contact'

export const Route = createLazyFileRoute('/dashboard/profile/contact')({
  component: ContactDetails,
})
