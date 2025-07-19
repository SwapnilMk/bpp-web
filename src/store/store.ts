import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import authReducer from './authSlice'
import userReducer from './userSlice'
import dashboardReducer from './dashboardSlice'
import membershipReducer from './membershipSlice'
import walletReducer from './walletSlice'
import referralReducer from './referralSlice'
import queryReducer from './querySlice'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], // We only want to persist the auth slice
}

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  dashboard: dashboardReducer,
  membership: membershipReducer,
  wallet: walletReducer,
  referral: referralReducer,
  query: queryReducer,
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
