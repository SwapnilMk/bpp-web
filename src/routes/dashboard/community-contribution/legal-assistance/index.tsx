import { createFileRoute } from '@tanstack/react-router'
import { LegalCaseRegistration } from '@/features/contribution/legal'

export const Route = createFileRoute(
  '/dashboard/community-contribution/legal-assistance/'
)({
  component: () => <LegalCaseRegistration />,
})
