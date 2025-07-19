import { memo, useState, useEffect } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { getData } from '@/services/api.service'
import { PlusIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Main } from '@/components/layout/dashboard/main'
import { columns } from './components/columns'
import { DataTable } from './components/data-table'
import { Donation } from './data/schema'

const Donate = memo(() => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [donations, setDonations] = useState<Donation[]>([])
  const [donationSummary, setDonationSummary] = useState({
    totalDonations: 0,
    recurringDonations: 0,
    oneTimeDonations: 0,
  })

  useEffect(() => {
    const fetchDonations = async () => {
      setLoading(true)
      setError(null)
      try {
        // Fetch donations for the current user using the API client
        const data = await getData<{
          donations: Donation[]
          summary: {
            totalDonations: number
            recurringDonations: number
            oneTimeDonations: number
          }
        }>('/donations/user')

        setDonations(data.data.donations || [])

        // Use the summary data from the API response
        if (data.data.summary) {
          setDonationSummary({
            totalDonations: data.data.summary.totalDonations,
            recurringDonations: data.data.summary.recurringDonations,
            oneTimeDonations: data.data.summary.oneTimeDonations,
          })
        }
      } catch (_error) {
        setError('Failed to load donation data. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchDonations()
  }, [])

  return (
    <Main>
      <div className='mb-6 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center'>
        <div className='w-full'>
          <div className='mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center'>
            <div>
              <h1 className='text-2xl font-bold'>Donor Dashboard</h1>
              <p className='text-muted-foreground'>
                Support our political party by viewing your donation history and
                contributing more.
              </p>
            </div>
            <Button
              variant='outline'
              disabled
              onClick={() => navigate({ to: '/dashboard/donate/add-donation' })}
            >
              <PlusIcon className='mr-2 h-4 w-4' />
              Make a Donation
            </Button>
          </div>

          {/* Donation Summary */}
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
            <Card>
              <CardHeader>
                <CardTitle>Total Donations</CardTitle>
              </CardHeader>
              <CardContent className='flex items-center justify-between'>
                <div className='text-4xl font-bold'>
                  Rs {donationSummary.totalDonations.toLocaleString()}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Recurring Donations</CardTitle>
              </CardHeader>
              <CardContent className='flex items-center justify-between'>
                <div className='text-4xl font-bold'>
                  Rs {donationSummary.recurringDonations.toLocaleString()}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>One-Time Donations</CardTitle>
              </CardHeader>
              <CardContent className='flex items-center justify-between'>
                <div className='text-4xl font-bold'>
                  Rs {donationSummary.oneTimeDonations.toLocaleString()}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Donation History */}
          <div className='mt-8'>
            <h2 className='mb-4 text-xl font-bold'>Donation History</h2>
            <Card>
              <CardContent className='p-6'>
                {loading ? (
                  <div className='space-y-4'>
                    <div className='flex items-center justify-between'>
                      <Skeleton className='h-8 w-[250px]' />
                      <Skeleton className='h-8 w-[100px]' />
                    </div>
                    <div className='h-[300px] overflow-hidden'>
                      {Array.from({ length: 5 }).map((_, index) => (
                        <div
                          key={index}
                          className='mb-4 flex items-center justify-between'
                        >
                          <Skeleton className='h-12 w-[200px]' />
                          <Skeleton className='h-12 w-[150px]' />
                          <Skeleton className='h-12 w-[100px]' />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : error ? (
                  <div className='text-center text-red-500'>{error}</div>
                ) : donations.length === 0 ? (
                  <div className='text-center text-muted-foreground'>
                    No donation history found.
                  </div>
                ) : (
                  <DataTable columns={columns} data={donations} />
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Main>
  )
})

export default Donate
