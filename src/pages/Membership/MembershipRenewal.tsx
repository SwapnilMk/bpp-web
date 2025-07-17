import { useNavigate } from '@tanstack/react-router'
import { ArrowRight, CircleCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import RecruitmentBanner from '@/components/common/become-partCard'
import HeaderComponent from '@/components/layout/common/HeaderComponent'

export default function MembershipRenewal() {
  const navigate = useNavigate()
  return (
    <>
      <HeaderComponent
        heading='Membership Upgrade & Renewals'
        text='Membership Upgrade & Renewals'
        breadcrumbLinks={[
          { label: 'Home', href: '/' },
          { label: 'Membership', href: '/membership' },
          { label: 'Upgrade & Renewals', href: '/membership/upgrade-renewals' },
        ]}
        imgUrl={'null'} // Placeholder for header image
      />
      <div className='min-h-screen bg-background'>
        {/* Header Section */}
        <section>
          <div className='container'>
            <div className='mx-auto space-y-4 text-center'>
              <h1 className='mt-4 text-3xl font-bold tracking-tight'>
                Start Your Journey with Bharatiya Popular Party
              </h1>
              <p className='text-md text-muted-foreground'>
                Get your membership and be a vital part of our democratic
                process.
              </p>
            </div>
          </div>
        </section>

        <section className='py-3'>
          <div className='container'>
            <div className='mx-auto flex flex-col items-center gap-6 text-center'>
              <div className='flex flex-col gap-6 md:flex-row'>
                <Card className='flex w-full flex-col justify-between text-left'>
                  <CardHeader>
                    <CardTitle>
                      <p>Primary Membership</p>
                    </CardTitle>
                    <p className='text-sm text-muted-foreground'>
                      Basic Participation
                    </p>
                    <span className='text-4xl font-bold'>₹ 5</span>
                    <p className='text-muted-foreground'>Annual Fee</p>
                  </CardHeader>
                  <CardContent>
                    <Separator className='mb-6' />
                    <ul className='space-y-4'>
                      <li className='flex items-center gap-2'>
                        <CircleCheck className='size-4' />
                        <span>Age 18 Years or above</span>
                      </li>
                      <li className='flex items-center gap-2'>
                        <CircleCheck className='size-4' />
                        <span>Right to Vote</span>
                      </li>
                      <li className='flex items-center gap-2'>
                        <CircleCheck className='size-4' />
                        <span>Term Validity: 1 year</span>
                      </li>
                      <li className='flex items-center gap-2 text-muted-foreground line-through'>
                        <span>Upgrade To Active Membership</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter className='mt-auto'>
                    <Button
                      className='w-full rounded-md bg-[#e85a32] text-white hover:bg-[#e85a32]'
                      onClick={() => navigate({ to: '/dashboard' })}
                    >
                      Get Primary Membership
                      <ArrowRight className='ml-2 size-4' />
                    </Button>
                  </CardFooter>
                </Card>
                <Card className='flex w-full flex-col justify-between text-left'>
                  <CardHeader>
                    <CardTitle>
                      <p>Active Membership</p>
                    </CardTitle>
                    <p className='text-sm text-muted-foreground'>
                      Full Party Engagement
                    </p>
                    <span className='text-4xl font-bold'>₹ 250</span>
                    <p className='text-muted-foreground'>Annual Fee</p>
                  </CardHeader>
                  <CardContent>
                    <Separator className='mb-6' />
                    <p className='mb-3 text-lg font-semibold'>
                      Additional Benefits:
                    </p>
                    <ul className='space-y-4'>
                      <li className='flex items-center gap-2'>
                        <CircleCheck className='size-4' />
                        <span>All Primary Membership Benefits</span>
                      </li>
                      <li className='flex items-center gap-2'>
                        <CircleCheck className='size-4' />
                        <span>Digital App Access</span>
                      </li>
                      <li className='flex items-center gap-2'>
                        <CircleCheck className='size-4' />
                        <span>Access to Community Contribution</span>
                      </li>
                      <li className='flex items-center gap-2'>
                        <CircleCheck className='size-4' />
                        <span>Opportunity to be Nominated for Elections</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter className='mt-auto'>
                    <Button
                      className='w-full rounded-md bg-[#e85a32] text-white hover:bg-[#e85a32]'
                      onClick={() => navigate({ to: '/dashboard' })}
                    >
                      Get Active Membership
                      <ArrowRight className='ml-2 size-4' />
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Information */}
        {/* <section className="py-12">
                    <div className="container">
                        <div className="mx-auto max-w-5xl">
                            <h2 className="mb-6 text-2xl font-bold">Frequently Asked Questions</h2>
                            <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="item-1">
                                    <AccordionTrigger>What are the membership criteria?</AccordionTrigger>
                                    <AccordionContent>
                                        Primary Membership is open to individuals 18 years or above. Active Membership requires referring 10 members to convert to Active Membership.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-2">
                                    <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
                                    <AccordionContent>
                                        We accept all major credit cards, debit cards, and UPI payments. All transactions are secure and encrypted.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-3">
                                    <AccordionTrigger>How can I upgrade my membership?</AccordionTrigger>
                                    <AccordionContent>
                                        You can upgrade to Active Membership by introducing 10 members to the party. The upgrade will be processed after verification.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-4">
                                    <AccordionTrigger>What are the opportunities for Active Members?</AccordionTrigger>
                                    <AccordionContent>
                                        Active Members can be part of various party organs like Panchayat/Municipal Ward Council, Block Council, District Council, State Council, and National Council, based on RCV and member count criteria.
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                            <div className="p-6 mt-12 rounded-lg border bg-background">
                                <div className="flex gap-4 items-start">
                                    <Clock className="mt-1 w-6 h-6 text-primary" />
                                    <div>
                                        <h3 className="mb-2 font-semibold">Need more information?</h3>
                                        <p className="text-muted-foreground">
                                            Contact our membership support team at support@bpp.org or call us at +91 8828477674.
                                        </p>
                                        <p className="text-muted-foreground">
                                            We're here to help you understand your membership benefits and journey.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section> */}
        <RecruitmentBanner />
      </div>
    </>
  )
}
