import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { User, LoginCredentials } from '@/types/auth'
import { login as loginApi } from '@/api/authService'
import { LoginResponseData } from '@/types/api'
import Cookies from 'js-cookie'

export interface AuthState {
  token: string | null
  user: User | null
  isAuthenticated: boolean
  sessionId: string | null
  loading: boolean
  error: string | null
}

const initialState: AuthState = {
  token: null,
  user: null,
  isAuthenticated: false,
  sessionId: null,
  loading: false,
  error: null,
}

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const data = await loginApi(credentials)
      return data
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        token: string
        user: User
        sessionId?: string
      }>
    ) => {
      state.token = action.payload.token
      state.user = action.payload.user
      state.isAuthenticated = true
      if (action.payload.sessionId) {
        state.sessionId = action.payload.sessionId
        Cookies.set('sessionId', action.payload.sessionId)
      }
      Cookies.set('authToken', action.payload.token)
    },
    clearCredentials: (state) => {
      state.token = null
      state.user = null
      state.isAuthenticated = false
      state.sessionId = null
      Cookies.remove('authToken')
      Cookies.remove('sessionId')
      localStorage.removeItem('userDetails')
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      state.user = state.user ? { ...state.user, ...action.payload } : null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<LoginResponseData>) => {
          const { accessToken, user, sessionId } = action.payload
          state.loading = false
          state.isAuthenticated = true
          state.token = accessToken
          state.user = user as User
          state.sessionId = sessionId
          Cookies.set('authToken', accessToken)
          Cookies.set('sessionId', sessionId)
          localStorage.setItem('userDetails', JSON.stringify(user))
        }
      )
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { setCredentials, clearCredentials, updateUser } =
  authSlice.actions
export default authSlice.reducer
