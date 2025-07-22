import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { MembersInfoFormValues } from '@/features/contribution/legal/schema';
import { useFormContext } from 'react-hook-form';

export function MembersInfoForm() {
    const {
        register,
        formState: { errors },
    } = useFormContext<MembersInfoFormValues>();

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl font-bold">Member Information</CardTitle>
                <CardDescription className="py-2">
                    Please provide your details for electronic signature*
                </CardDescription>
                <Separator />
            </CardHeader>
            <CardContent>
                <div className="space-y-4 text-start">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <Label htmlFor="firstName" className="block text-sm font-medium text-primary">
                                First Name*
                            </Label>
                            <Input
                                id="firstName"
                                {...register('firstName')}
                                className="block w-full p-2 border rounded-md"
                            />
                            {errors.firstName && (
                                <span className="text-sm text-destructive">{errors.firstName.message}</span>
                            )}
                        </div>
                        <div>
                            <Label htmlFor="middleName" className="block text-sm font-medium text-primary">
                                Middle Name
                            </Label>
                            <Input
                                id="middleName"
                                {...register('middleName')}
                                className="block w-full p-2 border rounded-md"
                            />
                            {errors.middleName && (
                                <span className="text-sm text-destructive">{errors.middleName.message}</span>
                            )}
                        </div>
                        <div>
                            <Label htmlFor="lastName" className="block text-sm font-medium text-primary">
                                Last Name*
                            </Label>
                            <Input
                                id="lastName"
                                {...register('lastName')}
                                className="block w-full p-2 border rounded-md"
                            />
                            {errors.lastName && (
                                <span className="text-sm text-destructive">{errors.lastName.message}</span>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <Label htmlFor="phone" className="block text-sm font-medium text-primary">
                                Phone*
                            </Label>
                            <Input
                                id="phone"
                                {...register('phone')}
                                className="block w-full p-2 border rounded-md"
                            />
                            {errors.phone && (
                                <span className="text-sm text-destructive">{errors.phone.message}</span>
                            )}
                        </div>
                        <div>
                            <Label htmlFor="email" className="block text-sm font-medium text-primary">
                                Email*
                            </Label>
                            <Input
                                id="email"
                                {...register('email')}
                                className="block w-full p-2 border rounded-md"
                            />
                            {errors.email && (
                                <span className="text-sm text-destructive">{errors.email.message}</span>
                            )}
                        </div>
                        <div>
                            <Label htmlFor="dateOfBirth" className="block text-sm font-medium text-primary">
                                Date of Birth
                            </Label>
                            <Input
                                id="dateOfBirth"
                                type='date'
                                {...register('dateOfBirth')}
                                className="block w-full p-2 border rounded-md"
                            />
                            {errors.dateOfBirth && (
                                <span className="text-sm text-destructive">{errors.dateOfBirth.message}</span>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="aadhaarCard" className="block text-sm font-medium text-primary">
                                Aadhaar Card*
                            </Label>
                            <Input
                                id="aadhaarCard"
                                {...register('aadhaarCard')}
                                className="block w-full p-2 border rounded-md"
                            />
                            {errors.aadhaarCard && (
                                <span className="text-sm text-destructive">{errors.aadhaarCard.message}</span>
                            )}
                        </div>
                        <div>
                            <Label htmlFor="voterId" className="block text-sm font-medium text-primary">
                                Voter ID*
                            </Label>
                            <Input
                                id="voterId"
                                {...register('voterId')}
                                className="block w-full p-2 border rounded-md"
                            />
                            {errors.voterId && (
                                <span className="text-sm text-destructive">{errors.voterId.message}</span>
                            )}
                        </div>
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <div className="text-red-600 text-xs">
                    *Note: During the case registration process, no changes or modifications to personal information,
                    including voter details, Aadhaar card information, etc., will be accepted.
                    <br />
                    All details must match exactly as per the membership records.
                </div>
            </CardFooter>
        </Card>
    );
}
