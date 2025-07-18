import { createFileRoute } from '@tanstack/react-router'
import EqualOpportunityAndGenderEqualityPage from '@/pages/About/goals/equal-opportunity-and-gender-equality'

export const Route = createFileRoute(
  '/_public/about/bpp-goals/equal-opportunity-and-gender-equality/'
)({
  component: EqualOpportunityAndGenderEqualityPage,
})
