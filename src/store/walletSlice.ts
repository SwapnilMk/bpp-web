import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Transaction {
  _id: string;
  amount: number;
  type: string;
  description: string;
  status: string;
  category: string;
  createdAt: string;
}

interface WalletState {
  balance: number;
  totalContributions: number;
  recentTransactions: Transaction[];
}

const initialState: WalletState = {
  balance: 0,
  totalContributions: 0,
  recentTransactions: [],
};

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setWalletData: (state, action: PayloadAction<WalletState>) => {
      return { ...state, ...action.payload };
    },
    clearWalletData: () => {
      return initialState;
    },
  },
});

export const { setWalletData, clearWalletData } = walletSlice.actions;
export default walletSlice.reducer;
