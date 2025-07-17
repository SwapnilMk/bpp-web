// Importing shadcn Card component
import { Heart, ScrollText, Target, Users } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import HeaderComponent from '@/components/layout/common/HeaderComponent'

const SupplierInclusion = () => {
  return (
    <>
      <HeaderComponent
        heading='Supplier Inclusion'
        text='Supplier Inclusion'
        breadcrumbLinks={[
          { label: 'Home', href: '/' },
          { label: 'Business Community', href: '/' },
          {
            label: 'Supplier Inclusion',
            href: '/business-community/inclusion',
          },
        ]}
        imgUrl={'null'}
      />
      <section className='relative py-16'>
        <div className='mx-auto max-w-7xl px-6'>
          {/* Header Section */}
          <div>
            <div className='mb-3 flex gap-3'>
              <Badge
                className='text-white'
                style={{ backgroundColor: '#e85a32' }}
              >
                Supplier Inclusion
              </Badge>
            </div>
            <h1 className='mb-12 max-w-4xl text-4xl font-bold'>
              Bharatiya Political Party Supplier Inclusion
            </h1>
          </div>
          {/* Content Section */}
          <div className='space-y-4'>
            {/* Primary Statement */}
            <Card>
              <CardContent className='p-3'>
                <div className='flex items-center gap-4 p-4'>
                  <Heart
                    className='h-12 w-12 flex-shrink-0'
                    style={{ color: '#e85a32' }}
                  />
                  <p className='text-lg'>
                    At Bharatiya Political Party, we are proud to work with
                    vendors or suppliers who understand our commitment to the
                    noble and social causes of community contribution.
                  </p>
                </div>
              </CardContent>
            </Card>
            {/* Network Value */}
            <Card>
              <CardContent className='p-3'>
                <div className='flex items-center gap-4 p-4'>
                  <Users
                    className='h-12 w-12 flex-shrink-0'
                    style={{ color: '#e85a32' }}
                  />
                  <p className='text-lg'>
                    As registered members of our community contribution network,
                    we value the role our vendors play.
                  </p>
                </div>
              </CardContent>
            </Card>
            {/* Quality Assurance */}
            <Card>
              <CardContent className='p-3'>
                <div className='flex items-center gap-4 p-4'>
                  <Target
                    className='h-12 w-12 flex-shrink-0'
                    style={{ color: '#e85a32' }}
                  />
                  <p className='text-lg'>
                    As part of our initiative, we trust that you will ensure the
                    delivery of high-quality products and services at reasonable
                    and competitive rates.
                  </p>
                </div>
              </CardContent>
            </Card>
            {/* Vision Statement */}
            <Card>
              <CardContent className='p-3'>
                <div className='flex items-center gap-4 p-4'>
                  <ScrollText
                    className='h-12 w-12 flex-shrink-0'
                    style={{ color: '#e85a32' }}
                  />
                  <div>
                    <p className='text-lg'>
                      Your commitment to work on the given parameters will
                      provide maximum value to our community while supporting
                      the collective vision for national progress.
                    </p>
                    <p
                      className='text-lg font-medium'
                      style={{ color: '#e85a32' }}
                    >
                      Thank you for your dedication.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          {/* Bottom Ornament */}
          <div className='mt-10 flex justify-center'>
            <div
              className='h-1 w-80 rounded-full'
              style={{ backgroundColor: '#e85a32' }}
            />
          </div>
        </div>
      </section>
    </>
  )
}

export default SupplierInclusion
