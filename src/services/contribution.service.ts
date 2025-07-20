import { Case, CaseSummary } from '@/types/contribution'
import apiClient from './api.service'

export interface Pagination {
  page?: number
  limit?: number
  [key: string]: string | number | undefined
}

export interface PagedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
}

const getCaseSummaries = async (
  pagination: Pagination
): Promise<PagedResponse<CaseSummary>> => {
  const response = await apiClient.get('/cases', { params: pagination })
  return response.data
}

const getCase = async (caseId: string): Promise<Case> => {
  const response = await apiClient.get(`/cases/${caseId}`)
  return response.data
}

const createCase = async (caseData: FormData): Promise<Case> => {
  const response = await apiClient.post('/cases', caseData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
}

export const contributionService = {
  getCaseSummaries,
  getCase,
  createCase,
}
