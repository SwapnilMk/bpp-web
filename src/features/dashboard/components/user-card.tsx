import { memo } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useAppSelector } from '@/store/hooks'
import { DashboardData } from '@/types/api'
import {
  Pencil,
  Phone,
  MapPin,
  Briefcase,
  Users,
  Gift,
  Wallet,
  Star,
  CreditCard,
  Shield,
  CalendarClock,
  Share2,
  ExternalLink,
} from 'lucide-react'
import { toast } from 'sonner'
import bppLogo from '@/assets/logo/bppLogo.webp'
import { cn } from '@/lib/utils'
import { UserRole, UserStatus } from '@/utils/roleAccess'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'

// Extended membership type for points and referral data
type ExtendedMembership = DashboardData['membership'] & {
  points?: number
  pointsToNextTier?: number
  nextTier?: string
}

type CardStyle = {
  bg: string
  border: string
  badgeVariant: 'secondary' | 'outline' | 'default' | 'destructive'
  badgeText: string
  badgeStyle: string
  color: string
  bgColor: string
  gradient: string
}

type UserCardStyles = {
  [UserStatus.PROCESSING]: CardStyle
  [UserStatus.APPROVED]: {
    [UserRole.MEMBER]: CardStyle
    [UserRole.PRIMARY_MEMBER]: CardStyle
    [UserRole.ACTIVE_MEMBER]: CardStyle
  }
}

const userCardStyles: UserCardStyles = {
  [UserStatus.PROCESSING]: {
    bg: 'bg-gray-100 dark:bg-gray-800/50',
    border: 'border-orange-200 dark:border-orange-800/50',
    badgeVariant: 'outline',
    badgeText: 'Verification Pending',
    badgeStyle:
      'bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/50 dark:text-orange-300 dark:border-orange-700/50',
    color: 'text-orange-500',
    bgColor: 'bg-orange-500',
    gradient: 'from-orange-400 to-orange-500',
  },
  [UserStatus.APPROVED]: {
    [UserRole.MEMBER]: {
      bg: 'bg-green-50 dark:bg-green-900/20',
      border: 'border-green-200 dark:border-green-800/50',
      badgeVariant: 'outline',
      badgeText: 'Verified Member',
      badgeStyle:
        'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/50 dark:text-green-300 dark:border-green-700/50',
      color: 'text-green-500',
      bgColor: 'bg-green-500',
      gradient: 'from-green-400 to-green-500',
    },
    [UserRole.PRIMARY_MEMBER]: {
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      border: 'border-blue-200 dark:border-blue-800/50',
      badgeVariant: 'outline',
      badgeText: 'Primary Member',
      badgeStyle:
        'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/50 dark:text-blue-300 dark:border-blue-700/50',
      color: 'text-blue-500',
      bgColor: 'bg-blue-500',
      gradient: 'from-blue-400 to-blue-500',
    },
    [UserRole.ACTIVE_MEMBER]: {
      bg: 'bg-purple-50 dark:bg-purple-900/20',
      border: 'border-purple-200 dark:border-purple-800/50',
      badgeVariant: 'outline',
      badgeText: 'Active Member',
      badgeStyle:
        'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/50 dark:text-purple-300 dark:border-purple-700/50',
      color: 'text-purple-500',
      bgColor: 'bg-purple-500',
      gradient: 'from-purple-400 to-purple-500',
    },
  },
} as const

interface UserCardProps {
  dashboardData: DashboardData
  isLoading: boolean
}

// Helper component for info items with icons
const InfoItem = ({
  icon: Icon,
  label,
  value,
  isLoading,
  onClick,
  isClickable = false,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
  isLoading: boolean
  onClick?: () => void
  isClickable?: boolean
}) => {
  if (isLoading)
    return <Skeleton className='h-8 w-full bg-black/5 dark:bg-white/5' />

  const content = (
    <div className='flex items-start gap-2'>
      <Icon className='mt-0.5 h-4 w-4 flex-shrink-0 text-muted-foreground' />
      <div className='min-w-0 flex-1'>
        <p className='text-xs text-muted-foreground'>{label}</p>
        <p className='truncate text-sm font-medium text-foreground'>{value}</p>
      </div>
      {isClickable && (
        <ExternalLink className='ml-1 h-3 w-3 flex-shrink-0 text-muted-foreground' />
      )}
    </div>
  )

  if (isClickable && onClick) {
    return (
      <button
        onClick={onClick}
        className='-m-1.5 w-full rounded-md p-1.5 text-left transition-colors hover:bg-muted/50'
      >
        {content}
      </button>
    )
  }

  return <div className='p-1.5'>{content}</div>
}

const PointsProgress = ({
  points,
  pointsToNextTier,
  nextTier,
  cardStyle,
  isLoading,
}: {
  points?: number
  pointsToNextTier?: number
  nextTier?: string
  cardStyle: CardStyle
  isLoading: boolean
}) => {
  if (isLoading) return <Skeleton className='h-12 w-full' />
  if (!points || !pointsToNextTier || !nextTier) return null

  const progress = (points / (points + pointsToNextTier)) * 100
  return (
    <div className='space-y-1'>
      <div className='flex items-baseline justify-between'>
        <p className='text-sm font-semibold text-foreground'>
          {points.toLocaleString()}{' '}
          <span className='text-xs font-normal text-muted-foreground'>
            Points
          </span>
        </p>
        <p className='text-xs text-muted-foreground'>
          {pointsToNextTier.toLocaleString()} to {nextTier}
        </p>
      </div>
      <div className='h-1.5 w-full overflow-hidden rounded-full bg-muted'>
        <div
          className={cn(
            'h-full transition-all duration-1000 ease-out',
            cardStyle.bgColor
          )}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}

const ReferralProgress = ({
  userRole,
  currentReferrals,
  cardStyle,
  isLoading,
}: {
  userRole?: string
  currentReferrals?: number
  cardStyle: CardStyle
  isLoading: boolean
}) => {
  if (isLoading) return <Skeleton className='h-12 w-full' />

  let targetReferrals = 0
  let nextTier = ''

  if (userRole === UserRole.PRIMARY_MEMBER) {
    targetReferrals = 10
    nextTier = 'Active Member'
  } else if (userRole === UserRole.ACTIVE_MEMBER) {
    targetReferrals = 250
    nextTier = 'Community Member'
  } else {
    return null // Don't show for regular members
  }

  const progress = Math.min(
    ((currentReferrals || 0) / targetReferrals) * 100,
    100
  )

  return (
    <div className='space-y-1'>
      <div className='flex items-baseline justify-between'>
        <p className='text-sm font-semibold text-foreground'>
          {currentReferrals || 0}{' '}
          <span className='text-xs font-normal text-muted-foreground'>
            Referrals
          </span>
        </p>
        <p className='text-xs text-muted-foreground'>
          <span className='font-semibold text-foreground'>
            {targetReferrals - (currentReferrals || 0)}
          </span>{' '}
          to {nextTier}
        </p>
      </div>
      <div className='h-1.5 w-full overflow-hidden rounded-full bg-muted'>
        <div
          className={cn(
            'h-full transition-all duration-1000 ease-out',
            cardStyle.bgColor
          )}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}

const VisualMembershipCard = ({
  user,
  membership,
  cardStyle,
  isLoading,
}: {
  user?: DashboardData['user']
  membership?: DashboardData['membership']
  cardStyle: CardStyle
  isLoading: boolean
}) => {
  const navigate = useNavigate()

  if (isLoading) return <Skeleton className='h-40 w-full' />
  if (!user || !membership) return null

  return (
    <div
      className={cn(
        'group relative flex h-40 cursor-pointer flex-col justify-between overflow-hidden rounded-xl border-2 p-4 transition-all duration-300 hover:scale-[1.02]',
        cardStyle.border
      )}
      style={{
        background: `linear-gradient(135deg, var(--card), transparent)`,
      }}
      onClick={() => navigate({ to: '/dashboard/membership' })}
    >
      <div className='bg-grid-slate-100 dark:bg-grid-slate-700 absolute inset-0 opacity-5 [mask-image:radial-gradient(at_top,white,transparent_70%)]'></div>

      {/* Hover overlay */}
      <div className='absolute inset-0 flex items-center justify-center bg-black/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
        <div className='text-center text-white'>
          <ExternalLink className='mx-auto mb-2 h-8 w-8 text-white' />
          <p className='text-sm font-semibold text-white'>
            View Membership Details
          </p>
        </div>
      </div>

      <div className='relative z-10 flex items-start justify-between'>
        <p className='text-xs font-semibold uppercase text-muted-foreground'>
          Membership Card
        </p>
        <Shield className={cn('h-5 w-5', cardStyle.color)} />
      </div>
      <div className='relative z-10 space-y-2'>
        <div className='flex items-center gap-2 font-mono text-sm text-foreground'>
          <CreditCard className='h-5 w-5 text-muted-foreground' />
          <span>{membership.number || '•••• •••• •••• 5678'}</span>
        </div>
        <div className='flex justify-between'>
          <div>
            <p className='text-xs text-muted-foreground'>MEMBER NAME</p>
            <p className='text-sm font-medium text-foreground'>
              {user?.firstName} {user?.lastName}
            </p>
          </div>
          <div>
            <p className='text-xs text-muted-foreground'>EXPIRES</p>
            <p className='text-sm font-medium text-foreground'>
              {membership?.expiryDate
                ? new Date(membership.expiryDate).toLocaleDateString('en-US', {
                    month: '2-digit',
                    year: '2-digit',
                  })
                : 'N/A'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

const UserCard = memo(({ dashboardData, isLoading }: UserCardProps) => {
  const authUser = useAppSelector((state) => state.user.user)
  const navigate = useNavigate()

  // Add null checks to prevent accessing properties of undefined objects
  const userRole = dashboardData?.user?.role
  const isPrimaryMember = userRole === UserRole.PRIMARY_MEMBER
  const isActiveMember = userRole === UserRole.ACTIVE_MEMBER

  const getRemainingDays = () => {
    if (!dashboardData?.membership?.expiryDate) return null
    const expiryDate = new Date(dashboardData?.membership?.expiryDate)
    const today = new Date()
    const diffTime = expiryDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays > 0 ? diffDays : 0
  }

  const getCardStyle = (): CardStyle => {
    if (!dashboardData?.user?.status) {
      return userCardStyles[UserStatus.PROCESSING]
    }

    if (dashboardData?.user?.status === UserStatus.PROCESSING) {
      return userCardStyles[UserStatus.PROCESSING]
    }
    if (dashboardData?.user?.status === UserStatus.APPROVED) {
      if (isActiveMember)
        return userCardStyles[UserStatus.APPROVED][UserRole.ACTIVE_MEMBER]
      if (isPrimaryMember)
        return userCardStyles[UserStatus.APPROVED][UserRole.PRIMARY_MEMBER]
      return userCardStyles[UserStatus.APPROVED][UserRole.MEMBER]
    }
    return userCardStyles[UserStatus.PROCESSING]
  }

  const cardStyle = getCardStyle()
  const remainingDays = getRemainingDays()
  const isProcessing = dashboardData?.user?.status === UserStatus.PROCESSING
  const isVerifiedMember = dashboardData?.user?.role === UserRole.MEMBER
  const showBasicInfoOnly = isProcessing || isVerifiedMember
  const showRemainingDays =
    !showBasicInfoOnly && (isPrimaryMember || isActiveMember)

  const renderUserInfo = () => {
    if (showBasicInfoOnly) {
      return (
        <>
          <InfoItem
            icon={Phone}
            label='Phone'
            value={dashboardData?.user?.phone || 'N/A'}
            isLoading={isLoading}
          />
          <InfoItem
            icon={Briefcase}
            label='Occupation'
            value={dashboardData?.user?.occupation || 'N/A'}
            isLoading={isLoading}
          />
          <InfoItem
            icon={MapPin}
            label='Location'
            value={`${dashboardData?.user?.address?.state || 'N/A'} (${dashboardData?.user?.address?.district || 'N/A'})`}
            isLoading={isLoading}
          />
        </>
      )
    }

    return (
      <>
        <InfoItem
          icon={Star}
          label='Membership ID'
          value={dashboardData?.membership?.number || 'N/A'}
          isLoading={isLoading}
        />
        <InfoItem
          icon={Briefcase}
          label='Occupation'
          value={dashboardData?.user?.occupation || 'N/A'}
          isLoading={isLoading}
        />
        <InfoItem
          icon={Wallet}
          label='Wallet Balance'
          value={`₹${dashboardData?.wallet?.balance || 0}`}
          isLoading={isLoading}
          onClick={() => navigate({ to: '/dashboard/wallet' })}
          isClickable={true}
        />
        <InfoItem
          icon={Users}
          label='Total Referrals'
          value={String(dashboardData?.referrals?.successfulReferrals || '0')}
          isLoading={isLoading}
        />
        <InfoItem
          icon={Gift}
          label='Referral Code'
          value={dashboardData?.referrals?.referralCode || 'N/A'}
          isLoading={isLoading}
        />
        <InfoItem
          icon={MapPin}
          label='Location'
          value={`${dashboardData?.user?.address?.state || 'N/A'} (${dashboardData?.user?.address?.district || 'N/A'})`}
          isLoading={isLoading}
        />
      </>
    )
  }

  return (
    <Card className='relative w-full overflow-hidden rounded-2xl border bg-card transition-colors duration-500'>
      <div
        className={cn('h-1.5 w-full bg-gradient-to-r', cardStyle.gradient)}
      />
      <div
        className='absolute right-0 top-0 h-full w-1/2 bg-contain bg-center bg-no-repeat opacity-[0.08] sm:bg-right'
        style={{ backgroundImage: `url(${bppLogo})` }}
      />
      <CardContent className='relative p-4'>
        {/* --- HEADER --- */}
        <div className='flex flex-col items-start justify-between gap-2 lg:flex-row'>
          <div className='flex flex-1 items-center gap-3'>
            {isLoading ? (
              <Skeleton className='h-14 w-14 rounded-full' />
            ) : (
              <div
                className='group relative cursor-pointer'
                onClick={() => navigate({ to: '/dashboard/profile' })}
              >
                <Avatar className='h-14 w-14 shrink-0 border-2 border-background shadow-md'>
                  <AvatarImage
                    src={
                      typeof authUser?.profilePicture === 'string'
                        ? authUser.profilePicture
                        : undefined
                    }
                    alt={dashboardData?.user?.firstName || 'User'}
                  />
                  <AvatarFallback className='text-lg font-bold'>
                    {dashboardData?.user?.firstName?.charAt(0) || ''}
                    {dashboardData?.user?.lastName?.charAt(0) || ''}
                  </AvatarFallback>
                </Avatar>
                <div className='absolute inset-0 flex items-center justify-center rounded-full bg-black/60 opacity-0 transition-opacity group-hover:opacity-100'>
                  <Pencil className='h-5 w-5 text-white' />
                </div>
              </div>
            )}
            <div className='min-w-0 flex-1 text-left'>
              {isLoading ? (
                <Skeleton className='mb-1 h-6 w-36' />
              ) : (
                <h2 className='truncate text-lg font-bold text-foreground'>
                  {dashboardData?.user?.title || ''}{' '}
                  {dashboardData?.user?.firstName || ''}{' '}
                  {dashboardData?.user?.middleName
                    ? `${dashboardData?.user?.middleName} `
                    : ''}
                  {dashboardData?.user?.lastName || ''}
                </h2>
              )}
              {isLoading ? (
                <Skeleton className='h-5 w-28' />
              ) : (
                <p className='text-sm text-muted-foreground'>
                  {dashboardData?.user?.phone}
                </p>
              )}
              {!isLoading && showRemainingDays && remainingDays !== null && (
                <div className='mt-1 flex items-center gap-1.5 text-xs font-medium text-muted-foreground'>
                  <CalendarClock className='h-3.5 w-3.5' />
                  <span>{remainingDays} days remaining</span>
                </div>
              )}
            </div>
          </div>
          <div className='flex w-full flex-col items-end gap-1.5 lg:w-auto'>
            <div className='flex items-center gap-2'>
              {!isLoading && (
                <Badge
                  variant='outline'
                  className={cn(
                    'whitespace-nowrap px-2 py-0.5 text-xs font-semibold tracking-wider',
                    cardStyle.badgeStyle
                  )}
                >
                  {cardStyle.badgeText}
                </Badge>
              )}
              {!showBasicInfoOnly && dashboardData?.referrals?.referralCode && (
                <button
                  onClick={async () => {
                    const referralLink = `${window.location.origin}/sign-up?ref=${dashboardData.referrals.referralCode}`
                    const shareText = `I’m inviting you to join Bharatiya Popular Party (BPP)\n\nUse my referral code (${dashboardData.referrals.referralCode}) during registration and become part of a community contribution to support each other.\nOne Rupee. One Vote. One Change.\n\n${referralLink}`
                    if (navigator.share) {
                      try {
                        await navigator.share({
                          title: 'Join Bharatiya Popular Party',
                          text: shareText,
                        })
                        toast.success('Referral link shared!')
                      } catch (_err) {
                        // fallback to clipboard
                        await navigator.clipboard.writeText(shareText)
                        toast.success('Referral message copied to clipboard!')
                      }
                    } else {
                      await navigator.clipboard.writeText(shareText)
                      toast.success('Referral message copied to clipboard!')
                    }
                  }}
                  className='rounded-md p-1.5 transition-colors hover:bg-muted/50'
                  title='Share referral link with compelling message'
                >
                  <Share2 className='h-4 w-4 text-muted-foreground' />
                </button>
              )}
            </div>
            {!showBasicInfoOnly && (
              <div className='w-full space-y-1.5 lg:w-96'>
                <PointsProgress
                  points={
                    (dashboardData?.membership as ExtendedMembership)?.points
                  }
                  pointsToNextTier={
                    (dashboardData?.membership as ExtendedMembership)
                      ?.pointsToNextTier
                  }
                  nextTier={
                    (dashboardData?.membership as ExtendedMembership)?.nextTier
                  }
                  cardStyle={cardStyle}
                  isLoading={isLoading}
                />
                <ReferralProgress
                  userRole={dashboardData?.user?.role}
                  currentReferrals={
                    dashboardData?.referrals?.successfulReferrals
                  }
                  cardStyle={cardStyle}
                  isLoading={isLoading}
                />
              </div>
            )}
          </div>
        </div>

        <Separator className='my-3' />

        {/* --- MAIN CONTENT --- */}
        <div
          className={cn(
            'grid gap-x-4 gap-y-3',
            !showBasicInfoOnly && 'lg:grid-cols-3'
          )}
        >
          <div
            className={cn(
              'grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2',
              !showBasicInfoOnly
                ? 'lg:col-span-2'
                : 'sm:grid-cols-3 lg:col-span-3'
            )}
          >
            {renderUserInfo()}
          </div>
          {!showBasicInfoOnly && (
            <div className='lg:col-span-1'>
              <VisualMembershipCard
                user={dashboardData?.user}
                membership={dashboardData?.membership}
                cardStyle={cardStyle}
                isLoading={isLoading}
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
})

UserCard.displayName = 'UserCard'

export default UserCard
