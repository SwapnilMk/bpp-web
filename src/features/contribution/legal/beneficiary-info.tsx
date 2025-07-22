import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useFormContext, useWatch } from "react-hook-form";
import { BeneficiaryFormValues } from "@/features/contribution/legal/schema/case-registration";
import { useEffect } from "react";

export function BeneficiaryForm() {
    const {
        register,
        control,
        setValue,
        formState: { errors },
    } = useFormContext<BeneficiaryFormValues>();

    const beneficiaryType = useWatch({ control, name: "beneficiaryType" });

    useEffect(() => {
        if (!beneficiaryType) {
            setValue("beneficiaryType", "independentAdvocate");
        }
    }, [beneficiaryType, setValue]);

    return (
        <Card className="bg-card border-border">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-foreground">Beneficiary Information</CardTitle>
                <CardDescription className="py-2 text-muted-foreground">Organization/Individual Information</CardDescription>
                <Separator />
            </CardHeader>
            <CardContent>
                <div className="space-y-8 text-start">
                    {/* Radio Buttons Section */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div className="flex items-center space-x-4">
                            <input
                                type="radio"
                                id="lawFirms"
                                value="lawFirms"
                                {...register("beneficiaryType")}
                                className="radio"
                            />
                            <Label
                                htmlFor="lawFirms"
                                className="block text-sm font-medium text-primary"
                            >
                                Law Firms
                            </Label>

                            <input
                                type="radio"
                                id="independentAdvocate"
                                value="independentAdvocate"
                                {...register("beneficiaryType")}
                                className="radio"
                            />
                            <Label
                                htmlFor="independentAdvocate"
                                className="block text-sm font-medium text-primary"
                            >
                                Independent Advocate
                            </Label>
                        </div>
                    </div>

                    {/* Conditional Inputs */}
                    {beneficiaryType === "lawFirms" && (
                        <div className="flex flex-col gap-2">
                            <Label
                                htmlFor="nameOfLawFirm"
                                className="block text-sm font-medium text-primary"
                            >
                                Name of Law Firm <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                id="nameOfLawFirm"
                                {...register("nameOfLawFirm")}
                                className="block p-2 w-full rounded-md border"
                            />
                            {errors.nameOfLawFirm && (
                                <span className="text-sm text-destructive">
                                    {errors.nameOfLawFirm.message}
                                </span>
                            )}
                        </div>
                    )}

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div className="flex flex-col gap-2">
                            <Label
                                htmlFor="nameOfAdvocate"
                                className="block text-sm font-medium text-primary"
                            >
                                Name of Advocate <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                id="nameOfAdvocate"
                                {...register("nameOfAdvocate")}
                                className="block p-2 w-full rounded-md border"
                            />
                            {errors.nameOfAdvocate && (
                                <span className="text-sm text-destructive">
                                    {errors.nameOfAdvocate.message}
                                </span>
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label
                                htmlFor="enrollmentNumber"
                                className="block text-sm font-medium text-primary"
                            >
                                Enrollment Number <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                id="enrollmentNumber"
                                {...register("enrollmentNumber")}
                                className="block p-2 w-full rounded-md border"
                            />
                            {errors.enrollmentNumber && (
                                <span className="text-sm text-destructive">
                                    {errors.enrollmentNumber.message}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div className="flex flex-col gap-2">
                            <Label
                                htmlFor="stateBarCouncil"
                                className="block text-sm font-medium text-primary"
                            >
                                State Bar Council <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                id="stateBarCouncil"
                                {...register("stateBarCouncil")}
                                className="block p-2 w-full rounded-md border"
                            />
                            {errors.stateBarCouncil && (
                                <span className="text-sm text-destructive">
                                    {errors.stateBarCouncil.message}
                                </span>
                            )}
                        </div>
                        {beneficiaryType === "lawFirms" && (
                            <div className="flex flex-col gap-2">
                                <Label
                                    htmlFor="gstNumber"
                                    className="block text-sm font-medium text-primary"
                                >
                                    GST Number
                                </Label>
                                <Input
                                    id="gstNumber"
                                    {...register("gstNumber")}
                                    className="block p-2 w-full rounded-md border"
                                />
                                {errors.gstNumber && (
                                    <span className="text-sm text-destructive">
                                        {errors.gstNumber.message}
                                    </span>
                                )}
                            </div>
                        )}
                    </div>
  {/* Bank Details */}
  <div className="space-y-4">
            <h3 className="text-xl font-bold text-foreground">Bank Details</h3>
            <Separator />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="bankName"
                  className="block text-sm font-medium text-primary"
                >
                  Bank Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="bankName"
                  {...register("bankName")}
                  className="block p-2 w-full rounded-md border"
                />
                {errors.bankName && (
                  <span className="text-sm text-destructive">
                    {errors.bankName.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="accountNumber"
                  className="block text-sm font-medium text-primary"
                >
                  Account Number <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="accountNumber"
                  {...register("accountNumber")}
                  className="block p-2 w-full rounded-md border"
                />
                {errors.accountNumber && (
                  <span className="text-sm text-destructive">
                    {errors.accountNumber.message}
                  </span>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="accountHolderName"
                  className="block text-sm font-medium text-primary"
                >
                  Account Holder Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="accountHolderName"
                  {...register("accountHolderName")}
                  className="block p-2 w-full rounded-md border"
                />
                {errors.accountHolderName && (
                  <span className="text-sm text-destructive">
                    {errors.accountHolderName.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="ifscCode"
                  className="block text-sm font-medium text-primary"
                >
                  IFSC Code <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="ifscCode"
                  {...register("ifscCode")}
                  className="block p-2 w-full rounded-md border"
                />
                {errors.ifscCode && (
                  <span className="text-sm text-destructive">
                    {errors.ifscCode.message}
                  </span>
                )}
              </div>
            </div>
          </div>
                </div>
            </CardContent>
        </Card>
    );
}
