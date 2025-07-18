import { memo, useEffect, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { getData } from '@/services/apiService'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Main } from '@/components/layout/dashboard/main'
import { columns } from './components/columns'
import { DataTable } from './components/data-table'
import { WalletSkeleton } from './components/skeleton'
import { WalletCard } from './components/wallet-card'
import type { Wallet, Transaction } from './data/schema'

const WalletPage = memo(() => {
  const [wallet, setWallet] = useState<Wallet | null>(null)
  const [membershipNo, setMembershipNo] = useState<string>('')
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>(
    []
  )
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch wallet data from API
  useEffect(() => {
    const fetchWalletData = async () => {
      try {
        setLoading(true)
        setError(null)

        // Fetch wallet data from the API
        const response = await getData<{
          success: boolean
          data: {
            wallet: Wallet
            membershipNo: string
            recentTransactions: Transaction[]
          }
        }>('/wallet/user')

        if (response.data.success && response.data.data) {
          setWallet(response.data.data.wallet)
          setMembershipNo(response.data.data.membershipNo)
          setRecentTransactions(response.data.data.recentTransactions)
        } else {
          throw new Error('Invalid response format')
        }
      } catch (_err) {
        setError('Failed to load wallet data. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchWalletData()
  }, [])

  // Show loading state
  if (loading) {
    return (
      <Main>
        <WalletSkeleton />
      </Main>
    )
  }

  // Show error state
  if (error) {
    return (
      <Main>
        <div className='flex h-full items-center justify-center'>
          <div className='text-center'>
            <p className='text-destructive'>{error}</p>
            <Button
              variant='outline'
              className='mt-4'
              onClick={() => window.location.reload()}
            >
              Try Again
            </Button>
          </div>
        </div>
      </Main>
    )
  }

  return (
    <Main>
      <div className='space-y-8'>
        {/* Wallet Card */}
        {wallet && <WalletCard wallet={wallet} membershipNo={membershipNo} />}

        {/* Recent Transactions */}
        <Card>
          <CardHeader className='flex flex-row items-center justify-between'>
            <div>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Your recent wallet transactions</CardDescription>
            </div>
            <Link
              to={'/dashboard/wallet/transactions'}
              className='text-primary hover:underline'
            >
              View All Transactions
            </Link>
          </CardHeader>
          <CardContent>
            <DataTable columns={columns} data={recentTransactions || []} />
          </CardContent>
        </Card>
      </div>
    </Main>
  )
})

export default WalletPage
