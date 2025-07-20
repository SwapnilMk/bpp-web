import { CaseStatus } from '@/types/case'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchCaseStatus } from '../thunks'

interface CaseState {
  status: CaseStatus[]
  isLoading: boolean
  error: string | null
}

const initialState: CaseState = {
  status: [],
  isLoading: false,
  error: null,
}

const caseSlice = createSlice({
  name: 'case',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCaseStatus.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(
        fetchCaseStatus.fulfilled,
        (state, action: PayloadAction<CaseStatus[]>) => {
          state.isLoading = false
          state.status = action.payload
        }
      )
      .addCase(fetchCaseStatus.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
  },
})

export default caseSlice.reducer
