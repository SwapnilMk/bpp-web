import { DashboardData } from '@/types/api'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface DashboardState {
  data: DashboardData | null
  isLoading: boolean
  error: string | null
}

const initialState: DashboardState = {
  data: null,
  isLoading: false,
  error: null,
}

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setDashboardData: (state, action: PayloadAction<DashboardData>) => {
      state.data = action.payload
      state.isLoading = false
      state.error = null
    },
    setDashboardLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
      if (action.payload) {
        state.error = null
      }
    },
    setDashboardError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.isLoading = false
    },
    clearDashboardData: (state) => {
      state.data = null
      state.isLoading = false
      state.error = null
    },
  },
})

export const {
  setDashboardData,
  setDashboardLoading,
  setDashboardError,
  clearDashboardData,
} = dashboardSlice.actions
export default dashboardSlice.reducer
