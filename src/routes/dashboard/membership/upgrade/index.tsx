import { createFileRoute } from '@tanstack/react-router'
import { UpgradeForm } from '@/features/membership/upgrade/upgrade-form'

export const Route = createFileRoute('/dashboard/membership/upgrade/')({
  component: UpgradeForm,
})
