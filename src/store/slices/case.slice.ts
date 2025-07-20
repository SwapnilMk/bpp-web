import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CaseStatus } from '@/types/case';
import { fetchCaseStatus } from '../thunks/case.thunk';

interface CaseState {
  status: CaseStatus[];
  isLoading: boolean;
  error: any;
}

const initialState: CaseState = {
  status: [],
  isLoading: false,
  error: null,
};

const caseSlice = createSlice({
  name: 'case',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCaseStatus.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCaseStatus.fulfilled, (state, action: PayloadAction<CaseStatus[]>) => {
        state.isLoading = false;
        state.status = action.payload;
      })
      .addCase(fetchCaseStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default caseSlice.reducer;
