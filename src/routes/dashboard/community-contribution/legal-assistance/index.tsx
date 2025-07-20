import { createFileRoute } from '@tanstack/react-router'
import { LegalContribution } from '@/features/contribution/legal'

export const Route = createFileRoute(
  '/dashboard/community-contribution/legal-assistance/'
)({
  component: () => (
    <LegalContribution
      typeOfSupport='BPP Support'
      category='Legal Assistance'
    />
  ),
})
