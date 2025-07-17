import { ReactNode } from 'react'
import i18n from '@/modules/I18n/i18n'
import { I18nextProvider } from 'react-i18next'
import CookieConsent from '@/components/common/CookieConsent'
import ChatSupport from '@/components/common/chat-support'
import { HeaderBanner } from './components/header-banner'
import Footer from './footer'
import MainNav from './main-nav'

interface LayoutProps {
  children: ReactNode
}

const PublicLayout = ({ children }: LayoutProps) => {
  return (
    <div>
      <I18nextProvider i18n={i18n}>
        <HeaderBanner />
        <MainNav />
        <main>{children}</main>
        <Footer />
        <CookieConsent />
        <ChatSupport />
      </I18nextProvider>
    </div>
  )
}

export default PublicLayout
