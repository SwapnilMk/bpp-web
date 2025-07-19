import { useQuery } from '@tanstack/react-query'
import { getData } from '@/api/apiClient'

const fetchWalletTransactions = async () => {
  const response = await getData('/wallet/transactions')
  return response
}

export const useWalletTransactionsQuery = () => {
  return useQuery({
    queryKey: ['wallet', 'transactions'],
    queryFn: fetchWalletTransactions,
  })
}
