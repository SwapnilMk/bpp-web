import { createFileRoute } from '@tanstack/react-router'
import MembershipFaq from '@/pages/Membership/MembershipFaq'

export const Route = createFileRoute('/_public/membership/faq/')({
  component: MembershipFaq,
})
