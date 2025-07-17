import FloatingVideo from '@/pages/home/components/floating-video'
import PublicLayout from '@/components/layout/public/PublicLayout'
import Newsletter from './components/Newsletter'
import VisionMission from './components/VisionMission'
import CommunityContributionSection from './components/community-section'
import DownloadSection from './components/download-section'
import PresidentMessage from './components/president-message'
import { HomeSlider } from './components/slider'

function HomePage() {
  return (
    <PublicLayout>
      <HomeSlider />
      <PresidentMessage />
      <DownloadSection />
      <VisionMission />
      <CommunityContributionSection />
      <Newsletter />
      <FloatingVideo />
    </PublicLayout>
  )
}

export default HomePage
