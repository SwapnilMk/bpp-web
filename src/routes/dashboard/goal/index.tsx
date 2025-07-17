import { createFileRoute } from '@tanstack/react-router'
import GoalsPage from '@/features/goals'

export const Route = createFileRoute('/dashboard/goal/')({
  component: GoalsPage,
})
