import { createFileRoute } from '@tanstack/react-router'
import MembershipDetails from '@/features/membership/membership-details'

export const Route = createFileRoute(
  '/_public/membership/details/$membershipId'
)({
  component: MembershipDetails,
})
