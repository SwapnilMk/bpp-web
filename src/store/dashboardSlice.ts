import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DashboardData } from '@/hooks/use-dashboard-data'

interface DashboardState {
  data: DashboardData | null
  loading: boolean
  error: string | null
}

const initialState: DashboardState = {
  data: null,
  loading: false,
  error: null,
}

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setDashboardData: (state, action: PayloadAction<DashboardData>) => {
      state.data = action.payload
    },
    clearDashboardData: (state) => {
      state.data = null
    },
  },
})

export const { setDashboardData, clearDashboardData } = dashboardSlice.actions
export default dashboardSlice.reducer
