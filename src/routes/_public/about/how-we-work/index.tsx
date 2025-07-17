import { createFileRoute } from '@tanstack/react-router'
import HowWeWork from '@/pages/About/how-we-work'

export const Route = createFileRoute('/_public/about/how-we-work/')({
  component: HowWeWork,
})
