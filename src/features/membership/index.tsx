'use client'

import { useState, useEffect, useRef } from 'react'
import { AppDispatch, RootState } from '@/store/store'
import { fetchMembershipData } from '@/store/thunks'
import { motion } from 'framer-motion'
import {
  Calendar,
  DollarSign,
  Clock,
  FileText,
  Shield,
  MapPin,
  Gift,
  FileImage,
  FileText as FilePdf,
  Edit,
} from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { cn } from '@/lib/utils'
import { useToast } from '@/hooks/use-toast'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { Main } from '@/components/layout/dashboard/main'

// --- Enums & Style Definitions ---
const MembershipStatus = {
  ACTIVE: 'ACTIVE',
  PRIMARY: 'PRIMARY',
  PENDING: 'PENDING',
  CANCELLED: 'CANCELLED',
}

const cardStyles = {
  [MembershipStatus.ACTIVE]: {
    gradient: 'from-purple-400 to-purple-500',
    border: 'border-purple-200 dark:border-purple-800/50',
    color: 'text-purple-500',
  },
  [MembershipStatus.PRIMARY]: {
    gradient: 'from-blue-400 to-blue-500',
    border: 'border-blue-200 dark:border-blue-800/50',
    color: 'text-blue-500',
  },
  [MembershipStatus.PENDING]: {
    gradient: 'from-orange-400 to-orange-500',
    border: 'border-orange-200 dark:border-orange-800/50',
    color: 'text-orange-500',
  },
  [MembershipStatus.CANCELLED]: {
    gradient: 'from-red-400 to-red-500',
    border: 'border-red-200 dark:border-red-800/50',
    color: 'text-red-500',
  },
}

const bppLogo = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNNiAzaDZ2NmgtNnoiLz48cGF0aCBkPSJNNiAxNWg2djZoLTZ6Ii8+PHBhdGggZD0iTTE1IDE1aDZ2NmgtNnoiLz48cGF0aCBkPSJNMTUgM2g2djZoLTZ6Ii8+PC9zdmc+`

// --- Membership Card Component ---
const MembershipCardVisual = ({
  user,
  membership,
  layout,
}: {
  user: {
    name: string
    role: string
    profilePicture: string
    location: string
    referralCode: string
    phone: string
    email: string
    occupation: string
  }
  membership: {
    id: string
    number: string
    currentMembershipType: string
    membershipFee: number
    paymentStatus: string
    paymentFrequency: string
    startDate: string
    membershipActiveTo: string
    nextBillingDate: string
    nextBillingAmount: number
  }
  layout: 'portrait' | 'landscape'
}) => {
  const cardStyle =
    cardStyles[membership.currentMembershipType] ||
    cardStyles[MembershipStatus.PENDING]
  const qrData = `https://www.bppindia.com/membership/details/${membership.id}`

  if (layout === 'landscape') {
    return (
      <motion.div
        layoutId='membershipCard'
        className={cn(
          'w-full overflow-hidden rounded-2xl border bg-card text-card-foreground shadow-lg',
          cardStyle.border
        )}
      >
        <div
          className={cn('h-2 w-full bg-gradient-to-r', cardStyle.gradient)}
        />
        <div className='flex flex-col sm:flex-row'>
          <div className='relative w-full space-y-2 p-3 sm:w-2/3 sm:space-y-3 sm:p-4'>
            <div
              className='absolute inset-0 bg-contain bg-center bg-no-repeat opacity-[0.03]'
              style={{ backgroundImage: `url(${bppLogo})` }}
            />
            <div className='flex items-start justify-between'>
              <p className='text-xs font-semibold sm:text-sm'>{user.role}</p>
              <Shield
                className={cn('h-4 w-4 sm:h-5 sm:w-5', cardStyle.color)}
              />
            </div>
            <div className='flex items-center gap-2 sm:gap-4'>
              <Avatar className='h-12 w-12 shrink-0 border-2 border-background sm:h-16 sm:w-16'>
                <AvatarImage src={user.profilePicture} />
                <AvatarFallback className='text-sm sm:text-base'>
                  {user.name
                    .split(' ')
                    .map((n: string) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className='text-sm font-bold sm:text-lg'>{user.name}</p>
                <p className='text-xs text-muted-foreground'>
                  {membership.number}
                </p>
              </div>
            </div>
            <Separator />
            <div className='grid grid-cols-1 gap-1 text-xs sm:grid-cols-2 sm:gap-2'>
              <div className='flex items-center gap-1 sm:gap-2'>
                <MapPin className='h-3 w-3 text-muted-foreground sm:h-3.5 sm:w-3.5' />
                <span className='truncate'>{user.location}</span>
              </div>
              <div className='flex items-center gap-1 sm:gap-2'>
                <Gift className='h-3 w-3 text-muted-foreground sm:h-3.5 sm:w-3.5' />
                <span>{user.referralCode}</span>
              </div>
            </div>
          </div>
          <div className='flex w-full flex-col items-center justify-center border-t bg-muted/50 p-3 sm:w-1/3 sm:border-l sm:border-t-0 sm:p-4'>
            <div className='rounded-md bg-white p-1 shadow-md sm:p-1.5'>
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=${encodeURIComponent(qrData)}`}
                alt='QR Code'
                className='h-16 w-16 sm:h-20 sm:w-20'
              />
            </div>
            <p className='mt-1 text-center text-xs text-muted-foreground sm:mt-2'>
              Scan for verification
            </p>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      layoutId='membershipCard'
      className={cn(
        'w-full overflow-hidden rounded-2xl border bg-card text-card-foreground shadow-lg',
        cardStyle.border
      )}
    >
      <div className={cn('h-2 w-full bg-gradient-to-r', cardStyle.gradient)} />
      <div className='relative space-y-2 p-3 sm:space-y-3 sm:p-4'>
        <div
          className='absolute inset-0 bg-contain bg-center bg-no-repeat opacity-[0.03]'
          style={{ backgroundImage: `url(${bppLogo})` }}
        />
        <div className='flex items-start justify-between'>
          <p className='text-xs font-semibold sm:text-sm'>{user.role}</p>
          <Shield className={cn('h-4 w-4 sm:h-5 sm:w-5', cardStyle.color)} />
        </div>
        <div className='flex flex-col items-center text-center'>
          <Avatar className='mb-2 h-16 w-16 shrink-0 border-2 border-background sm:h-20 sm:w-20'>
            <AvatarImage src={user.profilePicture} />
            <AvatarFallback className='text-lg sm:text-2xl'>
              {user.name
                .split(' ')
                .map((n: string) => n[0])
                .join('')}
            </AvatarFallback>
          </Avatar>
          <p className='text-sm font-bold sm:text-lg'>{user.name}</p>
          <p className='text-xs text-muted-foreground'>{membership.number}</p>
        </div>
        <div className='mx-auto h-24 w-24 rounded-md bg-white p-1 shadow-md sm:h-32 sm:w-32 sm:p-1.5'>
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(qrData)}`}
            alt='QR Code'
            className='h-full w-full'
          />
        </div>
        <p className='text-center text-xs text-muted-foreground'>
          Scan for verification
        </p>
        <Separator />
        <div className='grid grid-cols-1 gap-1 text-xs sm:grid-cols-2 sm:gap-2'>
          <div className='flex items-center gap-1 sm:gap-2'>
            <MapPin className='h-3 w-3 text-muted-foreground sm:h-3.5 sm:w-3.5' />
            <span className='truncate'>{user.location}</span>
          </div>
          <div className='flex items-center gap-1 sm:gap-2'>
            <Gift className='h-3 w-3 text-muted-foreground sm:h-3.5 sm:w-3.5' />
            <span>{user.referralCode}</span>
          </div>
        </div>
        <div className='text-center'>
          <p
            className='font-mono text-lg tracking-widest sm:text-2xl'
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            {user.name}
          </p>
          <p className='-mt-1 text-xs text-muted-foreground'>Signature</p>
        </div>
      </div>
    </motion.div>
  )
}

export default function Membership() {
  const { toast } = useToast()
  const dispatch: AppDispatch = useDispatch()
  const {
    data: membershipData,
    isLoading,
    error,
  } = useSelector((state: RootState) => state.membership)
  const [cardLayout, setCardLayout] = useState<'portrait' | 'landscape'>(
    'portrait'
  )
  const [downloading, setDownloading] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  // Fetch membership data on component mount
  useEffect(() => {
    dispatch(fetchMembershipData())
  }, [dispatch])

  // Handle upgrade membership button click
  const handleUpgradeMembershipClick = () => {
    toast({
      title: 'Upgrade Membership',
      description: 'Upgrade membership functionality will be implemented here.',
    })
  }

  // Download card as image
  const handleDownloadImage = async () => {
    if (!cardRef.current || !membershipData?.user) return

    setDownloading(true)
    try {
      // Dynamically import html2canvas
      const html2canvas = (await import('html2canvas')).default

      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
        allowTaint: true,
      })

      const link = document.createElement('a')
      link.download = `membership-card-${membershipData.user.name.replace(/\s+/g, '-').toLowerCase()}.png`
      link.href = canvas.toDataURL()
      link.click()

      toast({
        title: 'Success',
        description: 'Membership card downloaded as image.',
      })
    } catch (_error) {
      toast({
        title: 'Error',
        description: 'Failed to download membership card as image.',
        variant: 'destructive',
      })
    } finally {
      setDownloading(false)
    }
  }

  // Download card as PDF
  const handleDownloadPDF = async () => {
    if (!cardRef.current || !membershipData?.user) return

    setDownloading(true)
    try {
      // Dynamically import required libraries
      const html2canvas = (await import('html2canvas')).default
      const jsPDF = (await import('jspdf')).default

      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
        allowTaint: true,
      })

      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF({
        orientation: cardLayout === 'landscape' ? 'landscape' : 'portrait',
        unit: 'mm',
        format: cardLayout === 'landscape' ? 'a5' : 'a6',
      })

      const imgWidth = pdf.internal.pageSize.getWidth()
      const imgHeight = (canvas.height * imgWidth) / canvas.width

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight)
      pdf.save(
        `membership-card-${membershipData.user.name.replace(/\s+/g, '-').toLowerCase()}.pdf`
      )

      toast({
        title: 'Success',
        description: 'Membership card downloaded as PDF.',
      })
    } catch (_error) {
      toast({
        title: 'Error',
        description: 'Failed to download membership card as PDF.',
        variant: 'destructive',
      })
    } finally {
      setDownloading(false)
    }
  }

  if (isLoading) {
    return (
      <Main>
        <div className='mx-auto w-full space-y-4 px-4 sm:space-y-6 sm:px-6'>
          <Skeleton className='h-6 w-48 sm:h-8 sm:w-64' />
          <div className='space-y-4 sm:space-y-6'>
            <Skeleton className='h-24 w-full sm:h-32' />
            <Skeleton className='h-36 w-full sm:h-48' />
            <Skeleton className='h-36 w-full sm:h-48' />
          </div>
        </div>
      </Main>
    )
  }

  if (error || !membershipData) {
    return (
      <Main>
        <div className='mx-auto w-full space-y-4 px-4 sm:space-y-6 sm:px-6'>
          <div className='text-center'>
            <p className='text-destructive'>
              Failed to load membership data. Please try again later.
            </p>
            <Button
              variant='outline'
              className='mt-4'
              onClick={() => dispatch(fetchMembershipData())}
            >
              Try Again
            </Button>
          </div>
        </div>
      </Main>
    )
  }

  const { user, membership, history } = membershipData

  // Add null checks
  if (!user || !membership) {
    return (
      <Main>
        <div className='mx-auto w-full space-y-4 px-4 sm:space-y-6 sm:px-6'>
          <div className='text-center'>
            <p className='text-destructive'>
              Invalid membership data. Please try again later.
            </p>
            <Button
              variant='outline'
              className='mt-4'
              onClick={() => dispatch(fetchMembershipData())}
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
      <div className='mx-auto w-full space-y-3 sm:space-y-3'>
        <div className='space-y-3 sm:space-y-3'>
          {/* First Row - Membership Card and Controls */}
          <div className='space-y-4 sm:space-y-6'>
            {/* Membership Card with Controls */}
            <Card>
              <CardHeader className='pb-4'>
                <CardTitle className='text-lg sm:text-xl'>
                  Membership Card
                </CardTitle>
                <CardDescription className='text-sm'>
                  Your official membership card and member details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-12'>
                  {/* Left Side - Membership Card */}
                  <div className='lg:col-span-4'>
                    <div ref={cardRef} className='flex justify-center'>
                      <div className='w-full max-w-sm'>
                        <MembershipCardVisual
                          user={user}
                          membership={membership}
                          layout={cardLayout}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Right Side - Controls and Member Details */}
                  <div className='space-y-4 sm:space-y-6 lg:col-span-8'>
                    {/* Layout Controls */}
                    <div className='space-y-2 sm:space-y-3'>
                      <h4 className='text-sm font-medium'>Card Layout</h4>
                      <div className='flex items-center gap-2'>
                        <Button
                          variant={
                            cardLayout === 'portrait' ? 'secondary' : 'ghost'
                          }
                          size='sm'
                          onClick={() => setCardLayout('portrait')}
                          className='text-xs sm:text-sm'
                        >
                          Portrait
                        </Button>
                        <Button
                          variant={
                            cardLayout === 'landscape' ? 'secondary' : 'ghost'
                          }
                          size='sm'
                          onClick={() => setCardLayout('landscape')}
                          className='text-xs sm:text-sm'
                        >
                          Landscape
                        </Button>
                      </div>
                    </div>

                    {/* Download Options */}
                    <div className='space-y-2 sm:space-y-3'>
                      <h4 className='text-sm font-medium'>Download Options</h4>
                      <div className='flex flex-col gap-2 sm:flex-row'>
                        <Button
                          variant='outline'
                          size='sm'
                          onClick={handleDownloadImage}
                          disabled={downloading}
                          className='text-xs sm:text-sm'
                        >
                          <FileImage className='mr-2 h-3 w-3 sm:h-4 sm:w-4' />
                          {downloading ? 'Downloading...' : 'Download Image'}
                        </Button>
                        <Button
                          variant='outline'
                          size='sm'
                          onClick={handleDownloadPDF}
                          disabled={downloading}
                          className='text-xs sm:text-sm'
                        >
                          <FilePdf className='mr-2 h-3 w-3 sm:h-4 sm:w-4' />
                          {downloading ? 'Downloading...' : 'Download PDF'}
                        </Button>
                      </div>
                    </div>
                    <Separator />
                    {/* Member Details */}
                    <div className='space-y-2 sm:space-y-3'>
                      <h4 className='text-sm font-medium'>Member Details</h4>
                      <div className='space-y-2 text-xs sm:text-sm'>
                        <div className='flex flex-col gap-1 sm:flex-row sm:justify-between'>
                          <span className='text-muted-foreground'>Name:</span>
                          <span className='font-medium'>{user.name}</span>
                        </div>
                        <div className='flex flex-col gap-1 sm:flex-row sm:justify-between'>
                          <span className='text-muted-foreground'>Phone:</span>
                          <span className='font-medium'>{user.phone}</span>
                        </div>
                        <div className='flex flex-col gap-1 sm:flex-row sm:justify-between'>
                          <span className='text-muted-foreground'>Email:</span>
                          <span className='break-all font-medium'>
                            {user.email}
                          </span>
                        </div>
                        <div className='flex flex-col gap-1 sm:flex-row sm:justify-between'>
                          <span className='text-muted-foreground'>
                            Occupation:
                          </span>
                          <span className='font-medium'>{user.occupation}</span>
                        </div>
                        <div className='flex flex-col gap-1 sm:flex-row sm:justify-between'>
                          <span className='text-muted-foreground'>
                            Location:
                          </span>
                          <span className='font-medium'>{user.location}</span>
                        </div>
                        <div className='flex flex-col gap-1 sm:flex-row sm:justify-between'>
                          <span className='text-muted-foreground'>
                            Membership No:
                          </span>
                          <span className='font-medium'>
                            {membership.number}
                          </span>
                        </div>
                        <div className='flex flex-col gap-1 sm:flex-row sm:justify-between'>
                          <span className='text-muted-foreground'>Status:</span>
                          <Badge className='w-fit bg-green-100 text-xs text-green-800'>
                            APPROVED
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Second Row - Membership Details (full width) */}
          <Card>
            <CardHeader>
              <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
                <div>
                  <CardTitle className='text-lg sm:text-xl'>
                    Membership Details
                  </CardTitle>
                  <CardDescription className='text-sm'>
                    Current membership information and billing details
                  </CardDescription>
                </div>
                <div className='flex flex-col flex-wrap gap-2 sm:flex-row'>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={handleUpgradeMembershipClick}
                    className='text-xs sm:text-sm'
                  >
                    <Edit className='mr-1 h-3 w-3 sm:h-4 sm:w-4' />
                    Upgrade Membership
                  </Button>
                  <Button
                    variant='outline'
                    size='sm'
                    className='text-xs sm:text-sm'
                  >
                    <FileText className='mr-1 h-3 w-3 sm:h-4 sm:w-4' />
                    Raise Invoice
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className='space-y-4 sm:space-y-6'>
              {/* Membership Basic Information */}
              <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3'>
                <div className='space-y-2'>
                  <div className='flex items-center gap-2'>
                    <Badge className='bg-blue-100 text-xs text-blue-800'>
                      {membership.currentMembershipType}
                    </Badge>
                  </div>
                  <p className='text-xs text-muted-foreground sm:text-sm'>
                    Current Membership Type
                  </p>
                </div>

                <div className='space-y-2'>
                  <div className='flex items-center gap-2'>
                    <span className='text-sm font-medium sm:text-base'>
                      {membership.number}
                    </span>
                  </div>
                  <p className='text-xs text-muted-foreground sm:text-sm'>
                    Membership Number
                  </p>
                </div>

                <div className='space-y-2'>
                  <div className='flex items-center gap-2'>
                    <Badge className='bg-green-100 text-xs text-green-800'>
                      APPROVED
                    </Badge>
                  </div>
                  <p className='text-xs text-muted-foreground sm:text-sm'>
                    Status
                  </p>
                </div>
              </div>

              <Separator />

              {/* Payment Information */}
              <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3'>
                <div className='space-y-2'>
                  <div className='flex items-center gap-2'>
                    <Badge
                      variant='outline'
                      className='border-orange-300 text-xs text-orange-600'
                    >
                      {membership.paymentStatus}
                    </Badge>
                  </div>
                  <p className='text-xs text-muted-foreground sm:text-sm'>
                    Payment Status
                  </p>
                </div>

                <div className='space-y-2'>
                  <div className='flex items-center gap-2'>
                    <DollarSign className='h-3 w-3 text-muted-foreground sm:h-4 sm:w-4' />
                    <span className='text-sm font-medium sm:text-base'>
                      ₹{membership.membershipFee}
                    </span>
                  </div>
                  <p className='text-xs text-muted-foreground sm:text-sm'>
                    Amount
                  </p>
                </div>

                <div className='space-y-2'>
                  <div className='flex items-center gap-2'>
                    <Clock className='h-3 w-3 text-muted-foreground sm:h-4 sm:w-4' />
                    <span className='text-sm font-medium sm:text-base'>
                      {membership.paymentFrequency}
                    </span>
                  </div>
                  <p className='text-xs text-muted-foreground sm:text-sm'>
                    Payment Frequency
                  </p>
                </div>
              </div>

              <Separator />

              {/* Validity Information */}
              <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6'>
                <div className='space-y-2'>
                  <div className='flex items-center gap-2'>
                    <Calendar className='h-3 w-3 text-muted-foreground sm:h-4 sm:w-4' />
                    <span className='text-sm font-medium sm:text-base'>
                      {membership.startDate}
                    </span>
                  </div>
                  <p className='text-xs text-muted-foreground sm:text-sm'>
                    Start Date
                  </p>
                </div>

                <div className='space-y-2'>
                  <div className='flex items-center gap-2'>
                    <Calendar className='h-3 w-3 text-muted-foreground sm:h-4 sm:w-4' />
                    <span className='text-sm font-medium sm:text-base'>
                      {membership.membershipActiveTo}
                    </span>
                  </div>
                  <p className='text-xs text-muted-foreground sm:text-sm'>
                    Valid Until
                  </p>
                </div>
              </div>

              <Separator />

              {/* Billing Information */}
              <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3'>
                <div className='space-y-2'>
                  <div className='flex items-center gap-2'>
                    <Calendar className='h-3 w-3 text-muted-foreground sm:h-4 sm:w-4' />
                    <span className='text-sm font-medium sm:text-base'>
                      {membership.nextBillingDate}
                    </span>
                  </div>
                  <p className='text-xs text-muted-foreground sm:text-sm'>
                    Next Billing Date
                  </p>
                </div>

                <div className='space-y-2'>
                  <div className='flex items-center gap-2'>
                    <DollarSign className='h-3 w-3 text-muted-foreground sm:h-4 sm:w-4' />
                    <span className='text-sm font-medium sm:text-base'>
                      ₹{membership.nextBillingAmount}
                    </span>
                  </div>
                  <p className='text-xs text-muted-foreground sm:text-sm'>
                    Next Billing Amount
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Membership History */}
        <Card>
          <CardHeader>
            <CardTitle className='text-lg sm:text-xl'>
              Membership History
            </CardTitle>
            <CardDescription className='text-sm'>
              Complete history of membership changes and transactions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <MembershipHistoryTable membershipHistoryData={history} />
          </CardContent>
        </Card>
      </div>
    </Main>
  )
}

// Membership History Table Component
function getStatusBadge(status: string) {
  switch (status) {
    case 'Active':
      return (
        <Badge className='bg-green-100 text-xs text-green-800 hover:bg-green-100'>
          Active
        </Badge>
      )
    case 'Expired':
      return (
        <Badge
          variant='secondary'
          className='bg-gray-100 text-xs text-gray-800'
        >
          Expired
        </Badge>
      )
    default:
      return (
        <Badge variant='outline' className='text-xs'>
          {status}
        </Badge>
      )
  }
}

function getPaymentStatusBadge(status: string) {
  switch (status) {
    case 'Paid':
      return (
        <Badge className='bg-green-100 text-xs text-green-800 hover:bg-green-100'>
          Paid
        </Badge>
      )
    case 'Pending':
      return (
        <Badge className='bg-orange-100 text-xs text-orange-800 hover:bg-orange-100'>
          Pending
        </Badge>
      )
    case 'Failed':
      return (
        <Badge className='bg-red-100 text-xs text-red-800 hover:bg-red-100'>
          Failed
        </Badge>
      )
    case 'Cancelled':
      return (
        <Badge className='bg-gray-100 text-xs text-gray-800 hover:bg-gray-100'>
          Cancelled
        </Badge>
      )
    default:
      return (
        <Badge variant='outline' className='text-xs'>
          {status}
        </Badge>
      )
  }
}

function formatDate(dateString: string | null) {
  if (!dateString) return '-'
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

interface MembershipHistoryTableProps {
  membershipHistoryData: {
    id: string
    membershipType: string
    subscriptionStatus: string
    amount: number
    paymentStatus: string
    startDate: string
    paidThroughDate: string | null
    nextBillingDate: string | null
  }[]
}

function MembershipHistoryTable({
  membershipHistoryData,
}: MembershipHistoryTableProps) {
  // Sort by start date (most recent first)
  const sortedData = [...membershipHistoryData].sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  )

  return (
    <div className='space-y-4'>
      <div className='overflow-x-auto rounded-md border'>
        <table className='w-full min-w-full'>
          <thead>
            <tr className='border-b bg-muted/50'>
              <th className='p-2 text-left text-xs font-medium sm:p-4 sm:text-sm'>
                Membership Type
              </th>
              <th className='p-2 text-left text-xs font-medium sm:p-4 sm:text-sm'>
                Subscription Status
              </th>
              <th className='p-2 text-left text-xs font-medium sm:p-4 sm:text-sm'>
                Amount
              </th>
              <th className='p-2 text-left text-xs font-medium sm:p-4 sm:text-sm'>
                Payment Status
              </th>
              <th className='p-2 text-left text-xs font-medium sm:p-4 sm:text-sm'>
                Start Date
              </th>
              <th className='p-2 text-left text-xs font-medium sm:p-4 sm:text-sm'>
                Paid Through Date
              </th>
              <th className='p-2 text-left text-xs font-medium sm:p-4 sm:text-sm'>
                Next Billing Date
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className='py-8 text-center text-sm text-muted-foreground'
                >
                  No membership history found.
                </td>
              </tr>
            ) : (
              sortedData.map((membership) => (
                <tr key={membership.id} className='border-b'>
                  <td className='p-2 text-xs font-medium sm:p-4 sm:text-sm'>
                    {membership.membershipType}
                  </td>
                  <td className='p-2 sm:p-4'>
                    {getStatusBadge(membership.subscriptionStatus)}
                  </td>
                  <td className='p-2 text-xs text-muted-foreground sm:p-4 sm:text-sm'>
                    ₹{membership.amount}
                  </td>
                  <td className='p-2 sm:p-4'>
                    {getPaymentStatusBadge(membership.paymentStatus)}
                  </td>
                  <td className='p-2 text-xs sm:p-4 sm:text-sm'>
                    {formatDate(membership.startDate)}
                  </td>
                  <td className='p-2 text-xs sm:p-4 sm:text-sm'>
                    {formatDate(membership.paidThroughDate)}
                  </td>
                  <td className='p-2 text-xs sm:p-4 sm:text-sm'>
                    {formatDate(membership.nextBillingDate)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
