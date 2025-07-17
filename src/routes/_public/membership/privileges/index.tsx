import { createFileRoute } from '@tanstack/react-router'
import MembershipPrivilege from '@/pages/Membership/MembershipPrivilege'

export const Route = createFileRoute('/_public/membership/privileges/')({
  component: MembershipPrivilege,
})
