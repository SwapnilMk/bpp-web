import { createFileRoute } from '@tanstack/react-router'
import { CommunityContributionForm } from '@/features/contribution/legal'

export const Route = createFileRoute(
  '/dashboard/community-contribution/legal-assistance/'
)({
  component: () => <CommunityContributionForm />,
})
