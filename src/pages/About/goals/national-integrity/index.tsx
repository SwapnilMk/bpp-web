import img1 from '@/assets/images/backgrounds/sliders/NATIONAL_INTEGRITY.webp'
import HeaderComponent from '@/components/layout/common/HeaderComponent'

const NationalIntegrityPage = () => {
  return (
    <>
      <HeaderComponent
        heading='OUR GOALS'
        text='National Integrity'
        breadcrumbLinks={[
          { label: 'Home', href: '/' },
          { label: 'About', href: '/about' },
          { label: 'BPP Goals', href: '/about/bpp-goals' },
          {
            label: 'National Integrity',
            href: '/about/bpp-goals/national-integrity',
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
              For Bharatiya Popular Party, National Integrity is the spirit of
              unity, where every citizen stands together, regardless of their
              caste, religion, or community. For us, National Integrity is the
              strength that binds us as one nation — a reflection of the
              principle of
            </p>
            <p className='font-bold'>
              ‘Ek-Anek aur Ekta’ — &quot;Unity in Diversity.&quot;
            </p>
            <p className='mt-4'>
              To us, National Integrity is not just a concept; it is the
              backbone of a peacefully growing nation. It is our belief that
              despite our differences, we are all part of one country, sharing
              common identities, interests and goals. It is about celebrating
              our diversity while holding on to the core value that we are all
              brothers and sisters, united by the shared ideals of progress,
              peace, and equality.
            </p>
          </div>

          {/* In Our Local Community */}
          <div className='mt-8'>
            <h3 className='mb-4 text-left text-2xl font-extrabold sm:text-3xl'>
              In Our Local Community:
            </h3>
            <p>
              We believe that a strong, united community is the foundation of
              progress and prosperity of nation. When we work together, going
              beyond divisions of religion, caste, and community, we build a
              more flexible and strong society. We create a better future for
              our children, where every citizen enjoys equal rights,
              opportunities, and respect.
            </p>
            <ul className='mt-4 list-inside list-disc'>
              <li>
                <span className='font-bold'>Maintaining Sovereignty:</span>{' '}
                Ensures the protection of our nation&#39;s independence and
                authority in the global arena.
              </li>
              <li>
                <span className='font-bold'>Eradicating Poverty:</span> A united
                and inclusive society driving efforts to eliminate poverty.
              </li>
              <li>
                <span className='font-bold'>
                  Peace and Harmony Within the Country:
                </span>{' '}
                Promotes social cohesion, reducing conflicts and ensuring
                peaceful coexistence among diverse communities.
              </li>
              <li>
                <span className='font-bold'>
                  Internal Security &amp; Law and Order:
                </span>{' '}
                Strengthens the rule of law and internal security by creating a
                sense of shared responsibility and national interest.
              </li>
            </ul>
          </div>

          {/* Stateside */}
          <div className='mt-8'>
            <h3 className='mb-4 text-left text-2xl font-extrabold sm:text-3xl'>
              Stateside:
            </h3>
            <p>
              We envision a country where unity isn’t just an aspiration, but a
              reality — where citizens, sharing a commitment to progress, peace,
              and equality, work hand in hand to build a brighter future. Our
              diversity is our greatest asset, and we will protect and celebrate
              it while staying firmly rooted in the belief that we are all part
              of one larger and united family.
            </p>
            <ul className='mt-4 list-inside list-disc'>
              <li>
                <span className='font-bold'>Cultural Integration:</span> We
                believe in embracing the diversity of cultures, languages, and
                traditions, and encouraging a shared sense of pride in our
                collective heritage.
              </li>
              <li>
                <span className='font-bold'>Economic Integration:</span> We wish
                to ensure equal access to economic opportunities for all
                citizens. Thus, reducing the gap between rich and poor
                communities from different regions, communities and social
                classes and achieving.
              </li>
              <li>
                <span className='font-bold'>Political Integration:</span> Our
                idea is to create a political environment where policies are for
                all and where every citizen has a voice in decision-making.
                Thus, strengthening democracy by reducing the influence of
                divisive politics.
              </li>
              <li>
                <span className='font-bold'>Religious Integration:</span>{' '}
                Promoting tolerance and understanding among various regional and
                religious communities. Ensuring that all religions are
                celebrated and no religion is used to divide the nation.
              </li>
              <li>
                <span className='font-bold'>Social Integration:</span> Building
                a society that ensures equality, social justice, and
                opportunities for all, regardless of caste, creed or community.
                Encouraging a spirit of brotherhood and solidarity to create a
                harmonious society.
              </li>
            </ul>
          </div>

          {/* Global Section */}
          <div className='mt-8'>
            <h3 className='mb-4 text-left text-2xl font-extrabold sm:text-3xl'>
              Around the World: Strengthening Global Presence Through Unity and
              Progress
            </h3>
            <p>
              In this interconnected world, our nation&#39;s strength lies not
              only in its internal unity but also in its ability to present
              itself as a dignified and reliable partner on the global stage.
              Through a combination of economic growth and global respect, we
              can build a future where our nation’s standing is not only secure
              but influential across borders.
            </p>
            <ul className='mt-4 list-inside list-disc'>
              <li>
                <span className='font-bold'>
                  Attracting Foreign Investment:
                </span>{' '}
                Our party envisions a nation that stands united and stable for
                economic growth. We believe that National Integrity is most
                important for creating an environment that attracts foreign
                investment. By promoting a cohesive national identity, we will
                build trust and stability, making our country an ideal
                destination for international businesses. Investors will be
                drawn to a nation that offers not only political and economic
                stability but also a shared vision for long-term prosperity.
              </li>
              <li>
                <span className='font-bold'>Dignity of Our Nation:</span> On the
                world stage, we believe our country deserves respect and
                recognition. We are committed to uphold the dignity of our
                nation by cultivating a strong national identity based on unity,
                progress, and peace. We will assert our place in the
                international community with pride, promoting our values of
                equality, inclusivity, and cultural richness. We will ensure our
                country earns global admiration, becoming a leader in promoting
                peace, cooperation, and shared progress. The world will see us
                not only as a reliable partner but as a nation that stands tall
                with dignity, firmly rooted in its principles.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}

export default NationalIntegrityPage
