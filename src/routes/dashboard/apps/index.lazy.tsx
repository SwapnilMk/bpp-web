import { createLazyFileRoute } from '@tanstack/react-router'
import Apps from '@/features/apps'

export const Route = createLazyFileRoute('/dashboard/apps/')({
  component: Apps,
})
