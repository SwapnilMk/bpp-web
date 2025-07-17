import { Link } from '@tanstack/react-router'
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { FaAndroid } from 'react-icons/fa'
import bppFlag from '@/assets/images/logos/bppflag.png'
import { Separator } from '@/components/ui/separator'
import { ThemeSwitch } from '@/components/theme-switch'
import { LanguageToggle } from './components/lang-toggle'
import { LoginToggle } from './components/login-toggle'

type FooterLink = {
  name: string
  href: string
  target?: string
  rel?: string
}

const Footer = () => {
  const { t } = useTranslation('footer')

  const communityContributionsSection: { title: string; links: FooterLink[] } =
    {
      title: t('Footer.communityContributions.title'),
      links: [
        {
          name: t('Footer.communityContributions.links.introduction'),
          href: '/community-contribution/introduction',
        },
        {
          name: t('Footer.communityContributions.links.howItWorks'),
          href: '/community-contribution/how-it-works',
        },
      ],
    }
  const updatesSection: { title: string; links: FooterLink[] } = {
    title: t('Footer.updates.title'),
    links: [
      {
        name: t('Footer.updates.links.updates'),
        href: 'https://www.facebook.com/profile.php?id=61570250152842',
        target: '_blank',
        rel: 'noopener noreferrer',
      },
      {
        name: t('Footer.others.links.privacyPolicy'),
        href: '/privacy-policy',
      },
    ],
  }

  const sections: { title: string; links: FooterLink[] }[] = [
    {
      title: t('Footer.aboutUs.title'),
      links: [
        {
          name: t('Footer.aboutUs.links.howWeWork'),
          href: '/about/how-we-work',
        },
        { name: t('Footer.aboutUs.links.goals'), href: '/about/bpp-goals' },
        { name: t('Footer.aboutUs.links.wings'), href: '/about/wings' },
        {
          name: t('Footer.aboutUs.links.commitmentProgress'),
          href: '/about/commitment-progress',
        },
        {
          name: t('Footer.aboutUs.links.contactUs'),
          href: '/contact',
        },
        { name: t('Footer.aboutUs.links.career'), href: '/about/career' },
        {
          name: t('Footer.aboutUs.links.constitution'),
          href: '/about/constitution',
        },
      ],
    },
    {
      title: t('Footer.membershipArea.title'),
      links: [
        {
          name: t('Footer.membershipArea.links.membersFaq'),
          href: '/membership/faq',
        },
        {
          name: t('Footer.membershipArea.links.membersLogin'),
          href: '/sign-in',
        },
        {
          name: t('Footer.membershipArea.links.membershipPrivileges'),
          href: '/membership/privileges',
        },
        {
          name: t('Footer.membershipArea.links.codeOfConduct'),
          href: '/membership/code-of-conduct',
        },
        {
          name: t('Footer.membershipArea.links.complaints'),
          href: '/membership/complaints',
        },
        {
          name: t('Footer.membershipArea.links.membershipRenewals'),
          href: '/membership/upgrade-renewals',
        },
      ],
    },
  ]

  return (
    <footer className='border-t bg-background'>
      <div className='mx-auto max-w-7xl px-3 py-8'>
        {/* Main Content Grid */}
        <div className='grid grid-cols-1 gap-8 lg:grid-cols-12'>
          {/* Left Column - Logo and Contact Info */}
          <div className='lg:col-span-5'>
            <div className='flex flex-col items-center text-center lg:items-start lg:text-left'>
              <img
                src={bppFlag}
                alt='BPP Flag'
                className='mb-4 h-24 w-auto lg:h-32 lg:w-auto'
              />
              <h3 className='mb-2 text-sm font-bold text-blue-700 dark:text-blue-400'>
                {t('Footer.contactDetails.name')}
              </h3>
              <p className='mb-2 text-xs font-bold text-muted-foreground'>
                {t('Footer.contactDetails.location')}
              </p>
              <p className='text-xs text-muted-foreground'>
                {t('Footer.contactDetails.description')}
              </p>
            </div>
          </div>

          {/* Right Column - Navigation Sections */}
          <div className='lg:col-span-7'>
            <div className='grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3'>
              {/* Regular sections */}
              {sections.map((section, sectionIdx) => (
                <div key={sectionIdx} className='space-y-1'>
                  <h3 className='text-xs font-bold text-foreground'>
                    {section.title}
                  </h3>
                  <ul className='space-y-1'>
                    {section.links.map((link, linkIdx) => (
                      <li key={linkIdx}>
                        {link.target ? (
                          <a
                            href={link.href}
                            target={link.target}
                            rel={link.rel}
                            className='text-xs text-muted-foreground transition-colors hover:text-primary hover:underline'
                          >
                            {link.name}
                          </a>
                        ) : (
                          <Link
                            to={link.href}
                            className='text-xs text-muted-foreground transition-colors hover:text-primary hover:underline'
                          >
                            {link.name}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* Desktop: Community Contributions and Updates stacked in one column */}
              <div className='hidden flex-col space-y-6 md:flex'>
                <div className='space-y-1'>
                  <h3 className='text-xs font-bold text-foreground'>
                    {communityContributionsSection.title}
                  </h3>
                  <ul className='space-y-1'>
                    {communityContributionsSection.links.map(
                      (link, linkIdx) => (
                        <li key={linkIdx}>
                          <Link
                            to={link.href}
                            className='text-xs text-muted-foreground transition-colors hover:text-primary hover:underline'
                          >
                            {link.name}
                          </Link>
                        </li>
                      )
                    )}
                  </ul>
                </div>
                <div className='space-y-1'>
                  <h3 className='text-xs font-bold text-foreground'>
                    {updatesSection.title}
                  </h3>
                  <ul className='space-y-1'>
                    {updatesSection.links.map((link, linkIdx) => (
                      <li key={linkIdx}>
                        {link.target ? (
                          <a
                            href={link.href}
                            target={link.target}
                            rel={link.rel}
                            className='text-xs text-muted-foreground transition-colors hover:text-primary hover:underline'
                          >
                            {link.name}
                          </a>
                        ) : (
                          <Link
                            to={link.href}
                            className='text-xs text-muted-foreground transition-colors hover:text-primary hover:underline'
                          >
                            {link.name}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Mobile: Community Contributions and Updates side by side */}
              <div className='col-span-2 grid grid-cols-2 gap-4 md:hidden'>
                <div className='space-y-1'>
                  <h3 className='text-xs font-bold text-foreground'>
                    {communityContributionsSection.title}
                  </h3>
                  <ul className='space-y-1'>
                    {communityContributionsSection.links.map(
                      (link, linkIdx) => (
                        <li key={linkIdx}>
                          <Link
                            to={link.href}
                            className='block text-xs text-muted-foreground transition-colors hover:text-primary hover:underline'
                          >
                            {link.name}
                          </Link>
                        </li>
                      )
                    )}
                  </ul>
                </div>
                <div className='space-y-1'>
                  <h3 className='text-xs font-bold text-foreground'>
                    {updatesSection.title}
                  </h3>
                  <ul className='space-y-1'>
                    {updatesSection.links.map((link, linkIdx) => (
                      <li key={linkIdx}>
                        {link.target ? (
                          <a
                            href={link.href}
                            target={link.target}
                            rel={link.rel}
                            className='block text-xs text-muted-foreground transition-colors hover:text-primary hover:underline'
                          >
                            {link.name}
                          </a>
                        ) : (
                          <Link
                            to={link.href}
                            className='block text-xs text-muted-foreground transition-colors hover:text-primary hover:underline'
                          >
                            {link.name}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator className='my-6' />

        {/* Bottom Section - Controls and Social */}
        <div className='flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between'>
          <div className='flex flex-col items-center gap-4 lg:flex-row lg:gap-6'>
            <div className='flex items-center gap-3'>
              <LanguageToggle />
              <ThemeSwitch />
              <LoginToggle />
            </div>
            <div className='flex gap-2'>
              <a
                href='https://x.com/BharatiyaP20295'
                target='_blank'
                rel='noopener noreferrer'
                className='flex h-8 w-8 items-center justify-center rounded-full bg-muted text-blue-700 transition-colors hover:bg-blue-100 hover:text-blue-800'
              >
                <TwitterIcon className='h-4 w-4' />
              </a>
              <a
                href='https://www.facebook.com/profile.php?id=61570250152842'
                target='_blank'
                rel='noopener noreferrer'
                className='flex h-8 w-8 items-center justify-center rounded-full bg-muted text-blue-700 transition-colors hover:bg-blue-100 hover:text-blue-800'
              >
                <FacebookIcon className='h-4 w-4' />
              </a>
              <a
                href='https://www.instagram.com/bharatiyapopularparty'
                target='_blank'
                rel='noopener noreferrer'
                className='flex h-8 w-8 items-center justify-center rounded-full bg-muted text-blue-700 transition-colors hover:bg-blue-100 hover:text-blue-800'
              >
                <InstagramIcon className='h-4 w-4' />
              </a>
              <a
                href='https://www.linkedin.com/in/bharatiya-popular-party-b28543340/'
                target='_blank'
                rel='noopener noreferrer'
                className='flex h-8 w-8 items-center justify-center rounded-full bg-muted text-blue-700 transition-colors hover:bg-blue-100 hover:text-blue-800'
              >
                <LinkedinIcon className='h-4 w-4' />
              </a>
            </div>
          </div>
          <div className='flex justify-center lg:justify-end'>
            <a
              href='https://bppdatabase.s3.ap-south-1.amazonaws.com/app/BPP.apk'
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center gap-2 rounded-lg bg-blue-700 px-4 py-2 text-white transition-colors hover:bg-blue-800 focus:ring-2 focus:ring-blue-300 dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-blue-600'
            >
              <FaAndroid className='h-4 w-4 text-white' />
              <div>
                <div className='text-xs'>{t('Footer.downloadApp.text')}</div>
                <div className='text-sm font-semibold'>
                  {t('Footer.downloadApp.android')}
                </div>
              </div>
            </a>
          </div>
        </div>

        <Separator className='my-6' />

        <div className='flex flex-col gap-4 text-center lg:flex-row lg:items-center lg:justify-between lg:text-left'>
          <p className='text-xs text-muted-foreground'>
            {t('Footer.contactDetails.copyright')}
          </p>
          <ul className='flex flex-wrap justify-center gap-4 text-xs text-muted-foreground lg:gap-6'>
            <li>
              <Link
                to='/'
                className='font-medium transition-colors hover:text-primary'
              >
                {t('Footer.footerLinks.siteMap')}
              </Link>
            </li>
            <li>
              <Link
                to='/terms-and-conditions'
                className='font-medium transition-colors hover:text-primary'
              >
                {t('Footer.footerLinks.termsConditions')}
              </Link>
            </li>
            <li>
              <Link
                to='/'
                className='font-medium transition-colors hover:text-primary'
              >
                {t('Footer.footerLinks.cookies')}
              </Link>
            </li>
            <li>
              <Link
                to='/'
                className='font-medium transition-colors hover:text-primary'
              >
                {t('Footer.footerLinks.feedback')}
              </Link>
            </li>
            <li>
              <Link
                to='/'
                className='font-medium transition-colors hover:text-primary'
              >
                {t('Footer.footerLinks.disclaimer')}
              </Link>
            </li>
            <li>
              <Link
                to='/contact'
                className='font-medium transition-colors hover:text-primary'
              >
                {t('Footer.footerLinks.contactUs')}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer
