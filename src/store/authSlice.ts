import { User } from '@/types/auth'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  token: string | null
  user: User | null
  isAuthenticated: boolean
  sessionId: string | null
}

const initialState: AuthState = {
  token: null,
  user: null,
  isAuthenticated: false,
  sessionId: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ token: string; user: User; sessionId?: string }>
    ) => {
      state.token = action.payload.token
      state.user = action.payload.user
      state.isAuthenticated = true
      if (action.payload.sessionId) {
        state.sessionId = action.payload.sessionId
      }
    },
    clearCredentials: (state) => {
      state.token = null
      state.user = null
      state.isAuthenticated = false
      state.sessionId = null
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      state.user = state.user ? { ...state.user, ...action.payload } : null
    },
  },
})

export const { setCredentials, clearCredentials, updateUser } =
  authSlice.actions
export default authSlice.reducer
