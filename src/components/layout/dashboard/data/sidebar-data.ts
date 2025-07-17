import {
  // IconHelp,
  IconLayoutDashboard,
  IconNotification,
  IconPalette,
  IconSettings,
  IconTool,
  IconUserCog,
  IconWallet,
  IconTarget,
  IconGift,
  IconUsers,
  IconCreditCard, // IconCalendarEvent,
  IconTimelineEvent,
  IconDeviceDesktop,
} from '@tabler/icons-react'
import { Command } from 'lucide-react'
import { type SidebarData } from '../types'

export const sidebarData: SidebarData = {
  user: {
    name: 'satnaing',
    email: 'satnaingdev@gmail.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'BPPINDIA',
      logo: Command,
      plan: 'Bharatiya Popular Party',
    },
  ],
  navGroups: [
    {
      title: 'Dashboard',
      items: [
        {
          title: 'Overview',
          url: '/dashboard',
          icon: IconLayoutDashboard,
        },
      ],
    },
    {
      title: 'General',
      items: [
        {
          title: 'Goals',
          url: '/dashboard/goal',
          icon: IconTarget,
        },
        {
          title: 'Donate',
          url: '/dashboard/donate',
          icon: IconGift,
        },
        {
          title: 'Referral',
          url: '/dashboard/referral',
          icon: IconUsers,
        },
      ],
    },
    {
      title: 'User Management',
      items: [
        {
          title: 'Profile',
          url: '/dashboard/profile',
          icon: IconUserCog,
        },
        {
          title: 'Wallet',
          url: '/dashboard/wallet',
          icon: IconWallet,
        },
      ],
    },
    {
      title: 'Membership',
      items: [
        {
          title: 'Membership',
          url: '/dashboard/membership',
          icon: IconCreditCard,
        },
      ],
    },
    {
      title: 'Services',
      items: [
        {
          title: 'Community Contribution',
          url: '/dashboard/community-contribution',
          icon: IconUsers,
        },
        {
          title: 'Business Community',
          url: '/dashboard/business-community',
          icon: IconUsers,
        },
      ],
    },
    {
      title: 'Events & Campaigns',
      items: [
        // {
        //   title: 'Events',
        //   url: '/dashboard/events',
        //   icon: IconCalendarEvent,
        // },
        {
          title: 'Campaigns',
          url: '/dashboard/campaigns',
          icon: IconTimelineEvent,
        },
      ],
    },
    {
      title: 'Other',
      items: [
        {
          title: 'Settings',
          icon: IconSettings,
          items: [
            {
              title: 'Account',
              url: '/dashboard/settings',
              icon: IconTool,
            },
            {
              title: 'Appearance',
              url: '/dashboard/settings/appearance',
              icon: IconPalette,
            },
            {
              title: 'Notifications',
              url: '/dashboard/settings/notifications',
              icon: IconNotification,
            },
            {
              title: 'Session',
              url: '/dashboard/settings/sessions',
              icon: IconDeviceDesktop,
            },
          ],
        },
        // {
        //   title: 'Help Center',
        //   url: '/dashboard/help-center',
        //   icon: IconHelp,
        // },
      ],
    },
  ],
}
