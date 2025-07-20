import { Check } from 'lucide-react'
import commitment from '@/assets/images/headerBanners/commitment.webp'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import HeaderComponent from '@/components/layout/common/HeaderComponent'

const CommitmentToProgress = () => {
  const commitmentPoints = [
    {
      title: 'Industrial Development & Employment',
      description:
        'The BPP supports industrial development, employment opportunities, and business promotion.',
      image:
        'https://commerceclarity.in/wp-content/uploads/2024/10/Untitled-design-2024-10-20T224929.098-1024x576.webp',
    },
    {
      title: 'Secularism, Democracy, and Socialism',
      description:
        'It upholds principles of secularism, democracy, and socialism, avoiding practices that harm societal harmony.',
      image:
        'https://assets.thehansindia.com/h-upload/2024/01/19/1415721-democracy.jpg',
    },
    {
      title: 'Non-violence & Peaceful Campaigns',
      description:
        'Disciplinary rules emphasize non-violence, promoting peaceful campaigns and democratic forms of protests.',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzNcxrlZA0Noybiv_gg_H8Lv_zPFyrO3W6YA&s',
    },
    {
      title: 'Improving Healthcare Accessibility',
      description:
        'Works towards improving healthcare accessibility to the public, ensuring the health sector adopts sustainable practices.',
      image:
        'https://www.openaccessgovernment.org/wp-content/uploads/2020/12/dreamstime_l_109106306.jpg',
    },
    {
      title: 'Citizen Rights & Responsibilities',
      description:
        'Develop programs to educate citizens about their rights and responsibilities and encourage active participation in democratic processes.',
      image:
        'https://static.mygov.in/media/blog/2019/10/blog-inside-pixz-4.jpg',
    },
    {
      title: 'Transparency & Ethical Governance',
      description:
        'Focus on promoting transparency, accountability, and ethical governance, ensuring that citizens are informed and empowered to participate in decision-making processes at all levels of government.',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL4pvDXg5GHA_ZrT3XEwM4xpJU9ChlY4S4qA&s',
    },
  ]

  return (
    <>
      <HeaderComponent
        heading='Commitment to Progress'
        text='Commitment to Progress'
        breadcrumbLinks={[
          { label: 'Home', href: '/' },
          { label: 'About', href: '/about' },
          {
            label: 'Commitment to Progress',
            href: '/about/commitment-progress',
          },
        ]}
        imgUrl={commitment}
      />
      <section className='mx-auto max-w-7xl bg-background py-12'>
        <div className='container mx-auto px-4'>
          <div className='space-y-4'>
            <h1 className='text-3xl font-bold tracking-tight text-foreground sm:text-4xl'>
              Commitment to Progress
            </h1>
            <p className='text-md text-muted-foreground'>
              Our dedication to fostering positive change and sustainable
              development
            </p>
          </div>

          <Separator className='my-8' />

          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
            {commitmentPoints.map((point, index) => (
              <Card
                key={index}
                className='overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl'
              >
                <div className='relative h-48 w-full overflow-hidden'>
                  <img
                    src={point.image}
                    alt={point.title}
                    className='h-full w-full object-cover'
                  />
                </div>
                <CardHeader className='flex flex-row items-center gap-4 p-4'>
                  <div className='flex h-10 w-10 items-center justify-center rounded-full bg-primary/10'>
                    <Check className='h-5 w-5 text-primary' />
                  </div>
                  <h2 className='text-lg font-semibold tracking-tight'>
                    {point.title}
                  </h2>
                </CardHeader>
                <CardContent className='p-4'>
                  <p className='text-sm text-muted-foreground'>
                    {point.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default CommitmentToProgress
