import { createFileRoute } from '@tanstack/react-router'
import WalletPage from '@/features/wallet'

export const Route = createFileRoute('/dashboard/wallet/')({
  component: WalletPage,
})
