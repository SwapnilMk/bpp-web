import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface QueryState {
  [queryKey: string]: {
    status: 'idle' | 'loading' | 'success' | 'error'
    error?: string
  }
}

const initialState: QueryState = {}

const querySlice = createSlice({
  name: 'query',
  initialState,
  reducers: {
    setQueryState: (
      state,
      action: PayloadAction<{
        queryKey: string
        status: 'idle' | 'loading' | 'success' | 'error'
        error?: string
      }>
    ) => {
      state[action.payload.queryKey] = {
        status: action.payload.status,
        error: action.payload.error,
      }
    },
  },
})

export const { setQueryState } = querySlice.actions
export default querySlice.reducer
