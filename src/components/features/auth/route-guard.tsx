import { useEffect } from 'react'
import { useNavigate, useLocation } from '@tanstack/react-router'
import { useAuth } from '@/context/AuthContext'

interface RouteGuardProps {
  children: React.ReactNode
}

export function RouteGuard({ children }: RouteGuardProps) {
  const { isAuthenticated } = useAuth()
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
