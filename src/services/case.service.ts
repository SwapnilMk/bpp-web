import { CaseStatus } from '@/types/case'
import apiClient from './api.service'

const getCaseStatus = async (): Promise<CaseStatus[]> => {
  const response = await apiClient.get('/cases/status')
  return response.data
}

export const caseService = {
  getCaseStatus,
}
