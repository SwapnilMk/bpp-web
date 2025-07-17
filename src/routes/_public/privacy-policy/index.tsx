import { createFileRoute } from '@tanstack/react-router'
import PrivacyPolicy from '@/pages/privacy-policy'

export const Route = createFileRoute('/_public/privacy-policy/')({
  component: PrivacyPolicy,
})
