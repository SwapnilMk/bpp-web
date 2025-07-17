import img2 from '@/assets/images/backgrounds/sliders/EQUAL OPPORTUNITY AND GENDER EQUALITY.jpeg'
import HeaderComponent from '@/components/layout/common/HeaderComponent'

const EqualOpportunityAndGenderEqualityPage = () => {
  return (
    <>
      <HeaderComponent
        heading='OUR GOALS'
        text='Equal Opportunity and Gender Equality'
        breadcrumbLinks={[
          { label: 'Home', href: '/' },
          { label: 'About', href: '/about' },
          { label: 'BPP Goals', href: '/about/bpp-goals' },
          {
            label: 'Equal Opportunity and Gender Equality',
            href: '/about/bpp-goals/equal-opportunity-and-gender-equality',
          },
        ]}
        imgUrl={img2}
      />
      <section className='py-8'>
        <div className='container text-justify text-xs leading-relaxed text-accent-foreground sm:text-sm'>
          {/* Mission Statement */}
          <div>
            <h3 className='mb-4 text-left text-2xl font-extrabold sm:text-3xl'>
              Mission Statement
            </h3>
            <p>
              For Bharatiya Popular Party, Equal Opportunity means that every
              individual, regardless of their background, gender, caste,
              religion, or socioeconomic status, should have an equal chance to
              grow and succeed. Gender Equality ensures that individuals of all
              genders, particularly women and marginalized genders, have the
              same rights, opportunities, and treatment across all aspects of
              life—social, political, economic, and cultural.
            </p>
            <p className='font-bold'>
              To us, Equal Opportunity and Gender Equality are not just
              goals—they are the guiding principles behind our vision for a
              just, inclusive, and prosperous community.
            </p>
          </div>

          {/* In Our Local Community */}
          <div className='mt-8'>
            <h3 className='mb-4 text-left text-2xl font-extrabold sm:text-3xl'>
              In Our Local Community:
            </h3>
            <p>
              In a democratic nation like India, ensuring equal opportunity and
              gender equality is crucial for building a progressive society. To
              achieve this, we as a party will focus on the following
              initiatives:
            </p>
            <ul className='mt-4 list-inside list-disc'>
              <li>
                <span className='font-bold'>Promote Community Engagement:</span>{' '}
                Create opportunities for eligible and active participation from
                all members of the community across various sectors.
              </li>
              <li>
                <span className='font-bold'>
                  Prioritize Skills and Education:
                </span>{' '}
                Ensure that individuals with the necessary education, skills,
                and experience are given priority in various platforms,
                empowering them to succeed.
              </li>
              <li>
                <span className='font-bold'>
                  Enforce Anti-Discrimination Laws:
                </span>{' '}
                Strengthen and implement comprehensive anti-discrimination laws
                across the workplace, healthcare, education, and public spaces.
              </li>
              <li>
                <span className='font-bold'>Fight Gender-Based Violence:</span>{' '}
                Strengthen policies against gender-based violence and ensure
                strict enforcement of laws that protect all individuals from
                harassment and abuse.
              </li>
              <li>
                <span className='font-bold'>
                  Encourage Leadership Opportunities:
                </span>{' '}
                Develop programs that support women and marginalized genders to
                take on leadership roles in every sector.
              </li>
              <li>
                <span className='font-bold'>
                  Increase Political Representation:
                </span>{' '}
                Promote greater representation of women and gender minorities in
                political offices and senior management positions.
              </li>
              <li>
                <span className='font-bold'>Ensure Healthcare Access:</span>{' '}
                ensuring access to quality healthcare, including reproductive
                health services and mental health support, sensitive to the
                needs of all genders.
              </li>
            </ul>
          </div>

          {/* Stateside */}
          <div className='mt-8'>
            <h3 className='mb-4 text-left text-2xl font-extrabold sm:text-3xl'>
              Stateside:
            </h3>
            <p>
              By removing barriers based on gender and social identity, we can
              unlock the potential of every citizen, driving innovation, growth,
              and social harmony. Achieving this goal will ensure social
              justice, where all members of society—are treated with dignity,
              fairness, and respect. The Bharatiya Popular Party is committed
              to:
            </p>
            <ul className='mt-4 list-inside list-disc'>
              <li>
                <span className='font-bold'>
                  Eliminating Gender and Identity Biases:
                </span>{' '}
                Removing cultural, social, and economic biases that often limit
                women and marginalized genders' access to opportunities in
                education, employment, and leadership roles.
              </li>
              <li>
                <span className='font-bold'>
                  Ensuring Awareness of Existing Laws:
                </span>{' '}
                Promoting proper implementation and raising awareness of laws
                designed to protect gender equality.
              </li>
              <li>
                <span className='font-bold'>Enhancing Representation:</span>{' '}
                Increasing the representation of women and marginalized genders
                in key areas, such as politics, policymaking, and
                decision-making bodies.
              </li>
              <li>
                <span className='font-bold'>Improving Access to Services:</span>{' '}
                Ensuring comprehensive access to quality healthcare, education,
                and social services, especially in rural areas where resources
                are limited.
              </li>
              <li>
                <span className='font-bold'>Challenging Patriarchy:</span>{' '}
                Dismantling deep-rooted patriarchal systems and societal
                stereotypes that continue to limit opportunities for women and
                marginalized genders in both public and private spheres.
              </li>
            </ul>
          </div>

          {/* Global Section */}
          <div className='mt-8'>
            <h3 className='mb-4 text-left text-2xl font-extrabold sm:text-3xl'>
              Around the World
            </h3>
            <p>
              We envision a world where gender equality is the norm and equal
              opportunity is universally available. By achieving these goals,
              India can set an inspiring example for the world to
              follow—showcasing how a nation can prosper when all of its
              citizens are empowered to reach their full potential, regardless
              of gender.
            </p>
            <p className='my-2 font-bold'>
              By prioritizing equal opportunities and gender equality, India
              can:
            </p>
            <ul className='mt-4 list-inside list-disc'>
              <li>
                <span className='font-bold'>
                  Position Itself as a Global Leader:
                </span>{' '}
                Demonstrate to the world that a commitment to equality not only
                strengthens the fabric of society but also drives economic
                growth, social progress, and global influence. A nation that
                leads by example in ensuring equal rights and opportunities can
                become an inspiration for other countries.
              </li>

              <li>
                <span className='font-bold'>
                  Attract Global Talent and Investment:
                </span>{' '}
                Countries that favours gender equality tend to attract
                international talent, businesses, and investments. By creating a
                healthy environment where everyone has equal opportunities,
                India can position itself as an attractive destination for
                global professionals and entrepreneurs, thus enhancing its role
                in the international economy.
              </li>

              <li>
                <span className='font-bold'>Inspire Global Social Change:</span>{' '}
                India’s commitment to gender equality and equal opportunity can
                serve as a powerful example for other nations, encouraging them
                to adopt similar policies and practices.{' '}
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}

export default EqualOpportunityAndGenderEqualityPage
