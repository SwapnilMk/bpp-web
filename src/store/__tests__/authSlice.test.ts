import { configureStore } from '@reduxjs/toolkit'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import authReducer, {
  setCredentials,
  clearCredentials,
  updateUser,
  login,
  AuthState,
} from '../authSlice'
import { User } from '@/types/auth'
import * as authService from '@/api/authService'

vi.mock('@/api/authService')

const mockedAuthService = authService as jest.Mocked<typeof authService>

const initialUser: User = {
  _id: '1',
  firstName: 'Test',
  lastName: 'User',
  email: 'test@example.com',
  phone: '1234567890',
  role: 'MEMBER',
  isVerified: true,
  profilePicture: '',
  address: {
    line1: '',
    cityOrVillage: '',
    district: '',
    state: '',
    pincode: '',
  },
}

describe('authSlice', () => {
  let store: ReturnType<typeof configureStore<{ auth: AuthState }>>

  beforeEach(() => {
    store = configureStore({
      reducer: {
        auth: authReducer,
      },
    })
  })

  it('should handle initial state', () => {
    expect(store.getState().auth).toEqual({
      token: null,
      user: null,
      isAuthenticated: false,
      sessionId: null,
      loading: false,
      error: null,
    })
  })

  it('should handle setCredentials', () => {
    const credentials = {
      token: 'test-token',
      user: initialUser,
      sessionId: 'test-session-id',
    }
    store.dispatch(setCredentials(credentials))
    const state = store.getState().auth
    expect(state.token).toBe(credentials.token)
    expect(state.user).toEqual(credentials.user)
    expect(state.isAuthenticated).toBe(true)
    expect(state.sessionId).toBe(credentials.sessionId)
  })

  it('should handle clearCredentials', () => {
    const credentials = {
      token: 'test-token',
      user: initialUser,
      sessionId: 'test-session-id',
    }
    store.dispatch(setCredentials(credentials))
    store.dispatch(clearCredentials())
    const state = store.getState().auth
    expect(state.token).toBeNull()
    expect(state.user).toBeNull()
    expect(state.isAuthenticated).toBe(false)
    expect(state.sessionId).toBeNull()
  })

  it('should handle updateUser', () => {
    store.dispatch(setCredentials({ token: 'test-token', user: initialUser }))
    const updates = { firstName: 'Updated' }
    store.dispatch(updateUser(updates))
    const state = store.getState().auth
    expect(state.user?.firstName).toBe('Updated')
  })

  it('should handle login.pending', () => {
    store.dispatch({ type: login.pending.type })
    const state = store.getState().auth
    expect(state.loading).toBe(true)
    expect(state.error).toBeNull()
  })

  it('should handle login.fulfilled', () => {
    const loginResponse = {
      accessToken: 'new-token',
      user: initialUser,
      sessionId: 'new-session-id',
    }
    store.dispatch({ type: login.fulfilled.type, payload: loginResponse })
    const state = store.getState().auth
    expect(state.loading).toBe(false)
    expect(state.isAuthenticated).toBe(true)
    expect(state.token).toBe(loginResponse.accessToken)
    expect(state.user).toEqual(loginResponse.user)
    expect(state.sessionId).toBe(loginResponse.sessionId)
  })

  it('should handle login.rejected', () => {
    const errorMessage = 'Login failed'
    store.dispatch({ type: login.rejected.type, payload: errorMessage })
    const state = store.getState().auth
    expect(state.loading).toBe(false)
    expect(state.error).toBe(errorMessage)
  })
})
