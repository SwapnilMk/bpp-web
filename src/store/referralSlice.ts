import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ReferralState {
  referrals: any[] // Replace 'any' with a proper type
}

const initialState: ReferralState = {
  referrals: [],
}

const referralSlice = createSlice({
  name: 'referral',
  initialState,
  reducers: {
    setReferrals: (state, action: PayloadAction<any[]>) => {
      state.referrals = action.payload
    },
    clearReferrals: (state) => {
      state.referrals = []
    },
  },
})

export const { setReferrals, clearReferrals } = referralSlice.actions
export default referralSlice.reducer
