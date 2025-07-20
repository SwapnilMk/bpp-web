import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { CaseRegistrationFormValues } from '@/schema/caseRegistrationSchema/legal/schema';
import { useFormContext, Controller } from 'react-hook-form';

export function CaseRegistrationForm() {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext<CaseRegistrationFormValues>();

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl font-bold">Register your Case</CardTitle>
                <CardDescription className="py-2">Case Registration</CardDescription>
                <Separator />
            </CardHeader>
            <CardContent>
                <div className="space-y-4 text-start">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="typeOfSupport" className="block text-sm font-medium text-primary">
                                Type of Support*
                            </Label>
                            <Input
                                id="typeOfSupport"
                                {...register('typeOfSupport')}
                                className="block w-full p-2 border rounded-md"
                            />
                            {errors.typeOfSupport && (
                                <span className="text-sm text-destructive">{errors.typeOfSupport.message}</span>
                            )}
                        </div>
                        <div>
                            <Label htmlFor="category" className="block text-sm font-medium text-primary">
                                Category*
                            </Label>
                            <Input
                                id="category"
                                {...register('category')}
                                className="block w-full p-2 border rounded-md"
                            />
                            {errors.category && (
                                <span className="text-sm text-destructive">{errors.category.message}</span>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="typeOfCase" className="block text-sm font-medium text-primary">
                                Type of Case*
                            </Label>
                            <Controller
                                name="typeOfCase"
                                control={control}
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a case type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Criminal Cases">Criminal Cases</SelectItem>
                                            <SelectItem value="Civil Cases">Civil Cases</SelectItem>
                                            <SelectItem value="Constitutional Cases">Constitutional Cases</SelectItem>
                                            <SelectItem value="Administrative Cases">Administrative Cases</SelectItem>
                                            <SelectItem value="Family Law Cases">Family Law Cases</SelectItem>
                                            <SelectItem value="Commercial Cases">Commercial Cases</SelectItem>
                                            <SelectItem value="Labor and Employment Cases">Labor and Employment Cases</SelectItem>
                                            <SelectItem value="Environmental Cases">Environmental Cases</SelectItem>
                                            <SelectItem value="Property Cases">Property Cases</SelectItem>
                                            <SelectItem value="Consumer Cases">Consumer Cases</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.typeOfCase && (
                                <span className="text-sm text-destructive">{errors.typeOfCase.message}</span>
                            )}
                        </div>
                        <div>
                            <Label htmlFor="dateOfDispute" className="block text-sm font-medium text-primary">
                                Date of Dispute*
                            </Label>
                            <Input
                                type="date"
                                id="dateOfDispute"
                                {...register('dateOfDispute')}
                                className="block w-full p-2 border rounded-md"
                            />
                            {errors.dateOfDispute && (
                                <span className="text-sm text-destructive">{errors.dateOfDispute.message}</span>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <Label htmlFor="briefYourCase" className="block text-sm font-medium text-primary">
                                Brief your case*
                            </Label>
                            <textarea
                                id="briefYourCase"
                                {...register('briefYourCase')}
                                className="block w-full p-2 border rounded-md"
                                rows={4}
                            />
                            {errors.briefYourCase && (
                                <span className="text-sm text-destructive">{errors.briefYourCase.message}</span>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <Label htmlFor="additionalDocument" className="block text-sm font-medium text-primary">
                                Additional Document
                            </Label>
                            <Input
                                type="file"
                                id="additionalDocument"
                                {...register('additionalDocument')}
                                accept=".pdf,.jpg,.jpeg,.png"
                                className="block w-full p-2 border rounded-md"
                            />
                            {errors.additionalDocument && (
                                <span className="text-sm text-destructive">{errors.additionalDocument.message}</span>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="financialAid" className="block text-sm font-medium text-primary">
                                Financial Aid
                            </Label>
                            <Controller
                                name="financialAid"
                                control={control}
                                defaultValue="no"
                                render={({ field }) => (
                                    <div className="flex items-center space-x-4">
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="financialAidYes"
                                                checked={field.value === "yes"}
                                                onCheckedChange={() => field.onChange("yes")}
                                            />
                                            <Label htmlFor="financialAidYes">Yes</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="financialAidNo"
                                                checked={field.value === "no"}
                                                onCheckedChange={() => field.onChange("no")}
                                            />
                                            <Label htmlFor="financialAidNo">No</Label>
                                        </div>
                                    </div>
                                )}
                            />
                            <div className="text-sm text-red-600">Financial Aid Currently unavailable</div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}