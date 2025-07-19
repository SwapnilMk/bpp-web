import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface WalletState {
  transactions: any[] // Replace 'any' with a proper type
}

const initialState: WalletState = {
  transactions: [],
}

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setWalletTransactions: (state, action: PayloadAction<any[]>) => {
      state.transactions = action.payload
    },
    clearWalletTransactions: (state) => {
      state.transactions = []
    },
  },
})

export const { setWalletTransactions, clearWalletTransactions } =
  walletSlice.actions
export default walletSlice.reducer
