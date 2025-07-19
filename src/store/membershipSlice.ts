import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MembershipState {
  number: string | null;
  type: string | null;
  status: string | null;
  cardUrl?: string;
  startDate?: string;
  expiryDate?: string;
}

const initialState: MembershipState = {
  number: null,
  type: null,
  status: null,
  cardUrl: undefined,
  startDate: undefined,
  expiryDate: undefined,
};

const membershipSlice = createSlice({
  name: 'membership',
  initialState,
  reducers: {
    setMembership: (state, action: PayloadAction<MembershipState>) => {
      return { ...state, ...action.payload };
    },
    clearMembership: () => {
      return initialState;
    },
  },
});

export const { setMembership, clearMembership } = membershipSlice.actions;
export default membershipSlice.reducer;
