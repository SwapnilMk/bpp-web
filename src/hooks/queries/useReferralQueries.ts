import { useQuery } from '@tanstack/react-query'
import { getData } from '@/api/apiClient'

const fetchReferrals = async () => {
  const response = await getData('/referrals/list')
  return response
}

export const useReferralsQuery = () => {
  return useQuery({
    queryKey: ['referrals', 'list'],
    queryFn: fetchReferrals,
  })
}
