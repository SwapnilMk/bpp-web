import { BeneficiaryForm } from '@/features/contribution/legal/beneficiary-info';
import { CaseRegistrationForm } from '@/features/contribution/legal/case-info';
import { FundRequirementForm } from '@/features/contribution/legal/fund-requirement';
import { MembersInfoForm } from '@/features/contribution/legal/member-info';
import { Review } from '@/features/contribution/legal/reviews';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { beneficiarySchema, caseRegisterSchema, fundRequirementSchema, locationSchema, membersInfoSchema } from '@/features/contribution/legal/schema/case-registration';
import { zodResolver } from '@hookform/resolvers/zod';
import { defineStepper } from '@stepperize/react';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { LocationInfoForm } from './location-info';
import { Loader2 } from 'lucide-react';
import { Main } from '@/components/layout/dashboard/main';
import { useRouter } from '@tanstack/react-router';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { useDispatch, useSelector } from 'react-redux';
import { submitCase } from '@/store/thunks';
import { RootState, AppDispatch } from '@/store/store';
import { useEffect } from 'react';
import { resetCaseSubmissionState } from '@/store/slice/case.slice';

const { useStepper, steps, utils } = defineStepper(
  { id: 'member', schema: membersInfoSchema },
  { id: 'case', schema: caseRegisterSchema },
  { id: 'fund', schema: fundRequirementSchema },
  { id: 'beneficiary', schema: beneficiarySchema },
  { id: 'location', schema: locationSchema },
  { id: 'review', schema: z.object({}) }
);

export function LegalCaseRegistration() {
  const router = useRouter();
  const search = router.state.location.search as { typeOfSupport?: string; category?: string };
  const typeOfSupport = search?.typeOfSupport;
  const category = search?.category;
  const stepper = useStepper();
  const [showSuccessModal, setShowSuccessModal] = React.useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const caseState = useSelector((state: RootState) => state.case);

  useEffect(() => {
    if (caseState.submitSuccess) {
      setShowSuccessModal(true);
    }
  }, [caseState.submitSuccess]);

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    dispatch(resetCaseSubmissionState());
  };

  const form = useForm({
    mode: 'onBlur',
    resolver: zodResolver(stepper.current.schema),
  });

  const onSubmit = (_values: z.infer<typeof stepper.current.schema>) => {
    if (stepper.isLast) {
      const allFormData = form.getValues();
      dispatch(submitCase(allFormData))
        .unwrap()
        .then(() => setShowSuccessModal(true))
        .catch(() => {});
    } else {
      stepper.next();
    }
  };

  const currentIndex = utils.getIndex(stepper.current.id);

  return (
    <Main>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto space-y-6 rounded-lg">
          <Card className="rounded-2xl bg-card/90 dark:bg-card/90">
            <CardHeader className="pb-2 border-b-0">
              <div className="flex flex-col gap-2 items-center text-center">
                <h2 className="mb-1 text-2xl font-bold tracking-tight md:text-3xl text-primary">Legal Case Registration</h2>
                <p className="max-w-md text-sm text-muted-foreground">Please fill out the following steps to register your legal case. All fields are required unless marked optional.</p>
                <span className="mt-2 text-xs text-muted-foreground">Step {currentIndex + 1} of {steps.length}</span>
              </div>
              <nav aria-label="Checkout Steps" className="my-6 w-full">
                <ol className="flex flex-wrap gap-2 justify-center items-center" aria-orientation="horizontal">
                  {stepper.all.map((step, index, array) => (
                    <React.Fragment key={step.id}>
                      <li className="flex flex-shrink-0 gap-2 items-center">
                        <Button
                          type="button"
                          role="tab"
                          variant={index <= currentIndex ? 'default' : 'secondary'}
                          aria-current={stepper.current.id === step.id ? 'step' : undefined}
                          aria-posinset={index + 1}
                          aria-setsize={steps.length}
                          aria-selected={stepper.current.id === step.id}
                          className={`flex justify-center items-center rounded-full size-9 md:size-10 font-semibold transition-all duration-200 ${stepper.current.id === step.id ? 'ring-2 ring-primary/60' : ''}`}
                          onClick={async () => {
                            const valid = await form.trigger();
                            if (!valid) return;
                            if (index - currentIndex > 1) return;
                            stepper.goTo(step.id);
                          }}
                        >
                          {index + 1}
                        </Button>
                      </li>
                      {index < array.length - 1 && (
                        <Separator
                          className={`hidden md:flex flex-1 h-1 w-8 md:w-16 rounded-full ${index < currentIndex ? 'bg-primary' : 'bg-muted'}`}
                        />
                      )}
                    </React.Fragment>
                  ))}
                </ol>
              </nav>
            </CardHeader>
            <CardContent className="px-2 py-6 md:px-6">
              <div className="space-y-4">
                {stepper.switch({
                  member: () => <MembersInfoForm />,
                  case: () => <CaseRegistrationForm typeOfSupport={typeOfSupport} category={category} />,
                  fund: () => <FundRequirementForm />,
                  location: () => <LocationInfoForm />,
                  beneficiary: () => <BeneficiaryForm />,
                  review: () => <Review />,
                })}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-3 justify-end items-center px-2 pb-6 md:flex-row md:gap-4 md:px-6">
              <Button
                variant="secondary"
                onClick={() => {
                  if (stepper.isFirst) {
                    window.history.back();
                  } else {
                    stepper.prev();
                  }
                }}
                className="w-full md:w-auto"
              >
                Back
              </Button>
              {stepper.isLast ? (
                <Button type="submit" disabled={caseState.isSubmitting} className="w-full md:w-auto">
                  {caseState.isSubmitting && <Loader2 className="mr-2 w-4 h-4 animate-spin" />}
                  Submit
                </Button>
              ) : (
                <Button type="submit" className="w-full md:w-auto">Next</Button>
              )}
            </CardFooter>
              {caseState.error && (
              <div className="text-destructive text-center py-2">{caseState.error}</div>
            )}
          </Card>
        </form>
        <Dialog open={showSuccessModal} onOpenChange={handleCloseModal}>
          <DialogContent className="max-w-sm bg-card dark:bg-card">
            <DialogHeader>
              <DialogTitle>Case submitted successfully!</DialogTitle>
            </DialogHeader>
            <div className="py-2 text-center text-foreground">Your case has been submitted. We will review your submission and contact you soon.</div>
            <DialogFooter>
              <Button onClick={handleCloseModal} className="w-full">Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Form>
    </Main>
  );
}
