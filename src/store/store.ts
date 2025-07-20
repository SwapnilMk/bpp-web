import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import authReducer from './slice/authSlice'
import caseReducer from './slice/case.slice'
import dashboardReducer from './slice/dashboardSlice'
import membershipReducer from './slice/membershipSlice'
import notificationReducer from './slice/notificationSlice'
import referralReducer from './slice/referralSlice'
import userReducer from './slice/userSlice'
import walletReducer from './slice/walletSlice'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'user'], // We only want to persist auth and user information
}

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  dashboard: dashboardReducer,
  membership: membershipReducer,
  wallet: walletReducer,
  referral: referralReducer,
  notifications: notificationReducer,
  case: caseReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/PURGE',
        ],
      },
    }),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
