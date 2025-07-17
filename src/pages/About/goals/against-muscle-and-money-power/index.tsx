import img3 from '@/assets/images/backgrounds/sliders/GAINST MUSCLE AND MONEY POWER.webp'
import HeaderComponent from '@/components/layout/common/HeaderComponent'

const MuscleAndMoneyPowerPage = () => {
  return (
    <>
      <HeaderComponent
        heading='OUR GOALS'
        text='Against Muscle & Money Powers'
        breadcrumbLinks={[
          { label: 'Home', href: '/' },
          { label: 'About', href: '/about' },
          { label: 'BPP Goals', href: '/about/bpp-goals' },
          {
            label: 'Against Muscle & Money Power',
            href: '/about/bpp-goals/against-muscle-and-money-power',
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
              At Bhartiya Popular Party, our mission is to eradicate the
              influence of muscle and money power in politics and governance,
              ensuring that ethics, morale and community service become the true
              pillars of public life.
            </p>
            <p>
              We are committed to restoring faith in democracy by fighting
              corruption, upholding transparency, and empowering every citizen
              to participate meaningfully in the democratic process.
            </p>
            <p className='my-2 font-bold'>
              We envision a nation where opportunities are not determined by
              wealth or status, but by talent and hard work.
            </p>
          </div>

          {/* In Our Local Community */}
          <div className='mt-8'>
            <h3 className='mb-4 text-left text-2xl font-extrabold sm:text-3xl'>
              In Our Local Community:
            </h3>
            <p>
              We are committed to build a culture of trust, service, and
              accountability. We aim to:
            </p>
            <ul className='mt-4 list-inside list-disc'>
              <li>
                Encourage local leaders to come forward based on merit and
                community service, not influence or power.
              </li>
              <li>
                Promote fair and transparent leadership free from the influence
                of money and muscle power
              </li>
              <li>
                Educate citizens about their rights and empower them to hold
                their leaders accountable for wrongful doings.
              </li>
              <li>
                Support initiatives of people’s participation in
                decision-making, ensuring every voice is heard
              </li>
            </ul>
            <p className='my-2 font-bold'>
              We believe that real change begins at home, and we are dedicated
              to nurture ethical leadership within the community.
            </p>
          </div>

          {/* Stateside */}
          <div className='mt-8'>
            <h3 className='mb-4 text-left text-2xl font-extrabold sm:text-3xl'>
              Stateside:
            </h3>
            <p>
              We are committed to build a statewide movement to cleanse the
              political institutions and strengthen governance. We believe in:
            </p>
            <ul className='mt-4 list-inside list-disc'>
              <li>
                <span className='font-bold'>Implementing</span> strict
                anti-corruption measures at every level of the state leadership.
              </li>
              <li>
                <span className='font-bold'>Encouraging political leaders</span>{' '}
                and public servants to lead with integrity, vision and a deep
                sense of public duty
              </li>
              <li>
                <span className='font-bold'>Advocating </span> for laws and
                policies that reduce the influence of money and muscle in
                politics
              </li>
            </ul>
            <p className='font-bold'>
              We strive to create a political environment where transparency and
              citizen engagement are the norms and not the exception.
            </p>
          </div>

          {/* Global Section */}
          <div className='mt-8'>
            <h3 className='mb-4 text-left text-2xl font-extrabold sm:text-3xl'>
              Around the World
            </h3>

            <p className='my-2 font-bold'>
              Our vision extends beyond borders. We stand in solidarity with
              global movements that aim to protect democracy, reduce corruption
              and empower citizens.
            </p>

            <p className='my-2'>Internationally, we work to:</p>
            <ul className='mt-4 list-inside list-disc'>
              <li>
                <span className='font-bold'>Promote</span> dialogue and
                collaboration with like-minded international organizations to
                exchange best practices in clean governance
              </li>

              <li>
                <span className='font-bold'>Support</span> global democratic
                institutions that prioritize people over power and principles
                over politics
              </li>

              <li>
                <span className='font-bold'>Advocate </span> for human rights,
                equality, and sustainable development as universal values{' '}
              </li>
            </ul>
          </div>
          <p className='my-2 font-bold'>
            We believe that people should shape the nation and not power. By
            eliminating the dominance of money and muscle power in Indian
            politics, real change is possible. India's efforts for ethical
            leadership and people driven governance will present us as a
            peaceful and in true sense democratic nation that will inspire other
            nations as well.
          </p>
        </div>
      </section>
    </>
  )
}

export default MuscleAndMoneyPowerPage
