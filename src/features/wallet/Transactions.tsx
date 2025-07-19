import { useEffect, useState } from 'react'
import { getData } from '@/services/apiService'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Header } from '@/components/layout/dashboard/header'
import { Main } from '@/components/layout/dashboard/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { columns } from './components/columns'
import { DataTable } from './components/data-table'
import { WalletSkeleton } from './components/skeleton'
import type { Transaction } from './data/schema'

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [summary, setSummary] = useState<{
    totalCredits: number
    totalDebits: number
    completedTransactions: number
    pendingTransactions: number
    failedTransactions: number
  } | null>(null)

  // Fetch all transactions from API
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true)
        setError(null)

        // Fetch all transactions from the API
        const response = await getData<{
          success: boolean
          data: {
            transactions: Transaction[]
            summary: {
              totalCredits: number
              totalDebits: number
              completedTransactions: number
              pendingTransactions: number
              failedTransactions: number
            }
            pagination: {
              total: number
              page: number
              limit: number
              totalPages: number
            }
          }
        }>('/wallet/transactions')

        if (response.data.success && response.data.data) {
          setTransactions(response.data.data.transactions)
          setSummary(response.data.data.summary)
        } else {
          throw new Error('Invalid response format')
        }
      } catch (_err) {
        setError('Failed to load transactions. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchTransactions()
  }, [])

  // Show loading state
  if (loading) {
    return (
      <>
        <Header fixed>
          <Search />
          <div className='ml-auto flex items-center space-x-4'>
            <ThemeSwitch />
            <ProfileDropdown />
          </div>
        </Header>

        <Main>
          <WalletSkeleton />
        </Main>
      </>
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
    <>
      <Header fixed>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <div className='space-y-8'>
          {/* Transaction Summary */}
          {summary && (
            <Card>
              <CardHeader>
                <CardTitle>Transaction Summary</CardTitle>
                <CardDescription>
                  Overview of your wallet transactions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
                  <div className='rounded-lg bg-muted p-4'>
                    <p className='text-sm font-medium'>Total Credits</p>
                    <p className='text-2xl font-bold text-green-600'>
                      ₹{summary.totalCredits}
                    </p>
                  </div>
                  <div className='rounded-lg bg-muted p-4'>
                    <p className='text-sm font-medium'>Total Debits</p>
                    <p className='text-2xl font-bold text-red-600'>
                      ₹{summary.totalDebits}
                    </p>
                  </div>
                  <div className='rounded-lg bg-muted p-4'>
                    <p className='text-sm font-medium'>Balance</p>
                    <p className='text-2xl font-bold'>
                      {summary.totalCredits - summary.totalDebits >= 0
                        ? '₹' + (summary.totalCredits - summary.totalDebits)
                        : '-₹' + (summary.totalDebits - summary.totalCredits)}
                    </p>
                  </div>
                </div>
                <div className='mt-4 grid grid-cols-1 gap-4 md:grid-cols-3'>
                  <div className='rounded-lg bg-muted p-4'>
                    <p className='text-sm font-medium'>Completed</p>
                    <p className='text-2xl font-bold text-green-600'>
                      {summary.completedTransactions}
                    </p>
                  </div>
                  <div className='rounded-lg bg-muted p-4'>
                    <p className='text-sm font-medium'>Pending</p>
                    <p className='text-2xl font-bold text-yellow-600'>
                      {summary.pendingTransactions}
                    </p>
                  </div>
                  <div className='rounded-lg bg-muted p-4'>
                    <p className='text-sm font-medium'>Failed</p>
                    <p className='text-2xl font-bold text-red-600'>
                      {summary.failedTransactions}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* All Transactions */}
          <Card>
            <CardHeader>
              <CardTitle>All Transactions</CardTitle>
              <CardDescription>
                View all your wallet transactions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable columns={columns} data={transactions || []} />
            </CardContent>
          </Card>
        </div>
      </Main>
    </>
  )
}
