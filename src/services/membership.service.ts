import { asApiResponse, MembershipResponse } from '@/types/api'
import { getData } from './api.service'

export const fetchMembershipData = async (): Promise<MembershipResponse['data']> => {
  try {
    const response = await getData<MembershipResponse>('/users/membership')
    if (response && typeof response === 'object' && 'data' in response) {
      const apiData = response.data
      if (
        apiData &&
        typeof apiData === 'object' &&
        'success' in apiData &&
        'data' in apiData
      ) {
        return apiData.data
      }
      const typedResponse = asApiResponse<MembershipResponse['data']>(response)
      return typedResponse.data
    }
    // If response is already the data object (fallback)
    if (
      response &&
      typeof response === 'object' &&
      'user' in response &&
      'membership' in response
    ) {
      return response as MembershipResponse['data']
    }
    throw new Error('Invalid response format from membership API')
  } catch (err) {
    const error =
      err instanceof Error ? err : new Error('Failed to load membership data')
    throw error
  }
}
