import { createLazyFileRoute } from '@tanstack/react-router'
import AddressDetails from '@/features/profile/address'

export const Route = createLazyFileRoute('/dashboard/profile/address')({
  component: AddressDetails,
})
