import { createFileRoute } from '@tanstack/react-router'
import JusticePeaceCalmAndProsperity from '@/pages/about/goals/justice-peace-calm-and-prosperity'

export const Route = createFileRoute(
  '/_public/about/bpp-goals/justice-peace-calm-and-prosperity/'
)({
  component: JusticePeaceCalmAndProsperity,
})
