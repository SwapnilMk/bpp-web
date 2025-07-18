import Cookies from 'js-cookie'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { cn } from '@/lib/utils'
import { SearchProvider } from '@/context/search-context'
import { SidebarProvider } from '@/components/ui/sidebar'
import { Header } from '@/components/layout/dashboard/header'
import { Main } from '@/components/layout/dashboard/main'
import { NotificationHeaderMenu } from '@/components/layout/dashboard/notification'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { VerificationManager } from '@/components/features/verification/verification-manager'
import { AppSidebar } from '@/components/layout/dashboard/app-sidebar'
import SkipToMain from '@/components/skip-to-main'

export const Route = createFileRoute('/dashboard')({
  component: DashboardLayout,
  beforeLoad: async ({ location }) => {
    const authToken = Cookies.get('authToken')

    if (!authToken) {
      throw redirect({
        to: '/sign-in',
        search: {
          redirect: location.pathname,
        },
      })
    }
  },
})

function DashboardLayout() {
  const defaultOpen = Cookies.get('sidebar:state') !== 'false'
  return (
    <SearchProvider>
      <SidebarProvider defaultOpen={defaultOpen}>
        <SkipToMain />
        <AppSidebar />
        <div
          id='content'
          className={cn(
            'ml-auto w-full max-w-full',
            'peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon)-1rem)]',
            'peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]',
            'transition-[width] duration-200 ease-linear',
            'flex h-svh flex-col',
            'group-data-[scroll-locked=1]/body:h-full',
            'group-data-[scroll-locked=1]/body:has-[main.fixed-main]:h-svh'
          )}
        >
          <Header fixed>
            <Search />
            <div className='ml-auto flex items-center space-x-4'>
              <NotificationHeaderMenu />
              <ThemeSwitch />
              <ProfileDropdown />
            </div>
          </Header>
          <VerificationManager />
          <Outlet />
        </div>
      </SidebarProvider>
    </SearchProvider>
  )
}
