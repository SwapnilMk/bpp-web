import {
  AlertTriangle,
  Book,
  CreditCard,
  LucideIcon,
  Mail,
  Shield,
  Users,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import HeaderComponent from '@/components/layout/common/HeaderComponent'

interface SectionProps {
  icon: LucideIcon
  title: string
  children: React.ReactNode
  highlight?: boolean
}

const Section = ({
  icon: Icon,
  title,
  children,
  highlight = false,
}: SectionProps) => (
  <Card
    className={`mb-6 border shadow-lg backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/50 ${highlight ? 'border-[#e85b33]/20 bg-[#e85b33]/5' : ''}`}
  >
    <CardContent className='p-8'>
      <div className='mb-6 flex items-center gap-4'>
        <div
          className={`rounded-full p-3 ${highlight ? 'bg-[#e85b33]/10 text-[#e85b33]' : 'bg-primary/10 text-primary'}`}
        >
          <Icon className='h-6 w-6' />
        </div>
        <h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
          {title}
        </h2>
      </div>
      <div className='space-y-4 text-gray-600 dark:text-gray-300'>
        {children}
      </div>
    </CardContent>
  </Card>
)

const TermsOfService = () => {
  return (
    <>
      <HeaderComponent
        heading='TERMS OF SERVICE'
        text='Please read these terms carefully'
        breadcrumbLinks={[
          { label: 'Home', href: '/' },
          { label: 'Terms of Service', href: '/terms' },
        ]}
        imgUrl={'null'}
      />

      <div className='mx-auto max-w-7xl p-6'>
        {/* Alert Card */}
        <Card className='mb-8 border-yellow-500/20 bg-yellow-500/10'>
          <CardContent className='p-6'>
            <div className='flex items-center gap-3'>
              <AlertTriangle className='h-6 w-6 text-yellow-500' />
              <p className='font-medium text-gray-600 dark:text-gray-300'>
                IMPORTANT – PLEASE READ CAREFULLY
              </p>
            </div>
          </CardContent>
        </Card>

        <Section icon={Book} title='Introduction'>
          <p>
            These Terms represent a legally binding agreement between you and
            the Bharatiya Popular Party regarding your use of the Party website.
            By using the website Service, you acknowledge that you have read,
            understood, and agree to comply with these Terms.
          </p>
          <p>
            As a registered member of the website and/or as a visitor, you will
            get an insight on the updates and detailed information of the
            happenings and developments within and by the party.
          </p>
        </Section>

        <Section icon={Users} title='Membership Registration' highlight={true}>
          <p className='mb-4'>
            To become a member of Bharatiya Popular Party, you may be required
            to provide:
          </p>
          <div className='grid gap-6 md:grid-cols-2'>
            <div className='space-y-2'>
              <ul className='list-disc space-y-2 pl-6'>
                <li>Name and age</li>
                <li>Gender and address</li>
                <li>Mobile number</li>
                <li>Email address</li>
                <li>Profession</li>
              </ul>
            </div>
            <div className='space-y-2'>
              <ul className='list-disc space-y-2 pl-6'>
                <li>Constituency</li>
                <li>Village, block, district, state</li>
                <li>Language preference</li>
                <li>Voter ID</li>
                <li>Aadhar card</li>
              </ul>
            </div>
          </div>
        </Section>

        <Section icon={CreditCard} title='Membership Fee'>
          <div className='rounded-lg bg-gray-100 p-6 dark:bg-gray-700/50'>
            <p className='mb-4'>
              To become member of the Bharatiya Popular Party are required to
              pay a one-time membership fee of ₹5 through the platform.
            </p>
            <p>
              Membership allows exclusive privileges, periodic updates and
              organizational developments.
            </p>
          </div>
        </Section>

        <Section icon={Users} title='Active Membership Access'>
          <div className='rounded-lg bg-primary/5 p-6'>
            <p>
              To obtain active membership status, members must enroll at least
              10 new members through referrals. Once this requirement is met,
              users will gain access to additional features and benefits
              reserved for active members.
            </p>
          </div>
        </Section>

        <Section icon={Shield} title='Data Privacy' highlight={true}>
          <p className='mb-4'>
            The Party is committed to user privacy and will handle personal data
            according to relevant laws. Information collected will only be used
            for legitimate purposes, such as:
          </p>
          <ul className='list-disc space-y-2 pl-6'>
            <li>Providing member updates</li>
            <li>Enhancing engagement</li>
            <li>Improving services</li>
          </ul>
          <p className='mt-4'>
            The Party will not share data to third party without consent unless
            legally required.
          </p>
        </Section>

        {/* Contact Section */}
        <Card className='mt-8 border-[#e85b33]/20 bg-[#e85b33]/5'>
          <CardContent className='p-8 text-center'>
            <h2 className='mb-4 text-2xl font-bold'>Contact Us</h2>
            <p className='mb-6 text-gray-600 dark:text-gray-300'>
              If you have any questions about these terms of services &
              conditions or the website treatment of your personal information,
              please write to:
            </p>
            <div className='inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 shadow-sm dark:bg-gray-800'>
              <Mail className='h-5 w-5 text-[#e85b33]' />
              <a
                href='mailto:bpp.headoffice@gmail.com'
                className='text-[#e85b33] hover:underline'
              >
                bpp.headoffice@gmail.com
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default TermsOfService
