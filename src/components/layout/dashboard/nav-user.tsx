import { Link, useNavigate } from '@tanstack/react-router'
import { RootState, AppDispatch } from '@/store/store'
import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  LogOut,
  Sparkles,
} from 'lucide-react'
import { useSelector, useDispatch } from 'react-redux'
import { useLogout } from '@/hooks/queries/useAuthQueries'
import { clearCredentials } from '@/store/authSlice'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import { toast } from 'sonner'

export function NavUser() {
  const { isMobile } = useSidebar()
  const { mutate: logout } = useLogout()
  const navigate = useNavigate()
  const dispatch: AppDispatch = useDispatch()
  const user = useSelector((state: RootState) => state.auth.user)

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        dispatch(clearCredentials())
        navigate({ to: '/sign-in', replace: true })
        toast.success('Logged out successfully')
      },
      onError: (error) => {
        toast.error(error.message || 'Logout failed')
      },
    })
  }

  const isEligibleForUpgrade =
    user?.role === 'PRIMARY MEMBER' &&
    (user?.referralProfile?.successfulReferrals || 0) >= 10

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
            >
              <Avatar className='h-8 w-8 rounded-lg'>
                <AvatarImage
                  src={
                    typeof user?.profilePicture === 'string'
                      ? user.profilePicture
                      : undefined
                  }
                  alt={user?.firstName || 'User'}
                />
                <AvatarFallback className='rounded-lg'>
                  {user?.firstName?.[0] || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className='grid flex-1 text-left text-sm leading-tight'>
                <span className='truncate font-semibold'>
                  {user?.firstName} {user?.lastName}
                </span>
                <span className='truncate text-xs'>{user?.phone}</span>
              </div>
              <ChevronsUpDown className='ml-auto size-4' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
            side={isMobile ? 'bottom' : 'right'}
            align='end'
            sideOffset={4}
          >
            <DropdownMenuLabel className='p-0 font-normal'>
              <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                <Avatar className='h-8 w-8 rounded-lg'>
                  <AvatarImage
                    src={
                      typeof user?.profilePicture === 'string'
                        ? user.profilePicture
                        : undefined
                    }
                    alt={user?.firstName || 'User'}
                  />
                  <AvatarFallback className='rounded-lg'>
                    {user?.firstName?.[0] || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className='grid flex-1 text-left text-sm leading-tight'>
                  <span className='truncate font-semibold'>
                    {user?.firstName} {user?.lastName}
                  </span>
                  <span className='truncate text-xs'>{user?.phone}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {isEligibleForUpgrade && (
              <>
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild>
                    <Link to='/dashboard/membership/upgrade'>
                      <Sparkles className='mr-2 h-4 w-4' />
                      Upgrade to Active Membership
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
              </>
            )}
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link to='/dashboard/settings'>
                  <BadgeCheck className='mr-2 h-4 w-4' />
                  Account
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to='/dashboard/settings/notifications'>
                  <Bell className='mr-2 h-4 w-4' />
                  Notifications
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className='mr-2 h-4 w-4' />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
