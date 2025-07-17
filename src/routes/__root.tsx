// routes/_root.tsx
import { useEffect } from 'react'
import { QueryClient } from '@tanstack/react-query'
import {
  createRootRouteWithContext,
  Outlet,
  useLocation,
} from '@tanstack/react-router'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { initializeAnalytics, trackPageView } from '@/utils/analytics'
import { Toaster } from '@/components/ui/toaster'
import GeneralError from '@/features/errors/general-error'
import NotFoundError from '@/features/errors/not-found-error'

const RootComponent = () => {
  const location = useLocation()

  useEffect(() => {
    const gaMeasurementId = import.meta.env.VITE_GA_MEASUREMENT_ID
    initializeAnalytics(gaMeasurementId)
  }, [])

  useEffect(() => {
    trackPageView(location.pathname)
  }, [location])

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [location.pathname])

  return (
    <>
      <Outlet />
      <Toaster />
      {import.meta.env.VITE_MODE === 'development' && (
        <>
          <ReactQueryDevtools buttonPosition='bottom-left' />
          <TanStackRouterDevtools position='bottom-right' />
        </>
      )}
    </>
  )
}

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  component: RootComponent,
  notFoundComponent: NotFoundError,
  errorComponent: GeneralError,
})
