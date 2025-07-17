import { createFileRoute } from '@tanstack/react-router'
import Volunteer from '@/pages/About/volunteer'

export const Route = createFileRoute('/_public/about/volunteer/')({
  component: Volunteer,
})
