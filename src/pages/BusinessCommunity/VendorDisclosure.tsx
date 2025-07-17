import { ArrowRight, ShieldCheck, Users } from 'lucide-react'
import HeaderComponent from '@/components/layout/common/HeaderComponent'

const VendorDisclosure = () => {
  return (
    <>
      <HeaderComponent
        heading='Vendor disclosure'
        text='Vendor disclosure'
        breadcrumbLinks={[
          { label: 'Home', href: '/' },
          { label: 'Business Community', href: '/' },
          {
            label: 'Vendor disclosure',
            href: '/business-community/vendor-disclosure',
          },
        ]}
        imgUrl={'null'}
      />
      <section className='relative py-10'>
        <div className='mx-auto max-w-7xl px-6'>
          {/* Title Section */}
          <div className='mb-12 flex items-start justify-between'>
            <div className='space-y-4'>
              <h2 className='text-3xl font-semibold'>
                Vendor Disclosure Statement
              </h2>
            </div>
          </div>
          {/* Main Content Grid */}
          <div className='grid gap-8 md:grid-cols-12'>
            {/* Primary Statement - Spans full width */}
            <div
              className='border-l-4 pl-6 md:col-span-12'
              style={{ borderLeftColor: '#e85a32' }}
            >
              <p className='text-xl leading-relaxed'>
                As a vendor or supplier associated with Bharatiya Political
                Party, I hereby confirm that I am a registered member of the
                party, as well as an active participant in the party’s community
                contribution app.
              </p>
            </div>
            {/* Two Column Section */}
            <div className='flex flex-col space-y-8 md:col-span-6'>
              <div className='group relative flex-1'>
                <div className='flex h-full flex-col rounded-lg border p-6 transition-shadow hover:shadow-md'>
                  <div className='mb-4 flex items-start gap-4'>
                    <div
                      className='rounded-lg p-2'
                      style={{ backgroundColor: '#e85a32' }}
                    >
                      <Users className='h-5 w-5 text-white' />
                    </div>
                    <div>
                      <h3 className='font-semibold'>
                        {' '}
                        I promise to uphold the values of the party and to
                        provide the best possible service and products to
                        support the party's objectives.
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex flex-col space-y-8 md:col-span-6'>
              <div className='group relative flex-1'>
                <div className='flex h-full flex-col rounded-lg border p-6 transition-shadow hover:shadow-md'>
                  <div className='mb-4 flex items-start gap-4'>
                    <div
                      className='rounded-lg p-2'
                      style={{ backgroundColor: '#e85a32' }}
                    >
                      <ShieldCheck className='h-5 w-5 text-white' />
                    </div>
                    <div>
                      <h3 className='font-semibold'>
                        {' '}
                        I also confirm to ensure that the prices I offer are
                        reasonable and competitive, while maintaining the high
                        standards of quality in the products and services I
                        provide to the party's community.
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Final Statement - Spans full width */}
            <div className='md:col-span-12'>
              <div className='flex items-center gap-4 rounded-lg border p-6'>
                <ArrowRight
                  className='h-6 w-6 flex-shrink-0'
                  style={{ color: '#e85a32' }}
                />
                <p className='text-lg'>
                  My primary focus will not be on maximizing profits, but on
                  supporting the core objective of community contribution.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default VendorDisclosure
