import { useEffect, useRef } from 'react'
import { io, Socket } from 'socket.io-client'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useWebSocket = () => {
  const queryClient = useQueryClient()
  const socket = useRef<Socket | null>(null)

  useEffect(() => {
    const socketInstance = io(import.meta.env.VITE_API_URL, {
      transports: ['websocket'],
    })

    socketInstance.on('connect', () => {
      toast.success('Connected to server')
    })

    socketInstance.on('disconnect', () => {
      toast.error('Disconnected from server')
    })

    socketInstance.on('user:updated', () => {
      queryClient.invalidateQueries({ queryKey: ['auth', 'user'] })
      toast.info('User data updated')
    })

    socketInstance.on('dashboard:updated', () => {
      queryClient.invalidateQueries({ queryKey: ['dashboard', 'stats'] })
      toast.info('Dashboard data updated')
    })

    socketInstance.on('membership:updated', () => {
      queryClient.invalidateQueries({ queryKey: ['membership', 'details'] })
      toast.info('Membership data updated')
    })

    socketInstance.on('wallet:updated', () => {
      queryClient.invalidateQueries({ queryKey: ['wallet', 'transactions'] })
      toast.info('Wallet data updated')
    })

    socketInstance.on('referral:updated', () => {
      queryClient.invalidateQueries({ queryKey: ['referrals', 'list'] })
      toast.info('Referral data updated')
    })

    socket.current = socketInstance

    return () => {
      socketInstance.disconnect()
    }
  }, [queryClient])

  return socket.current
}
