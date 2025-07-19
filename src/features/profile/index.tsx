import { memo } from 'react'
import { Outlet } from '@tanstack/react-router'
import {
  // IconBriefcase,
  IconFile,
  IconMap,
  IconPhone,
  IconUser,
} from '@tabler/icons-react'
import { Separator } from '@/components/ui/separator'
import { Main } from '@/components/layout/dashboard/main'
import SidebarNav from '@/features/profile/components/sidebar-nav'

const Profile = memo(() => {
  return (
    <Main fixed>
      <div className='space-y-0.5'>
        <h1 className='text-2xl font-bold tracking-tight md:text-3xl'>
          Profile
        </h1>
        <p className='text-muted-foreground'>
          Manage your account settings and set e-mail preferences.
        </p>
      </div>
      <Separator className='my-4 lg:my-6' />
      <div className='flex flex-1 flex-col space-y-2 overflow-hidden md:space-y-2 lg:flex-row lg:space-x-12 lg:space-y-0'>
        <aside className='top-0 lg:sticky lg:w-1/5'>
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className='flex w-full overflow-y-hidden p-1 pr-4'>
          <Outlet />
        </div>
      </div>
    </Main>
  )
})

export default Profile

const sidebarNavItems = [
  {
    title: 'Personal',
    icon: <IconUser size={18} />,
    href: '/dashboard/profile',
  },
  {
    title: 'Contact',
    icon: <IconPhone size={18} />,
    href: '/dashboard/profile/contact',
  },
  {
    title: 'Address',
    icon: <IconMap size={18} />,
    href: '/dashboard/profile/address',
  },
  {
    title: 'Documents',
    icon: <IconFile size={18} />,
    href: '/dashboard/profile/document',
  },
  // {
  //   title: 'Professional',
  //   icon: <IconBriefcase size={18} />,
  //   href: '/dashboard/profile/professional',
  // },
]
