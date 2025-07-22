import apiClient from './api.service'

const createCase = async (caseData: FormData) => {
  const response = await apiClient.post('/cases', caseData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
}

export const caseService = {
  createCase,
}
