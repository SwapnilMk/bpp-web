import { createFileRoute } from '@tanstack/react-router'
import Donate from '@/features/donate'

export const Route = createFileRoute('/dashboard/donate/')({
  component: Donate,
})
