import { createLazyFileRoute } from '@tanstack/react-router'
import Settings from '@/features/settings'

export const Route = createLazyFileRoute('/dashboard/settings')({
  component: Settings,
})
