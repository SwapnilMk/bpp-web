import img3 from '@/assets/images/backgrounds/sliders/GOOD_HEALTH_AND_WELL_BEING.webp'
import HeaderComponent from '@/components/layout/common/HeaderComponent'

const GoodHealthAndWellBeingPage = () => {
  return (
    <>
      <HeaderComponent
        heading='OUR GOALS'
        text='Good Health and Well-Being'
        breadcrumbLinks={[
          { label: 'Home', href: '/' },
          { label: 'About', href: '/about' },
          { label: 'BPP Goals', href: '/about/bpp-goals' },
          {
            label: 'Good Health and Well-Being',
            href: '/about/bpp-goals/good-health-and-well-being',
          },
        ]}
        imgUrl={img3}
      />
      <section className='py-8'>
        <div className='container text-justify text-xs leading-relaxed text-accent-foreground sm:text-sm'>
          {/* Mission Statement */}
          <div>
            <h3 className='mb-4 text-left text-2xl font-extrabold sm:text-3xl'>
              Mission Statement
            </h3>
            <p>
              At <span className='font-semibold'>Bharatiya Popular Party,</span>{' '}
              we believe{' '}
              <span className='font-semibold'>Good Health and Well-Being</span>{' '}
              is not just the absence of illness but a state of complete
              physical, mental, and social wellness. Health is a basic human
              right, essential to individual freedom, economic strength and a
              prosperous society.
            </p>
            <p className='font-bold'>
              We believe{' '}
              <span className='font-semibold'>healthy communities</span> are
              empowered communities, and we are working to make that a reality
              at the grassroots level.
            </p>
            <p>
              Our mission is to ensure that every individual, regardless of
              income, gender or background, has equal access to affordable but
              high-quality healthcare, mental health support and clean
              environments. We recognize that health is deeply connected to
              education, economic prosperity, gender equity and the
              sustainability of our environment.
            </p>
          </div>

          {/* In Our Local Community */}
          <div className='mt-8'>
            <h3 className='mb-4 text-left text-2xl font-extrabold sm:text-3xl'>
              In Our Local Community:
            </h3>
            <p>
              We are committed to building healthy neighborhoods where
              well-being begins at home. Our priorities include:
            </p>
            <ul className='mt-4 list-inside list-disc'>
              <li>
                <span className='font-bold'>Local healthcare access:</span>{' '}
                Strengthening clinics and primary care centers to serve all
                residents — urban and rural alike.
              </li>
              <li>
                <span className='font-bold'>Community mental health:</span>{' '}
                Establishing support systems, helplines, and awareness campaigns
                to eliminate stigma and make mental health services accessible
                and acceptable.
              </li>
              <li>
                <span className='font-bold'>Active, healthy living:</span>{' '}
                Creating walkable spaces, public parks and launching healthy
                eating drives in schools and communities.
              </li>
              <li>
                <span className='font-bold'>Clean environment:</span> Enforcing
                local sanitation, clean drinking water, and pollution control
                measures to improve quality of life.
              </li>
            </ul>
          </div>

          {/* Stateside */}
          <div className='mt-8'>
            <h3 className='mb-4 text-left text-2xl font-extrabold sm:text-3xl'>
              Stateside:
            </h3>
            <p>
              Our strategy is to build a resilient, equitable, and
              forward-looking public health system that serves every citizen
              with dignity. We aim to:
            </p>
            <ul className='mt-4 list-inside list-disc'>
              <li>
                <span className='font-bold'>
                  Implement universal healthcare policies
                </span>{' '}
                with a focus on affordability, access, and efficiency.
              </li>
              <li>
                <span className='font-bold'>
                  Integrate mental health into mainstream healthcare,
                </span>{' '}
                with inclusion of mental health education in school curriculums.
              </li>
              <li>
                <span className='font-bold'>Invest in clean air and water</span>{' '}
                infrastructure to reduce environmental health risks.
              </li>
              <li>
                <span className='font-bold'>
                  Address disparities in healthcare access
                </span>{' '}
                across regions, particularly in remote areas. Through
                innovation, awareness and fair policies, we aim to create a
                healthier and more sustainable future for all citizens in our
                state.
              </li>
            </ul>
          </div>

          {/* Global Section */}
          <div className='mt-8'>
            <h3 className='mb-4 text-left text-2xl font-extrabold sm:text-3xl'>
              Around the World
            </h3>
            <p className='my-2'>
              We believe that India&#39;s progress in Good Health and Well-Being
              can serve as a model for the world. We as a political party, are
              not only committed to improving health within our borders but also
              to inspire and engage the global community in our journey. Our
              vision is to:
            </p>
            <ul className='mt-4 list-inside list-disc'>
              <li>
                <span className='font-bold'>Position India</span> as a global
                leader in affordable healthcare models that can be adopted and
                adapted by other developing nations.
              </li>

              <li>
                <span className='font-bold'>Encourage</span> international
                collaboration, inviting health experts, researchers, innovators,
                and organizations to contribute to India’s health and
                sustainability goals.
              </li>

              <li>
                <span className='font-bold'>Inspire global citizens,</span>{' '}
                especially the Indian settled abroad, to invest in and support
                public health initiatives that benefit people across the
                country.{' '}
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}

export default GoodHealthAndWellBeingPage
