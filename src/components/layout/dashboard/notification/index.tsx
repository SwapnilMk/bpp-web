'use client'

import { formatDistanceToNow } from 'date-fns'
import { getSocket } from '@/services/socket.service'
import { useAppSelector } from '@/store/hooks'
import { Bell, Trash2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Notification } from '../../../../types/notifications'

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
  const { notifications, unreadCount } = useAppSelector(
    (state) => state.notifications
  )
  const socket = getSocket()

  const handleMarkAllAsRead = () => {
    if (socket) {
      socket.emit('markAllNotificationsAsRead')
    }
  }

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.read && socket) {
      socket.emit('markNotificationAsRead', {
        notificationId: notification._id,
      })
    }
  }

  const handleDeleteNotification = (
    notificationId: string,
    event: React.MouseEvent
  ) => {
    event.stopPropagation()
    if (socket) {
      socket.emit('deleteNotification', { notificationId })
    }
  }

  const handleDeleteAll = () => {
    if (socket) {
      socket.emit('deleteAllNotifications')
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
            </>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}
