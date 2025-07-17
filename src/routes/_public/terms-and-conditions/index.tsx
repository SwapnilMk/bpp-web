import { createFileRoute } from '@tanstack/react-router'
import TermsOfService from '@/pages/terms-condtions'

export const Route = createFileRoute('/_public/terms-and-conditions/')({
  component: TermsOfService,
})
