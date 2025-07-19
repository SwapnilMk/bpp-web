import { useQuery } from '@tanstack/react-query'
import { getData } from '@/api/apiClient'

const fetchMembershipDetails = async () => {
  const response = await getData('/membership/details')
  return response
}

export const useMembershipDetailsQuery = () => {
  return useQuery({
    queryKey: ['membership', 'details'],
    queryFn: fetchMembershipDetails,
  })
}
