import { useEffect, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { membershipService } from '@/services/membership.service'
import {
  QrCode,
  Calendar,
  User,
  Award,
  Users,
  Clock,
  CheckCircle,
  ArrowRight,
  MapPin,
  Mail,
  Phone,
  FileText,
  Share2,
} from 'lucide-react'
import bppLogo from '@/assets/logo/bppLogo.png'
import { UserRole, UserStatus } from '@/utils/roleAccess'
import { useAppSelector } from '@/store/hooks'
import { toast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Header } from '@/components/layout/dashboard/header'
import { Main } from '@/components/layout/dashboard/main'
import { NotificationHeaderMenu } from '@/components/layout/dashboard/notification'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'

interface MembershipData {
  membershipType: 'primary' | 'active' | 'executive'
  membershipNumber: string
  joinDate: string
  expiryDate: string
  CardUrl: string
  referralCount: number
}

const membershipBenefits = {
  primary: {
    color: 'bg-blue-100 border-blue-300',
    badgeColor: 'from-blue-200 to-blue-400',
    title: 'Primary Membership',
    tier: 'Bronze',
    benefits: [
      'No referral required',
      'Access to basic community features',
      '24/7 support',
    ],
  },
  active: {
    color: 'bg-red-100 border-red-300',
    badgeColor: 'from-red-200 to-red-400',
    title: 'Active Membership',
    tier: 'Silver',
    benefits: [
      'Minimum 10 referrals required',
      'Priority support',
      'Exclusive access to professional events',
    ],
  },
  executive: {
    color: 'bg-orange-100 border-orange-300',
    badgeColor: 'from-orange-200 to-orange-400',
    title: 'Executive Committee',
    tier: 'Gold',
    benefits: [
      'Leadership role in party decisions',
      'Priority event invitations',
      'Enhanced networking opportunities',
    ],
  },
}

export default function Membership() {
  const user = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [membershipData, setMembershipData] = useState<MembershipData | null>(
    null
  )
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [CardStatus, setCardStatus] = useState<'pending' | 'approved' | null>(
    null
  )

  useEffect(() => {
    const loadMembership = async () => {
      try {
        // Use the actual membership data from the user context
        if (user?.membership) {
          const data: MembershipData = {
            membershipType:
              user.membership.type === 'PRIMARY MEMBERSHIP'
                ? 'primary'
                : user.membership.type === 'ACTIVE MEMBERSHIP'
                  ? 'active'
                  : 'executive',
            membershipNumber: user.membership.membershipNumber || 'N/A',
            joinDate:
              user.membership.validity?.startDate || new Date().toISOString(),
            expiryDate:
              user.membership.validity?.expiryDate || new Date().toISOString(),
            CardUrl: user.membership.cardUrl || '',
            referralCount: user.referralProfile?.totalReferrals || 0,
          }
          setMembershipData(data)
        }
      } catch (_error) {
        toast({
          title: 'Error',
          description: 'Failed to load membership data.',
          variant: 'destructive',
        })
      } finally {
        setLoading(false)
      }
    }
    loadMembership()
  }, [user])

  const handleDownloadCard = () => {
    if (user?.membership?.cardUrl) {
      window.open(user.membership.cardUrl, '_blank')
      toast({
        title: 'Download Started',
        description: 'Your Card is being downloaded.',
      })
    }
  }

  const handleGenerateCard = () => {
    setIsUploadModalOpen(true)
  }

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedPhoto(file)
    }
  }

  const handleSubmitCard = async () => {
    if (!selectedPhoto) return

    setIsSubmitting(true)
    try {
      const response = await membershipService.uploadCertificate(
        selectedPhoto,
        user?.membership?._id || ''
      )

      if (response.data.success) {
        setCardStatus('pending')
        toast({
          title: 'Card Request Submitted',
          description:
            response.data.data?.message ||
            'Your Card request has been submitted for admin approval.',
        })
        setIsUploadModalOpen(false)
        setSelectedPhoto(null)
        setUploadProgress(0)
      } else {
        throw new Error(
          response.data.message || 'Failed to submit Card request'
        )
      }
    } catch (error) {
      toast({
        title: 'Error',
        description:
          error instanceof Error
            ? error.message
            : 'Failed to submit Card request.',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePaymentClick = () => {
    navigate({ to: '/dashboard/membership/payment' })
  }

  const copyReferralLink = () => {
    if (user?.referralProfile?.referralLink) {
      navigator.clipboard.writeText(user.referralProfile.referralLink)
      toast({
        title: 'Copied!',
        description: 'Referral link copied to clipboard.',
      })
    }
  }

  if (loading || !membershipData) {
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
          <div className='mx-auto w-full'>
            <Skeleton className='mb-6 h-10 w-64' />

            <Card className='mb-8 overflow-hidden rounded-lg border-2 shadow-md'>
              <CardContent className='p-6'>
                <div className='flex flex-col items-center gap-6 sm:flex-row sm:items-start'>
                  <Skeleton className='h-24 w-24 rounded-full sm:h-32 sm:w-32' />

                  <div className='flex-1 space-y-4'>
                    <div className='flex items-center justify-between'>
                      <Skeleton className='h-8 w-48' />
                      <Skeleton className='h-6 w-16 rounded-full' />
                    </div>

                    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i}>
                          <Skeleton className='mb-1 h-4 w-24' />
                          <Skeleton className='h-6 w-32' />
                        </div>
                      ))}
                      <div className='sm:col-span-2'>
                        <Skeleton className='mb-1 h-4 w-24' />
                        <Skeleton className='h-2.5 w-full rounded-full' />
                      </div>
                    </div>

                    <div className='flex flex-col gap-2 sm:flex-row sm:justify-start'>
                      <Skeleton className='h-10 w-full sm:w-32' />
                      <Skeleton className='h-10 w-full sm:w-32' />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Skeleton className='mb-4 h-8 w-32' />
            <Card className='mb-8'>
              <CardContent className='pt-6'>
                <div className='space-y-3'>
                  {[1, 2, 3].map((i) => (
                    <div key={i} className='flex items-center'>
                      <Skeleton className='mr-2 h-5 w-5 rounded-full' />
                      <Skeleton className='h-5 w-64' />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </Main>
      </>
    )
  }

  // Check if user is verified
  const isVerified = user?.isVerified === true
  const isApproved = user?.status === UserStatus.APPROVED
  const isPrimaryMember = user?.role === UserRole.PRIMARY_MEMBER
  const isActiveMember = user?.role === UserRole.ACTIVE_MEMBER

  // If user is not verified, show verification required message
  if (!isVerified || !isApproved) {
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
          <div className='mx-auto w-full'>
            <h1 className='mb-6 text-3xl font-bold'>Membership Details</h1>
            <Card className='mb-8 border-yellow-300 bg-yellow-50'>
              <CardContent className='p-6'>
                <div className='flex flex-col items-center text-center'>
                  <Award className='mb-4 h-16 w-16 text-yellow-500' />
                  <h2 className='mb-2 text-2xl font-bold text-yellow-800'>
                    Verification Required
                  </h2>
                  <p className='mb-4 max-w-md text-yellow-700'>
                    Your account is currently pending verification. Once
                    verified, you'll be able to access membership features and
                    upgrade to primary membership.
                  </p>
                  <Button
                    variant='outline'
                    className='border-yellow-300 bg-white text-yellow-700 hover:bg-yellow-100'
                  >
                    Check Verification Status
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </Main>
      </>
    )
  }

  // If user is verified but not a primary member, show upgrade option
  if (isVerified && isApproved && !isPrimaryMember && !isActiveMember) {
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
          <div className='mx-auto w-full'>
            <h1 className='mb-6 text-3xl font-bold'>Membership Details</h1>

            {/* Upgrade to Primary Membership Card */}
            <Card className='mb-8 border-blue-300 bg-blue-50'>
              <CardContent className='p-6'>
                <div className='flex flex-col items-center text-center'>
                  <Award className='mb-4 h-16 w-16 text-blue-500' />
                  <h2 className='mb-2 text-2xl font-bold text-blue-800'>
                    Upgrade to Primary Membership
                  </h2>
                  <p className='mb-4 max-w-md text-blue-700'>
                    Your account is verified! Now you can upgrade to Primary
                    Membership for just ₹5 to unlock all features.
                  </p>
                  <div className='mb-6 flex items-center justify-center'>
                    <span className='text-3xl font-bold text-blue-800'>₹5</span>
                    <span className='ml-2 text-blue-600'>one-time payment</span>
                  </div>
                  <Button
                    onClick={handlePaymentClick}
                    className='bg-blue-600 text-white hover:bg-blue-700'
                  >
                    Pay Now to Activate
                    <ArrowRight className='ml-2 h-4 w-4' />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Primary Membership Benefits */}
            <section className='mb-8'>
              <h2 className='mb-4 text-2xl font-semibold'>
                Primary Membership Benefits
              </h2>
              <Card>
                <CardContent className='pt-6'>
                  <ul className='space-y-4'>
                    {membershipBenefits.primary.benefits.map(
                      (benefit, index) => (
                        <li key={index} className='flex items-start'>
                          <CheckCircle className='mr-2 h-5 w-5 flex-shrink-0 text-green-500' />
                          <span>{benefit}</span>
                        </li>
                      )
                    )}
                    <li className='flex items-start'>
                      <CheckCircle className='mr-2 h-5 w-5 flex-shrink-0 text-green-500' />
                      <span>Access to all basic community features</span>
                    </li>
                    <li className='flex items-start'>
                      <CheckCircle className='mr-2 h-5 w-5 flex-shrink-0 text-green-500' />
                      <span>
                        Eligibility for Active Membership after referrals
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </section>
          </div>
        </Main>
      </>
    )
  }

  // If user is a primary or active member, show membership card
  const currentMembership = isActiveMember
    ? membershipBenefits.active
    : membershipBenefits.primary

  // Calculate membership validity
  const startDate = user?.membership?.validity?.startDate
    ? new Date(user.membership.validity.startDate)
    : new Date()
  const expiryDate = user?.membership?.validity?.expiryDate
    ? new Date(user.membership.validity.expiryDate)
    : new Date(new Date().setFullYear(new Date().getFullYear() + 1))

  const isActive = expiryDate > new Date()
  const daysRemaining = Math.ceil(
    (expiryDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  )
  const totalDays = Math.ceil(
    (expiryDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  )
  const progressPercentage = Math.min((daysRemaining / totalDays) * 100, 100)

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
        <div className='mx-auto w-full'>
          <h1 className='mb-6 text-3xl font-bold'>Membership Details</h1>

          {/* Enhanced Badge-like Membership Card */}
          <Card
            className={`${currentMembership.color} relative mb-8 overflow-hidden rounded-lg border-2 shadow-md`}
          >
            {/* Background SVG Shade */}
            <div
              className='absolute inset-0 bg-contain bg-center bg-no-repeat opacity-10'
              style={{ backgroundImage: `url(${bppLogo})` }}
            />
            <CardContent className='relative flex flex-col items-center gap-6 p-6 sm:flex-row sm:items-start'>
              {/* Badge Circle */}
              <div
                className={`flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br sm:h-32 sm:w-32 ${currentMembership.badgeColor} border-4 border-white shadow-md`}
              >
                <Award className='h-12 w-12 text-white sm:h-16 sm:w-16' />
              </div>

              {/* Card Details */}
              <div className='flex-1 text-center sm:text-left'>
                <div className='mb-2 flex items-center justify-between'>
                  <h2 className='text-2xl font-bold'>
                    {currentMembership.title}
                  </h2>
                  <span
                    className={`rounded-full px-2 py-1 text-xs ${isActive ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}
                  >
                    {isActive ? 'Active' : 'Expired'}
                  </span>
                </div>

                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                  <div>
                    <p className='flex items-center justify-center text-sm text-muted-foreground sm:justify-start'>
                      <User className='mr-2 h-4 w-4' /> Membership Number
                    </p>
                    <p className='font-mono font-bold'>
                      {user?.membership?.membershipNumber || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className='flex items-center justify-center text-sm text-muted-foreground sm:justify-start'>
                      <Calendar className='mr-2 h-4 w-4' /> Joining Date
                    </p>
                    <p>{startDate.toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className='flex items-center justify-center text-sm text-muted-foreground sm:justify-start'>
                      <Calendar className='mr-2 h-4 w-4' /> Expiry Date
                    </p>
                    <p>{expiryDate.toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className='flex items-center justify-center text-sm text-muted-foreground sm:justify-start'>
                      <Users className='mr-2 h-4 w-4' /> Referral Count
                    </p>
                    <p className='font-bold'>
                      {user?.referralProfile?.totalReferrals || 0}
                    </p>
                  </div>
                  <div className='sm:col-span-2'>
                    <p className='flex items-center justify-center text-sm text-muted-foreground sm:justify-start'>
                      <Clock className='mr-2 h-4 w-4' /> Days Remaining
                    </p>
                    <div className='flex items-center gap-2'>
                      <div className='h-2.5 w-full rounded-full bg-gray-200'>
                        <div
                          className={`h-2.5 rounded-full ${isPrimaryMember ? 'bg-blue-500' : isActiveMember ? 'bg-red-500' : 'bg-orange-500'}`}
                          style={{ width: `${progressPercentage}%` }}
                        />
                      </div>
                      <span className='text-sm font-bold'>
                        {daysRemaining} days
                      </span>
                    </div>
                  </div>
                </div>
                <div className='mt-4 flex flex-col justify-center gap-2 sm:flex-row sm:justify-start'>
                  {user?.membership?.cardUrl ? (
                    <Button
                      variant='ghost'
                      className='flex w-full items-center gap-2 sm:w-auto'
                      onClick={handleDownloadCard}
                    >
                      <QrCode className='h-4 w-4' /> View Card
                    </Button>
                  ) : CardStatus === 'pending' ? (
                    <Button
                      variant='ghost'
                      className='flex w-full items-center gap-2 sm:w-auto'
                      disabled
                    >
                      <Clock className='h-4 w-4' /> Pending Approval
                    </Button>
                  ) : (
                    <Button
                      variant='ghost'
                      className='flex w-full items-center gap-2 sm:w-auto'
                      onClick={handleGenerateCard}
                    >
                      <QrCode className='h-4 w-4' /> Generate Card
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs for different sections */}
          <Tabs defaultValue='benefits' className='mb-8'>
            <TabsList className='grid w-full grid-cols-3'>
              <TabsTrigger value='benefits'>Benefits</TabsTrigger>
              <TabsTrigger value='personal'>Personal Info</TabsTrigger>
              <TabsTrigger value='referral'>Referral</TabsTrigger>
            </TabsList>

            {/* Benefits Tab */}
            <TabsContent value='benefits'>
              <Card>
                <CardContent className='pt-6'>
                  <ul className='space-y-3'>
                    {currentMembership.benefits.map((benefit, index) => (
                      <li key={index} className='flex items-center'>
                        <svg
                          className='mr-2 h-5 w-5 text-green-500'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M5 13l4 4L19 7'
                          />
                        </svg>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Personal Info Tab */}
            <TabsContent value='personal'>
              <Card>
                <CardContent className='pt-6'>
                  <div className='grid gap-6 md:grid-cols-2'>
                    <div className='space-y-4'>
                      <h3 className='text-lg font-semibold'>
                        Personal Details
                      </h3>
                      <div className='space-y-2'>
                        <div className='flex items-center'>
                          <User className='mr-2 h-4 w-4 text-muted-foreground' />
                          <span className='font-medium'>Name:</span>
                          <span className='ml-2'>
                            {user?.title} {user?.firstName} {user?.middleName}{' '}
                            {user?.lastName}
                          </span>
                        </div>
                        <div className='flex items-center'>
                          <Mail className='mr-2 h-4 w-4 text-muted-foreground' />
                          <span className='font-medium'>Email:</span>
                          <span className='ml-2'>{user?.email}</span>
                        </div>
                        <div className='flex items-center'>
                          <Phone className='mr-2 h-4 w-4 text-muted-foreground' />
                          <span className='font-medium'>Phone:</span>
                          <span className='ml-2'>{user?.phone}</span>
                        </div>
                        <div className='flex items-center'>
                          <Calendar className='mr-2 h-4 w-4 text-muted-foreground' />
                          <span className='font-medium'>Date of Birth:</span>
                          <span className='ml-2'>
                            {user?.dateOfBirth
                              ? new Date(user.dateOfBirth).toLocaleDateString()
                              : 'N/A'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className='space-y-4'>
                      <h3 className='text-lg font-semibold'>Address</h3>
                      <div className='space-y-2'>
                        <div className='flex items-start'>
                          <MapPin className='mr-2 mt-1 h-4 w-4 text-muted-foreground' />
                          <div>
                            <p>{user?.address?.line1}</p>
                            <p>{user?.address?.line2}</p>
                            <p>
                              {user?.address?.cityOrVillage},{' '}
                              {user?.address?.district}, {user?.address?.state}
                            </p>
                            <p>PIN: {user?.address?.pincode}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className='space-y-4 md:col-span-2'>
                      <h3 className='text-lg font-semibold'>
                        Professional Details
                      </h3>
                      <div className='space-y-2'>
                        <div className='flex items-center'>
                          <FileText className='mr-2 h-4 w-4 text-muted-foreground' />
                          <span className='font-medium'>Qualification:</span>
                          <span className='ml-2'>
                            {user?.professional?.qualification || 'N/A'}
                          </span>
                        </div>
                        <div className='flex items-center'>
                          <User className='mr-2 h-4 w-4 text-muted-foreground' />
                          <span className='font-medium'>Profession:</span>
                          <span className='ml-2'>
                            {user?.professional?.profession || 'N/A'}
                          </span>
                        </div>
                        <div className='flex items-center'>
                          <Award className='mr-2 h-4 w-4 text-muted-foreground' />
                          <span className='font-medium'>Position:</span>
                          <span className='ml-2'>
                            {user?.professional?.position || 'N/A'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Referral Tab */}
            <TabsContent value='referral'>
              <Card>
                <CardContent className='pt-6'>
                  <div className='space-y-6'>
                    <div className='flex flex-col items-center space-y-4 text-center'>
                      <div className='rounded-full bg-blue-100 p-4'>
                        <Share2 className='h-8 w-8 text-blue-600' />
                      </div>
                      <div>
                        <h3 className='text-xl font-semibold'>
                          Your Referral Program
                        </h3>
                        <p className='text-muted-foreground'>
                          Share your referral link to invite others to join BPP
                        </p>
                      </div>

                      <div className='w-full max-w-md space-y-2'>
                        <div className='flex items-center space-x-2'>
                          <Input
                            value={user?.referralProfile?.referralLink || ''}
                            readOnly
                            className='font-mono text-sm'
                          />
                          <Button
                            variant='outline'
                            size='sm'
                            onClick={copyReferralLink}
                          >
                            Copy
                          </Button>
                        </div>
                        <p className='text-xs text-muted-foreground'>
                          Your referral code:{' '}
                          <span className='font-mono font-bold'>
                            {user?.referralProfile?.referralCode || 'N/A'}
                          </span>
                        </p>
                      </div>
                    </div>

                    <Separator />

                    <div className='grid gap-4 md:grid-cols-3'>
                      <div className='rounded-lg border p-4 text-center'>
                        <p className='text-2xl font-bold'>
                          {user?.referralProfile?.totalReferrals || 0}
                        </p>
                        <p className='text-sm text-muted-foreground'>
                          Total Referrals
                        </p>
                      </div>
                      <div className='rounded-lg border p-4 text-center'>
                        <p className='text-2xl font-bold'>
                          {user?.referralProfile?.successfulReferrals}
                        </p>
                        <p className='text-sm text-muted-foreground'>
                          Successful
                        </p>
                      </div>
                      <div className='rounded-lg border p-4 text-center'>
                        <p className='text-2xl font-bold'>
                          {user?.referralProfile?.pendingReferrals}
                        </p>
                        <p className='text-sm text-muted-foreground'>Pending</p>
                      </div>
                    </div>

                    {isPrimaryMember && !isActiveMember && (
                      <div className='rounded-lg border border-yellow-200 bg-yellow-50 p-4'>
                        <h4 className='mb-2 font-semibold text-yellow-800'>
                          Upgrade to Active Membership
                        </h4>
                        {(user?.referralProfile?.successfulReferrals ?? 0) >=
                        10 ? (
                          <div className='space-y-4'>
                            <p className='text-sm text-yellow-700'>
                              Congratulations! You have completed{' '}
                              {user?.referralProfile?.successfulReferrals ?? 0}{' '}
                              successful referrals. You are now eligible to
                              upgrade to Active Membership.
                            </p>
                            <Button
                              onClick={() =>
                                navigate({
                                  to: '/dashboard/membership/upgrade',
                                })
                              }
                              className='bg-yellow-600 text-white hover:bg-yellow-700'
                            >
                              Upgrade Now
                              <ArrowRight className='ml-2 h-4 w-4' />
                            </Button>
                          </div>
                        ) : (
                          <p className='text-sm text-yellow-700'>
                            You need{' '}
                            {10 -
                              (user?.referralProfile?.successfulReferrals ??
                                0)}{' '}
                            more successful referrals to upgrade to Active
                            Membership.
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </Main>

      {/* Photo Upload Modal */}
      <Dialog open={isUploadModalOpen} onOpenChange={setIsUploadModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Passport Photo</DialogTitle>
          </DialogHeader>
          <div className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='photo'>Passport Size Photo</Label>
              <Input
                id='photo'
                type='file'
                accept='image/*'
                onChange={handlePhotoUpload}
                disabled={isSubmitting}
              />
              <p className='text-xs text-muted-foreground'>
                Please upload a passport size photo (2x2 inches) in JPG or PNG
                format
              </p>
              <p className='text-xs font-medium text-red-600'>
                Important: Your photo must match with your Aadhaar Card or
                Electoral Card photo
              </p>
            </div>

            {selectedPhoto && (
              <div className='space-y-2'>
                <div className='flex items-center justify-center'>
                  <img
                    src={URL.createObjectURL(selectedPhoto)}
                    alt='Preview'
                    className='h-32 w-32 rounded-full object-cover'
                  />
                </div>
                {uploadProgress > 0 && (
                  <div className='space-y-2'>
                    <Progress value={uploadProgress} />
                    <p className='text-sm text-muted-foreground'>
                      Uploading... {uploadProgress}%
                    </p>
                  </div>
                )}
              </div>
            )}

            <div className='flex justify-end gap-2'>
              <Button
                variant='outline'
                onClick={() => {
                  setIsUploadModalOpen(false)
                  setSelectedPhoto(null)
                  setUploadProgress(0)
                }}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmitCard}
                disabled={!selectedPhoto || isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit for Approval'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
