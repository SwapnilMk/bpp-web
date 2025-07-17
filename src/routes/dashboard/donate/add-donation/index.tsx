import { createFileRoute } from '@tanstack/react-router'
import DonationPage from '@/features/donate/Donation'

export const Route = createFileRoute('/dashboard/donate/add-donation/')({
  component: DonationPage,
})
