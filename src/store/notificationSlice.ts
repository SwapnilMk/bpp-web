import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Notification } from '@/services/notification.service'

interface NotificationsState {
  notifications: Notification[]
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
      action: PayloadAction<Notification[]>
    ) => {
      state.notifications = action.payload
      state.unreadCount = action.payload.filter((n) => !n.read).length
    },
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.notifications.unshift(action.payload)
      state.unreadCount++
    },
    updateNotification: (
      state,
      action: PayloadAction<{ id: string; changes: { read: boolean } }>
    ) => {
      const { id, changes } = action.payload
      const notification = state.notifications.find((n) => n._id === id)
      if (notification) {
        Object.assign(notification, changes)
        state.unreadCount = state.notifications.filter((n) => !n.read).length
      }
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(
        (n) => n._id !== action.payload
      )
      state.unreadCount = state.notifications.filter((n) => !n.read).length
    },
    clearNotifications: (state) => {
      state.notifications = []
      state.unreadCount = 0
    },
    markAllAsRead: (state) => {
      state.notifications.forEach((n) => (n.read = true))
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
