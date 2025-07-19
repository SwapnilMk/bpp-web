import { createSelector } from 'reselect'
import { RootState } from './store'

// Auth Selectors
const selectAuth = (state: RootState) => state.auth
export const selectToken = createSelector(selectAuth, (auth) => auth.token)
export const selectUser = createSelector(selectAuth, (auth) => auth.user)
export const selectIsAuthenticated = createSelector(
  selectAuth,
  (auth) => auth.isAuthenticated
)
export const selectSessionId = createSelector(
  selectAuth,
  (auth) => auth.sessionId
)

// User Selectors
const selectUserSlice = (state: RootState) => state.user
export const selectUserProfile = createSelector(
  selectUserSlice,
  (user) => user.profile
)

// Dashboard Selectors
const selectDashboardSlice = (state: RootState) => state.dashboard
export const selectDashboardData = createSelector(
  selectDashboardSlice,
  (dashboard) => dashboard.data
)

// Membership Selectors
const selectMembershipSlice = (state: RootState) => state.membership
export const selectMembershipDetails = createSelector(
  selectMembershipSlice,
  (membership) => membership.details
)

// Wallet Selectors
const selectWalletSlice = (state: RootState) => state.wallet
export const selectWalletTransactions = createSelector(
  selectWalletSlice,
  (wallet) => wallet.transactions
)

// Referral Selectors
const selectReferralSlice = (state: RootState) => state.referral
export const selectReferrals = createSelector(
  selectReferralSlice,
  (referral) => referral.referrals
)

// Query Selectors
const selectQuerySlice = (state: RootState) => state.query
export const selectQueryState = (queryKey: string) =>
  createSelector(selectQuerySlice, (query) => query[queryKey])
