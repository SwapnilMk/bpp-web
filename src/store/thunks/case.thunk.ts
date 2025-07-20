import { createAsyncThunk } from '@reduxjs/toolkit';
import { caseService } from '@/services/case.service';
import { CaseStatus } from '@/types/case';

export const fetchCaseStatus = createAsyncThunk<CaseStatus[]>(
  'case/fetchStatus',
  async (_, { rejectWithValue }) => {
    try {
      const data = await caseService.getCaseStatus();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
