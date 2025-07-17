import { useTranslation } from 'react-i18next'

type FooterLink = { label: string; href: string; target?: string; rel?: string }
type Group = {
  title: string
  links: FooterLink[]
}

export function useFooterMenuList(_pathname?: string): Group[] {
  const { t } = useTranslation('footer')

  return [
    {
      title: t('aboutUs.title'),
      links: [
        { label: t('aboutUs.links.goals'), href: '/about/bpp-goals' },
        { label: t('aboutUs.links.howWeWork'), href: '/about/how-we-work' },
        {
          label: t('aboutUs.links.commitmentToProgress'),
          href: '/about/commitment-progress',
        },
        { label: t('aboutUs.links.volunteer'), href: '/about/volunteer' },
      ],
    },
    {
      title: t('membershipArea.title'),
      links: [
        {
          label: t('membershipArea.links.membersFaq'),
          href: '/membership/faq',
        },
        { label: t('membershipArea.links.membersLogin'), href: '/sign-in' },
        {
          label: t('membershipArea.links.membershipPrivileges'),
          href: '/membership/privileges',
        },
        { label: t('membershipArea.links.wings'), href: '/membership/wings' },
        {
          label: t('membershipArea.links.codeOfConduct'),
          href: '/membership/code-of-conduct',
        },
        {
          label: t('membershipArea.links.complaints'),
          href: '/membership/complaints',
        },
        {
          label: t('membershipArea.links.membershipRenewals'),
          href: '/membership/renewals',
        },
      ],
    },
    {
      title: t('businessCommunity.title'),
      links: [
        {
          label: t('businessCommunity.links.vendorSuppliers'),
          href: '/business-community/vendor-suppliers',
        },
        {
          label: t('businessCommunity.links.businessCommunityJoin'),
          href: '/business-community/join',
        },
        {
          label: t('businessCommunity.links.businessVendorDisclosure'),
          href: '/business-community/disclosure',
        },
        {
          label: t('businessCommunity.links.ethicsVendorSupplier'),
          href: '/business-community/ethics',
        },
        {
          label: t('businessCommunity.links.supplierInclusion'),
          href: '/business-community/inclusion',
        },
      ],
    },
    {
      title: t('communityContributions.title'),
      links: [
        {
          label: t('communityContributions.links.introduction'),
          href: '/community-contribution/introduction',
        },
        {
          label: t('communityContributions.links.howItWorks'),
          href: '/community-contribution/how-it-works',
        },
      ],
    },
    {
      title: t('updates.title'),
      links: [
        {
          label: t('updates.links.updates'),
          href: 'https://www.facebook.com/people/Bharatiya-PopularParty/pfbid02QY4GgqxvCbrvyd6F9UEn8H5Lay7zmPMvLuEGLRWEKbYu2vSG8ro6th7s3LsHagfvl/',
          target: '_blank',
          rel: 'noopener noreferrer',
        },
      ],
    },
    {
      title: t('memberSupport.title'),
      links: [
        {
          label: t('memberSupport.links.memberServices'),
          href: '/customer-support',
        },
        { label: t('memberSupport.links.appTechnicalSupport'), href: '#' },
        { label: t('memberSupport.links.accessibility'), href: '#' },
      ],
    },
  ]
}
