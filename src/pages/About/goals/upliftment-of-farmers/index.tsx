import img3 from '@/assets/images/backgrounds/sliders/UPLIFTMENT OF FARMERS.jpeg'
import HeaderComponent from '@/components/layout/common/HeaderComponent'

const UpliftmentOfFarmersPage = () => {
  return (
    <>
      <HeaderComponent
        heading='OUR GOALS'
        text='Upliftment of Farmers'
        breadcrumbLinks={[
          { label: 'Home', href: '/' },
          { label: 'About', href: '/about' },
          { label: 'BPP Goals', href: '/about/bpp-goals' },
          {
            label: 'Upliftment of Farmers',
            href: '/about/bpp-goals/upliftment-of-farmers',
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
              We as a Party, are dedicated to the upliftment of farmers, who are
              the backbone of our nation.
              <span className='font-bold'>
                {' '}
                Our vision is a future where farming is dignified, profitable,
                and environmentally responsible
              </span>{' '}
              and to ensure that they receive fair compensation for their hard
              work and have access to modern farming.
            </p>
            <p className='my-2'>
              By prioritizing sustainable agricultural practices, improved
              market access, and timely financial support, we aim to
              significantly raise farmers' incomes and secure their livelihoods.
            </p>
          </div>

          {/* In Our Local Community */}
          <div className='mt-8'>
            <h3 className='mb-4 text-left text-2xl font-extrabold sm:text-3xl'>
              In Our Local Community:
            </h3>
            <p>
              We are committed to work closely with farmers to bring about real
              change in their lives.
            </p>
            <p className='font-bold'>We aim to:</p>
            <ul className='mt-4 list-inside list-disc'>
              <li>
                Facilitate direct market linkages to eliminate middlemen and
                ensure fair prices for farmers produce
              </li>
              <li>
                Improve local infrastructure, such as irrigation, storage, and
                transportation, to reduce losses and boost productivity
              </li>
              <li>
                Establish farmer support centres for easy access to loans, aids,
                insurance, and government schemes
              </li>
            </ul>
            <p className='my-2 font-bold'>
              Our commitment is to empower every farmer in our community with
              the tools, knowledge, and support needed to grow.
            </p>
          </div>

          {/* Stateside */}
          <div className='mt-8'>
            <h3 className='mb-4 text-left text-2xl font-extrabold sm:text-3xl'>
              Stateside:
            </h3>
            <p>
              We aim to transform agriculture into a more rewarding sector
              across the states.
            </p>
            <p>
              We believe that the state's prosperity is deeply connected to the
              well-being of its farmers, and we are committed to make
              agriculture a viable and respected profession for future
              generations.
            </p>
            <p className='my-2 font-bold'>We are focused on:</p>
            <ul className='mt-4 list-inside list-disc'>
              <li>
                <span className='font-bold'>Strengthening</span> rural
                infrastructure including cold chains, storage facilities, and
                market access roads
              </li>
              <li>
                <span className='font-bold'>Expanding</span> agricultural
                services to reach every farmer with modern techniques and timely
                advice
              </li>
              <li>
                <span className='font-bold'>Ensuring </span> fast, hassle-free
                access to loans, subsidies, and crop insurance to protect
                farmers from market and climate shocks
              </li>
            </ul>
          </div>

          {/* Global Section */}
          <div className='mt-8'>
            <h3 className='mb-4 text-left text-2xl font-extrabold sm:text-3xl'>
              Around the World
            </h3>

            <p className='my-2 font-bold'>
              Globally, we recognize the importance of aligning our agricultural
              vision with international best practices.
            </p>

            <p className='my-2'>We aim to:</p>
            <ul className='mt-4 list-inside list-disc'>
              <li>
                <span className='font-bold'>Collaborate</span> with global
                institutions to bring the latest technology and knowledge to our
                farmers
              </li>

              <li>
                <span className='font-bold'>Promote</span> Indian agricultural
                exports by improving standards, quality, and global market
                access
              </li>

              <li>
                <span className='font-bold'>Take a leading role </span> on food
                security, sustainable farming and preferred source of agri and
                food supply.{' '}
              </li>
            </ul>
          </div>
          <p className='my-2 font-bold'>
            By uplifting our farmers, we not only secure India's food future but
            also contribute to global efforts for sustainable agriculture. A
            strong, self-reliant Indian farming community adds to the world’s
            confidence in India as a responsible, progressive nation.
          </p>
        </div>
      </section>
    </>
  )
}

export default UpliftmentOfFarmersPage
