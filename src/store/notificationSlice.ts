import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { NotificationResponse } from '@/services/notification.service'

interface NotificationsState {
  notifications: NotificationResponse[]
  unreadCount: number
}

const initialState: NotificationsState = {
  notifications: [],
  unreadCount: 0,
}

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNotifications: (
      state,
      action: PayloadAction<NotificationResponse[]>
    ) => {
      state.notifications = action.payload
      state.unreadCount = action.payload.filter((n) => !n.isRead).length
    },
    addNotification: (state, action: PayloadAction<NotificationResponse>) => {
      state.notifications.unshift(action.payload)
      state.unreadCount++
    },
    updateNotification: (
      state,
      action: PayloadAction<{ id: string; changes: { isRead: boolean } }>
    ) => {
      const { id, changes } = action.payload
      const notification = state.notifications.find((n) => n._id === id)
      if (notification) {
        Object.assign(notification, changes)
        state.unreadCount = state.notifications.filter((n) => !n.isRead).length
      }
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(
        (n) => n._id !== action.payload
      )
      state.unreadCount = state.notifications.filter((n) => !n.isRead).length
    },
    clearNotifications: (state) => {
      state.notifications = []
      state.unreadCount = 0
    },
    markAllAsRead: (state) => {
      state.notifications.forEach((n) => (n.isRead = true))
      state.unreadCount = 0
    },
  },
})

export const {
  setNotifications,
  addNotification,
  updateNotification,
  removeNotification,
  clearNotifications,
  markAllAsRead,
} = notificationSlice.actions
export default notificationSlice.reducer
