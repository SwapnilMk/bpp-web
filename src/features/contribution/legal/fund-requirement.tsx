import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { FundRequirementFormValues } from '@/schema/caseRegistrationSchema/legal/schema';
import { IndianRupee } from 'lucide-react';
import { useFormContext, useWatch } from 'react-hook-form';
import { PercentageAmountInput } from './PercentageAmountInput';
import { useEffect } from 'react';

export function FundRequirementForm() {
    const {
        register,
        control,
        setValue,
        formState: { errors },
    } = useFormContext<FundRequirementFormValues>();

    const totalCost = useWatch({ control, name: 'totalCost' });
    const selfAmount = useWatch({ control, name: 'selfAmount' }) || 0;
    const familyFriendsAmount = useWatch({ control, name: 'familyFriendsAmount' }) || 0;
    const workplaceAmount = useWatch({ control, name: 'workplaceAmount' }) || 0;
    const otherInstitutesAmount = useWatch({ control, name: 'otherInstitutesAmount' }) || 0;

    const calculatePercentage = (amount: number): string => {
        if (!totalCost || totalCost <= 0) return '0';
        return ((amount / totalCost) * 100).toFixed(2);
    };

    const totalAmount = selfAmount + familyFriendsAmount + workplaceAmount + otherInstitutesAmount;
    const remainingAmount = totalCost - totalAmount;

    useEffect(() => {
        setValue('totalAmountRequested', totalAmount);
    }, [totalAmount, setValue]);

    const isTotalCostEntered = !!totalCost && totalCost > 0;

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl font-bold">Fund Requirement</CardTitle>
                <CardDescription className="py-2">This facility is available in org legal aid</CardDescription>
                <Separator />
            </CardHeader>
            <CardContent>
                <div className="space-y-4 text-start">
                    <div>
                        <Label htmlFor="totalCost" className="block text-sm font-medium text-primary">
                            Total cost of your case*
                        </Label>
                        <Input
                            id="totalCost"
                            className="block w-full p-2 border rounded-md"
                            type="number"
                            min="0"
                            {...register('totalCost', { 
                                valueAsNumber: true,
                                onChange: (e) => {
                                    const value = parseFloat(e.target.value);
                                    if (!value || value <= 0) {
                                        setValue('selfAmount', 0);
                                        setValue('familyFriendsAmount', 0);
                                        setValue('workplaceAmount', 0);
                                        setValue('otherInstitutesAmount', 0);
                                        setValue('totalAmountRequested', 0);
                                    }
                                }
                            })}
                        />
                        {errors.totalCost && (
                            <span className="text-sm text-destructive">{errors.totalCost.message}</span>
                        )}
                    </div>

                    <PercentageAmountInput
                        percentageName="selfPercentage"
                        amountName="selfAmount"
                        label="SELF"
                        errors={errors}
                        disabled={!isTotalCostEntered}
                        onAmountChange={(value) => {
                            setValue('selfPercentage', calculatePercentage(value));
                        }}
                    />

                    <PercentageAmountInput
                        percentageName="familyFriendsPercentage"
                        amountName="familyFriendsAmount"
                        label="Family & Friends"
                        errors={errors}
                        disabled={!isTotalCostEntered}
                        onAmountChange={(value) => {
                            setValue('familyFriendsPercentage', calculatePercentage(value));
                        }}
                    />

                    <PercentageAmountInput
                        percentageName="workplacePercentage"
                        amountName="workplaceAmount"
                        label="Workplace"
                        errors={errors}
                        disabled={!isTotalCostEntered}
                        onAmountChange={(value) => {
                            setValue('workplacePercentage', calculatePercentage(value));
                        }}
                    />

                    <PercentageAmountInput
                        percentageName="otherInstitutesPercentage"
                        amountName="otherInstitutesAmount"
                        label="Other Institutes"
                        errors={errors}
                        disabled={!isTotalCostEntered}
                        onAmountChange={(value) => {
                            setValue('otherInstitutesPercentage', calculatePercentage(value));
                        }}
                    />

                    <div>
                        <Label htmlFor="totalAmountRequested" className="block text-sm font-medium text-primary">
                            Total amount requested*
                        </Label>
                        <div className="flex rounded-lg shadow-sm">
                            <Input
                                id="totalAmountRequested"
                                className="-me-px flex-1 rounded-e-none"
                                value={remainingAmount.toFixed(2)}
                                readOnly
                                {...register('totalAmountRequested', { valueAsNumber: true })}
                            />
                            <div className="inline-flex w-9 items-center justify-center rounded-e-lg border border-input bg-background">
                                <IndianRupee size={16} strokeWidth={2} />
                            </div>
                        </div>
                        {errors.totalAmountRequested && (
                            <span className="text-sm text-destructive">{errors.totalAmountRequested.message}</span>
                        )}
                        {remainingAmount > 0 && (
                            <div className="mt-2 text-sm text-amber-600">
                                Remaining amount: ₹{remainingAmount.toFixed(2)}
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}