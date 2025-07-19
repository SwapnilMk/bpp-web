import { format } from 'date-fns'
import { useQuery } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import apiClient from '@/services/apiService'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

interface ApiResponse {
  success: boolean
  data: MembershipDetails
}

interface MembershipDetails {
  membership: {
    id: string
    type: string
    status: string
    paymentStatus: string
    amount: number
    membershipNumber: string
    validity: {
      startDate: string
      expiryDate: string
    }
    createdAt: string
    updatedAt: string
  }
  user: {
    firstName?: string
    lastName?: string
    email?: string
    phone?: string
    dateOfBirth?: string
    address?: {
      line1?: string
      line2?: string
      cityOrVillage?: string
      district?: string
      state?: string
      pincode?: string
    }
    profilePicture?: string
  }
}

function formatDate(date: string | Date) {
  if (!date) return ''
  return format(new Date(date), 'dd/MM/yyyy')
}

export default function MembershipDetails() {
  const { membershipId } = useParams({
    from: '/_public/membership/details/$membershipId',
  })

  const {
    data: response,
    isLoading,
    error,
  } = useQuery<ApiResponse>({
    queryKey: ['membership', membershipId],
    queryFn: async () => {
      const response = await apiClient.get(
        `/users/membership/details/${membershipId}`
      )
      return response.data
    },
  })

  if (isLoading) {
    return <MembershipDetailsSkeleton />
  }

  if (error) {
    return (
      <div className='container mx-auto py-8'>
        <Card>
          <CardContent className='p-6'>
            <p className='text-red-500'>Failed to load membership details</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (
    !response?.success ||
    !response?.data?.user ||
    !response?.data?.membership
  ) {
    return (
      <div className='container mx-auto py-8'>
        <Card>
          <CardContent className='p-6'>
            <p className='text-red-500'>No membership details available</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const { membership, user } = response.data

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='mx-auto max-w-4xl'>
        {/* Membership Card */}
        <div className='mb-8 overflow-hidden rounded-xl bg-gradient-to-r from-[#dbeafe] to-[#93c5fd] shadow-xl'>
          <div className='p-6 md:p-8'>
            <div className='flex flex-col gap-6 md:flex-row'>
              {/* Left Section - Photo and Basic Info */}
              <div className='flex flex-col items-center md:w-1/3'>
                {user?.profilePicture ? (
                  <div className='mb-4 h-32 w-32 overflow-hidden rounded-full border-4 border-white shadow-lg'>
                    <img
                      src={user.profilePicture}
                      alt='Profile'
                      className='h-full w-full object-cover'
                    />
                  </div>
                ) : (
                  <div className='mb-4 flex h-32 w-32 items-center justify-center rounded-full bg-gray-200'>
                    <span className='text-4xl text-gray-400'>👤</span>
                  </div>
                )}
                <div className='text-center text-gray-800'>
                  <h2 className='text-xl font-bold'>
                    {[user?.firstName, user?.lastName]
                      .filter(Boolean)
                      .join(' ')}
                  </h2>
                  <p className='text-sm opacity-90'>{membership.type} MEMBER</p>
                </div>
              </div>

              {/* Right Section - Membership Details */}
              <div className='rounded-lg bg-white/20 p-6 backdrop-blur-sm md:w-2/3'>
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                  <div>
                    <p className='text-sm text-gray-700'>Membership Number</p>
                    <p className='text-lg font-bold text-gray-900'>
                      {membership.membershipNumber}
                    </p>
                  </div>
                  <div>
                    <p className='text-sm text-gray-700'>Type</p>
                    <p className='text-lg font-bold text-gray-900'>
                      {membership.type}
                    </p>
                  </div>
                  <div>
                    <p className='text-sm text-gray-700'>Status</p>
                    <p className='text-lg font-bold text-gray-900'>
                      {membership.status}
                    </p>
                  </div>
                  <div>
                    <p className='text-sm text-gray-700'>Payment Status</p>
                    <p className='text-lg font-bold text-gray-900'>
                      {membership.paymentStatus}
                    </p>
                  </div>
                  <div>
                    <p className='text-sm text-gray-700'>Valid From</p>
                    <p className='text-lg font-bold text-gray-900'>
                      {formatDate(membership.validity.startDate)}
                    </p>
                  </div>
                  <div>
                    <p className='text-sm text-gray-700'>Valid Until</p>
                    <p className='text-lg font-bold text-gray-900'>
                      {formatDate(membership.validity.expiryDate)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Details */}
        <Card className='shadow-lg'>
          <CardHeader>
            <CardTitle>Additional Information</CardTitle>
          </CardHeader>
          <CardContent className='p-6'>
            <div className='grid gap-6 md:grid-cols-2'>
              <div className='space-y-4'>
                <div>
                  <h3 className='mb-3 text-lg font-semibold'>
                    Contact Information
                  </h3>
                  <div className='space-y-2'>
                    {user?.email && (
                      <p>
                        <span className='font-medium'>Email:</span> {user.email}
                      </p>
                    )}
                    {user?.phone && (
                      <p>
                        <span className='font-medium'>Phone:</span> {user.phone}
                      </p>
                    )}
                    {user?.dateOfBirth && (
                      <p>
                        <span className='font-medium'>Date of Birth:</span>{' '}
                        {formatDate(user.dateOfBirth)}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className='space-y-4'>
                {user?.address && (
                  <div>
                    <h3 className='mb-3 text-lg font-semibold'>Address</h3>
                    <div className='space-y-2'>
                      {user.address.line1 && <p>{user.address.line1}</p>}
                      {user.address.line2 && <p>{user.address.line2}</p>}
                      {user.address.cityOrVillage && (
                        <p>{user.address.cityOrVillage}</p>
                      )}
                      {(user.address.district || user.address.state) && (
                        <p>
                          {[user.address.district, user.address.state]
                            .filter(Boolean)
                            .join(', ')}
                        </p>
                      )}
                      {user.address.pincode && <p>{user.address.pincode}</p>}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function MembershipDetailsSkeleton() {
  return (
    <div className='container mx-auto py-8'>
      <Card>
        <CardHeader>
          <Skeleton className='h-8 w-48' />
        </CardHeader>
        <CardContent className='p-6'>
          <div className='grid gap-6 md:grid-cols-2'>
            <div className='space-y-4'>
              <div>
                <Skeleton className='h-6 w-40' />
                <div className='mt-2 space-y-2'>
                  {[1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} className='h-4 w-full' />
                  ))}
                </div>
              </div>
            </div>
            <div className='space-y-4'>
              <div>
                <Skeleton className='h-6 w-40' />
                <div className='mt-2 space-y-2'>
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className='h-4 w-full' />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
