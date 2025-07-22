'use client'

import * as React from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  beneficiarySchema,
  caseRegisterSchema,
  fundRequirementSchema,
  locationSchema,
  membersInfoSchema,
} from '@/features/contribution/legal/schema/case-registration'
import { defineStepper } from '@stepperize/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Form } from '@/components/ui/form'
import { Separator } from '@/components/ui/separator'
import { Main } from '@/components/layout/dashboard/main'
import { BeneficiaryForm } from '@/features/contribution/legal/beneficiary-info'
import { CaseRegistrationForm } from '@/features/contribution/legal/case-info'
import { FundRequirementForm } from '@/features/contribution/legal/fund-requirement'
import { LocationInfoForm } from '@/features/contribution/legal/location-info'
import { MembersInfoForm } from '@/features/contribution/legal/member-info'
import { Review } from '@/features/contribution/legal/reviews'

const { useStepper, steps, utils } = defineStepper(
  { id: 'member', schema: membersInfoSchema },
  { id: 'case', schema: caseRegisterSchema },
  { id: 'fund', schema: fundRequirementSchema },
  { id: 'beneficiary', schema: beneficiarySchema },
  { id: 'location', schema: locationSchema },
  { id: 'review', schema: z.object({}) }
)

export function CommunityContributionForm() {
  const stepper = useStepper()

  const form = useForm({
    mode: 'onBlur',
    resolver: zodResolver(stepper.current.schema),
  })

  const onSubmit = (values: z.infer<typeof stepper.current.schema>) => {
    // eslint-disable-next-line no-console
    console.log(`Form values for step ${stepper.current.id}:`, values)
    if (stepper.isLast) {
      stepper.reset()
    } else {
      stepper.next()
    }
  }

  const currentIndex = utils.getIndex(stepper.current.id)

  return (
    <Main>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='mx-auto rounded-lg'
        >
          <div className='my-2 flex justify-between'>
            <div className='flex items-center gap-2'>
              <span className='text-sm text-muted-foreground'>
                Step {currentIndex + 1} of {steps.length}
              </span>
            </div>
          </div>
          <nav aria-label='Checkout Steps' className='group my-4'>
            <ol
              className='flex items-center justify-between gap-2'
              aria-orientation='horizontal'
            >
              {stepper.all.map((step, index, array) => (
                <React.Fragment key={step.id}>
                  <li className='flex flex-shrink-0 items-center gap-4'>
                    <Button
                      type='button'
                      role='tab'
                      variant={index <= currentIndex ? 'default' : 'secondary'}
                      aria-current={
                        stepper.current.id === step.id ? 'step' : undefined
                      }
                      aria-posinset={index + 1}
                      aria-setsize={steps.length}
                      aria-selected={stepper.current.id === step.id}
                      className='flex size-10 items-center justify-center rounded-full'
                      onClick={async () => {
                        const valid = await form.trigger()
                        if (!valid) return
                        if (index - currentIndex > 1) return
                        stepper.goTo(step.id)
                      }}
                    >
                      {index + 1}
                    </Button>
                  </li>
                  {index < array.length - 1 && (
                    <Separator
                      className={`flex-1 ${index < currentIndex ? 'bg-primary' : 'bg-muted'}`}
                    />
                  )}
                </React.Fragment>
              ))}
            </ol>
          </nav>
          <Card>
            <CardHeader></CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {stepper.switch({
                  member: () => <MembersInfoForm />,
                  case: () => <CaseRegistrationForm />,
                  fund: () => <FundRequirementForm />,
                  location: () => <LocationInfoForm />,
                  beneficiary: () => <BeneficiaryForm />,
                  review: () => <Review />,
                })}
              </div>
            </CardContent>
            <CardFooter className='flex justify-end gap-4'>
              {!stepper.isFirst && (
                <Button variant='secondary' onClick={stepper.prev}>
                  Back
                </Button>
              )}
              {stepper.isLast ? (
                <Button type='submit'>Submit</Button>
              ) : (
                <Button type='submit'>Next</Button>
              )}
              {stepper.isLast && (
                <Button variant='outline' onClick={stepper.reset}>
                  Reset
                </Button>
              )}
            </CardFooter>
          </Card>
        </form>
      </Form>
    </Main>
  )
}
