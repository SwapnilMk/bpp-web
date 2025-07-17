import { createFileRoute } from '@tanstack/react-router'
import EmploymentAndEconomicGrowth from '@/pages/About/goals/employment-and-economic-growth'

export const Route = createFileRoute(
  '/_public/about/bpp-goals/employment-and-economic-growth/'
)({
  component: EmploymentAndEconomicGrowth,
})
