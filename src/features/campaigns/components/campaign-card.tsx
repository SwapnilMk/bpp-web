import { DetailSwapCard } from '@/components/features/detail-swap-card'

interface CampaignCardProps {
  title: string
  slogan: string
  coreMessage: string
  images: { thumbnail: string; alt: string }[]
}

export const CampaignCard = ({
  title,
  slogan,
  coreMessage,
  images,
}: CampaignCardProps) => {
  return (
    <DetailSwapCard
      data={{
        title,
        slogan,
        coreMessage,
        images,
      }}
      showImageCounter={true}
      showDotIndicator={true}
      showThumbnailNavigator={true}
    />
  )
}
