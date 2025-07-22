import { createSlice } from '@reduxjs/toolkit'
import { submitCase } from '../thunks'

interface CaseState {
  isSubmitting: boolean
  submitSuccess: boolean
  error: string | null
}

const initialState: CaseState = {
  isSubmitting: false,
  submitSuccess: false,
  error: null,
}

const caseSlice = createSlice({
  name: 'case',
  initialState,
  reducers: {
    resetCaseSubmissionState: (state) => {
      state.isSubmitting = false
      state.error = null
      state.submitSuccess = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitCase.pending, (state) => {
        state.isSubmitting = true
        state.error = null
        state.submitSuccess = false
      })
      .addCase(submitCase.fulfilled, (state) => {
        state.isSubmitting = false
        state.submitSuccess = true
      })
      .addCase(submitCase.rejected, (state, action) => {
        state.isSubmitting = false
        state.error = action.payload as string | null
        state.submitSuccess = false
      })
  },
})

export const { resetCaseSubmissionState } = caseSlice.actions

export default caseSlice.reducer
