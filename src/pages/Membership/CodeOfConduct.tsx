import HeaderComponent from '@/components/layout/common/HeaderComponent'

export default function CodeOfConduct() {
  const codePoints = [
    'Uphold the Constitution of India and the values of democracy, secularism, and socialism.',
    'No member shall include in any activity which may aggravate existing differences or create mutual hatred or cause tension between different castes and communities, religious or linguistic.',
    'The party is dedicated to promoting equal opportunities for all Indian citizens, with emphasis on improving the conditions of marginalized and economically disadvantaged groups. Members must actively contribute to initiatives and uphold the vision of the party.',
    "All members must respect the party's internal democratic processes. Decisions are to be made collectively. Any disagreement decisions will be taken in all the councils and committees through democratic as mentioned in Article VII of the Party Constitution.",
    "Members of the party must actively participate in campaigns and activities. This includes attending meetings, discussions and contributing towards the party's objectives.",
    "Any member found violating the principles of the party, including engaging in illegal activities, spreading rumors, or misusing party funds, will be subject to disciplinary action. All members are expected to act with integrity and uphold the party's values at all times.",
    "Elections within the party must be conducted in a fair, transparent, and democratic manner. Must refrain from using unethical means such as money power, muscle power, or coercion to influence the electoral process. All candidates should be selected based on merit and their alignment with the party's values and objectives.",
    'The Bharatiya Popular Party firmly believes in promoting peace, non-violence, and social harmony. All members are expected to engage in peaceful political activities and avoid any involvement in violent or disruptive actions.',
    "Every office bearer from the national level down to the grassroots, must adhere to the party's constitution and principles. The party's internal organs should always operate democratically, with periodic elections ensuring fair representation and leadership change.",
    'The performance and conduct of all members will be subject to regular review.',
  ]

  return (
    <>
      <HeaderComponent
        heading='Code of Conduct'
        text='Member Guidelines'
        breadcrumbLinks={[
          { label: 'Home', href: '/' },
          { label: 'Membership', href: '/membership' },
          { label: 'Code of Conduct', href: '/membership/code-of-conduct' },
        ]}
        imgUrl={'null'}
      />
      <div className='mx-auto max-w-7xl'>
        <div>
          <div className='p-8'>
            <div className='space-y-6'>
              {codePoints.map((point, index) => (
                <div
                  key={index}
                  className='group flex gap-6 rounded-lg p-4 transition-all duration-300 hover:bg-[#e85b33]/5'
                >
                  <div className='flex-shrink-0'>
                    <span className='flex h-8 w-8 items-center justify-center rounded-full bg-[#e85b33]/10 font-bold text-[#e85b33] transition-colors duration-300 group-hover:bg-[#e85b33] group-hover:text-white'>
                      {index + 1}
                    </span>
                  </div>
                  <p className='leading-relaxed text-gray-700 dark:text-gray-200'>
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
