import { createFileRoute } from '@tanstack/react-router'
import CommunityContribution from '@/pages/contribution/CommunityContribution'

export const Route = createFileRoute(
  '/_public/community-contribution/introduction/'
)({
  component: CommunityContribution,
})
