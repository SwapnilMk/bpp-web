import React, { createContext, useContext, useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { Task } from '../data/schema'

type TasksDialogType = 'create' | 'update' | 'delete' | 'import'

interface TasksContextType {
  open: TasksDialogType | null
  setOpen: (str: TasksDialogType | null) => void
  currentRow: Task | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Task | null>>
}

const TasksContext = createContext<TasksContextType | null>(null)

interface Props {
  children: React.ReactNode
}

export const TasksProvider = ({ children }: Props) => {
  const [open, setOpen] = useDialogState<TasksDialogType>(null)
  const [currentRow, setCurrentRow] = useState<Task | null>(null)

  const value = {
    open,
    setOpen,
    currentRow,
    setCurrentRow,
  }

  return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
}

export const useTasks = () => {
  const context = useContext(TasksContext)
  if (!context) {
    throw new Error('useTasks must be used within a TasksProviders')
  }
  return context
}
