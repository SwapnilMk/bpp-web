import { createFileRoute } from '@tanstack/react-router'
import HowItWorks from '@/pages/contribution/HowItWorks'

export const Route = createFileRoute(
  '/_public/community-contribution/how-it-works/'
)({
  component: HowItWorks,
})
