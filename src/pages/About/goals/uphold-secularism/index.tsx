import img1 from '@/assets/images/backgrounds/sliders/INDIA UPHOLD SECULARISM .jpeg'
import HeaderComponent from '@/components/layout/common/HeaderComponent'

const UpholdSecularism = () => {
  return (
    <>
      <HeaderComponent
        heading='OUR GOALS'
        text='Uphold Secularism'
        breadcrumbLinks={[
          { label: 'Home', href: '/' },
          { label: 'About', href: '/about' },
          { label: 'BPP Goals', href: '/about/bpp-goals' },
          {
            label: 'Uphold Secularism',
            href: '/about/bpp-goals/uphold-secularism',
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
              We are committed to upholding the basic value of secularism. We
              believe in the complete separation of religion and state, and we
              stand firmly against the establishment of any religiously-biased
              governance model.
            </p>
            <p className='my-2'>
              We are committed is to create a society where every individual,
              regardless of faith, or non-belief, enjoys equal rights, freedom
              and dignity.
            </p>
            <p className='mt-2 font-bold'>We will work to:</p>
            <ul className='list-inside list-disc leading-relaxed'>
              <li>Promote religious harmony and peaceful coexistence.</li>
              <li>
                Protect individuals and communities from religious
                discrimination
              </li>
              <li>
                Ensure that public policy is shaped by rational, and
                constitutional principles and not by religious doctrines.
              </li>
            </ul>
          </div>

          {/* In Our Local Community */}
          <div className='mt-8'>
            <h3 className='mb-4 text-left text-2xl font-extrabold sm:text-3xl'>
              In Our Local Community:
            </h3>
            <p>
              We work to erase the religion based discrimination. We are
              committed to:
            </p>
            <ul className='mt-4 list-inside list-disc leading-relaxed'>
              <li>
                <span className='font-bold'>Create</span> spaces that welcome
                all belief systems and protect individuals from religious bias.
              </li>
              <li>
                <span className='font-bold'>Encourage</span> A united interfaith
                dialogue through local forums, educational programs and
                community partnerships.
              </li>
              <li>
                <span className='font-bold'>Support</span> secular education in
                schools by promoting critical thinking and values over religious
                beliefs.
              </li>
              <li>
                <span className='font-bold'>Establish</span> local initiatives
                that monitor and address religious intolerance, hate speech and
                acts of communal violence.
              </li>
            </ul>
          </div>

          {/* Stateside */}
          <div className='mt-8'>
            <h3 className='mb-4 text-left text-2xl font-extrabold sm:text-3xl'>
              Stateside:
            </h3>
            <p className='my-2 font-bold'>We are focussed to:</p>
            <ul className='list-inside list-disc leading-relaxed'>
              <li>
                <span className='font-bold'>
                  Enforce strict separation of religion and government
                </span>{' '}
                institutions, ensuring no special privileges are given to any
                religion.
              </li>
              <li>
                <span className='font-bold'>
                  Protect the rights of all religious minorities,
                </span>{' '}
                to freely express or not express belief.
              </li>
              <li>
                <span className='font-bold'>
                  Advocate for secular laws and policies,
                </span>{' '}
                especially in areas like education, healthcare, civil rights and
                governance.
              </li>
              <li>
                <span className='font-bold'>Oppose and challenge</span> any
                attempts to insert religious ideologies into education, court
                decisions or other citizen services.
              </li>
            </ul>
          </div>

          {/* Global Section */}
          <div className='mt-8'>
            <h3 className='mb-4 text-left text-2xl font-extrabold sm:text-3xl'>
              Around the World
            </h3>
            <p>
              We at BPP work to join hand with the international organisations
              working to support such individuals and communities around the
              world who are oppressed or threatened due to their religion or
              beliefs.
            </p>
            <ul className='mt-4 list-inside list-disc leading-relaxed'>
              <li>
                <span className='font-bold'>Setting a Democratic Example</span>{' '}
                By firmly upholding secularism, India can serve as a model to
                inspire other nations to separate religion from governance.
              </li>
              <li>
                <span className='font-bold'>
                  Strengthening Global Human Rights
                </span>{' '}
                by aligning with global human rights efforts and strengthening
                international norms.
              </li>
              <li>
                <span className='font-bold'>Promoting secularism</span> at home
                helps fight religious extremism globally, contributing to peace
                and stability across borders.
              </li>
              <li>
                We as a secular Indian party wish to collaborate with
                international secular organizations and governments to build
                alliances that advocate for peace and tolerance.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}

export default UpholdSecularism
