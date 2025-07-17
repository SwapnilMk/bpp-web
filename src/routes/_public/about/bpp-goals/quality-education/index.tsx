import { createFileRoute } from '@tanstack/react-router'
import QualityEducationPage from '@/pages/About/goals/quality-education'

export const Route = createFileRoute(
  '/_public/about/bpp-goals/quality-education/'
)({
  component: QualityEducationPage,
})
