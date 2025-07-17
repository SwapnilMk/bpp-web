import { createFileRoute } from '@tanstack/react-router'
import WingsPage from '@/pages/about/wings/wings'

export const Route = createFileRoute('/_public/about/wings/')({
  component: WingsPage,
})
