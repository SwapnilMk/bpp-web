import { useState, useEffect, memo } from 'react'
import { z } from 'zod'
import { useNavigate } from '@tanstack/react-router'
import { contributionService } from '@/services/contribution.service'
import { Maximize, Minimize } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { useMultiStepForm } from '@/hooks/useMultiStepForm'
import { Button } from '@/components/ui/button'
import { Stepper, StepperItem, StepperTitle } from '@/components/ui/stepper'
import { BeneficiaryInfoForm } from './beneficiary-info'
import { CaseInfoForm } from './case-info'
import { FundRequirementForm } from './fund-requirement'
import { LocationInfoForm } from './location-info'
import { MemberInfoForm } from './member-info'
import { ReviewStep } from './reviews'
import {
  membersInfoSchema,
  caseRegisterSchema,
  fundRequirementSchema,
  beneficiarySchema,
  locationSchema,
  MembersInfoFormValues,
  CaseRegistrationFormValues,
  FundRequirementFormValues,
  BeneficiaryFormValues,
  LocationSchemaFormValues,
} from './schema'

const steps = [
  { label: 'Member', schema: membersInfoSchema },
  { label: 'Case', schema: caseRegisterSchema },
  { label: 'Fund', schema: fundRequirementSchema },
  { label: 'Beneficiary', schema: beneficiarySchema },
  { label: 'Location', schema: locationSchema },
  { label: 'Review', schema: z.object({}) },
]

type FormData =
  | MembersInfoFormValues
  | CaseRegistrationFormValues
  | FundRequirementFormValues
  | BeneficiaryFormValues
  | LocationSchemaFormValues

interface LegalContributionProps {
  typeOfSupport: string | null
  category: string | null
  setCurrentStep: (step: number) => void
}

export const LegalContribution = memo(
  ({ typeOfSupport, category, setCurrentStep }: LegalContributionProps) => {
    const [formData, setFormData] = useState({})
    const { toast } = useToast()
    const navigate = useNavigate()
    const [isFullScreen, setIsFullScreen] = useState(false)

    const { currentStepIndex, next, back, goTo } = useMultiStepForm(
      steps as unknown as React.ReactElement[]
    )

    useEffect(() => {
      setCurrentStep(currentStepIndex)
    }, [currentStepIndex, setCurrentStep])

    useEffect(() => {
      if (typeOfSupport && category) {
        setFormData((prev) => ({ ...prev, typeOfSupport, category }))
      }
    }, [typeOfSupport, category])

    const handleNext = (data: FormData) => {
      setFormData((prev) => ({ ...prev, ...data }))
      next()
    }

    const handleBack = () => {
      back()
    }

    const handleSubmit = async () => {
      try {
        const caseData = new FormData()
        Object.entries(formData).forEach(([key, value]) => {
          if (value instanceof FileList) {
            caseData.append(key, value[0])
          } else {
            caseData.append(key, value as string)
          }
        })
        await contributionService.createCase(caseData)
        toast({
          title: 'Success',
          description: 'Your case has been successfully submitted.',
        })
        navigate({ to: '/dashboard/community-contribution' })
      } catch (_error) {
        toast({
          title: 'Error',
          description:
            'There was an error submitting your case. Please try again.',
          variant: 'destructive',
        })
      }
    }

    const toggleFullScreen = () => {
      setIsFullScreen(!isFullScreen)
    }

    const renderStep = () => {
      switch (currentStepIndex) {
        case 0:
          return <MemberInfoForm onNext={handleNext} />
        case 1:
          return (
            <CaseInfoForm
              onNext={handleNext}
              onBack={handleBack}
              typeOfSupport={typeOfSupport}
              category={category}
            />
          )
        case 2:
          return <FundRequirementForm onNext={handleNext} onBack={handleBack} />
        case 3:
          return <BeneficiaryInfoForm onNext={handleNext} onBack={handleBack} />
        case 4:
          return <LocationInfoForm onNext={handleNext} onBack={handleBack} />
        case 5:
          return (
            <ReviewStep
              formData={formData}
              onBack={handleBack}
              onSubmit={handleSubmit}
            />
          )
        default:
          return null
      }
    }

    return (
      <div
        className={`container mx-auto p-4 ${isFullScreen ? 'fixed inset-0 z-50 bg-background' : ''}`}
      >
        <div className='flex justify-end'>
          <Button onClick={toggleFullScreen} variant='ghost' size='icon'>
            {isFullScreen ? (
              <Minimize className='h-6 w-6' />
            ) : (
              <Maximize className='h-6 w-6' />
            )}
          </Button>
        </div>
        <Stepper>
          {steps.map((step, index) => (
            <StepperItem
              key={step.label}
              step={index}
              onClick={() => goTo(index)}
              className={currentStepIndex === index ? 'cursor-pointer' : ''}
            >
              <StepperTitle>{step.label}</StepperTitle>
            </StepperItem>
          ))}
        </Stepper>
        <div className='mt-8'>{renderStep()}</div>
      </div>
    )
  }
)
