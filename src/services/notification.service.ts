import { getData, deleteData, patchData } from '@/api/apiClient'

export interface Notification {
  _id: string
  type: string
  title: string
  message: string
  action: string
  target: string
  metadata?: Record<string, unknown>
  read: boolean
  createdAt: string
  updatedAt: string
}

export interface NotificationResponse {
  notifications: Notification[]
  total: number
  hasMore: boolean
}

export interface UnreadCountResponse {
  count: number
}

export const notificationService = {
  async getNotifications(
    options: { limit?: number; skip?: number; unreadOnly?: boolean } = {}
  ) {
    const { limit = 20, skip = 0, unreadOnly = false } = options
    const queryParams = new URLSearchParams({
      limit: limit.toString(),
      skip: skip.toString(),
      unreadOnly: unreadOnly.toString(),
    })
    return getData<NotificationResponse>(`/notifications?${queryParams}`)
  },

  async getUnreadCount() {
    return getData<UnreadCountResponse>('/notifications/unread/count')
  },

  async markAsRead(notificationId: string) {
    return patchData<Notification>(`/notifications/${notificationId}/read`, {})
  },

  async markAllAsRead() {
    return patchData<{ success: boolean }>('/notifications/read-all', {})
  },

  async deleteNotification(notificationId: string) {
    return deleteData<Notification>(`/notifications/${notificationId}`)
  },

  async deleteAllNotifications() {
    return deleteData<{ success: boolean }>('/notifications')
  },
}
