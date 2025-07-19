import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DashboardData } from '@/hooks/use-dashboard-data'

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
    },
  },
})

export const { setDashboardData } = dashboardSlice.actions
export default dashboardSlice.reducer
