import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ReferralState {
  totalReferrals: number
  successfulReferrals: number
  pendingReferrals: number
  referralEarnings: number
  referralCode: string | null
  referralLink: string | null
}

const initialState: ReferralState = {
  totalReferrals: 0,
  successfulReferrals: 0,
  pendingReferrals: 0,
  referralEarnings: 0,
  referralCode: null,
  referralLink: null,
}

const referralSlice = createSlice({
  name: 'referral',
  initialState,
  reducers: {
    setReferralData: (state, action: PayloadAction<ReferralState>) => {
      return { ...state, ...action.payload }
    },
    clearReferralData: () => {
      return initialState
    },
  },
})

export const { setReferralData, clearReferralData } = referralSlice.actions
export default referralSlice.reducer
