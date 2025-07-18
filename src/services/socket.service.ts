import { io, Socket } from 'socket.io-client'
import { Store } from '@reduxjs/toolkit'
import { toast } from 'sonner'
import {
  setNotifications,
  addNotification,
  updateNotification,
  removeNotification,
  clearNotifications,
  markAllAsRead,
} from '@/store/notificationSlice'
import { Notification } from '@/types/notifications'

declare global {
  interface Window {
    currentSocket?: Socket
  }
}

let socket: Socket | null = null

export const initWebSocket = (store: Store) => {
  const token = localStorage.getItem('authToken') || undefined
  if (!socket) {
    socket = io(`${import.meta.env.VITE_API_URL}`, {
      withCredentials: true,
      transports: ['websocket'],
      auth: token ? { token } : {},
    })

    socket.on('connect', () => {
      console.log('Socket connected')
    })

    socket.on('disconnect', () => {
      console.log('Socket disconnected')
    })

    socket.on('notifications', (data: Notification[]) => {
      store.dispatch(setNotifications(data))
    })

    socket.on('newNotification', (data: Notification) => {
      store.dispatch(addNotification(data))
      toast.info('You have a new notification')
    })

    socket.on('notificationRead', (data: { notificationId: string }) => {
      store.dispatch(
        updateNotification({ id: data.notificationId, changes: { read: true } })
      )
    })

    socket.on('allNotificationsRead', () => {
      store.dispatch(markAllAsRead())
    })

    socket.on('notificationDeleted', (data: { notificationId: string }) => {
      store.dispatch(removeNotification(data.notificationId))
    })

    socket.on('allNotificationsDeleted', () => {
      store.dispatch(clearNotifications())
    })

    socket.on('error', (error: { message: string }) => {
      toast.error(error.message || 'A socket error occurred')
    })

    window.currentSocket = socket
  }
}

export const disconnectWebSocket = () => {
  if (socket) {
    socket.disconnect()
    socket = null
    window.currentSocket = undefined
  }
}

export const getSocket = () => socket
