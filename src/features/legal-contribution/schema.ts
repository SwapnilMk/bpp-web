import { z } from 'zod'

export const membersInfoSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: 'First Name is required' })
    .max(50, { message: 'First Name must not exceed 50 characters' }),
  middleName: z
    .string()
    .max(50, { message: 'Middle Name must not exceed 50 characters' })
    .optional(),
  lastName: z
    .string()
    .min(1, { message: 'Last Name is required' })
    .max(50, { message: 'Last Name must not exceed 50 characters' }),
  phone: z
    .string()
    .regex(/^\d{10}$/, { message: 'Phone number must be exactly 10 digits' }),
  email: z.string().email({ message: 'Invalid email address' }),
  dateOfBirth: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: 'Date of Birth must be in YYYY-MM-DD format',
    })
    .optional(),
  aadhaarCard: z
    .string()
    .regex(/^\d{12}$/, {
      message: 'Aadhaar Card number must be exactly 12 digits',
    }),
  voterId: z
    .string()
    .regex(/^[a-zA-Z0-9]{10}$/, {
      message: 'Voter ID must be exactly 10 alphanumeric characters',
    }),
})

export const caseRegisterSchema = z.object({
  typeOfSupport: z
    .string()
    .min(1, { message: 'Type of Support is required' })
    .max(100, { message: 'Type of Support must not exceed 100 characters' }),
  category: z
    .string()
    .min(1, { message: 'Category is required' })
    .max(100, { message: 'Category must not exceed 100 characters' }),
  typeOfCase: z.string().min(1, { message: 'Type of Case is required' }),
  dateOfDispute: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: 'Date of Dispute must be in YYYY-MM-DD format',
    }),
  briefYourCase: z
    .string()
    .min(1, { message: 'Brief your case is required' })
    .max(500, { message: 'Brief your case must not exceed 500 characters' }),
  additionalDocument: z
    .instanceof(FileList)
    .optional()
    .superRefine((files, ctx) => {
      if (files && files.length > 0) {
        const file = files[0]
        if (file.size > 5 * 1024 * 1024) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'File size must not exceed 5MB',
          })
        }
        if (
          !['application/pdf', 'image/jpeg', 'image/png'].includes(file.type)
        ) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Only PDF, JPG, or PNG files are allowed',
          })
        }
      }
    }),
  financialAid: z.enum(['yes', 'no']).default('no'),
})

export const fundRequirementSchema = z
  .object({
    totalCost: z
      .number()
      .min(1, 'Total cost is required')
      .positive('Total cost must be a positive number'),
    selfPercentage: z
      .string()
      .regex(/^\d+(\.\d{1,2})?$/, 'Self percentage must be a valid number')
      .default('0'),
    selfAmount: z.number().min(0, 'Self amount cannot be negative').default(0),
    familyFriendsPercentage: z
      .string()
      .regex(
        /^\d+(\.\d{1,2})?$/,
        'Family & Friends percentage must be a valid number'
      )
      .default('0'),
    familyFriendsAmount: z
      .number()
      .min(0, 'Family & Friends amount cannot be negative')
      .default(0),
    workplacePercentage: z
      .string()
      .regex(/^\d+(\.\d{1,2})?$/, 'Workplace percentage must be a valid number')
      .default('0'),
    workplaceAmount: z
      .number()
      .min(0, 'Workplace amount cannot be negative')
      .default(0),
    otherInstitutesPercentage: z
      .string()
      .regex(
        /^\d+(\.\d{1,2})?$/,
        'Other Institutes percentage must be a valid number'
      )
      .default('0'),
    otherInstitutesAmount: z
      .number()
      .min(0, 'Other Institutes amount cannot be negative')
      .default(0),
    totalAmountRequested: z
      .number()
      .min(0, 'Total amount requested cannot be negative')
      .refine((val) => val >= 0, {
        message: 'Total amount requested must be a positive number',
      }),
  })
  .refine(
    (data) => {
      const totalAmount =
        data.selfAmount +
        data.familyFriendsAmount +
        data.workplaceAmount +
        data.otherInstitutesAmount
      return totalAmount <= data.totalCost
    },
    {
      message: 'Total of all amounts cannot exceed the total cost',
    }
  )

export const beneficiarySchema = z.object({
  beneficiaryType: z.enum(['lawFirms', 'independentAdvocate']),
  nameOfLawFirm: z.string().optional(),
  nameOfAdvocate: z.string().nonempty('Name of Advocate is required'),
  enrollmentNumber: z.string().nonempty('Enrollment Number is required'),
  stateBarCouncil: z.string().nonempty('State Bar Council is required'),
  gstNumber: z.string().optional(),
  bankName: z.string().nonempty('Bank Name is required'),
  accountNumber: z.string().nonempty('Account Number is required'),
  accountHolderName: z.string().nonempty('Account Holder Name is required'),
  ifscCode: z.string().nonempty('IFSC Code is required'),
})

export const locationSchema = z.object({
  state: z
    .string()
    .min(1, { message: 'State is required' })
    .max(100, { message: 'State must be less than 100 characters' }),
  district: z
    .string()
    .min(1, { message: 'District is required' })
    .max(100, { message: 'District must be less than 100 characters' }),
  pincode: z
    .string()
    .regex(/^\d{6}$/, { message: 'Pincode must be a 6-digit number' }),
  agreement: z.boolean().refine((value) => value === true, {
    message: 'You must agree to the terms and conditions',
  }),
})

export type MembersInfoFormValues = z.infer<typeof membersInfoSchema>
export type CaseRegistrationFormValues = z.infer<typeof caseRegisterSchema>
export type FundRequirementFormValues = z.infer<typeof fundRequirementSchema>
export type BeneficiaryFormValues = z.infer<typeof beneficiarySchema>
export type LocationSchemaFormValues = z.infer<typeof locationSchema>
