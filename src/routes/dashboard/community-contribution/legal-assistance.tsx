import { createFileRoute } from '@tanstack/react-router'
import { LegalContribution } from '@/features/legal-contribution'

export const Route = createFileRoute(
  '/dashboard/community-contribution/legal-assistance'
)({
  component: LegalContribution,
})
