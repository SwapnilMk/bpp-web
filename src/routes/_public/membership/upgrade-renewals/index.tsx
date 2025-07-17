import { createFileRoute } from '@tanstack/react-router'
import MembershipRenewal from '@/pages/Membership/MembershipRenewal'

export const Route = createFileRoute('/_public/membership/upgrade-renewals/')({
  component: MembershipRenewal,
})
