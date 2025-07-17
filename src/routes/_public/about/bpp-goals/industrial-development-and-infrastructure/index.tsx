import { createFileRoute } from '@tanstack/react-router'
import IndustrialDevelopmentAndInfrastructure from '@/pages/about/goals/industrial-development-and-infrastructure'

export const Route = createFileRoute(
  '/_public/about/bpp-goals/industrial-development-and-infrastructure/'
)({
  component: IndustrialDevelopmentAndInfrastructure,
})
