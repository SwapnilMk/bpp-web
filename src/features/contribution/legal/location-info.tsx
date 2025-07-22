import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { LocationSchemaFormValues } from '@/features/contribution/legal/schema/case-registration';
import { useFormContext, Controller } from "react-hook-form";

export function LocationInfoForm() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<LocationSchemaFormValues>();

  return (
    <>
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-foreground">Your current location</CardTitle>
          <Separator />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* State Field */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="state" className="block text-sm font-medium text-primary">
                State <span className="text-destructive">*</span>
              </Label>
              <Input id="state" {...register("state")} className="block p-2 w-full rounded-md border border-border" />
              {errors.state && (
                <span className="text-sm text-destructive">{errors.state.message}</span>
              )}
            </div>

            {/* District Field */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="district" className="block text-sm font-medium text-primary">
                District <span className="text-destructive">*</span>
              </Label>
              <Input id="district" {...register("district")} className="block p-2 w-full rounded-md border border-border" />
              {errors.district && (
                <span className="text-sm text-destructive">{errors.district.message}</span>
              )}
            </div>

            {/* Pincode Field */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="pincode" className="block text-sm font-medium text-primary">
                Pincode <span className="text-destructive">*</span>
              </Label>
              <Input id="pincode" {...register("pincode")} className="block p-2 w-full rounded-md border border-border" />
              {errors.pincode && (
                <span className="text-sm text-destructive">{errors.pincode.message}</span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-foreground">You are almost done</CardTitle>
          <CardDescription className="py-2 text-muted-foreground">
            After you submit this form, we will review your case. Decisions will be made at the sole discretion of
            the administration.
          </CardDescription>
          <Separator />
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-start">
            <p className="text-foreground">
              You will receive an email confirming that we received your submission. After reviewing your
              application, we'll let you know if it's approved or declined.
            </p>

            <h3 className="text-xl font-bold text-foreground">Agreement</h3>
            <p className="text-foreground">
              By submitting this application, you confirm that you are a member of the Bharatiya Popular Party
              and agree to the conditions described below.
            </p>

            <ul className="space-y-2 list-disc list-inside text-muted-foreground">
              <li>You agree to comply with the terms and conditions of the Bharatiya Popular Party.</li>
              <li>All information provided in this application is true and accurate.</li>
              <li>You consent to receive notifications from BPP through email and SMS regarding this submission.</li>
              <li>You acknowledge that the decision of the BPP administration is final and binding.</li>
            </ul>

            <div className="flex items-center space-x-2">
              <Controller
                name="agreement"
                control={control}
                defaultValue={false}
                render={({ field }) => (
                  <Checkbox
                    id="agreement"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <Label htmlFor="agreement" className="text-foreground">
                I verify that I am a member of the Bharatiya Popular Party and agree to the terms and conditions.
              </Label>
            </div>
            {errors.agreement && (
              <span className="text-sm text-destructive">{errors.agreement.message}</span>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
