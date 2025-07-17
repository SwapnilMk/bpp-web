import { Mail, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import HeaderComponent from '@/components/layout/common/HeaderComponent'

export default function Complaints() {
  const contactMethods = [
    {
      icon: <Mail className='h-6 w-6' />,
      title: 'Email',
      description:
        'For any complaints or grievances, please write to us at bpp.headoffice@gmail.com',
      action: 'Send Email',
      link: 'mailto:bpp.headoffice@gmail.com',
    },
    {
      icon: <Phone className='h-6 w-6' />,
      title: 'Helpline',
      description:
        'For urgent matters, you may also contact our Helpline No. 8828477674, available 24hours.',
      action: 'Call Now',
      link: 'tel:8828477674',
    },
  ]

  return (
    <>
      <HeaderComponent
        heading='COMPLAINTS'
        text='We value your feedback'
        breadcrumbLinks={[
          { label: 'Home', href: '/' },
          { label: 'Complaints', href: '/complaints' },
        ]}
        imgUrl={'null'}
      />
      <div className='mx-auto max-w-7xl p-6'>
        {/* Main Info Card */}
        <Card className='mb-8 border dark:border-gray-700 dark:bg-gray-800/50'>
          <CardContent className='p-8'>
            <p className='mb-6 leading-relaxed text-gray-600 dark:text-gray-300'>
              We are committed to resolving all complaints in a fair, timely and
              transparent manner and you will receive an acknowledgment of your
              complaint within 7 days.
            </p>
            <p className='leading-relaxed text-gray-600 dark:text-gray-300'>
              We value your feedback and are dedicated to ensuring the smooth
              functioning.
            </p>
          </CardContent>
        </Card>

        {/* Contact Methods */}
        <div className='grid gap-6 md:grid-cols-2'>
          {contactMethods.map((method, index) => (
            <Card
              key={index}
              className='group border backdrop-blur-sm transition-all duration-300 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800/50'
            >
              <CardContent className='p-6'>
                <div className='mb-4 flex items-center gap-4'>
                  <div className='rounded-full bg-[#e85b33]/10 p-3 text-[#e85b33] transition-colors duration-300 group-hover:bg-[#e85b33] group-hover:text-white'>
                    {method.icon}
                  </div>
                  <div>
                    <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
                      {method.title}
                    </h3>
                    <p className='text-sm text-gray-600 dark:text-gray-300'>
                      {method.description}
                    </p>
                  </div>
                </div>
                <Button
                  className='w-full bg-[#e85b33] hover:bg-[#e85b33]/90'
                  onClick={() => (window.location.href = method.link)}
                >
                  {method.action}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  )
}
