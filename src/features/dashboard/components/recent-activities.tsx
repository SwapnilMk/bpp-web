import { formatDistanceToNow, format } from 'date-fns'
import { DashboardData } from '@/types/api'
import {
  LogIn,
  CreditCard,
  UserCheck,
  AlertCircle,
  Clock,
  CheckCircle2,
  XCircle,
  Clock4,
  ArrowRight,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface RecentActivitiesProps {
  dashboardData: DashboardData
  isLoading: boolean
  className?: string
}

interface Activity {
  _id: string
  activityType: string
  details: Record<string, unknown>
  status: string
  createdAt: string
}

export function RecentActivities({
  dashboardData,
  isLoading,
  className,
}: RecentActivitiesProps) {
  if (isLoading) {
    return (
      <Card className={className || 'lg:col-span-3'}>
        <CardHeader className='pb-3'>
          <CardTitle className='text-lg'>Recent Activities</CardTitle>
          <CardDescription className='text-sm'>
            Your recent account activities
          </CardDescription>
        </CardHeader>
        <CardContent className='pt-0'>
          <div className='space-y-3'>
            <Skeleton className='h-12 w-full' />
            <Skeleton className='h-12 w-full' />
            <Skeleton className='h-12 w-full' />
          </div>
        </CardContent>
      </Card>
    )
  }

  const getActivityIcon = (activityType: string) => {
    switch (activityType) {
      case 'LOGIN':
        return <LogIn className='h-4 w-4 text-blue-500' />
      case 'ACTIVE MEMBERSHIP':
        return <CreditCard className='h-4 w-4 text-purple-500' />
      case 'PRIMARY MEMBERSHIP':
        return <UserCheck className='h-4 w-4 text-green-500' />
      case 'PAYMENT':
        return <CreditCard className='h-4 w-4 text-amber-500' />
      case 'REFERRAL':
        return <UserCheck className='h-4 w-4 text-indigo-500' />
      default:
        return <AlertCircle className='h-4 w-4 text-gray-500' />
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'SUCCESS':
        return <CheckCircle2 className='h-3 w-3 text-green-500' />
      case 'PENDING':
        return <Clock4 className='h-3 w-3 text-yellow-500' />
      case 'FAILED':
        return <XCircle className='h-3 w-3 text-red-500' />
      default:
        return <AlertCircle className='h-3 w-3 text-gray-500' />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'SUCCESS':
        return 'bg-green-500/10 text-green-500 hover:bg-green-500/20'
      case 'PENDING':
        return 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20'
      case 'FAILED':
        return 'bg-red-500/10 text-red-500 hover:bg-red-500/20'
      default:
        return 'bg-gray-500/10 text-gray-500 hover:bg-gray-500/20'
    }
  }

  const formatActivityDetails = (activity: Activity) => {
    switch (activity.activityType) {
      case 'LOGIN':
        return `Logged in via ${activity.details.loginMethod as string}`
      case 'ACTIVE MEMBERSHIP':
        if (activity.details.membershipNumber) {
          return `Active Membership ${activity.details.membershipNumber as string}`
        } else if (activity.details.amount) {
          return `Active Membership payment of ₹${activity.details.amount as number}`
        }
        return 'Active Membership activity'
      case 'PRIMARY MEMBERSHIP':
        if (activity.details.membershipNumber) {
          return `Primary Membership ${activity.details.membershipNumber as string}`
        } else if (activity.details.amount) {
          return `Primary Membership payment of ₹${activity.details.amount as number}`
        }
        return 'Primary Membership activity'
      case 'PAYMENT':
        return `Payment of ₹${activity.details.amount as number} for ${activity.details.purpose as string}`
      case 'REFERRAL':
        return `Referred ${activity.details.referredUserName as string}`
      default:
        return activity.activityType
    }
  }

  const formatActivityMetadata = (activity: Activity) => {
    const metadata = []

    if (activity.details.device) {
      metadata.push(`${activity.details.device as string}`)
    }

    if (activity.details.location) {
      metadata.push(`${activity.details.location as string}`)
    }

    return metadata.join(' • ')
  }

  // Get only the most recent 5 activities
  const recentActivities = dashboardData?.recentActivities?.slice(0, 5) || []

  const handleViewAllActivities = () => {
    // TODO: Navigate to full activities page
    // navigate({ to: '/activities' })
  }

  return (
    <Card className={className || 'lg:col-span-3'}>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-3'>
        <div>
          <CardTitle className='text-lg'>Recent Activities</CardTitle>
          <CardDescription className='text-sm'>
            Your recent account activities
          </CardDescription>
        </div>
        <Badge variant='outline' className='text-xs font-medium'>
          {dashboardData?.recentActivities?.length || 0} total
        </Badge>
      </CardHeader>
      <CardContent className='pt-0'>
        <div className='space-y-3'>
          {recentActivities.length > 0 ? (
            recentActivities.map((activity: Activity) => (
              <div
                key={activity._id}
                className='flex items-center space-x-3 rounded-lg border p-3 transition-colors hover:bg-muted/50'
              >
                <div className='rounded-full bg-muted p-2'>
                  {getActivityIcon(activity.activityType)}
                </div>
                <div className='min-w-0 flex-1'>
                  <div className='flex items-center justify-between gap-2'>
                    <p className='truncate text-sm font-medium'>
                      {formatActivityDetails(activity)}
                    </p>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Badge
                            variant='outline'
                            className={`flex items-center gap-1 text-xs ${getStatusColor(activity.status)}`}
                          >
                            {getStatusIcon(activity.status)}
                            <span className='hidden sm:inline'>
                              {activity.status}
                            </span>
                          </Badge>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Status: {activity.status}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>

                  {formatActivityMetadata(activity) && (
                    <p className='mt-1 truncate text-xs text-muted-foreground'>
                      {formatActivityMetadata(activity)}
                    </p>
                  )}

                  <div className='mt-1 flex items-center space-x-2 text-xs text-muted-foreground'>
                    <Clock className='h-3 w-3' />
                    <span>
                      {formatDistanceToNow(new Date(activity.createdAt), {
                        addSuffix: true,
                      })}
                    </span>
                    <span className='hidden sm:inline'>•</span>
                    <span className='hidden sm:inline'>
                      {format(new Date(activity.createdAt), 'h:mm a')}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className='flex flex-col items-center justify-center py-6 text-center'>
              <AlertCircle className='h-8 w-8 text-muted-foreground/50' />
              <h3 className='mt-2 text-sm font-medium'>No recent activities</h3>
              <p className='mt-1 text-xs text-muted-foreground'>
                Your recent activities will appear here
              </p>
            </div>
          )}
        </div>

        {(dashboardData?.recentActivities?.length || 0) > 5 && (
          <div className='mt-4 border-t pt-3'>
            <Button
              variant='outline'
              size='sm'
              onClick={handleViewAllActivities}
              className='w-full text-xs'
            >
              View All Activities
              <ArrowRight className='ml-2 h-3 w-3' />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
