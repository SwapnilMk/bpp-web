import { useFormContext } from 'react-hook-form';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

function InfoItem({ label, value }: { label: string; value: string | number | undefined }) {
  return (
    <div>
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
      <p className="text-base font-medium text-foreground">{value || 'N/A'}</p>
    </div>
  );
}

export function Review() {
  const { getValues } = useFormContext();
  const values = getValues();

  return (
    <div className="p-4 space-y-4 w-full">
    
      <div className="space-y-3">
        {/* Member Information Card */}
        <Card>
          <CardHeader>
            <CardTitle>Member Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-y-4 gap-x-6 sm:grid-cols-2 md:grid-cols-3">
              <InfoItem label="First Name" value={values.firstName} />
              <InfoItem label="Middle Name" value={values.middleName} />
              <InfoItem label="Last Name" value={values.lastName} />
              <InfoItem label="Phone" value={values.phone} />
              <InfoItem label="Email" value={values.email} />
              <InfoItem label="Date of Birth" value={values.dateOfBirth} />
              <InfoItem label="Aadhaar Card" value={values.aadhaarCard} />
              <InfoItem label="Voter ID" value={values.voterId} />
            </div>
          </CardContent>
        </Card>

        {/* Case Information Card */}
        <Card>
          <CardHeader>
            <CardTitle>Case Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-y-4 gap-x-6 sm:grid-cols-2 md:grid-cols-3">
              <InfoItem label="Type of Support" value={values.typeOfSupport} />
              <InfoItem label="Category" value={values.category} />
              <InfoItem label="Type of Case" value={values.typeOfCase} />
              <InfoItem label="Date of Dispute" value={values.dateOfDispute} />
              <div className="sm:col-span-2 md:col-span-3">
                <InfoItem label="Brief of the Case" value={values.briefYourCase} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Fund Requirement Card */}
        <Card>
          <CardHeader>
            <CardTitle>Fund Requirement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-y-4 gap-x-6 sm:grid-cols-2 md:grid-cols-3">
              <InfoItem label="Total Cost" value={`₹${values.totalCost}`} />
              <InfoItem label="Total Amount Requested" value={`₹${values.totalAmountRequested}`} />
              <InfoItem label="Self Contribution" value={`₹${values.selfAmount} (${values.selfPercentage}%)`} />
              <InfoItem label="Family & Friends" value={`₹${values.familyFriendsAmount} (${values.familyFriendsPercentage}%)`} />
              <InfoItem label="From Workplace" value={`₹${values.workplaceAmount} (${values.workplacePercentage}%)`} />
              <InfoItem label="From Other Institutes" value={`₹${values.otherInstitutesAmount} (${values.otherInstitutesPercentage}%)`} />
            </div>
          </CardContent>
        </Card>

        {/* Beneficiary Information Card */}
        <Card>
          <CardHeader>
            <CardTitle>Beneficiary Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-y-4 gap-x-6 sm:grid-cols-2 md:grid-cols-3">
              <InfoItem label="Beneficiary Type" value={values.beneficiaryType} />
              <InfoItem label="Name of Law Firm" value={values.nameOfLawFirm} />
              <InfoItem label="Name of Advocate" value={values.nameOfAdvocate} />
              <InfoItem label="Enrollment Number" value={values.enrollmentNumber} />
              <InfoItem label="State Bar Council" value={values.stateBarCouncil} />
              <InfoItem label="GST Number" value={values.gstNumber} />
              <InfoItem label="Bank Name" value={values.bankName} />
              <InfoItem label="Account Number" value={values.accountNumber} />
              <InfoItem label="Account Holder Name" value={values.accountHolderName} />
              <InfoItem label="IFSC Code" value={values.ifscCode} />
            </div>
          </CardContent>
        </Card>

        {/* Location Information Card */}
        <Card>
          <CardHeader>
            <CardTitle>Location Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-y-4 gap-x-6 sm:grid-cols-2 md:grid-cols-3">
              <InfoItem label="State" value={values.state} />
              <InfoItem label="District" value={values.district} />
              <InfoItem label="Pincode" value={values.pincode} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
