import axios from 'axios'
import { getCookie, COOKIE_KEYS } from '@/context/authUtils'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

apiClient.interceptors.request.use(
  (config) => {
    const token = getCookie(COOKIE_KEYS.AUTH_TOKEN)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export const postData = async <T>(
  url: string,
  data: Record<string, unknown>,
  options: Record<string, unknown> = {}
): Promise<{ data: T }> => {
  return apiClient.post(url, data, options)
}

export const getData = async <T>(
  url: string,
  options: Record<string, unknown> = {}
): Promise<{ data: T }> => {
  return apiClient.get(url, options)
}

export const deleteData = async <T>(
  url:string,
  options: Record<string, unknown> = {}
): Promise<{ data: T }> => {
  return apiClient.delete(url, options)
}

export default apiClient
