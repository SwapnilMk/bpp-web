import React, { createContext, useContext, useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { User } from '../data/schema'

type UsersDialogType = 'invite' | 'add' | 'edit' | 'delete'

interface UsersContextType {
  open: UsersDialogType | null
  setOpen: (str: UsersDialogType | null) => void
  currentRow: User | null
  setCurrentRow: React.Dispatch<React.SetStateAction<User | null>>
}

const UsersContext = createContext<UsersContextType | null>(null)

interface Props {
  children: React.ReactNode
}

export const UsersProvider = ({ children }: Props) => {
  const [open, setOpen] = useDialogState<UsersDialogType>(null)
  const [currentRow, setCurrentRow] = useState<User | null>(null)

  const value = {
    open,
    setOpen,
    currentRow,
    setCurrentRow,
  }

  return <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
}

export const useUsers = () => {
  const context = useContext(UsersContext)
  if (!context) {
    throw new Error('useUsers must be used within a UsersProvider')
  }
  return context
}
