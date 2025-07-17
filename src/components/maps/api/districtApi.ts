import { asApiResponse } from '@/types/api'
import { getData } from '@/api/apiClient'

interface DistrictData {
  district: string
  totalMembers: number
  totalPopulation: number
  registeredVoters: number
  activeVolunteers: number
}

export const fetchDistrictData = async (
  state: string,
  district: string
): Promise<DistrictData> => {
  const normalizedState = state.toLowerCase().replace(/\s+/g, '_')
  const response = await getData(
    `/api/district/${normalizedState}/${district.toLowerCase()}`
  )
  const typedResponse = asApiResponse<DistrictData>(response)
  return typedResponse.data
}
