import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { MembersInfoFormValues } from '@/features/contribution/legal/schema/case-registration';
import { useFormContext } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { DatePicker } from '@/components/features/DatePicker';

export function MembersInfoForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext<MembersInfoFormValues>();

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-foreground">Member Information</CardTitle>
        <CardDescription className="py-2 text-muted-foreground">
          Please provide your details for electronic signature*
        </CardDescription>
        <Separator />
      </CardHeader>
      <CardContent>
        <div className="space-y-8 text-start">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="flex flex-col gap-2">
              <Label htmlFor="firstName" className="block text-sm font-medium text-primary">
                First Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="firstName"
                {...register('firstName')}
                className="block p-2 w-full rounded-md border"
              />
              {errors.firstName && (
                <span className="text-sm text-destructive">{errors.firstName.message}</span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="middleName" className="block text-sm font-medium text-primary">
                Middle Name
              </Label>
              <Input
                id="middleName"
                {...register('middleName')}
                className="block p-2 w-full rounded-md border"
              />
              {errors.middleName && (
                <span className="text-sm text-destructive">{errors.middleName.message}</span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="lastName" className="block text-sm font-medium text-primary">
                Last Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="lastName"
                {...register('lastName')}
                className="block p-2 w-full rounded-md border"
              />
              {errors.lastName && (
                <span className="text-sm text-destructive">{errors.lastName.message}</span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="flex flex-col gap-2">
              <Label htmlFor="phone" className="block text-sm font-medium text-primary">
                Phone <span className="text-destructive">*</span>
              </Label>
              <div className="relative">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none text-muted-foreground">
                  +91
                </div>
                <Input
                  id="phone"
                  maxLength={10}
                  inputMode="numeric"
                  {...register('phone')}
                  className="block p-2 pl-12 w-full rounded-md border"
                  onInput={e => {
                    e.currentTarget.value = e.currentTarget.value.replace(/\D/g, '').slice(0, 10);
                  }}
                />
              </div>
              {errors.phone && (
                <span className="text-sm text-destructive">{errors.phone.message}</span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="email" className="block text-sm font-medium text-primary">
                Email <span className="text-destructive">*</span>
              </Label>
              <Input
                id="email"
                {...register('email')}
                className="block p-2 w-full rounded-md border"
              />
              {errors.email && (
                <span className="text-sm text-destructive">{errors.email.message}</span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="dateOfBirth" className="block text-sm font-medium text-primary">
                Date of Birth
              </Label>
              <Controller
                name="dateOfBirth"
                render={({ field }) => (
                  <DatePicker
                    date={field.value ? new Date(field.value) : undefined}
                    setDate={date => field.onChange(date ? date.toISOString().slice(0, 10) : undefined)}
                  />
                )}
              />
              {errors.dateOfBirth && (
                <span className="text-sm text-destructive">{errors.dateOfBirth.message}</span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="aadhaarCard" className="block text-sm font-medium text-primary">
                Aadhaar Card <span className="text-destructive">*</span>
              </Label>
              <Input
                id="aadhaarCard"
                maxLength={12}
                inputMode="numeric"
                pattern="^\d{12}$"
                {...register('aadhaarCard')}
                className="block p-2 w-full rounded-md border"
                onInput={e => {
                  e.currentTarget.value = e.currentTarget.value.replace(/\D/g, '').slice(0, 12);
                }}
              />
              {errors.aadhaarCard && (
                <span className="text-sm text-destructive">{errors.aadhaarCard.message}</span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="voterId" className="block text-sm font-medium text-primary">
                Voter ID <span className="text-destructive">*</span>
              </Label>
              <Input
                id="voterId"
                maxLength={10}
                inputMode="text"
                pattern="^[A-Z]{3}[0-9]{7}$"
                {...register('voterId')}
                className="block p-2 w-full rounded-md border"
                onInput={e => {
                  e.currentTarget.value = e.currentTarget.value
                    .replace(/[^a-zA-Z0-9]/g, '')
                    .toUpperCase()
                    .slice(0, 10);
                }}
              />
              {errors.voterId && (
                <span className="text-sm text-destructive">{errors.voterId.message}</span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-destructive">
          *Note: During the case registration process, no changes or modifications to personal information,
          including voter details, Aadhaar card information, etc., will be accepted.
          <br />
          All details must match exactly as per the membership records.
        </div>
      </CardFooter>
    </Card>
  );
}
