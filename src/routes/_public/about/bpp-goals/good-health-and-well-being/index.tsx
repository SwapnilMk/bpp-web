import { createFileRoute } from '@tanstack/react-router'
import GoodHealthAndWellBeingPage from '@/pages/about/goals/good-health-and-well-being'

export const Route = createFileRoute(
  '/_public/about/bpp-goals/good-health-and-well-being/'
)({
  component: GoodHealthAndWellBeingPage,
})
