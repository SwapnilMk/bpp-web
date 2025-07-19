import { memo } from 'react'
import campaign1 from '@/assets/images/campaigns/1.png'
import campaign2 from '@/assets/images/campaigns/2.png'
import campaign3 from '@/assets/images/campaigns/3.png'
import campaign4 from '@/assets/images/campaigns/4.png'
import campaign5 from '@/assets/images/campaigns/5.png'
import campaign6 from '@/assets/images/campaigns/6.png'
import { Separator } from '@/components/ui/separator'
import { Main } from '@/components/layout/dashboard/main'
import { CampaignCard } from './components/campaign-card'

const Campaigns = memo(() => {
  return (
    <Main>
      <div className='space-y-4'>
        <h1 className='text-3xl font-bold tracking-tight'>Campaigns</h1>
        <Separator />
        <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-4'>
          <CampaignCard
            title='Ek Anek Ekta'
            slogan='Jab ham Ek-Ek krke Judte Hain, Tab Anek Bante Hain'
            coreMessage="Doctors heal the body. Teachers build minds. Lawyers protect justice. Together, we build the nation — not through speeches, but through service. Unity in diversity isn't just a slogan. It's a strategy. We believe in combining the strength of each Ek (individual) to create a powerful Anek (nation)."
            images={[
              {
                thumbnail: campaign1,
                alt: 'Ek Anek Ekta image 1',
              },
              {
                thumbnail: campaign2,
                alt: 'Ek Anek Ekta image 2',
              },
              {
                thumbnail: campaign3,
                alt: 'Ek Anek Ekta image 3',
              },
            ]}
          />
          <CampaignCard
            title='Ek Anek Ekta'
            slogan='Mool Bharat Ek Hi Hai'
            coreMessage="The future of Bharat is not in the hands of a few, but in the hearts of all. Unity is not just an idea, it's our identity. When you add an Ek to another Ek, it's no longer just two — it becomes strength."
            images={[
              {
                thumbnail: campaign4,
                alt: 'Mool Bharat image 1',
              },
              {
                thumbnail: campaign5,
                alt: 'Mool Bharat image 2',
              },
            ]}
          />
          <CampaignCard
            title='Ek Anek Ekta'
            slogan='Ek Bharat, Samriddh Bharat'
            coreMessage="Unity in diversity isn't just a slogan. It's a strategy. We believe in combining the strength of each Ek (individual) to create a powerful Anek (nation). Together, we can build a prosperous and united India."
            images={[
              {
                thumbnail: campaign6,
                alt: 'Samriddh Bharat image 1',
              },
            ]}
          />
        </div>
      </div>
    </Main>
  )
})

export default Campaigns
