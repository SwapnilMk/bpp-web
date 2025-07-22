import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FieldErrors, useFormContext } from 'react-hook-form';
import { fundRequirementSchema } from '@/features/contribution/legal/schema/case-registration';
import { IndianRupee } from 'lucide-react';
import { z } from 'zod';

interface PercentageAmountInputProps {
    percentageName: keyof z.infer<typeof fundRequirementSchema>;
    amountName: keyof z.infer<typeof fundRequirementSchema>;
    label: string;
    errors: FieldErrors<z.infer<typeof fundRequirementSchema>>;
    disabled?: boolean;
    onAmountChange: (value: number) => void;
}

export function PercentageAmountInput({
    percentageName,
    amountName,
    label,
    errors,
    disabled = false,
    onAmountChange,
}: PercentageAmountInputProps) {
    const { register } = useFormContext<z.infer<typeof fundRequirementSchema>>();

    return (
        <div>
            <Label className="mb-2 block text-sm font-medium text-primary">
                {label}
            </Label>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <div className="flex">
                        <Input
                            id={percentageName}
                            type="text"
                            disabled={disabled}
                            className="flex-1 rounded-e-none border-r-0 rounded-md rounded-r-none p-2"
                            placeholder="Percentage"
                            {...register(percentageName)}
                        />
                        <div className="inline-flex w-9 items-center justify-center rounded-e-md border border-l-0 border-input bg-background">
                            <span className="text-sm">%</span>
                        </div>
                    </div>
                    {errors[percentageName] && (
                        <span className="text-sm text-destructive">{String(errors[percentageName]?.message)}</span>
                    )}
                </div>
                <div>
                    <div className="flex">
                        <Input
                            id={amountName}
                            type="number"
                            disabled={disabled}
                            className="flex-1 rounded-e-none border-r-0 rounded-md rounded-r-none p-2"
                            placeholder="Amount"
                            {...register(amountName, {
                                valueAsNumber: true,
                                onChange: (e) => onAmountChange(parseFloat(e.target.value) || 0),
                            })}
                        />
                        <div className="inline-flex w-9 items-center justify-center rounded-e-md border border-l-0 border-input bg-background">
                            <IndianRupee size={16} strokeWidth={2} />
                        </div>
                    </div>
                    {errors[amountName] && (
                        <span className="text-sm text-destructive">{String(errors[amountName]?.message)}</span>
                    )}
                </div>
            </div>
        </div>
    );
}