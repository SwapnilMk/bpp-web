import { configureStore } from '@reduxjs/toolkit'
import { describe, it, expect, beforeEach } from 'vitest'
import userReducer, {
  setUserProfile,
  clearUserProfile,
  updateUserProfile,
  UserState,
} from '../userSlice'
import { User } from '@/types/auth'

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

describe('userSlice', () => {
  let store: ReturnType<typeof configureStore<{ user: UserState }>>

  beforeEach(() => {
    store = configureStore({
      reducer: {
        user: userReducer,
      },
    })
  })

  it('should handle initial state', () => {
    expect(store.getState().user).toEqual({
      profile: null,
    })
  })

  it('should handle setUserProfile', () => {
    store.dispatch(setUserProfile(initialUser))
    const state = store.getState().user
    expect(state.profile).toEqual(initialUser)
  })

  it('should handle clearUserProfile', () => {
    store.dispatch(setUserProfile(initialUser))
    store.dispatch(clearUserProfile())
    const state = store.getState().user
    expect(state.profile).toBeNull()
  })

  it('should handle updateUserProfile', () => {
    store.dispatch(setUserProfile(initialUser))
    const updates = { firstName: 'Updated' }
    store.dispatch(updateUserProfile(updates))
    const state = store.getState().user
    expect(state.profile?.firstName).toBe('Updated')
  })
})
