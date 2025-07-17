import img1 from '@/assets/images/backgrounds/sliders/QUALITY EDUCATION.jpg'
import HeaderComponent from '@/components/layout/common/HeaderComponent'

const QualityEducation = () => {
  return (
    <>
      <HeaderComponent
        heading='OUR GOALS'
        text='Quality Education'
        breadcrumbLinks={[
          { label: 'Home', href: '/' },
          { label: 'About', href: '/about' },
          { label: 'BPP Goals', href: '/about/bpp-goals' },
          {
            label: 'Quality Education',
            href: '/about/bpp-goals/quality-education',
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
              In our party, we believe that education is the most powerful tool
              for achieving sustainable growth and development. Our mission is
              to ensure that every child, regardless of gender, background or
              location, has access to quality primary and secondary education.
            </p>
            <p className='my-2'>
              We are committed to eliminate gender based educational and income
              disparities.
            </p>
          </div>

          {/* In Our Local Community */}
          <div className='mt-8'>
            <h3 className='mb-4 text-left text-2xl font-extrabold sm:text-3xl'>
              In Our Local Community:
            </h3>
            <p>
              We aim to improve schools and education system by taking
              Community-led initiatives, parental involvement and involving
              youth in educational leadership. We are committed to:
            </p>
            <ul className='mt-4 list-inside list-disc leading-relaxed'>
              <li>
                <span className='font-bold'>Improve</span> school infrastructure
                and learning environments.
              </li>
              <li>
                <span className='font-bold'>Invest</span> in teacher training
                and teaching modules.
              </li>
              <li>
                <span className='font-bold'>Ensure</span> equal access to
                education for boys and girls, especially in rural areas.
              </li>
              <li>
                <span className='font-bold'>Encourage</span> community
                participation in education through awareness and engagement.
              </li>
              <li>
                <span className='font-bold'>Engage</span> parents and guardians
                in spreading the word about importance of schooling for young
                kids.
              </li>
            </ul>
          </div>

          {/* Stateside */}
          <div className='mt-8'>
            <h3 className='mb-4 text-left text-2xl font-extrabold sm:text-3xl'>
              Stateside:
            </h3>
            <p className='my-2 font-bold'>
              We advocate for nationwide access to free and compulsory education
              up to the secondary level. With the help of our community
              programs, we look forward to:
            </p>
            <ul className='list-inside list-disc leading-relaxed'>
              <li>
                <span className='font-bold'>Promote</span> digital learning,
                skilled trainings and technological advancement
              </li>
              <li>
                <span className='font-bold'>Develop</span> practical curriculum
                that reflect real-world skills and challanges.
              </li>
              <li>
                <span className='font-bold'>Prioritize</span> teacher
                development programs and fair compensation.
              </li>
              <li>
                <span className='font-bold'>Eliminate</span> the urban-rural
                education divide.
              </li>
            </ul>
          </div>

          {/* Global Section */}
          <div className='mt-8'>
            <h3 className='mb-4 text-left text-2xl font-extrabold sm:text-3xl'>
              Around the World
            </h3>
            <p>
              We as a party, supports educational partnerships and global
              funding initiatives aimed at providing education in developing
              countries. We are committed to:
            </p>
            <ul className='mt-4 list-inside list-disc leading-relaxed'>
              <li>
                <span className='font-bold'>Support</span> international efforts
                and partnerships aimed at improving global education standards.
              </li>
              <li>
                <span className='font-bold'>Contribute</span> to educational
                programs in conflict zones and developing countries.
              </li>
              <li>
                <span className='font-bold'>Promote</span> gender equality in
                global education initiatives.
              </li>
              <li>
                <span className='font-bold'>Advocate</span> for education as a
                basic human right and not a privilege.
              </li>
              <li>
                Collaborate with global organizations to support education for
                refugees and displaced children.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}

export default QualityEducation
