import React, { ReactNode, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import PartyPeoples from '@/assets/images/backgrounds/party_peoples.webp'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const pages = {
  community: 'community',
  commonMan: 'commonMan',
  professionals: 'professionals',
  business: 'business',
}

const pageOrder = [
  pages.community,
  pages.commonMan,
  pages.professionals,
  pages.business,
]

interface PageWrapperProps {
  children: ReactNode
  direction: number
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children, direction }) => (
  <motion.div
    initial={{ x: 100 * direction, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    exit={{ x: -100 * direction, opacity: 0 }}
    transition={{
      type: 'tween',
      stiffness: 600,
      damping: 30,
    }}
    className='absolute my-4 w-full'
  >
    {children}
  </motion.div>
)

const CommunityPage = ({ direction }: { direction: number }) => {
  const { t } = useTranslation('homePage')
  return (
    <PageWrapper direction={direction}>
      <Card className='border-0 bg-background text-foreground shadow-sm'>
        <CardContent className='p-4 sm:p-6'>
          <div className='grid gap-4 sm:gap-8 md:grid-cols-2'>
            <div className='space-y-3 sm:space-y-6'>
              <h1 className='text-2xl font-bold text-primary sm:text-4xl'>
                {t('communityContribution.joinCommunity.title')}
              </h1>
              <h2 className='text-lg font-semibold text-foreground sm:text-2xl'>
                {t('communityContribution.joinCommunity.subtitle')}
              </h2>
              <p className='text-sm text-muted-foreground sm:text-lg'>
                {t('communityContribution.joinCommunity.description')}
              </p>
            </div>
            <div className='relative h-40 overflow-hidden rounded-lg sm:h-[340px]'>
              <img
                src={PartyPeoples}
                alt='Community members'
                className='h-full w-full object-cover'
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </PageWrapper>
  )
}

const CommonManPage = ({ direction }: { direction: number }) => {
  const { t } = useTranslation('homePage')
  return (
    <PageWrapper direction={direction}>
      <Card className='border-0 bg-background text-foreground shadow-sm'>
        <CardContent className='p-4 sm:p-6'>
          <div className='grid gap-4 sm:gap-8 md:grid-cols-2'>
            <div className='space-y-3 sm:space-y-6'>
              <h1 className='text-2xl font-bold text-primary sm:text-4xl'>
                {t('communityContribution.commonMan.title')}
              </h1>
              <p className='text-sm text-muted-foreground sm:text-lg'>
                {t('communityContribution.commonMan.description')}
              </p>
            </div>
            <div className='relative h-40 overflow-hidden rounded-lg sm:h-[340px]'>
              <img
                src='https://t3.ftcdn.net/jpg/06/55/37/80/360_F_655378099_vsRBlmC6U5Jl4JTMVjrD8tTI1piTf413.jpg'
                alt='Common citizens'
                className='h-full w-full object-cover'
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </PageWrapper>
  )
}

const ProfessionalsPage = ({ direction }: { direction: number }) => {
  const { t } = useTranslation('homePage')
  return (
    <PageWrapper direction={direction}>
      <Card className='border-0 bg-background text-foreground shadow-sm'>
        <CardContent className='p-4 sm:p-6'>
          <div className='grid gap-4 sm:gap-8 md:grid-cols-2'>
            <div className='space-y-3 sm:space-y-6'>
              <h1 className='text-2xl font-bold text-primary sm:text-4xl'>
                {t('communityContribution.professionals.title')}
              </h1>
              <p className='text-sm text-muted-foreground sm:text-lg'>
                {t('communityContribution.professionals.description')}
              </p>
            </div>
            <div className='relative h-40 overflow-hidden rounded-lg sm:h-[340px]'>
              <img
                src='https://static.toiimg.com/thumb/msid-47318184,imgsize-21094,width-400,resizemode-4/47318184.jpg'
                alt='Professional members'
                className='h-full w-full object-cover'
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </PageWrapper>
  )
}

const BusinessPage = ({ direction }: { direction: number }) => {
  const { t } = useTranslation('homePage')
  return (
    <PageWrapper direction={direction}>
      <Card className='border-0 bg-background text-foreground shadow-sm'>
        <CardContent className='p-4 sm:p-6'>
          <div className='grid gap-4 sm:gap-8 md:grid-cols-2'>
            <div className='space-y-3 sm:space-y-6'>
              <h1 className='text-2xl font-bold text-primary sm:text-4xl'>
                {t('communityContribution.business.title')}
              </h1>
              <p className='text-sm text-muted-foreground sm:text-lg'>
                {t('communityContribution.business.description')}
              </p>
            </div>
            <div className='relative h-40 overflow-hidden rounded-lg sm:h-[340px]'>
              <img
                src='https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnVzaW5lc3MlMjBjb21tdW5pdHl8ZW58MHx8MHx8fDA%3D'
                alt='Business community members'
                className='h-full w-full object-cover'
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </PageWrapper>
  )
}

const CommunityContributionSection = () => {
  const [currentPage, setCurrentPage] = useState(pages.community)
  const [slideDirection, setSlideDirection] = useState(1)
  const { t } = useTranslation('homePage')

  const navigateToPage = (newPage: string) => {
    const currentIndex = pageOrder.indexOf(currentPage)
    const newIndex = pageOrder.indexOf(newPage)
    const direction = newIndex > currentIndex ? 1 : -1
    setSlideDirection(direction)
    setCurrentPage(newPage)
  }

  const renderPage = () => {
    const props = { direction: slideDirection }

    switch (currentPage) {
      case pages.community:
        return <CommunityPage key='community' {...props} />
      case pages.commonMan:
        return <CommonManPage key='commonMan' {...props} />
      case pages.professionals:
        return <ProfessionalsPage key='professionals' {...props} />
      case pages.business:
        return <BusinessPage key='business' {...props} />
      default:
        return <CommunityPage key='community' {...props} />
    }
  }

  return (
    <div className='mx-auto w-full max-w-7xl bg-background p-2 py-6 text-foreground sm:p-4 sm:py-8'>
      <div className='mb-4 flex flex-wrap gap-2 sm:mb-8 sm:gap-4'>
        <Button
          variant={currentPage === pages.community ? 'default' : 'secondary'}
          className={
            currentPage === pages.community
              ? 'border border-[#2563ec] bg-[#2563ec] text-primary-foreground hover:bg-[#2563ec]/90'
              : 'border border-[#2563ec] text-[#2563ec]'
          }
          onClick={() => navigateToPage(pages.community)}
        >
          {t('communityContribution.buttons.communityContribution')}
        </Button>
        <Button
          variant={currentPage === pages.commonMan ? 'default' : 'secondary'}
          className={
            currentPage === pages.commonMan
              ? 'border border-[#2563ec] bg-[#2563ec] text-primary-foreground hover:bg-[#2563ec]/90'
              : 'border border-[#2563ec] text-[#2563ec]'
          }
          onClick={() => navigateToPage(pages.commonMan)}
        >
          {t('communityContribution.buttons.commonMan')}
        </Button>
        <Button
          variant={
            currentPage === pages.professionals ? 'default' : 'secondary'
          }
          className={
            currentPage === pages.professionals
              ? 'border border-[#2563ec] bg-[#2563ec] text-primary-foreground hover:bg-[#2563ec]/90'
              : 'border border-[#2563ec] text-[#2563ec]'
          }
          onClick={() => navigateToPage(pages.professionals)}
        >
          {t('communityContribution.buttons.professionals')}
        </Button>
        <Button
          variant={currentPage === pages.business ? 'default' : 'secondary'}
          className={
            currentPage === pages.business
              ? 'border border-[#2563ec] bg-[#2563ec] text-primary-foreground hover:bg-[#2563ec]/90'
              : 'border border-[#2563ec] text-[#2563ec]'
          }
          onClick={() => navigateToPage(pages.business)}
        >
          {t('communityContribution.buttons.businessCommunity')}
        </Button>
      </div>

      <div className='relative h-60 overflow-hidden sm:h-[400px]'>
        <AnimatePresence mode='wait' initial={false}>
          {renderPage()}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default CommunityContributionSection
