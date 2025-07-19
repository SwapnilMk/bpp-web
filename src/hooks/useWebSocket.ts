import { useEffect, useRef, useCallback } from 'react';
import { NotificationResponse } from '@/services/notification.service';
import { User } from '@/types/auth';
import { io, Socket } from 'socket.io-client';
import { toast } from 'sonner';

// Extend Window interface to include currentSocket
declare global {
  interface Window {
    currentSocket?: Socket;
  }
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
