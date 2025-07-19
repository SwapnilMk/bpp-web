import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '@/types/auth'

export interface UserState {
  profile: User | null
}

const initialState: UserState = {
  profile: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserProfile: (state, action: PayloadAction<User>) => {
      state.profile = action.payload
    },
    clearUserProfile: (state) => {
      state.profile = null
    },
    updateUserProfile: (state, action: PayloadAction<Partial<User>>) => {
      if (state.profile) {
        state.profile = { ...state.profile, ...action.payload }
      }
    },
  },
})

export const { setUserProfile, clearUserProfile, updateUserProfile } =
  userSlice.actions
export default userSlice.reducer
