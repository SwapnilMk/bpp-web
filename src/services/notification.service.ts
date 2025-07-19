import { Notification } from '@/types/notifications'
import apiClient from './api.service'

export type { Notification }

export const notificationService = {
  // Get all notifications for the current user
  getNotifications: async (): Promise<Notification[]> => {
    const response = await apiClient.get('/notifications')
    return response.data
  },

  // Mark a notification as read
  markAsRead: async (notificationId: string): Promise<void> => {
    await apiClient.patch(`/notifications/${notificationId}/read`)
  },

  // Mark all notifications as read
  markAllAsRead: async (): Promise<void> => {
    await apiClient.patch('/notifications/read-all')
  },

  // Delete a notification
  deleteNotification: async (notificationId: string): Promise<void> => {
    await apiClient.delete(`/notifications/${notificationId}`)
  },

  // Delete all notifications
  deleteAllNotifications: async (): Promise<void> => {
    await apiClient.delete('/notifications')
  },
}
