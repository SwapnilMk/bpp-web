import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface MembershipState {
  details: any | null // Replace 'any' with a proper type
}

const initialState: MembershipState = {
  details: null,
}

const membershipSlice = createSlice({
  name: 'membership',
  initialState,
  reducers: {
    setMembershipDetails: (state, action: PayloadAction<any>) => {
      state.details = action.payload
    },
    clearMembershipDetails: (state) => {
      state.details = null
    },
  },
})

export const { setMembershipDetails, clearMembershipDetails } =
  membershipSlice.actions
export default membershipSlice.reducer
