import { createFileRoute } from '@tanstack/react-router'
import Contribution from '@/features/contribution'

export const Route = createFileRoute('/dashboard/community-contribution/')({
  component: Contribution,
})
