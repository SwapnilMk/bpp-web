import { createFileRoute } from '@tanstack/react-router'
import Dashboard from '@/features/dashboard'
import { queryClient } from '@/api/queryClient'
import { useDashboardDataQuery } from '@/hooks/queries/useDashboardQueries'

export const Route = createFileRoute('/dashboard/')({
  component: Dashboard,
  loader: () => {
    return queryClient.ensureQueryData(useDashboardDataQuery())
  },
})
