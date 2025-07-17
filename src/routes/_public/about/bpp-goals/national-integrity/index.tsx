import { createFileRoute } from '@tanstack/react-router'
import NationalIntegrityPage from '@/pages/about/goals/national-integrity'

export const Route = createFileRoute(
  '/_public/about/bpp-goals/national-integrity/'
)({
  component: NationalIntegrityPage,
})
