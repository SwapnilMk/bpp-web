import { createFileRoute } from '@tanstack/react-router'
import { PaymentForm } from '@/features/membership/payment/payment-form'

export const Route = createFileRoute('/dashboard/membership/payment/')({
  component: PaymentForm,
})
