import img1 from '@/assets/images/backgrounds/sliders/EMPLOYMENT & ECONOMIC GROWTH.jpeg'
import HeaderComponent from '@/components/layout/common/HeaderComponent'

const EmploymentAndEconomicGrowth = () => {
  return (
    <>
      <HeaderComponent
        heading='OUR GOALS'
        text='Employment and Economic Growth'
        breadcrumbLinks={[
          { label: 'Home', href: '/' },
          { label: 'About', href: '/about' },
          { label: 'BPP Goals', href: '/about/bpp-goals' },
          {
            label: 'Employment and Economic Growth',
            href: '/about/bpp-goals/employment-and-economic-growth',
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
              At Bharatiya Popular Party, our mission is to build an economy
              that works for every citizen, ensuring that all individuals have
              access to decent jobs, fair wages, and improved working
              conditions.
            </p>
            <p className='my-2'>
              We are committed to create sustainable economic growth through
              innovative policies that prioritize overall development. Our focus
              is on empowering local communities, particularly in rural areas,
              by providing the tools, skills, and opportunities needed in a
              rapidly changing world.
            </p>
            <p className='my-2'>
              We aim to build a prosperous nation where everyone, regardless of
              background or location, can contribute to the betterment of
              society.
            </p>
          </div>

          {/* In Our Local Community */}
          <div className='mt-8'>
            <h3 className='mb-4 text-left text-2xl font-extrabold sm:text-3xl'>
              In Our Local Community:
            </h3>
            <p>
              We are dedicated to driving economic empowerment and promoting job
              growth. We aim to
            </p>
            <ul className='mt-4 list-inside list-disc leading-relaxed'>
              <li>
                <span className='font-bold'>Support</span> local businesses,
                professionals and entrepreneurs to stimulate grassroots job
                creation through community contribution.
              </li>
              <li>
                <span className='font-bold'>Launch</span> skill development and
                vocational training programs to prepare the local workforce for
                emerging industries.
              </li>
              <li>
                <span className='font-bold'>Improve</span> access to
                microfinance and resources for small enterprises, especially in
                rural areas.
              </li>
              <li>
                <span className='font-bold'>Strengthen</span> worker protections
                and ensure fair wages in local industries.
              </li>
              <li>
                <span className='font-bold'>Encourage</span> community-driven
                projects that create long- term employment.
              </li>
            </ul>
          </div>

          {/* Stateside */}
          <div className='mt-8'>
            <h3 className='mb-4 text-left text-2xl font-extrabold sm:text-3xl'>
              Stateside:
            </h3>
            <p className='my-2 font-bold'>
              We are focused on promoting such economic policies across the
              nation that encourage growth and job creation. We believe in:
            </p>
            <ul className='list-inside list-disc leading-relaxed'>
              <li>
                <span className='font-bold'>Creating</span> state-level economic
                plans to leverage regional strengths and resources for job
                growth.
              </li>
              <li>
                <span className='font-bold'>Bridging</span> the urban-rural
                divide by investing in infrastructure, connectivity and
                education across all states.
              </li>
              <li>
                <span className='font-bold'>Ensuring</span> equal job
                opportunities across caste, gender and economic backgrounds.
              </li>
              <li>
                <span className='font-bold'>Providing</span> incentives to
                industries that generate large- scale employment and contribute
                to regional development.
              </li>
            </ul>
          </div>

          {/* Global Section */}
          <div className='mt-8'>
            <h3 className='mb-4 text-left text-2xl font-extrabold sm:text-3xl'>
              Around the World
            </h3>
            <p>
              At the global front, we believe in building partnerships that
              promote economic growth and job creation. Our vision is to:
            </p>
            <ul className='mt-4 list-inside list-disc leading-relaxed'>
              <li>
                <span className='font-bold'>Promote</span> international trade
                agreements that benefit Indian workers and industries.
              </li>
              <li>
                <span className='font-bold'>Build</span> global economic
                partnerships to create new markets for Indian products and
                services.
              </li>
              <li>
                <span className='font-bold'>Support</span> sustainable and
                ethical labour practices worldwide.
              </li>
              <li>
                <span className='font-bold'>Collaborate</span> with
                international organizations to bring investment and job creation
                into India’s economy.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}

export default EmploymentAndEconomicGrowth
