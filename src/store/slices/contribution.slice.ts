import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getCommunityContributionData } from '@/services/contribution.service'
import type { CaseStatus } from '@/features/contribution/components/case-history'
type DashboardStats = {
  totalCases: number
  activeVolunteers: number
  casesByCategory: { name: string; value: number }[]
}

type UserAddress = {
  district: string
  state: string
  coordinates: [number, number]
}

interface ContributionState {
  caseHistory: CaseStatus[]
  dashboardStats: DashboardStats | null
  userAddress: UserAddress | null
  loading: boolean
  error: string | null
}

const initialState: ContributionState = {
  caseHistory: [],
  dashboardStats: null,
  userAddress: null,
  loading: false,
  error: null,
}

export const fetchContributionData = createAsyncThunk(
  'contribution/fetchData',
  async () => {
    const response = await getCommunityContributionData()
    return response
  }
)

const contributionSlice = createSlice({
  name: 'contribution',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContributionData.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchContributionData.fulfilled, (state, action) => {
        state.loading = false
        state.caseHistory = action.payload.caseHistory
        state.dashboardStats = action.payload.dashboardStats
        state.userAddress = action.payload.userAddress
      })
      .addCase(fetchContributionData.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch contribution data'
      })
  },
})

export default contributionSlice.reducer
