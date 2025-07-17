import { createFileRoute } from '@tanstack/react-router'
import DonatePage from '@/pages/donate'

export const Route = createFileRoute('/_public/donate/')({
  component: DonatePage,
})
