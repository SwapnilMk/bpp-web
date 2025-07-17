import { createFileRoute } from '@tanstack/react-router'
import GoalsPage from '@/pages/About/goals'

export const Route = createFileRoute('/_public/about/bpp-goals/')({
  component: GoalsPage,
})
