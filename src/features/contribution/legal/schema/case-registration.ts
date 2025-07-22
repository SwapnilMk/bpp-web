import { z } from 'zod'

export const membersInfoSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  middleName: z.string().optional(),
  lastName: z.string().min(1, 'Last name is required'),
  phone: z.string().regex(/^[0-9]{10}$/, 'Phone number must be 10 digits'),
  email: z.string().email('Invalid email address').optional(),
  dateOfBirth: z.string().refine(
    (val) => {
      if (!val) return false
      const dob = new Date(val)
      const age = new Date().getFullYear() - dob.getFullYear()
      return age >= 18
    },
    { message: 'You must be at least 18 years old' }
  ),
  aadhaarCard: z.string().regex(/^[0-9]{12}$/, 'Aadhaar card must be 12 digits'),
  voterId: z.string().min(10, 'Voter ID must be at least 10 characters'),
})

export const caseRegisterSchema = z.object({
  typeOfSupport: z.string().min(1, 'Type of support is required'),
  category: z.string().min(1, 'Category is required'),
  typeOfCase: z.string().min(1, 'Type of case is required'),
  dateOfDispute: z.string().min(1, 'Date of dispute is required'),
  briefYourCase: z.string().min(1, 'Brief of the case is required'),
  additionalDocument: z.any().optional(),
  financialAid: z.enum(['yes', 'no']),
})

export const fundRequirementSchema = z.object({
  totalAmount: z.number().min(0, 'Total amount must be a positive number'),
  advocateFeesPercentage: z.string(),
  advocateFeesAmount: z.number(),
  documentationChargesPercentage: z.string(),
  documentationChargesAmount: z.number(),
  clerkChargesPercentage: z.string(),
  clerkChargesAmount: z.number(),
  travelExpensesPercentage: z.string(),
  travelExpensesAmount: z.number(),
  otherExpensesPercentage: z.string(),
  otherExpensesAmount: z.number(),
})

export const beneficiarySchema = z.object({
  beneficiaryType: z.enum(['lawFirms', 'independentAdvocate']),
  nameOfLawFirm: z.string().optional(),
  nameOfAdvocate: z.string().min(1, 'Name of advocate is required'),
  enrollmentNumber: z.string().min(1, 'Enrollment number is required'),
  stateBarCouncil: z.string().min(1, 'State bar council is required'),
  gstNumber: z.string().optional(),
  bankName: z.string().min(1, 'Bank name is required'),
  accountNumber: z.string().min(1, 'Account number is required'),
  accountHolderName: z.string().min(1, 'Account holder name is required'),
  ifscCode: z.string().min(1, 'IFSC code is required'),
})

export const locationSchema = z.object({
  state: z.string().min(1, 'State is required'),
  district: z.string().min(1, 'District is required'),
  pincode: z.string().min(6, 'Pincode must be 6 digits'),
  agreement: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the terms and conditions',
  }),
})

export type MembersInfoFormValues = z.infer<typeof membersInfoSchema>
export type CaseRegistrationFormValues = z.infer<typeof caseRegisterSchema>
export type FundRequirementFormValues = z.infer<typeof fundRequirementSchema>
export type BeneficiaryFormValues = z.infer<typeof beneficiarySchema>
export type LocationSchemaFormValues = z.infer<typeof locationSchema>
