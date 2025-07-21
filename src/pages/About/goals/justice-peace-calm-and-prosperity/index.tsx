import img1 from '@/assets/images/backgrounds/sliders/JUSTICE_PEACE_CALM_PROSPERITY.webp'
import HeaderComponent from '@/components/layout/common/HeaderComponent'

const JusticePeaceCalmAndProsperity = () => {
  return (
    <>
      <HeaderComponent
        heading='OUR GOALS'
        text='justice, peace, calm and prosperity'
        breadcrumbLinks={[
          { label: 'Home', href: '/' },
          { label: 'About', href: '/about' },
          { label: 'BPP Goals', href: '/about/bpp-goals' },
          {
            label: 'justice, peace, calm and prosperity',
            href: '/about/bpp-goals/justice-peace-calm-and-prosperity',
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
              Our mission at Bhartiya Popular Party is to build a peaceful,
              just, and prosperous society where every citizen feels safe,
              valued, and heard.
            </p>
            <p className='my-2'>
              We are committed to uphold justice, promoting peace and ensuring
              equal access to opportunities and resources for all. We strongly
              believe in the protection of individual rights, including the
              right to privacy, freedom of expression, and access to
              information. Our aim is to promote a society, where diversity is
              respected and unity prevails.
            </p>
          </div>

          {/* In Our Local Community */}
          <div className='mt-8'>
            <h3 className='mb-4 text-left text-2xl font-extrabold sm:text-3xl'>
              In Our Local Community:
            </h3>
            <p>
              Promoting the community justice mechanisms to resolve local
              disputes fairly and peacefully, is one of our top priorities. We
              are committed to:
            </p>
            <ul className='mt-4 list-inside list-disc leading-relaxed'>
              <li>
                <span className='font-bold'>Support</span> law enforcement
                reforms for transparency, accountability and trust.
              </li>
              <li>
                <span className='font-bold'>Spread</span> awareness about
                citizens’ rights and responsibilities.
              </li>
              <li>
                <span className='font-bold'>Strengthen</span> youth engagement
                to prevent violence.
              </li>
              <li>
                <span className='font-bold'>Ensure</span> equal access to public
                services, safety, and resources regardless of caste, religion,
                or economic background.
              </li>
              <li>
                <span className='font-bold'>Encourage</span> community to build
                mutual trust and cooperation.
              </li>
            </ul>
          </div>

          {/* Stateside */}
          <div className='mt-8'>
            <h3 className='mb-4 text-left text-2xl font-extrabold sm:text-3xl'>
              Stateside:
            </h3>
            <p className='my-2'>
              We believe in enacting and enforcing laws that guarantee justice,
              protect freedoms, and promote fairness for all. We are aimed to:
            </p>
            <ul className='list-inside list-disc leading-relaxed'>
              <li>
                <span className='font-bold'>Strengthen</span> the judiciary and
                legal systems for timely and equal justice.
              </li>
              <li>
                <span className='font-bold'>Promote</span> peaceful governance
                through conflict resolution.
              </li>
              <li>
                <span className='font-bold'>Protect</span> citizens privacy and
                freedom of speech
              </li>
              <li>
                <span className='font-bold'>Invest</span> in social welfare
                programs to reduce inequality and enhance stability.
              </li>
              <li>
                <span className='font-bold'>Promote</span> research and
                development through state- funded innovation centres and
                encourage high-value manufacturing and green technologies.
              </li>
              <li>
                <span className='font-bold'>Establish</span> peace councils in
                unrest-prone areas for long- term stability.
              </li>
            </ul>
          </div>

          {/* Global Section */}
          <div className='mt-8'>
            <h3 className='mb-4 text-left text-2xl font-extrabold sm:text-3xl'>
              Around the World
            </h3>
            <p>
              Our idea is to achieve global peace, justice and human rights,
              through active international diplomacy and cooperation. We focus
              to:
            </p>
            <ul className='mt-4 list-inside list-disc leading-relaxed'>
              <li>
                <span className='font-bold'>Collaborate</span> with
                international bodies to protect freedom of expression worldwide.
              </li>
              <li>
                <span className='font-bold'>Position</span> India as a leader in
                peacekeeping, humanitarian aid and conflict resolution.
              </li>
              <li>
                <span className='font-bold'>Build</span> alliances based on
                social justice, equity and democratic values.
              </li>
              <li>
                <span className='font-bold'>Promote</span> an ethical foreign
                policy rooted in non- violence, mutual growth, and sovereignty.
              </li>
              <li>
                <span className='font-bold'>Encourage</span> cultural exchange
                programs to foster global understanding and coexistence.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}

export default JusticePeaceCalmAndProsperity
