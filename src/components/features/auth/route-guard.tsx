import { useEffect } from 'react'
import { useNavigate, useLocation } from '@tanstack/react-router'
import { useAppSelector } from '@/store/hooks'

interface RouteGuardProps {
  children: React.ReactNode
}

export function RouteGuard({ children }: RouteGuardProps) {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate({
        to: '/sign-in',
        search: {
          redirect: location.href,
        },
        replace: true,
      })
    }
  }, [isAuthenticated, navigate, location.href])

  if (!isAuthenticated) {
    return null // or a loading spinner
  }

  return <>{children}</>
}
