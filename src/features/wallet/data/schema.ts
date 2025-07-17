import { z } from 'zod'

export const walletSchema = z.object({
  _id: z.string(),
  user: z.string(),
  balance: z.number(),
  isActive: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export const transactionSchema = z.object({
  _id: z.string(),
  wallet: z.string(),
  user: z.string(),
  amount: z.number(),
  type: z.enum(['CREDIT', 'DEBIT']),
  description: z.string(),
  status: z.enum(['PENDING', 'COMPLETED', 'FAILED', 'REJECTED']),
  category: z.enum([
    'PRIMARY MEMBERSHIP',
    'ACTIVE MEMBERSHIP',
    'DONATION',
    'WITHDRAWAL',
    'OTHER',
  ]),
  approvedBy: z.string().nullable(),
  membership: z.string().nullable(),
  accountName: z.string().optional(),
  mobile: z.string().optional(),
  email: z.string().optional(),
  bankName: z.string().optional(),
  accountNumber: z.string().optional(),
  transactionId: z.string().optional(),
  paymentMode: z.enum(['NEFT', 'IMPS', 'UPI', 'RTGS']).optional(),
  screenshot: z.string().optional(),
  receipt: z.string().nullable(),
  receiptNo: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export type Wallet = z.infer<typeof walletSchema>
export type Transaction = z.infer<typeof transactionSchema>
