import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { fundRequirementSchema } from '@/features/contribution/legal/schema/case-registration';
import { IndianRupee } from 'lucide-react';
import { useFormContext, useWatch } from 'react-hook-form';
import { PercentageAmountInput } from './components/PercentageAmountInput';
import { useEffect } from 'react';
import { z } from 'zod';

export function FundRequirementForm() {
    const {
        register,
        control,
        setValue,
        formState: { errors },
    } = useFormContext<z.infer<typeof fundRequirementSchema>>();

    const totalAmountRaw = useWatch({ control, name: 'totalAmount' });
    const totalAmount = Number(totalAmountRaw) || 0;
    const advocateFeesAmount = useWatch({ control, name: 'advocateFeesAmount' }) || 0;
    const documentationChargesAmount = useWatch({ control, name: 'documentationChargesAmount' }) || 0;
    const clerkChargesAmount = useWatch({ control, name: 'clerkChargesAmount' }) || 0;
    const travelExpensesAmount = useWatch({ control, name: 'travelExpensesAmount' }) || 0;
    const otherExpensesAmount = useWatch({ control, name: 'otherExpensesAmount' }) || 0;

    const calculatePercentage = (amount: number): string => {
        if (!totalAmount || totalAmount <= 0) return '0';
        return ((amount / totalAmount) * 100).toFixed(2);
    };

    const remainingAmount = totalAmount - (advocateFeesAmount + documentationChargesAmount + clerkChargesAmount + travelExpensesAmount + otherExpensesAmount);

    useEffect(() => {
        setValue('totalAmount', totalAmount);
    }, [totalAmount, setValue]);

    const isTotalAmountEntered = totalAmount > 0;

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
                        <Label htmlFor="totalAmount" className="block text-sm font-medium text-primary">
                            Total cost of your case*
                        </Label>
                        <Input
                            id="totalAmount"
                            className="block p-2 w-full rounded-md border"
                            type="number"
                            min="0"
                            {...register('totalAmount', { 
                                valueAsNumber: true,
                                onChange: (e) => {
                                    const value = parseFloat(e.target.value);
                                    if (!value || value <= 0) {
                                        setValue('advocateFeesAmount', 0);
                                        setValue('documentationChargesAmount', 0);
                                        setValue('clerkChargesAmount', 0);
                                        setValue('travelExpensesAmount', 0);
                                        setValue('otherExpensesAmount', 0);
                                        setValue('totalAmount', 0);
                                    }
                                }
                            })}
                        />
                        {errors.totalAmount && (
                            <span className="text-sm text-destructive">{String(errors.totalAmount.message)}</span>
                        )}
                    </div>

                    <PercentageAmountInput
                        percentageName="advocateFeesPercentage"
                        amountName="advocateFeesAmount"
                        label="Advocate Fees"
                        errors={errors}
                        disabled={!isTotalAmountEntered}
                        onAmountChange={(value) => {
                            setValue('advocateFeesPercentage', calculatePercentage(value));
                        }}
                    />

                    <PercentageAmountInput
                        percentageName="documentationChargesPercentage"
                        amountName="documentationChargesAmount"
                        label="Documentation Charges"
                        errors={errors}
                        disabled={!isTotalAmountEntered}
                        onAmountChange={(value) => {
                            setValue('documentationChargesPercentage', calculatePercentage(value));
                        }}
                    />

                    <PercentageAmountInput
                        percentageName="clerkChargesPercentage"
                        amountName="clerkChargesAmount"
                        label="Clerk Charges"
                        errors={errors}
                        disabled={!isTotalAmountEntered}
                        onAmountChange={(value) => {
                            setValue('clerkChargesPercentage', calculatePercentage(value));
                        }}
                    />

                    <PercentageAmountInput
                        percentageName="travelExpensesPercentage"
                        amountName="travelExpensesAmount"
                        label="Travel Expenses"
                        errors={errors}
                        disabled={!isTotalAmountEntered}
                        onAmountChange={(value) => {
                            setValue('travelExpensesPercentage', calculatePercentage(value));
                        }}
                    />

                    <PercentageAmountInput
                        percentageName="otherExpensesPercentage"
                        amountName="otherExpensesAmount"
                        label="Other Expenses"
                        errors={errors}
                        disabled={!isTotalAmountEntered}
                        onAmountChange={(value) => {
                            setValue('otherExpensesPercentage', calculatePercentage(value));
                        }}
                    />

                    <div>
                        <Label htmlFor="totalAmount" className="block text-sm font-medium text-primary">
                            Total amount requested*
                        </Label>
                        <div className="flex rounded-lg shadow-sm">
                            <Input
                                id="totalAmount"
                                className="flex-1 -me-px rounded-e-none"
                                value={totalAmount.toFixed(2)}
                                readOnly
                                {...register('totalAmount', { valueAsNumber: true })}
                            />
                            <div className="inline-flex justify-center items-center w-9 border rounded-e-lg border-input bg-background">
                                <IndianRupee size={16} strokeWidth={2} />
                            </div>
                        </div>
                        {errors.totalAmount && (
                            <span className="text-sm text-destructive">{String(errors.totalAmount.message)}</span>
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
