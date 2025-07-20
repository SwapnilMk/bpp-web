import { JSX } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Briefcase,
  ClipboardCheck,
  FileText,
  PanelLeftDashed,
  PhoneCall,
  Scale,
  UserCheck,
  Users,
  Wallet,
  ActivitySquare,
  Building2,
  ChevronRight,
  HandshakeIcon,
  Medal,
  CheckCircle,
  DollarSign,
  Heart,
  Smile,
  ArrowRight,
  ShieldCheck,
  ScrollText,
  Target,
} from 'lucide-react'
import flowchart from '@/assets/charts/bpp_flowchart.svg'
import communityContribution from '@/assets/images/community/communitycontribution.png'
import community from '@/assets/images/headerBanners/community.webp'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import HeaderComponent from '@/components/layout/common/HeaderComponent'

interface ServiceProps {
  title: string
  description: string
  icon: JSX.Element
}

const registrationSteps: ServiceProps[] = [
  {
    title: '1. Eligibility',
    description:
      'Must be a member of the community and should have real concern to seek the support.',
    icon: <UserCheck />,
  },
  {
    title: '2. Categories of Concerns',
    description:
      'Concerns can span a wide range of topics including: Health Issues (Any medical or healthcare-related challenges), Educational: Issues related to schooling, scholarships, or educational resources. Legal Matters: Assistance or concerns regarding rights and disputes, Social Challenges: Concerns regarding economic hardship, community welfare, etc.',
    icon: <Wallet />,
  },
  {
    title: '3. Required Details',
    description:
      'A clear description of the concern with relevant supporting documents. (e.g., medical certificates, school records, legal documents, etc.).',
    icon: <FileText />,
  },
  {
    title: '4. Reference',
    description:
      'Information regarding complete contact details, prior actions taken, etc.',
    icon: <PhoneCall />,
  },
]

const verificationSteps: ServiceProps[] = [
  {
    title: '5. Acceptance Criteria',
    description:
      "Concerns meeting the following criteria may be accepted: The issue is deemed legitimate and falls under the relevant categories (health, education, legal, etc.), Supporting documents are complete and valid, the concern meets the community's needs and is in line with the Bharatiya Popular Party goals.",
    icon: <ClipboardCheck />,
  },
  {
    title: '6. Rejection Criteria',
    description:
      'Concerns may be rejected for reasons such as: Incomplete or fraudulent supporting documents, the issue does not fall within the scope of the categories served by Bharatiya Popular Party, the concern does not meet the established criteria for urgency or relevance.',
    icon: <Scale />,
  },
  {
    title: '7. Sole Discretion of Bharatiya Popular Party Administration',
    description:
      'The decision to accept or reject concerns will be made at the *sole discretion* of the Bharatiya Popular Party administration. Administration will have the final authority to decide whether the concern should be addressed or not.',
    icon: <PanelLeftDashed />,
  },
]

const implementationSteps: ServiceProps[] = [
  {
    title: '8. Verification Fails',
    description:
      'If the verification fails (e.g., documents are found to be invalid or incomplete), the concern may be rejected.',
    icon: <Users />,
  },
  {
    title: '9. Notification',
    description:
      'The community member will be notified if the concern is being sent for verification or if any further documentation is required.',
    icon: <Briefcase />,
  },
]

// VendorSupplier Component
const VendorSupplier = () => {
  const navigate = useNavigate()
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className='relative py-12 md:py-16'
    >
      <div className='mx-auto'>
        <div className='mb-12 flex flex-col gap-8 md:mb-16 md:flex-row'>
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className='flex-1'
          >
            <div className='mb-6 inline-flex items-center gap-2 rounded-full bg-[#e85a32]/10 px-4 py-2 text-[#e85a32]'>
              <HandshakeIcon className='h-5 w-5' />
              <span className='font-medium'>Vendors and Suppliers</span>
            </div>
            <h1 className='mb-6 text-3xl font-bold tracking-tight dark:text-white md:text-4xl lg:text-5xl'>
              Essential Partners in Bharatiya Popular Party's Mission
            </h1>
            <div className='md:text-md flex flex-col gap-3 text-sm text-gray-700 dark:text-gray-300'>
              <p>
                At Bharatiya Popular Party, we are committed to create an
                ecosystem of collaboration where both members and vendors grow
                together. Bharatiya Popular Party is committed to facilitate an
                exchange of needs and services, benefiting both sides in
                meaningful ways.
              </p>
              <p>
                We at Bharatiya Popular Party, recognize that our vendors and
                suppliers are the backbone of our ability to support the
                community. These trusted partners play a critical role in
                ensuring that our members receive the services and assistance
                they need—quickly, efficiently, and at reasonable rates.
              </p>
              <p>
                In times of urgency, our registered vendors and suppliers are
                committed to provide priority service to our community members.
                Whether it's medical care, home services, or other essential
                needs, our vendors will be equipped to respond promptly and
                professionally.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='mt-8 flex items-center gap-2 rounded-lg bg-[#e85a32] px-6 py-3 text-white transition-colors hover:bg-[#e85a32]/90'
              onClick={() => navigate({ to: '/sign-up' })}
            >
              Join Now
              <ChevronRight className='h-4 w-4' />
            </motion.button>
          </motion.div>
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className='relative flex-1'
          >
            <div className='aspect-square animate-pulse rounded-full bg-[#e85a32]/10' />
            <div className='absolute inset-0 flex items-center justify-center'>
              <HandshakeIcon className='h-24 w-24 text-[#e85a32] md:h-36 md:w-36' />
            </div>
          </motion.div>
        </div>
        <div className='mb-12 grid grid-cols-1 gap-6 md:grid-cols-3'>
          {[
            {
              icon: (
                <ActivitySquare className='mb-4 h-10 w-10 text-[#e85a32]' />
              ),
              title: 'Priority Medical Services',
              description:
                'One of the key areas where our vendors provide exceptional support is in medical services. In the event of a medical emergency or urgent health need, our registered medical service providers—including hospitals, clinics, and healthcare professionals—will give our members top priority.',
            },
            {
              icon: <Building2 className='mb-4 h-10 w-10 text-[#e85a32]' />,
              title: 'Vendor Benefits',
              description:
                'As a registered vendor or supplier, you gain access to a dedicated network of members seeking your services. This creates a unique business opportunity—expanding your reach while helping the community. You will have the chance to build trust with members and gain recognition and business both.',
            },
            {
              icon: <UserCheck className='mb-4 h-10 w-10 text-[#e85a32]' />,
              title: 'Member Benefits',
              description:
                'When you join our community, you gain access to a network of trusted vendors and service providers who can fulfill your urgent needs. By being part of this ecosystem, you are guaranteed timely support and immediate fulfillment of your needs, all at reasonable rates.',
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * (index + 1), duration: 0.6 }}
              className='group rounded-xl p-6 transition-colors hover:bg-[#e85a32]/5'
            >
              {item.icon}
              <h2 className='mb-3 text-lg font-bold dark:text-white md:text-xl'>
                {item.title}
              </h2>
              <p className='md:text-md text-sm text-gray-700 dark:text-gray-300'>
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className='mb-12 rounded-2xl bg-gradient-to-r from-[#e85a32]/10 to-transparent p-6 md:p-8'
        >
          <div className='mb-6 flex items-center gap-3'>
            <Medal className='h-8 w-8 text-[#e85a32]' />
            <h2 className='text-xl font-bold dark:text-white md:text-2xl'>
              A Win-Win for All:
            </h2>
          </div>
          <ul className='md:text-md space-y-4 text-sm text-gray-700 dark:text-gray-300'>
            <li className='flex items-center gap-3'>
              <div className='h-2 w-2 rounded-full bg-[#e85a32]' />
              <span>
                <span className='font-bold'>Members</span> get immediate access
                to urgent services from trusted providers.
              </span>
            </li>
            <li className='flex items-center gap-3'>
              <div className='h-2 w-2 rounded-full bg-[#e85a32]' />
              <span>
                <span className='font-bold'>Vendors and suppliers</span> expand
                their business network and increase visibility within the
                community.
              </span>
            </li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className='border-t pt-8 dark:border-gray-700'
        >
          <p className='text-md text-gray-700 dark:text-gray-300 md:text-lg'>
            Together, we are building a community where{' '}
            <span className='font-bold'>everyone benefits</span>—a place where
            needs are met, businesses grow, and community flourish.
          </p>
          <p className='md:text-md mt-4 text-sm font-medium text-gray-700 dark:text-gray-300'>
            Join Bharatiya Popular Party in creating a stronger, more connected
            community.
          </p>
        </motion.div>
      </div>
    </motion.section>
  )
}

// EthicsVendorsSuppliers Component
const EthicsVendorsSuppliers = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className='relative w-full py-8 dark:bg-gray-800'
    >
      <div className='mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className='mb-6 flex items-center gap-3'
        >
          <HandshakeIcon className='h-8 w-8 text-[#e85a32]' />
          <h1 className='text-2xl font-bold tracking-tight dark:text-white md:text-3xl lg:text-4xl'>
            Ethics of Vendors and Suppliers
          </h1>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className='md:text-md mb-12 space-y-4 text-sm text-gray-700 dark:text-gray-300'
        >
          <p>
            At Bharatiya Popular Party, we believe that our vendors and
            suppliers play a crucial role in building a supportive and
            compassionate community. To ensure the well-being of our members and
            society, we uphold the highest ethical standards and trust that all
            our partners will act with integrity, fairness, and respect.
          </p>
        </motion.div>
        <div className='mb-12 space-y-6'>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className='text-xl font-bold dark:text-white md:text-2xl'
          >
            Ethical Principles for Vendors and Suppliers
          </motion.h2>
          <Separator />
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            {[
              {
                icon: <DollarSign className='h-6 w-6 text-white' />,
                title: 'Reasonable Pricing',
                description:
                  'We trust that all vendors will charge fair and reasonable rates for their services, ensuring that our members have access to affordable solutions without financial burdens.',
              },
              {
                icon: <CheckCircle className='h-6 w-6 text-white' />,
                title: 'Honesty and Transparency',
                description:
                  'Vendors should always be truthful regarding their commitments and capabilities, maintaining clear communication about services, pricing, and timelines to build trust and credibility.',
              },
              {
                icon: <ClipboardCheck className='h-6 w-6 text-white' />,
                title: 'Sincerity in Service',
                description:
                  'Bharatiya Popular Party vendors must be dedicated to providing the best possible services with professionalism and care, ensuring that members needs are met diligently.',
              },
              {
                icon: <Smile className='h-6 w-6 text-white' />,
                title: 'Cordial and Understanding Approach',
                description:
                  'Vendors are encouraged to maintain a respectful and understanding approach with members, helping create a supportive environment.',
              },
              {
                icon: <Heart className='h-6 w-6 text-white' />,
                title: 'Sympathy and Compassion',
                description:
                  'Vendors should show empathy and compassion, especially when assisting members facing challenging situations, creating a community of care and support.',
              },
            ].map((principle, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * (index + 1), duration: 0.6 }}
                className='overflow-hidden rounded-lg bg-white shadow-md dark:bg-gray-800'
              >
                <div className='flex items-center gap-2 bg-[#e85a32] p-4'>
                  {principle.icon}
                  <h3 className='text-md font-semibold text-white md:text-lg'>
                    {principle.title}
                  </h3>
                </div>
                <div className='p-4'>
                  <p className='md:text-md text-sm text-gray-700 dark:text-gray-300'>
                    {principle.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className='border-t pt-8 dark:border-gray-700'
        >
          <p className='text-md text-gray-700 dark:text-gray-300 md:text-lg'>
            By adhering to these ethical guidelines, Bharatiya Popular Party
            vendors and suppliers help create a compassionate community that
            benefits both businesses and individuals alike.
          </p>
          <p className='md:text-md mt-4 text-sm font-medium text-gray-700 dark:text-gray-300'>
            Together, we can ensure that everyone in our network receives the
            support and care they deserve.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='mt-6 rounded-lg bg-[#e85a32] px-6 py-3 font-medium text-white transition-colors hover:bg-[#e85a32]/90'
          >
            Learn More
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  )
}

// SupplierInclusion Component
const SupplierInclusion = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className='relative py-12 md:py-16'
    >
      <div className='mx-auto max-w-7xl px-6'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className='mb-3 flex gap-3'>
            <Badge
              className='text-white'
              style={{ backgroundColor: '#e85a32' }}
            >
              Supplier Inclusion
            </Badge>
          </div>
          <h1 className='mb-12 max-w-4xl text-3xl font-bold md:text-4xl'>
            Bharatiya Political Party Supplier Inclusion
          </h1>
        </motion.div>
        <div className='space-y-4'>
          {[
            {
              icon: (
                <Heart
                  className='h-10 w-10 flex-shrink-0 md:h-12 md:w-12'
                  style={{ color: '#e85a32' }}
                />
              ),
              description:
                'At Bharatiya Political Party, we are proud to work with vendors or suppliers who understand our commitment to the noble and social causes of community contribution.',
            },
            {
              icon: (
                <Users
                  className='h-10 w-10 flex-shrink-0 md:h-12 md:w-12'
                  style={{ color: '#e85a32' }}
                />
              ),
              description:
                'As registered members of our community contribution network, we value the role our vendors play.',
            },
            {
              icon: (
                <Target
                  className='h-10 w-10 flex-shrink-0 md:h-12 md:w-12'
                  style={{ color: '#e85a32' }}
                />
              ),
              description:
                'As part of our initiative, we trust that you will ensure the delivery of high-quality products and services at reasonable and competitive rates.',
            },
            {
              icon: (
                <ScrollText
                  className='h-10 w-10 flex-shrink-0 md:h-12 md:w-12'
                  style={{ color: '#e85a32' }}
                />
              ),
              description: (
                <>
                  <p className='text-md md:text-lg'>
                    Your commitment to work on the given parameters will provide
                    maximum value to our community while supporting the
                    collective vision for national progress.
                  </p>
                  <p
                    className='text-md font-medium md:text-lg'
                    style={{ color: '#e85a32' }}
                  >
                    Thank you for your dedication.
                  </p>
                </>
              ),
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * (index + 1), duration: 0.6 }}
            >
              <Card>
                <CardContent className='p-3'>
                  <div className='flex items-center gap-4 p-4'>
                    {item.icon}
                    <div className='text-sm md:text-lg'>{item.description}</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className='mt-10 flex justify-center'
        >
          <div
            className='h-1 w-80 rounded-full'
            style={{ backgroundColor: '#e85a32' }}
          />
        </motion.div>
      </div>
    </motion.section>
  )
}

// VendorDisclosure Component
const VendorDisclosure = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className='relative py-10'
    >
      <div className='mx-auto max-w-7xl px-6'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className='mb-12 flex items-start justify-between'
        >
          <div className='space-y-4'>
            <h2 className='text-2xl font-semibold md:text-3xl'>
              Vendor Disclosure Statement
            </h2>
          </div>
        </motion.div>
        <div className='grid gap-8 md:grid-cols-12'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className='border-l-4 pl-6 md:col-span-12'
            style={{ borderLeftColor: '#e85a32' }}
          >
            <p className='text-md leading-relaxed md:text-xl'>
              As a vendor or supplier associated with Bharatiya Political Party,
              I hereby confirm that I am a registered member of the party, as
              well as an active participant in the party's community
              contribution app.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className='flex flex-col space-y-8 md:col-span-6'
          >
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
                    <h3 className='md:text-md text-sm font-semibold'>
                      I promise to uphold the values of the party and to provide
                      the best possible service and products to support the
                      party's objectives.
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className='flex flex-col space-y-8 md:col-span-6'
          >
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
                    <h3 className='md:text-md text-sm font-semibold'>
                      I also confirm to ensure that the prices I offer are
                      reasonable and competitive, while maintaining the high
                      standards of quality in the products and services I
                      provide to the party's community.
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            className='md:col-span-12'
          >
            <div className='flex items-center gap-4 rounded-lg border p-6'>
              <ArrowRight
                className='h-6 w-6 flex-shrink-0'
                style={{ color: '#e85a32' }}
              />
              <p className='text-md md:text-lg'>
                My primary focus will not be on maximizing profits, but on
                supporting the core objective of community contribution.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

// BusinessCommunityCombined Component
const BusinessCommunityCombined = () => (
  <div className='space-y-12'>
    <VendorSupplier />
    <EthicsVendorsSuppliers />
    <SupplierInclusion />
    <VendorDisclosure />
  </div>
)

// HowItWorksContent Component
const HowItWorksContent = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className='py-8'
    >
      <div className='mx-auto max-w-7xl'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className='mb-6 flex items-center gap-3'
        >
          <h1 className='text-2xl font-extrabold tracking-tight dark:text-white md:text-3xl'>
            How Community Contribution Works
          </h1>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className='md:text-md my-2 space-y-3 text-sm text-gray-700 dark:text-gray-300'
        >
          <p>
            Community development and support will be driven by three main
            groups: the Common Man, Professionals, and Business Leaders.
            Together, these individuals create a system that addresses and
            solves community issues in a collaborative manner.
          </p>
          <p>
            <span className='font-semibold'>'Community-Contribution'</span>{' '}
            services will be available starting{' '}
            <span className='font-semibold'>January 1st, 2026.</span>
          </p>
        </motion.div>

        {/* Registration Section */}
        <div className='my-12 grid gap-8 md:grid-cols-2'>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <div>
              <h2 className='mb-4 text-lg font-extrabold tracking-tight dark:text-white md:text-xl lg:text-2xl'>
                Register your Case
              </h2>
              <p className='md:text-md mb-6 mt-3 text-sm text-gray-600 dark:text-gray-400'>
                Every member of the community, or the primary member who has any
                concern to address can upload that on the App.
              </p>
              <div className='space-y-6'>
                {registrationSteps.map(
                  ({ icon, title, description }, index) => (
                    <motion.div
                      key={title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 * (index + 1), duration: 0.6 }}
                    >
                      <Card className='shadow-lg'>
                        <CardHeader className='bg-[#e85b33] p-4 text-white'>
                          <div className='flex items-center gap-3'>
                            <span className='rounded-full bg-white/20 p-2'>
                              {icon}
                            </span>
                            <CardTitle className='md:text-md text-sm font-bold'>
                              {title}
                            </CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent className='bg-white p-4 text-sm dark:bg-gray-800'>
                          <p>{description}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )
                )}
              </div>
            </div>
            <div className='mt-8 space-y-3'>
              <h2 className='mb-4 text-lg font-extrabold tracking-tight dark:text-white md:text-xl lg:text-2xl'>
                Review by the Administration
              </h2>
              <p className='md:text-md mb-6 mt-3 text-sm text-gray-600 dark:text-gray-400'>
                The concern will be addressed and reviewed by the Bharatiya
                Popular Party administration, consisting of State heads,
                district heads, and rural or block heads. Administration will
                assess and accept or reject the case based on urgency,
                relevance, and verification.
              </p>
              {verificationSteps.map(({ icon, title, description }, index) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 * (index + 1), duration: 0.6 }}
                >
                  <Card className='shadow-lg'>
                    <CardHeader className='bg-[#e85b33] p-4 text-white'>
                      <div className='flex items-center gap-3'>
                        <span className='rounded-full bg-white/20 p-2'>
                          {icon}
                        </span>
                        <CardTitle className='md:text-md text-sm font-bold'>
                          {title}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className='bg-white p-4 text-sm dark:bg-gray-800'>
                      <p>{description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className='relative'
          >
            <img
              src={flowchart}
              className='w-full rounded-md'
              alt='Registration process'
            />
          </motion.div>
        </div>

        {/* Verification Section */}
        <div className='mb-12 grid items-center gap-8 md:grid-cols-2'>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className='space-y-6'
          >
            <h2 className='mb-4 text-lg font-extrabold tracking-tight dark:text-white md:text-xl lg:text-2xl'>
              Verification Process
            </h2>
            <p className='md:text-md mb-6 mt-3 text-sm text-gray-600 dark:text-gray-400'>
              Submitted concerns will go through the verification process. If
              any supporting documents or details appear to be unclear,
              inaccurate, or insufficient, the concern may undergo further
              verification.
            </p>
            {implementationSteps.map(({ icon, title, description }, index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * (index + 1), duration: 0.6 }}
              >
                <Card className='shadow-lg'>
                  <CardHeader className='bg-[#e85b33] p-4 text-white'>
                    <div className='flex items-center gap-3'>
                      <span className='rounded-full bg-white/20 p-2'>
                        {icon}
                      </span>
                      <CardTitle className='md:text-md text-sm font-bold'>
                        {title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className='bg-white p-4 text-sm dark:bg-gray-800'>
                    <p>{description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className='relative'
          >
            <img
              src={communityContribution}
              className='w-full rounded-md'
              alt='Verification process'
            />
          </motion.div>
        </div>

        {/* Additional Sections */}
        <div className='space-y-8'>
          {[
            {
              title: 'Raising an Appeal',
              content:
                'If a concern is rejected, the person who submitted it has the right to appeal the decision. The appeal can be based on providing additional information or clarifying any misinterpretations of the original submission.',
            },
            {
              title: 'Review of Appeal',
              content:
                'The appeal will be reviewed by a higher body within the Bharatiya Popular Party. The final decision on the appeal will be communicated to the concerned member. This decision will be final and binding.',
            },
            {
              title: 'Voting',
              content:
                'Upon acceptance of the case, this will go to the pool for Voting. A criteria of 60/40 proportion will be followed. This means the 60% of community OATs should favour the requirement posted by the individual (or recipient).',
            },
            {
              title: 'Professional Response',
              content:
                'Once a concern is approved, relevant Professional according to the specialised area, will address the concern. Based on App analysis professional will assess the situation and provide the necessary guidance, support, and solutions. Fees charged by the professional should be reasonable as this is a pure community service.',
            },
            {
              title: 'Administration for the Approval',
              content:
                'Once the professional gives the acceptance to serve the concern, this will finally go for administration approval.',
            },
            {
              title: 'Upon the Final Review by the Administration',
              content:
                'Professional will review, comment, refer to business or serve the concern.',
            },
            {
              title: 'Community Fund Utilization',
              content:
                'Once the service is provided, payment will be made directly to the business or service provider, ensuring transparency and smooth transactions. The community fund will be used to make such payment to the professionals, businesses and to purchase services like medical care, scholarships, education, consultancy, etc.',
            },
          ].map(({ title, content }, index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * (index + 1), duration: 0.6 }}
            >
              <Card className='shadow-lg'>
                <CardHeader className='bg-[#e85b33] p-4 text-white'>
                  <CardTitle className='md:text-md text-sm font-bold'>
                    {title}
                  </CardTitle>
                </CardHeader>
                <CardContent className='bg-white p-4 text-sm dark:bg-gray-800'>
                  <p>{content}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

// CommunityContributionTabs Component
const CommunityContributionTabs = () => {
  return (
    <div className='w-full'>
      <HeaderComponent
        heading='Community Contribution'
        text="We can't help everyone, but everyone can help someone."
        breadcrumbLinks={[
          { label: 'Home', href: '/' },
          {
            label: 'How It Works',
            href: '/community-contribution/how-it-works',
          },
        ]}
        imgUrl={community}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className='container py-4'
      >
        <Tabs defaultValue='community' className='w-full'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className='flex justify-center'
          >
            <TabsList className='grid w-full max-w-md grid-cols-2 rounded-full bg-[#e85a32]/10'>
              <TabsTrigger
                value='community'
                className='md:text-md rounded-full text-sm data-[state=active]:bg-[#e85a32] data-[state=active]:text-white'
              >
                Community Contribution
              </TabsTrigger>
              <TabsTrigger
                value='business'
                className='md:text-md rounded-full text-sm data-[state=active]:bg-[#e85a32] data-[state=active]:text-white'
              >
                Business Community
              </TabsTrigger>
            </TabsList>
          </motion.div>
          <AnimatePresence mode='wait'>
            <TabsContent value='community'>
              <motion.div
                key='community'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.6 }}
              >
                <HowItWorksContent />
              </motion.div>
            </TabsContent>
            <TabsContent value='business'>
              <motion.div
                key='business'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.6 }}
              >
                <BusinessCommunityCombined />
              </motion.div>
            </TabsContent>
          </AnimatePresence>
        </Tabs>
      </motion.div>
    </div>
  )
}

export default CommunityContributionTabs
