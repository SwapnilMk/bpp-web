import SessionManager from '@/features/settings/sessions/session-manager'
import ContentSection from '../components/content-section'

const SessionsPage = () => {
  return (
    <ContentSection
      title='Sessions'
      desc='Manage your active sessions across different devices'
    >
      <SessionManager />
    </ContentSection>
  )
}

export default SessionsPage
