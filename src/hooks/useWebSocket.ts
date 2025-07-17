import { useEffect, useRef, useCallback } from 'react'
import { NotificationResponse } from '@/services/notification.service'
import { User } from '@/types/auth'
import { io, Socket } from 'socket.io-client'
import { toast } from 'sonner'

// Extend Window interface to include currentSocket
declare global {
  interface Window {
    currentSocket?: Socket
  }
}

interface UseWebSocketProps {
  user: User | null
  getActiveSessions: () => Promise<void>
}

export const useWebSocket = ({
  user,
  getActiveSessions,
}: UseWebSocketProps) => {
  const socketRef = useRef<Socket | null>(null)

  const connect = useCallback(() => {
    if (!user) {
      // If no user, disconnect any existing socket
      if (window.currentSocket) {
        window.currentSocket.disconnect()
        delete window.currentSocket
      }
      return
    }

    const socket = io(import.meta.env.VITE_API_URL, {
      withCredentials: true,
      transports: ['websocket'],
    })

    // Expose socket globally for logout cleanup
    window.currentSocket = socket

    socket.on('connect', () => {
      // Connect session
      socket.emit('session:connect', {
        sessionId: localStorage.getItem('sessionId'),
        userId: user._id,
      })
    })

    socket.on('session:activated', (data) => {
      toast.success('Session activated!', {
        description: `Device: ${data.deviceType}, Location: ${data.location}`,
      })
      getActiveSessions()
    })

    socket.on('session:reconnected', (data) => {
      toast.success('Session reconnected!', {
        description: `Device: ${data.deviceType}, Location: ${data.location}`,
      })
      getActiveSessions()
    })

    socket.on('session:created', () => {
      getActiveSessions()
    })

    socket.on('session:updated', () => {
      getActiveSessions()
    })

    socket.on('session:revoked', (data) => {
      if (data.sessionId === localStorage.getItem('sessionId')) {
        toast.error('Your session has been revoked')
        // Handle logout or redirect
      }
      getActiveSessions()
    })

    socket.on('sessions:revoked', () => {
      getActiveSessions()
    })

    socket.on('error', (error) => {
      toast.error(error.message || 'WebSocket connection error')
    })

    socketRef.current = socket

    // Set up heartbeat
    const heartbeatInterval = setInterval(() => {
      if (socket.connected) {
        socket.emit('session:heartbeat', {
          sessionId: localStorage.getItem('sessionId'),
        })
      }
    }, 30000)

    // Handle tab closure
    const handleBeforeUnload = () => {
      if (socket.connected) {
        socket.emit('session:status', {
          sessionId: localStorage.getItem('sessionId'),
          status: 'offline',
        })
        socket.disconnect()
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      clearInterval(heartbeatInterval)
      window.removeEventListener('beforeunload', handleBeforeUnload)
      socket.disconnect()
      // Clean up global reference
      delete window.currentSocket
    }
  }, [user, getActiveSessions])

  useEffect(() => {
    const cleanup = connect()
    return () => {
      cleanup?.()
    }
  }, [connect])

  return socketRef.current
}

// Notification socket hook
interface UseNotificationSocketProps {
  user: User | null
  onNotificationList?: (data: NotificationResponse) => void
  onMarkedAsRead?: (notificationId: string) => void
  onAllMarkedAsRead?: () => void
  onDeleted?: (notificationId: string) => void
  onAllDeleted?: () => void
  onError?: (error: Error) => void
}

export const useNotificationSocket = ({
  user,
  onNotificationList,
  onMarkedAsRead,
  onAllMarkedAsRead,
  onDeleted,
  onAllDeleted,
  onError,
}: UseNotificationSocketProps) => {
  const socketRef = useRef<Socket | null>(null)

  const connect = useCallback(() => {
    if (!user) return

    // Get token from localStorage or cookies if available
    const token = localStorage.getItem('authToken') || undefined
    const socket = io(`${import.meta.env.VITE_API_URL}/notification`, {
      withCredentials: true,
      transports: ['websocket'],
      auth: token ? { token } : undefined,
    })

    socket.on('connect', () => {
      // Optionally emit an event to fetch notifications
      socket.emit('notification:fetch', { limit: 20, skip: 0 })
    })

    socket.on('notification:list', (data: NotificationResponse) => {
      onNotificationList?.(data)
    })

    socket.on(
      'notification:marked-as-read',
      (data: { notificationId: string }) => {
        onMarkedAsRead?.(data.notificationId)
      }
    )

    socket.on('notification:all-marked-as-read', () => {
      onAllMarkedAsRead?.()
    })

    socket.on('notification:deleted', (data: { notificationId: string }) => {
      onDeleted?.(data.notificationId)
    })

    socket.on('notification:all-deleted', () => {
      onAllDeleted?.()
    })

    socket.on('notification:error', (error: Error) => {
      toast.error((error as Error).message || 'Notification socket error')
      onError?.(error)
    })

    socketRef.current = socket

    // Clean up on unmount
    return () => {
      socket.disconnect()
    }
  }, [
    user,
    onNotificationList,
    onMarkedAsRead,
    onAllMarkedAsRead,
    onDeleted,
    onAllDeleted,
    onError,
  ])

  useEffect(() => {
    const cleanup = connect()
    return () => {
      cleanup?.()
    }
  }, [connect])

  return socketRef.current
}
