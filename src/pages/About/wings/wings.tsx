import HeaderComponent from '@/components/layout/common/HeaderComponent'

const WingsPage = () => {
  const wings = [
    {
      name: 'Labour Wing',
      description:
        "Advocates for the rights of workers, ensuring their fair treatment, better wages, and improved working conditions. It works to address labour laws and to promote policies that protect workers' interests in various industries.",
    },
    {
      name: "Farmer's Cell",
      description:
        'Focuses on policies that benefit the agricultural sector and works primarily for the welfare of farmers. Farmer wing advocates for fair prices for crops and emphasises better infrastructure in rural areas.',
    },
    {
      name: 'Intellectuals Wing',
      description:
        "Comprises academicians and professionals. The wing provides insight into the party's policies through research and discussions. It helps shape the party's approach toward education, technology, science, and other intellectual streams.",
    },
    {
      name: 'Legal Cell',
      description:
        'Responsible for advising the party on legal matters, ensuring its policies comply with the constitution and legal frameworks. It plays a key role in defending the party in legal matters. It also works for the protection of human rights and addressing legal reforms in areas such as civil welfare, social justice, and governance.',
    },
    {
      name: 'Teachers Cell',
      description:
        'Promotes the interests of educators and the overall quality of education. It works on education policies and advocates issues like improving teacher salaries, working conditions, and professional development opportunities.',
    },
    {
      name: 'Professional Cell',
      description:
        'Focuses on policies that encourage professional development and fair practices at the workplace. It serves the interests of various professional groups such as engineers, architects, and other skilled workers.',
    },
    {
      name: 'Doctors Cell',
      description:
        'Works to improve the healthcare system and address the concerns of medical professionals. It advocates better working conditions for doctors, proper healthcare funding, and improved public health systems.',
    },
    {
      name: 'Youth Wing',
      description:
        'Focuses on the empowerment and engagement of young people in the political system. It works on policies related to employment, education, and youth welfare.',
    },
    {
      name: 'Student Wing',
      description:
        'Represents the interests of students. It works on issues such as quality education, affordable fees, and student welfare, while encouraging students to actively participate in political matters.',
    },
    {
      name: 'Minority Cell',
      description:
        'Focuses on the rights and welfare of minority groups. It works on policies aimed at protecting religious and cultural interests of minorities, ensuring equal opportunities.',
    },
    {
      name: 'Women Cell',
      description:
        "Works toward promoting gender equality and empowering women in all sectors of society. It addresses issues like gender-based violence, women's safety, and political representation.",
    },
  ]

  return (
    <>
      <HeaderComponent
        heading='Wings'
        text='Wings'
        breadcrumbLinks={[
          { label: 'Home', href: '/' },
          { label: 'About', href: '/about' },
          { label: 'Wings', href: '/about/wings' },
        ]}
        imgUrl={'null'} // Placeholder for header image
      />
      <div className='container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
          {wings.map((wing, index) => (
            <div
              key={index}
              className='rounded-lg bg-white text-sm shadow-md dark:bg-gray-800'
            >
              <div className='rounded-t-lg bg-[#e85b33] p-4 text-white'>
                <h3 className='text-md font-bold'>{wing.name}</h3>
              </div>
              <div className='p-6'>
                <p className='text-sm text-gray-700 dark:text-gray-300'>
                  {wing.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default WingsPage
