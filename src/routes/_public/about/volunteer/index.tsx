import { createFileRoute } from '@tanstack/react-router'
import Volunteer from '@/pages/about/volunteer'

export const Route = createFileRoute('/_public/about/volunteer/')({
  component: Volunteer,
})
