import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  token: string | null
  isAuthenticated: boolean
  sessionId: string | null
}

const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
  sessionId: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ token: string; sessionId?: string }>
    ) => {
      state.token = action.payload.token
      state.isAuthenticated = true
      if (action.payload.sessionId) {
        state.sessionId = action.payload.sessionId
      }
    },
    clearCredentials: (state) => {
      state.token = null
      state.isAuthenticated = false
      state.sessionId = null
    },
  },
})

export const { setCredentials, clearCredentials } = authSlice.actions
export default authSlice.reducer
