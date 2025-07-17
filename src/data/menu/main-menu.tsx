import { Goal, LucideIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export type Submenu = {
  href: string
  label: string
  description: string
  active?: boolean
}

export type Menu = {
  href: string
  label: string
  active?: boolean
  icon: LucideIcon
  submenus?: Submenu[]
}

export type Group = {
  groupLabel: string
  menus: Menu[]
}

export function useMainMenuList(_pathname?: string): Group[] {
  const { t } = useTranslation('header')
  return [
    {
      groupLabel: '',
      menus: [
        {
          href: '/about',
          label: t('AboutUs.label'),
          icon: Goal,
          submenus: [
            {
              href: '/about/how-we-work',
              label: t('AboutUs.submenus.howWeWork.label'),
              description: t('AboutUs.submenus.howWeWork.description'),
            },
            {
              href: '/about/commitment-progress',
              label: t('AboutUs.submenus.commitmentProgress.label'),
              description: t('AboutUs.submenus.commitmentProgress.description'),
            },
            {
              href: '/about/bpp-goals',
              label: t('AboutUs.submenus.goals.label'),
              description: t('AboutUs.submenus.goals.description'),
            },
            {
              href: '/about/career',
              label: t('AboutUs.submenus.career.label'),
              description: t('AboutUs.submenus.career.description'),
            },
            {
              href: '/about/wings',
              label: t('AboutUs.submenus.wings.label'),
              description: t('AboutUs.submenus.wings.description'),
            },
            {
              href: '/contact',
              label: t('AboutUs.submenus.contactUs.label'),
              description: t('AboutUs.submenus.contactUs.description'),
            },
            {
              href: '/about/constitution',
              label: t('AboutUs.submenus.constitution.label'),
              description: t('AboutUs.submenus.constitution.description'),
            },
          ],
        },
      ],
    },
    {
      groupLabel: t('Membership.label'),
      menus: [
        {
          href: '/membership',
          label: t('Membership.label'),
          icon: Goal,
          submenus: [
            {
              label: t('Membership.submenus.login.label'),
              href: '/sign-in',
              description: t('Membership.submenus.login.description'),
            },
            {
              label: t('Membership.submenus.upgradeRenewals.label'),
              href: '/membership/upgrade-renewals',
              description: t('Membership.submenus.upgradeRenewals.description'),
            },
            {
              label: t('Membership.submenus.privileges.label'),
              href: '/membership/privileges',
              description: t('Membership.submenus.privileges.description'),
            },
            {
              label: t('Membership.submenus.codeOfConduct.label'),
              href: '/membership/code-of-conduct',
              description: t('Membership.submenus.codeOfConduct.description'),
            },
            {
              label: t('Membership.submenus.faq.label'),
              href: '/membership/faq',
              description: t('Membership.submenus.faq.description'),
            },
            {
              label: t('Membership.submenus.complaints.label'),
              href: '/membership/complaints',
              description: t('Membership.submenus.complaints.description'),
            },
          ],
        },
      ],
    },
    // {
    //   groupLabel: '',
    //   menus: [
    //     {
    //       href: '/business-community',
    //       label: t('BusinessCommunity.label'),
    //       icon: Goal,
    //       submenus: [
    //         {
    //           label: t('BusinessCommunity.submenus.vendorSuppliers.label'),
    //           href: '/business-community/vendor-suppliers',
    //           description: t(
    //             'BusinessCommunity.submenus.vendorSuppliers.description'
    //           ),
    //         },
    //         {
    //           label: t('BusinessCommunity.submenus.join.label'),
    //           href: '/business-community/join',
    //           description: t('BusinessCommunity.submenus.join.description'),
    //         },
    //         {
    //           label: t('BusinessCommunity.submenus.disclosure.label'),
    //           href: '/business-community/disclosure',
    //           description: t(
    //             'BusinessCommunity.submenus.disclosure.description'
    //           ),
    //         },
    //         {
    //           label: t('BusinessCommunity.submenus.ethics.label'),
    //           href: '/business-community/ethics',
    //           description: t('BusinessCommunity.submenus.ethics.description'),
    //         },
    //         {
    //           label: t('BusinessCommunity.submenus.inclusion.label'),
    //           href: '/business-community/inclusion',
    //           description: t(
    //             'BusinessCommunity.submenus.inclusion.description'
    //           ),
    //         },
    //       ],
    //     },
    //   ],
    // },
    {
      groupLabel: '',
      menus: [
        {
          href: '/community-contribution',
          label: t('CommunityContribution.label'),
          icon: Goal,
          submenus: [
            {
              label: t('CommunityContribution.submenus.introduction.label'),
              href: '/community-contribution/introduction',
              description: t(
                'CommunityContribution.submenus.introduction.description'
              ),
            },
            {
              label: t('CommunityContribution.submenus.howItWorks.label'),
              href: '/community-contribution/how-it-works',
              description: t(
                'CommunityContribution.submenus.howItWorks.description'
              ),
            },
          ],
        },
      ],
    },
  ]
}
