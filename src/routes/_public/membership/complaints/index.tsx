import { createFileRoute } from '@tanstack/react-router'
import Complaints from '@/pages/Membership/Complaints'

export const Route = createFileRoute('/_public/membership/complaints/')({
  component: Complaints,
})
