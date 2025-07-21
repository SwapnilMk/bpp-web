import img1 from '@/assets/images/backgrounds/sliders/INDUSTRIAL_DEVELOPMENT_INFRASTRUCTURE.webp'
import HeaderComponent from '@/components/layout/common/HeaderComponent'

const IndustrialDevelopmentAndInfrastructure = () => {
  return (
    <>
      <HeaderComponent
        heading='OUR GOALS'
        text='Industrial Development and Infrastructure'
        breadcrumbLinks={[
          { label: 'Home', href: '/' },
          { label: 'About', href: '/about' },
          { label: 'BPP Goals', href: '/about/bpp-goals' },
          {
            label: 'Industrial Development and Infrastructure',
            href: '/about/bpp-goals/industrial-development-and-infrastructure',
          },
        ]}
        imgUrl={img1}
      />
      <section className='py-8'>
        <div className='container text-justify text-xs leading-relaxed text-accent-foreground sm:text-sm'>
          {/* Mission Statement */}
          <div>
            <h3 className='mb-4 text-left text-2xl font-extrabold sm:text-3xl'>
              Mission Statement
            </h3>
            <p>
              We at Bharatiya Popular Party, are committed to drive inclusive
              and sustainable economic growth by championing industrial
              development and building world-class infrastructure.
            </p>
            <p className='my-2'>
              <span className='font-bold'>
                Through modernization, innovation, and connectivity,
              </span>{' '}
              we aim to create the industries, generate employment and position
              our economy for long-term success. Our focus is on introducing
              advanced research and development, enhancing transport and energy
              systems, and accelerating digital transformation to unlock new
              opportunities for all.
            </p>
          </div>

          {/* In Our Local Community */}
          <div className='mt-8'>
            <h3 className='mb-4 text-left text-2xl font-extrabold sm:text-3xl'>
              In Our Local Community:
            </h3>
            <p>
              We believe that true progress begins at the grassroots. Hence, we
              aim to prioritize the development in our local communities,
            </p>
            <ul className='mt-4 list-inside list-disc leading-relaxed'>
              <li>
                <span className='font-bold'>Support</span> spaces that welcome
                all belief systems and protect individuals from religious bias.
              </li>
              <li>
                <span className='font-bold'>
                  Invest in local infrastructure:
                </span>{' '}
                roads, public transport, electricity, and high-speed internet.
              </li>
              <li>
                <span className='font-bold'>
                  Facilitate vocational training
                </span>{' '}
                and skill development aligned with local industry needs and
                encourage youth- led startups, innovation in technology and
                manufacturing.
              </li>
              <li>
                <span className='font-bold'>Strengthen linkages</span> between
                educational institutions and local businesses.
              </li>
            </ul>
          </div>

          {/* Stateside */}
          <div className='mt-8'>
            <h3 className='mb-4 text-left text-2xl font-extrabold sm:text-3xl'>
              Stateside:
            </h3>
            <p className='my-2'>
              Across the state, we envision a strong industrial ecosystem
              supported by modern infrastructure. We aim to:
            </p>
            <ul className='list-inside list-disc leading-relaxed'>
              <li>
                <span className='font-bold'>Establish</span> industrial
                corridors and special economic zones to attract domestic and
                international investment.
              </li>
              <li>
                <span className='font-bold'>Upgrade</span> major transportation
                networks including highways, railways, and logistics hubs.
              </li>
              <li>
                <span className='font-bold'>Modernize</span> ports and airports
                to increase trade efficiency.
              </li>
              <li>
                <span className='font-bold'>Expand</span> access to clean,
                reliable, and sustainable energy for industries and households.
              </li>
              <li>
                <span className='font-bold'>Promote</span> research and
                development through state- funded innovation centres and
                encourage high-value manufacturing and green technologies.
              </li>
              <li>
                <span className='font-bold'>Simplify</span> regulations and
                compliances to improve ease for industries.
              </li>
            </ul>
          </div>

          {/* Global Section */}
          <div className='mt-8'>
            <h3 className='mb-4 text-left text-2xl font-extrabold sm:text-3xl'>
              Around the World
            </h3>
            <p>
              We aim to position our nation as a competitive player in
              international markets. We believe in building infrastructure that
              not only connects our cities, but connects Indian economy to the
              world, ensuring we are future-ready and globally relevant. We aim
              to:
            </p>
            <ul className='mt-4 list-inside list-disc leading-relaxed'>
              <li>
                <span className='font-bold'>Position</span> India as a globally
                competitive industrial and innovation hub.
              </li>
              <li>
                <span className='font-bold'>Support</span> export-oriented
                industries and improve product standards to meet global
                benchmarks.
              </li>
              <li>
                <span className='font-bold'>Promote</span> foreign direct
                investment (FDI) through global outreach and investor summits.
              </li>
              <li>
                <span className='font-bold'>Integrate</span> our infrastructure
                with global trade routes and digital networks.
              </li>
              <li>
                <span className='font-bold'>Encourage</span> practices to meet
                international climate and development goals.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}

export default IndustrialDevelopmentAndInfrastructure
