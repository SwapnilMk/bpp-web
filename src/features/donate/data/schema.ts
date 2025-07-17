import { z } from 'zod'

const donationSchema = z.object({
  _id: z.string(),
  userId: z.string(),
  amount: z.number().min(0, 'Amount cannot be negative'),
  status: z.enum(['completed', 'pending', 'failed']),
  paymentDetails: z.object({
    transactionId: z.string(),
    paymentMethod: z.string(),
    paymentDate: z.string(),
  }),
  receipt: z
    .object({
      receiptNumber: z.string().optional(),
      generatedAt: z.string().optional(),
      downloadUrl: z.string().optional(),
    })
    .optional(),
  metadata: z.record(z.any()).optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export type Donation = z.infer<typeof donationSchema>
