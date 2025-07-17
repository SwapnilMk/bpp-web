import { createLazyFileRoute } from '@tanstack/react-router'
import SessionsPage from '@/features/settings/sessions'

export const Route = createLazyFileRoute('/dashboard/settings/sessions')({
  component: SessionsPage,
})
