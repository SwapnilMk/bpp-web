import { createFileRoute } from '@tanstack/react-router'
import Transactions from '@/features/wallet/Transactions'

export const Route = createFileRoute('/dashboard/wallet/transactions/')({
  component: Transactions,
})
