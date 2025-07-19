import store from '@/store/store'
import { io, Socket } from 'socket.io-client'
import { toast } from 'sonner'
import { queryClient } from '@/api/queryClient'

let socket: Socket | null = null

export const initWebSocket = () => {
  const { user } = store.getState().user
  const { sessionId } = store.getState().auth

  if (socket || !user || !sessionId) {
    return
  }

  socket = io(import.meta.env.VITE_API_URL, {
    withCredentials: true,
    transports: ['websocket'],
  })

  window.currentSocket = socket

  socket.on('connect', () => {
    socket?.emit('session:connect', {
      sessionId,
      userId: user._id,
    })
  })

  socket.on('session:activated', (data) => {
    toast.success('Session activated!', {
      description: `Device: ${data.deviceType}, Location: ${data.location}`,
    })
    queryClient.invalidateQueries({ queryKey: ['sessions'] })
  })

  socket.on('session:reconnected', (data) => {
    toast.success('Session reconnected!', {
      description: `Device: ${data.deviceType}, Location: ${data.location}`,
    })
    queryClient.invalidateQueries({ queryKey: ['sessions'] })
  })

  socket.on('session:created', () => {
    queryClient.invalidateQueries({ queryKey: ['sessions'] })
  })

  socket.on('session:updated', () => {
    queryClient.invalidateQueries({ queryKey: ['sessions'] })
  })

  socket.on('session:revoked', (data) => {
    if (data.sessionId === sessionId) {
      toast.error('Your session has been revoked')
      store.dispatch({ type: 'auth/clearCredentials' })
    }
    queryClient.invalidateQueries({ queryKey: ['sessions'] })
  })

  socket.on('sessions:revoked', () => {
    queryClient.invalidateQueries({ queryKey: ['sessions'] })
  })

  socket.on('error', (error) => {
    toast.error(error.message || 'WebSocket connection error')
  })

  // Example of how to handle a dashboard update event
  socket.on('dashboard:updated', () => {
    toast.info('Dashboard data has been updated!')
    queryClient.invalidateQueries({ queryKey: ['dashboardData'] })
  })
}

export const disconnectWebSocket = () => {
  if (socket) {
    socket.disconnect()
    socket = null
    delete window.currentSocket
  }
}
