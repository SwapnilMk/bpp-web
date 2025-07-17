import { z } from 'zod'

const referredUserSchema = z.object({
  _id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  phone: z.string(),
  role: z.string(),
  status: z.string(),
})

const referralSchema = z.object({
  _id: z.string(),
  referrer: z.string(),
  referredUser: referredUserSchema,
  referralCode: z.string(),
  status: z.enum(['PENDING', 'APPROVED', 'REJECTED']),
  createdAt: z.string(),
  updatedAt: z.string(),
  __v: z.number(),
})

const referralProfileSchema = z.object({
  referralCode: z.string(),
  referralLink: z.string(),
  totalReferrals: z.number(),
  successfulReferrals: z.number(),
  pendingReferrals: z.number(),
  canUpgrade: z.boolean(),
})

type ReferredUser = z.infer<typeof referredUserSchema>
export type Referral = z.infer<typeof referralSchema>
export type ReferralProfile = z.infer<typeof referralProfileSchema>
