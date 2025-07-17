import React, { FC } from 'react'
import { Link } from '@tanstack/react-router'
import {
  BadgeDollarSign,
  Building2,
  Church,
  Factory,
  GraduationCap,
  Heart,
  Scale,
  Sword,
  Users,
  Wheat,
  LucideIcon,
} from 'lucide-react'
import img7 from '@/assets/images/backgrounds/sliders/EMPLOYMENT & ECONOMIC GROWTH.jpeg'
import img2 from '@/assets/images/backgrounds/sliders/EQUAL OPPORTUNITY AND GENDER EQUALITY.jpeg'
import img4 from '@/assets/images/backgrounds/sliders/GAINST MUSCLE AND MONEY POWER.webp'
import img3 from '@/assets/images/backgrounds/sliders/GOOD HEALTH AND WELL-BEING.jpeg'
import img5 from '@/assets/images/backgrounds/sliders/INDIA UPHOLD SECULARISM .jpeg'
import img6 from '@/assets/images/backgrounds/sliders/INDUSTRIAL DEVELOPMENT & INFRASTRUCTURE.jpeg'
import img8 from '@/assets/images/backgrounds/sliders/JUSTICE, PEACE, CALM AND PROSPERITY.jpeg'
import img1 from '@/assets/images/backgrounds/sliders/NATIONAL INTEGRITY.jpeg'
import img10 from '@/assets/images/backgrounds/sliders/QUALITY EDUCATION.jpg'
import img9 from '@/assets/images/backgrounds/sliders/UPLIFTMENT OF FARMERS.jpeg'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import HeaderComponent from '@/components/layout/common/HeaderComponent'

interface Goal {
  title: string
  description: string
  imgSrc: string
  icon: LucideIcon
  link: string
}

const GoalCard: FC<Goal> = ({ title, description, imgSrc, icon, link }) => {
  return (
    <Link to={link} className='w-full'>
      <Card className='flex h-[500px] flex-col justify-between overflow-hidden border bg-white transition-all duration-300 hover:bg-gray-50 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700'>
        {/* Image */}
        <div className='relative h-48 overflow-hidden'>
          <img
            className='h-full w-full object-cover object-center'
            src={imgSrc}
            alt={title}
          />
        </div>

        {/* Header */}
        <CardHeader className='space-y-4 pt-6'>
          <div className='flex items-center gap-4'>
            <div className='rounded-xl bg-primary/10 p-3 text-primary shadow-sm dark:bg-primary/20'>
              {React.createElement(icon, {
                size: 28,
                className: 'text-primary dark:text-white',
              })}
            </div>
            <h2 className='text-left font-poppins text-xl font-extrabold tracking-tight text-gray-900 dark:text-white'>
              {title}
            </h2>
          </div>
        </CardHeader>

        {/* Description */}
        <CardContent className='flex-grow'>
          <p className='line-clamp-5 text-left text-sm leading-relaxed text-muted-foreground dark:text-gray-300'>
            {description}
          </p>
        </CardContent>

        {/* Learn More (visually implied by hover now) */}
        <CardContent className='pb-6 pt-4'>
          <span className='text-sm font-medium text-blue-600 hover:underline dark:text-blue-400'>
            Learn more →
          </span>
        </CardContent>
      </Card>
    </Link>
  )
}

const GoalsPage = () => {
  const goals = [
    {
      title: 'NATIONAL INTEGRITY',
      description:
        'BPP shall bear true faith and allegiance to the constitution of India as by law established, and to the principles of socialism, secularism and democracy and would uphold the sovereignty, unity and integrity of India.',
      imgSrc: img1,
      icon: Building2,
      link: '/about/bpp-goals/national-integrity',
    },
    {
      title: 'EQUAL OPPORTUNITY AND GENDER EQUALITY',
      description:
        'BPP is committed to the task of building a developed democratic India based on principle of equal opportunity to all citizens. The party will lay special emphasis on improving the condition of socially and economically disadvantaged sections of society.',
      imgSrc: img2,
      icon: Users,
      link: '/about/bpp-goals/equal-opportunity-and-gender-equality',
    },
    {
      title: 'GOOD HEALTH AND WELL-BEING',
      description:
        'BPP will work to provide quality health facilities to all citizens, ensuring that every individual has access to health services that improve their quality of life.',
      imgSrc: img3,
      icon: Heart,
      link: '/about/bpp-goals/good-health-and-well-being',
    },
    {
      title: 'AGAINST MUSCLE AND MONEY POWER',
      description:
        'BPP will work against the misuse of money and muscle power in democratic politics.',
      imgSrc: img4,
      icon: Sword,
      link: '/about/bpp-goals/against-muscle-and-money-power',
    },
    {
      title: 'UPHOLD SECULARISM',
      description:
        'BPP firmly supports secularism and is opposed to the idea of a theocratic state. BPP will work to protect and promote religious harmony and ensure equal rights for all faiths.',
      imgSrc: img5,
      icon: Church,
      link: '/about/bpp-goals/uphold-secularism',
    },
    {
      title: 'INDUSTRIAL DEVELOPMENT & INFRASTRUCTURE',
      description:
        'The goal of the BPP is to promote industrial development and build world-class infrastructure to drive economic development. By modernizing industries, encouraging research and development and enhancing transportation, energy and digital networks, the party aims to create a sustainable competitive economy.',
      imgSrc: img6,
      icon: Factory,
      link: '/about/bpp-goals/industrial-development-and-infrastructure',
    },
    {
      title: 'EMPLOYMENT & ECONOMIC GROWTH',
      description:
        'BPP is committed to promoting decent work and sustained economic growth by creating job opportunities, ensuring fair wages and improving working conditions for all citizens. The party aims to empower individuals particularly in rural and marginalized communities through skill development, entrepreneurship and access to employment.',
      imgSrc: img7,
      icon: BadgeDollarSign,
      link: '/about/bpp-goals/employment-and-economic-growth',
    },
    {
      title: 'JUSTICE, PEACE, CALM AND PROSPERITY',
      description:
        'BPP aims to create a peaceful, just, and prosperous society where all citizens have equal opportunities, security and access to resources. By this goal BPP will uphold individual rights as well as the right to privacy freedom of expression and access to information.',
      imgSrc: img8,
      icon: Scale,
      link: '/about/bpp-goals/justice-peace-calm-and-prosperity',
    },
    {
      title: 'UPLIFTMENT OF FARMERS',
      description:
        "BPP is dedicated to the upliftment of farmers by ensuring fair prices for their product, providing access to modern farming techniques and improving infrastructure in rural areas. The focus will be on increasing farmer's income through better market access, sustainable agricultural practices and timely financial support.",
      imgSrc: img9,
      icon: Wheat,
      link: '/about/bpp-goals/upliftment-of-farmers',
    },
    {
      title: 'QUALITY EDUCATION',
      description:
        'BPP believes that education is one of the most powerful and proven vehicles for sustainable development. The goal is to ensure that all girls and boys complete primary and secondary schooling. It also eliminate gender and wealth disparities and achieve universal access to a quality higher education.',
      imgSrc: img10,
      icon: GraduationCap,
      link: '/about/bpp-goals/quality-education',
    },
  ]

  return (
    <>
      <HeaderComponent
        heading='Bharatiya Popular Party Goals'
        text='Bharatiya Popular Party is dedicated to a united, prosperous India. We fight for equal opportunity, quality healthcare and education, industrial growth and upliftment of farmers. We believe in socialism, secularism and democracy and would uphold the sovereignty, unity and integrity of India.'
        breadcrumbLinks={[
          { label: 'Home', href: '/' },
          { label: 'About', href: '/about' },
          { label: 'BPP Goals', href: '/about/bpp-goals' },
        ]}
        imgUrl={img1}
      />
      <section className='py-8'>
        <div className='container'>
          <div className='mx-auto flex flex-col items-center gap-6 text-center'>
            <div className='grid grid-cols-1 place-items-center gap-8 sm:grid-cols-2 lg:grid-cols-3'>
              {goals.map((goal, index) => (
                <GoalCard
                  key={index}
                  title={goal.title}
                  description={goal.description}
                  imgSrc={goal.imgSrc}
                  icon={goal.icon}
                  link={goal.link}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default GoalsPage
