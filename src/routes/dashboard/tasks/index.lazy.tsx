import { createLazyFileRoute } from '@tanstack/react-router'
import Tasks from '@/features/tasks'

export const Route = createLazyFileRoute('/dashboard/tasks/')({
  component: Tasks,
})
