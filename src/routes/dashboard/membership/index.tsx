import { createFileRoute } from '@tanstack/react-router'
import Membership from '@/features/membership'

export const Route = createFileRoute('/dashboard/membership/')({
  component: Membership,
})
