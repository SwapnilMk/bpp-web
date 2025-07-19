import { io, Socket } from 'socket.io-client'
import { Store } from '@reduxjs/toolkit'
import { toast } from 'sonner'
import {
  setNotifications,
  addNotification,
  updateNotification,
  removeNotification,
  clearNotifications,
} from '@/store/notificationSlice'
import { NotificationResponse } from './notification.service'

declare global {
  interface Window {
    currentSocket?: Socket
  }
}

let socket: Socket | null = null

export const initWebSocket = (store: Store) => {
  const token = localStorage.getItem('authToken') || undefined
  socket = io(`${import.meta.env.VITE_API_URL}/notification`, {
    withCredentials: true,
    transports: ['websocket'],
    auth: token ? { token } : undefined,
  })

  socket.on('connect', () => {
    socket?.emit('notification:fetch', { limit: 20, skip: 0 })
  })

  socket.on('notification:list', (data: NotificationResponse) => {
    store.dispatch(setNotifications(data))
  })
  socket.on('notification:new', (data: NotificationResponse) => {
    store.dispatch(addNotification(data))
  })
  socket.on(
    'notification:marked-as-read',
    (data: { notificationId: string }) => {
      store.dispatch(updateNotification({ id: data.notificationId, changes: { isRead: true } }))
    }
  )
  socket.on('notification:all-marked-as-read', () => {
    // This needs a new reducer in notificationSlice
  })
  socket.on('notification:deleted', (data: { notificationId: string }) => {
    store.dispatch(removeNotification(data.notificationId))
  })
  socket.on('notification:all-deleted', () => {
    store.dispatch(clearNotifications())
  })
  socket.on('notification:error', (error: Error) => {
    toast.error(error.message || 'Socket error')
  })

  window.currentSocket = socket
}

export const disconnectWebSocket = () => {
  if (socket) {
    socket.disconnect()
    socket = null
    window.currentSocket = undefined
  }
}
