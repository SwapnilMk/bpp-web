import { MembershipData, MembershipHistoryItem, MembershipUserData } from '@/types/api'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface MembershipState {
  data: {
    user: MembershipUserData | null
    membership: MembershipData | null
    history: MembershipHistoryItem[]
  } | null
  isLoading: boolean
  error: string | null
}

const initialState: MembershipState = {
  data: null,
  isLoading: false,
  error: null,
}

const membershipSlice = createSlice({
  name: 'membership',
  initialState,
  reducers: {
    setMembershipData: (state, action: PayloadAction<{
      user: MembershipUserData
      membership: MembershipData
      history: MembershipHistoryItem[]
    }>) => {
      state.data = action.payload
      state.isLoading = false
      state.error = null
    },
    setMembershipLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
      if (action.payload) {
        state.error = null
      }
    },
    setMembershipError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.isLoading = false
    },
    clearMembershipData: (state) => {
      state.data = null
      state.isLoading = false
      state.error = null
    },
  },
})

export const {
  setMembershipData,
  setMembershipLoading,
  setMembershipError,
  clearMembershipData,
} = membershipSlice.actions

export default membershipSlice.reducer
