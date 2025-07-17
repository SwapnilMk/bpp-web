import { useEffect, useState } from 'react'
import { CopyIcon, Share2Icon } from 'lucide-react'
import { toast } from 'sonner'
import { getData } from '@/api/apiClient'
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
import { NotificationHeaderMenu } from '@/components/layout/dashboard/notification'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { columns } from './components/columns'
import { DataTable } from './components/data-table'
import { ReferralSkeleton } from './components/skeleton'
import type { Referral, ReferralProfile } from './data/schema'

export default function Referral() {
  const [referralLink, setReferralLink] = useState('')
  const [referralProfile, setReferralProfile] =
    useState<ReferralProfile | null>(null)
  const [referrals, setReferrals] = useState<Referral[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch referral data from API
  useEffect(() => {
    const fetchReferralData = async () => {
      try {
        setLoading(true)
        setError(null)

        // Fetch referral data from the API
        const data = await getData<{
          profile: ReferralProfile
          referrals: Referral[]
        }>('/referral/user')

        setReferralProfile(data.profile)
        setReferrals(data.referrals)
        setReferralLink(data.profile.referralLink)
      } catch (_err) {
        setError('Failed to load referral data. Please try again later.')
        toast.error('Failed to load referral data')
      } finally {
        setLoading(false)
      }
    }

    fetchReferralData()
  }, [])

  const handleCopyCode = () => {
    if (referralProfile) {
      navigator.clipboard.writeText(referralProfile.referralCode)
      toast.success('Referral code copied to clipboard!')
    }
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink)
    toast.success('Referral link copied to clipboard!')
  }

  const handleShare = async () => {
    try {
      await navigator.share({
        title: 'Join BPP India',
        text: 'Join BPP India using my referral code!',
        url: referralLink,
      })
    } catch (_) {
      // Fallback for browsers that don't support Web Share API
      handleCopyLink()
    }
  }

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
          <ReferralSkeleton />
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
          <NotificationHeaderMenu />
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <div className='space-y-8'>
          {/* Stats Grid */}
          <div className='grid gap-4 md:grid-cols-3'>
            {/* Total Referrals */}
            <Card>
              <CardHeader className='pb-2'>
                <CardTitle className='text-lg'>Total Referrals</CardTitle>
                <CardDescription>All-time referrals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className='text-3xl font-bold'>
                  {referralProfile?.totalReferrals || 0}
                </div>
              </CardContent>
            </Card>

            {/* Approved Referrals */}
            <Card>
              <CardHeader className='pb-2'>
                <CardTitle className='text-lg'>Approved Referrals</CardTitle>
                <CardDescription>Successfully joined members</CardDescription>
              </CardHeader>
              <CardContent>
                <div className='text-3xl font-bold'>
                  {referralProfile?.successfulReferrals || 0}
                </div>
              </CardContent>
            </Card>

            {/* Pending Referrals */}
            <Card>
              <CardHeader className='pb-2'>
                <CardTitle className='text-lg'>Pending Referrals</CardTitle>
                <CardDescription>Awaiting approval</CardDescription>
              </CardHeader>
              <CardContent>
                <div className='text-3xl font-bold'>
                  {referralProfile?.pendingReferrals || 0}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Referral Code Section */}
          <Card>
            <CardHeader>
              <CardTitle>Your Referral Code</CardTitle>
              <CardDescription>
                Share this code with your friends to invite them to join BPP
                India
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='flex flex-col gap-4'>
                <div className='flex items-center gap-2'>
                  <div className='flex-1 rounded-md bg-muted p-3 font-mono'>
                    {referralProfile?.referralCode || 'Loading...'}
                  </div>
                  <Button
                    variant='outline'
                    size='icon'
                    onClick={handleCopyCode}
                  >
                    <CopyIcon className='h-4 w-4' />
                  </Button>
                </div>
                <div className='flex items-center gap-2'>
                  <div className='flex-1 break-all rounded-md bg-muted p-3 font-mono text-sm'>
                    {referralLink || 'Loading...'}
                  </div>
                  <Button
                    variant='outline'
                    size='icon'
                    onClick={handleCopyLink}
                  >
                    <CopyIcon className='h-4 w-4' />
                  </Button>
                  <Button variant='outline' size='icon' onClick={handleShare}>
                    <Share2Icon className='h-4 w-4' />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Referral History */}
          <Card>
            <CardHeader>
              <CardTitle>Referral History</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable columns={columns} data={referrals} />
            </CardContent>
          </Card>
        </div>
      </Main>
    </>
  )
}
