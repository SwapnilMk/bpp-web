export interface Notification {
  _id: string
  title: string
  message: string
  read: boolean
  createdAt: string
  updatedAt: string
  userId?: string
  type?: 'info' | 'success' | 'warning' | 'error'
  link?: string
}
