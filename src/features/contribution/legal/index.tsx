import { useState, useEffect, memo } from 'react';
import { Stepper, Step, StepLabel } from '@/components/ui/stepper';
import { MemberInfoForm } from './member-info';
import { CaseInfoForm } from './case-info';
import { FundRequirementForm } from './fund-requirement';
import { BeneficiaryInfoForm } from './beneficiary-info';
import { LocationInfoForm } from './location-info';
import { ReviewStep } from './reviews';
import { useMultiStepForm } from '@/hooks/useMultiStepForm';
import { z } from 'zod';
import { membersInfoSchema, caseRegisterSchema, fundRequirementSchema, beneficiarySchema, locationSchema, MembersInfoFormValues, CaseRegistrationFormValues, FundRequirementFormValues, BeneficiaryFormValues, LocationSchemaFormValues } from './schema';
import { contributionService } from '@/services/contribution.service';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Maximize, Minimize } from 'lucide-react';

const steps = [
  { label: 'Member', schema: membersInfoSchema },
  { label: 'Case', schema: caseRegisterSchema },
  { label: 'Fund', schema: fundRequirementSchema },
  { label: 'Beneficiary', schema: beneficiarySchema },
  { label: 'Location', schema: locationSchema },
  { label: 'Review', schema: z.object({}) },
];

type FormData = MembersInfoFormValues | CaseRegistrationFormValues | FundRequirementFormValues | BeneficiaryFormValues | LocationSchemaFormValues

interface LegalContributionProps {
  typeOfSupport: string | null;
  category: string | null;
  setCurrentStep: (step: number) => void;
}

export const LegalContribution = memo(({ typeOfSupport, category, setCurrentStep }: LegalContributionProps) => {
  const [formData, setFormData] = useState({});
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isFullScreen, setIsFullScreen] = useState(false);

  const { currentStep, next, back, goTo } = useMultiStepForm(steps.length);

  useEffect(() => {
    setCurrentStep(currentStep);
  }, [currentStep, setCurrentStep]);

  useEffect(() => {
    if (typeOfSupport && category) {
      setFormData((prev) => ({ ...prev, typeOfSupport, category }));
    }
  }, [typeOfSupport, category]);

  const handleNext = (data: FormData) => {
    setFormData((prev) => ({ ...prev, ...data }));
    next();
  };

  const handleBack = () => {
    back();
  };

  const handleSubmit = async () => {
    try {
      const caseData = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value instanceof FileList) {
          caseData.append(key, value[0]);
        } else {
          caseData.append(key, value as string);
        }
      });
      await contributionService.createCase(caseData);
      toast({
        title: 'Success',
        description: 'Your case has been successfully submitted.',
      });
      navigate({ to: '/dashboard/community-contribution' });
    } catch (_error) {
      toast({
        title: 'Error',
        description: 'There was an error submitting your case. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <MemberInfoForm onNext={handleNext} />;
      case 1:
        return <CaseInfoForm onNext={handleNext} onBack={handleBack} typeOfSupport={typeOfSupport} category={category} />;
      case 2:
        return <FundRequirementForm onNext={handleNext} onBack={handleBack} />;
      case 3:
        return <BeneficiaryInfoForm onNext={handleNext} onBack={handleBack} />;
      case 4:
        return <LocationInfoForm onNext={handleNext} onBack={handleBack} />;
      case 5:
        return <ReviewStep formData={formData} onBack={handleBack} onSubmit={handleSubmit} />;
      default:
        return null;
    }
  };

  return (
    <div className={`container mx-auto p-4 ${isFullScreen ? 'fixed inset-0 z-50 bg-background' : ''}`}>
      <div className="flex justify-end">
        <Button onClick={toggleFullScreen} variant="ghost" size="icon">
          {isFullScreen ? <Minimize className="h-6 w-6" /> : <Maximize className="h-6 w-6" />}
        </Button>
      </div>
      <Stepper>
        {steps.map((step, index) => (
          <Step key={step.label} onClick={() => goTo(index)} className={currentStep === index ? 'cursor-pointer' : ''}>
            <StepLabel>{step.label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div className="mt-8">{renderStep()}</div>
    </div>
  );
});
