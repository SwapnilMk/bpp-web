import { useNavigate } from '@tanstack/react-router'
import { Building2, Heart, Scale, Users } from 'lucide-react'
import volunteer from '@/assets/images/headerBanners/volunteer.webp'
import { Button } from '@/components/ui/button'
import HeaderComponent from '@/components/layout/common/HeaderComponent'

const Volunteer = () => {
  const navigate = useNavigate()
  return (
    <>
      <HeaderComponent
        heading='Become a Volunteer'
        text=''
        breadcrumbLinks={[
          { label: 'Home', href: '/' },
          { label: 'About', href: '/about' },
          { label: 'Volunteer', href: '/about/volunteer' },
        ]}
        imgUrl={volunteer}
      />

      <div className='my-6'>
        {/* Hero Section */}
        <div className='container max-w-7xl'>
          <div className='mx-auto px-4 md:px-8'>
            <div className=''>
              <h1 className='mb-6 text-2xl font-bold text-gray-800 dark:text-white'>
                Are you{' '}
                <span className='text-[#e75a33]'>18 years or older</span> and
                passionate about making a difference in society?
              </h1>
              <p className='mb-3 text-sm text-gray-800 dark:text-gray-300'>
                The{' '}
                <span className='font-semibold'>
                  Bharatiya Popular Party (BPP)
                </span>{' '}
                invites you to join us as a{' '}
                <span className='font-semibold'>volunteer</span> and contribute
                to building a stronger and prosperous Nation.
              </p>
              <ul className='mb-3 list-inside list-disc text-sm text-gray-800 dark:text-gray-300'>
                <li className='mb-2'>
                  Should share and commit to the principles of{' '}
                  <span className='font-semibold'>
                    democracy, secularism, and socialism
                  </span>
                  .
                </li>
                <li className='mb-2'>
                  Be a part of initiatives that uplift marginalized sections of
                  society.
                </li>
                <li className='mb-2'>
                  Work towards equal opportunities and improving access to
                  education, healthcare, and employment.
                </li>
              </ul>
              <Button className='bg-[#e75a33] px-5 py-4 text-lg text-white hover:bg-[#e75a33]'>
                Join Now
              </Button>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className='container my-12'>
          <h2 className='mb-10 text-center text-3xl font-bold text-gray-800 dark:text-white'>
            We Believe In
          </h2>
          <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4'>
            {/* Justice */}
            <div className='group transform text-center transition-transform duration-300 hover:scale-105'>
              <div className='mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#e75a33] transition-colors group-hover:bg-[#e75a33]'>
                <Scale className='h-8 w-8 text-white' />
              </div>
              <h3 className='mt-4 text-xl font-bold text-gray-800 transition-colors group-hover:text-[#e75a33] dark:text-white group-hover:dark:text-[#e75a33]'>
                Justice
              </h3>
              <p className='mt-2 text-sm text-gray-600 dark:text-gray-300'>
                Ensuring fairness and equality for everyone in every aspect of
                life.
              </p>
            </div>

            {/* Peace */}
            <div className='group transform text-center transition-transform duration-300 hover:scale-105'>
              <div className='mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#e75a33] transition-colors group-hover:bg-[#e75a33]'>
                <Users className='h-8 w-8 text-white' />
              </div>
              <h3 className='mt-4 text-xl font-bold text-gray-800 transition-colors group-hover:text-[#e75a33] dark:text-white group-hover:dark:text-[#e75a33]'>
                Peace
              </h3>
              <p className='mt-2 text-sm text-gray-600 dark:text-gray-300'>
                Building harmony and fostering understanding among communities.
              </p>
            </div>

            {/* Calm */}
            <div className='group transform text-center transition-transform duration-300 hover:scale-105'>
              <div className='mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#e75a33] transition-colors group-hover:bg-[#e75a33]'>
                <Heart className='h-8 w-8 text-white' />
              </div>
              <h3 className='mt-4 text-xl font-bold text-gray-800 transition-colors group-hover:text-[#e75a33] dark:text-white group-hover:dark:text-[#e75a33]'>
                Calm
              </h3>
              <p className='mt-2 text-sm text-gray-600 dark:text-gray-300'>
                Encouraging mindfulness and inner tranquility for a balanced
                society.
              </p>
            </div>

            {/* Prosperity */}
            <div className='group transform text-center transition-transform duration-300 hover:scale-105'>
              <div className='mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#e75a33] transition-colors group-hover:bg-[#e75a33]'>
                <Building2 className='h-8 w-8 text-white' />
              </div>
              <h3 className='mt-4 text-xl font-bold text-gray-800 transition-colors group-hover:text-[#e75a33] dark:text-white group-hover:dark:text-[#e75a33]'>
                Prosperity
              </h3>
              <p className='mt-2 text-sm text-gray-600 dark:text-gray-300'>
                Striving for economic growth and success for all citizens.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className='bg-[#e75a33] py-12 text-center text-white'>
          <div className='mx-auto max-w-4xl px-4'>
            <p className='text-md text-white-800 mb-8 dark:text-gray-300'>
              Your support holds the power to drive India's development. Let us
              work together towards a world full of opportunities for growth and
              progress. Together, we can rebuild our nation and make it a better
              place to live, work, and thrive.
            </p>
            <Button
              className='bg-white px-4 py-3 text-sm text-black hover:bg-white hover:text-[#e75a33]'
              onClick={() => navigate({ to: '/about/wings' })}
            >
              Become a Volunteer
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Volunteer
