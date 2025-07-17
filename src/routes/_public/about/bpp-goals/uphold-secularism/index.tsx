import { createFileRoute } from '@tanstack/react-router'
import UpholdSecularism from '@/pages/About/goals/uphold-secularism'

export const Route = createFileRoute(
  '/_public/about/bpp-goals/uphold-secularism/'
)({
  component: UpholdSecularism,
})
