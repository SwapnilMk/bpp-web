'use client'

import { useEffect, useState, useRef } from 'react'
import { formatDistanceToNow } from 'date-fns'
import {
  notificationService,
  type Notification,
} from '@/services/notification.service'
import { useAppSelector } from '@/store/hooks'
import { Bell, Trash2 } from 'lucide-react'
import { Socket } from 'socket.io-client'
import { toast } from 'sonner'
import { useNotificationSocket } from '@/hooks/useWebSocket'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

function Dot({ className }: { className?: string }) {
  return (
    <svg
      width='6'
      height='6'
      fill='currentColor'
      viewBox='0 0 6 6'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      aria-hidden='true'
    >
      <circle cx='3' cy='3' r='3' />
    </svg>
  )
}

export const NotificationHeaderMenu = () => {
  const user = useAppSelector((state) => state.user.user)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(false)
  const [skip, setSkip] = useState(0)
  const LIMIT = 20
  const socketRef = useRef<Socket | null>(null)

  // Socket event handlers
  const handleNotificationList = (data: {
    notifications: Notification[]
    total: number
    hasMore: boolean
  }) => {
    setNotifications((prev) =>
      skip === 0 ? data.notifications : [...prev, ...data.notifications]
    )
    setHasMore(data.hasMore)
    setSkip((prev) => prev + data.notifications.length)
    setUnreadCount(data.notifications.filter((n) => !n.read).length)
    setLoading(false)
  }

  const handleMarkedAsRead = (notificationId: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n._id === notificationId ? { ...n, read: true } : n))
    )
    setUnreadCount((prev) => Math.max(0, prev - 1))
  }

  const handleAllMarkedAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
    setUnreadCount(0)
  }

  const handleDeleted = (notificationId: string) => {
    setNotifications((prev) => prev.filter((n) => n._id !== notificationId))
    // If deleted notification was unread, decrement count
    setUnreadCount((prev) => Math.max(0, prev - 1))
  }

  const handleAllDeleted = () => {
    setNotifications([])
    setUnreadCount(0)
  }

  useNotificationSocket({
    user,
    onNotificationList: handleNotificationList,
    onMarkedAsRead: handleMarkedAsRead,
    onAllMarkedAsRead: handleAllMarkedAsRead,
    onDeleted: handleDeleted,
    onAllDeleted: handleAllDeleted,
    onError: (error) =>
      toast.error(error.message || 'Notification socket error'),
  })

  // Fetch notifications on mount (fallback for initial load)
  useEffect(() => {
    if (user) {
      setLoading(true)
      notificationService
        .getNotifications({ limit: LIMIT, skip: 0 })
        .then((response) => {
          setNotifications(response.notifications)
          setHasMore(response.hasMore)
          setSkip(response.notifications.length)
          setUnreadCount(response.notifications.filter((n) => !n.read).length)
        })
        .catch(() => {
          toast.error('Failed to fetch notifications')
        })
        .finally(() => setLoading(false))
    }
  }, [user])

  // Socket emit helpers
  const emitSocketEvent = (event: string, payload?: unknown) => {
    if (socketRef.current && socketRef.current.connected) {
      socketRef.current.emit(event, payload)
      return true
    }
    return false
  }

  // Mark all as read
  const handleMarkAllAsRead = async () => {
    if (
      !emitSocketEvent('notification:mark-all-as-read', {
        userId: user?._id || user?.id,
      })
    ) {
      // fallback REST
      try {
        await notificationService.markAllAsRead()
        setNotifications((prev) =>
          prev.map((notification) => ({ ...notification, read: true }))
        )
        setUnreadCount(0)
        toast.success('All notifications marked as read')
      } catch (_error) {
        toast.error('Failed to mark all notifications as read')
      }
    }
  }

  // Mark single as read
  const handleNotificationClick = async (notification: Notification) => {
    if (notification.read) return
    if (
      !emitSocketEvent('notification:mark-as-read', {
        notificationId: notification._id,
        userId: user?._id || user?.id,
      })
    ) {
      // fallback REST
      try {
        await notificationService.markAsRead(notification._id)
        setNotifications((prev) =>
          prev.map((n) =>
            n._id === notification._id ? { ...n, read: true } : n
          )
        )
        setUnreadCount((prev) => Math.max(0, prev - 1))
      } catch (_error) {
        toast.error('Failed to mark notification as read')
      }
    }
  }

  // Delete single notification
  const handleDeleteNotification = async (
    notificationId: string,
    event: React.MouseEvent
  ) => {
    event.stopPropagation()
    if (
      !emitSocketEvent('notification:delete', {
        notificationId,
        userId: user?._id || user?.id,
      })
    ) {
      // fallback REST
      try {
        await notificationService.deleteNotification(notificationId)
        setNotifications((prev) => prev.filter((n) => n._id !== notificationId))
        const deletedNotification = notifications.find(
          (n) => n._id === notificationId
        )
        if (deletedNotification && !deletedNotification.read) {
          setUnreadCount((prev) => Math.max(0, prev - 1))
        }
        toast.success('Notification deleted')
      } catch (_error) {
        toast.error('Failed to delete notification')
      }
    }
  }

  // Delete all notifications
  const handleDeleteAll = async () => {
    if (
      !emitSocketEvent('notification:delete-all', {
        userId: user?._id || user?.id,
      })
    ) {
      // fallback REST
      try {
        await notificationService.deleteAllNotifications()
        setNotifications([])
        setUnreadCount(0)
        toast.success('All notifications deleted')
      } catch (_error) {
        toast.error('Failed to delete all notifications')
      }
    }
  }

  // Load more notifications
  const handleLoadMore = () => {
    if (!loading && hasMore) {
      setLoading(true)
      notificationService
        .getNotifications({ limit: LIMIT, skip })
        .then((response) => {
          setNotifications((prev) => [...prev, ...response.notifications])
          setHasMore(response.hasMore)
          setSkip(skip + response.notifications.length)
        })
        .catch(() => {
          toast.error('Failed to fetch notifications')
        })
        .finally(() => setLoading(false))
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size='icon'
          variant='ghost'
          className='relative'
          aria-label='Open notifications'
        >
          <Bell size={13} strokeWidth={2} aria-hidden='true' />
          {unreadCount > 0 && (
            <Badge className='absolute -top-2 left-full min-w-5 -translate-x-1/2 rounded-full px-1'>
              {unreadCount > 99 ? '99+' : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-80 p-1'>
        <div className='flex items-baseline justify-between gap-4 px-3 py-2'>
          <div className='text-sm font-semibold'>Notifications</div>
          <div className='flex gap-2'>
            {notifications.length > 0 && (
              <button
                className='text-xs font-medium hover:underline'
                onClick={handleDeleteAll}
              >
                <Trash2 size={14} />
              </button>
            )}
            {unreadCount > 0 && (
              <button
                className='text-xs font-medium hover:underline'
                onClick={handleMarkAllAsRead}
              >
                Mark all as read
              </button>
            )}
          </div>
        </div>
        <div
          role='separator'
          aria-orientation='horizontal'
          className='-mx-1 my-1 h-px bg-border'
        ></div>
        <div className='max-h-[400px] overflow-y-auto'>
          {notifications.length === 0 ? (
            <div className='flex flex-col items-center justify-center py-8 text-center'>
              <Bell size={24} className='mb-2 text-muted-foreground' />
              <p className='text-sm text-muted-foreground'>
                No notifications yet
              </p>
              <p className='text-xs text-muted-foreground'>
                We'll notify you when something arrives
              </p>
            </div>
          ) : (
            <>
              {notifications.map((notification) => (
                <div
                  key={notification._id}
                  className='group relative rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent'
                >
                  <div className='relative flex items-start pe-3'>
                    <div className='flex-1 space-y-1'>
                      <button
                        className='text-left text-foreground/80 after:absolute after:inset-0'
                        onClick={() => handleNotificationClick(notification)}
                      >
                        <span className='font-medium text-foreground hover:underline'>
                          {notification.title}
                        </span>
                        <p className='mt-1 text-xs text-muted-foreground'>
                          {notification.message}
                        </p>
                        <div className='mt-1 text-xs text-muted-foreground'>
                          {formatDistanceToNow(
                            new Date(notification.createdAt),
                            { addSuffix: true }
                          )}
                        </div>
                      </button>
                    </div>
                    <div className='flex items-center gap-2'>
                      {notification.read === false && (
                        <div className='self-center'>
                          <span className='sr-only'>Unread</span>
                          <Dot />
                        </div>
                      )}
                      <button
                        className='opacity-0 transition-opacity group-hover:opacity-100'
                        onClick={(e) =>
                          handleDeleteNotification(notification._id, e)
                        }
                      >
                        <Trash2
                          size={14}
                          className='text-muted-foreground hover:text-destructive'
                        />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {hasMore && (
                <div className='px-3 py-2 text-center'>
                  <button
                    className='text-xs text-muted-foreground hover:text-foreground'
                    onClick={handleLoadMore}
                    disabled={loading}
                  >
                    {loading ? 'Loading...' : 'Load more'}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}
