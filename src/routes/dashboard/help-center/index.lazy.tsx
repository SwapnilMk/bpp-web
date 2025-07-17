import { createLazyFileRoute } from '@tanstack/react-router'
import ComingSoon from '@/components/coming-soon'

export const Route = createLazyFileRoute('/dashboard/help-center/')({
  component: ComingSoon,
})
