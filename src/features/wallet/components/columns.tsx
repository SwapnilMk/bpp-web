import { format, parseISO } from 'date-fns'
import { ColumnDef } from '@tanstack/react-table'
// import { EyeIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Transaction } from '../data/schema'
import { DataTableColumnHeader } from './data-table-column-header'

export const statuses = [
  {
    value: 'PENDING',
    label: 'Pending',
    icon: () => <div className='h-2 w-2 rounded-full bg-yellow-500' />,
  },
  {
    value: 'COMPLETED',
    label: 'Completed',
    icon: () => <div className='h-2 w-2 rounded-full bg-green-500' />,
  },
  {
    value: 'FAILED',
    label: 'Failed',
    icon: () => <div className='h-2 w-2 rounded-full bg-red-500' />,
  },
  {
    value: 'REJECTED',
    label: 'Rejected',
    icon: () => <div className='h-2 w-2 rounded-full bg-red-500' />,
  },
]

export const transactionTypes = [
  {
    value: 'CREDIT',
    label: 'Credit',
    icon: () => <div className='h-2 w-2 rounded-full bg-green-500' />,
  },
  {
    value: 'DEBIT',
    label: 'Debit',
    icon: () => <div className='h-2 w-2 rounded-full bg-red-500' />,
  },
]

export const columns: ColumnDef<Transaction>[] = [
  {
    id: 'sr',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Sr. No.' />
    ),
    cell: ({ row }) => <div className='w-[50px]'>{row.index + 1}</div>,
    enableSorting: false,
    enableHiding: false,
    size: 50,
  },
  {
    accessorKey: 'type',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Type' />
    ),
    cell: ({ row }) => {
      const type = transactionTypes.find(
        (type) => type.value === row.getValue('type')
      )

      if (!type) {
        return null
      }

      return (
        <div className='flex w-[100px] items-center'>
          {type.icon && (
            <div className='mr-2 h-4 w-4 text-muted-foreground'>
              {type.icon()}
            </div>
          )}
          <span>{type.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    size: 120,
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Amount' />
    ),
    cell: ({ row }) => {
      const amount = row.getValue('amount') as number
      const type = row.original.type
      return (
        <div
          className={`font-medium ${type === 'CREDIT' ? 'text-green-600' : 'text-red-600'}`}
        >
          {type === 'CREDIT' ? '+' : '-'} ₹{amount.toLocaleString('en-IN')}
        </div>
      )
    },
    size: 150,
  },
  {
    accessorKey: 'category',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Category' />
    ),
    cell: ({ row }) => {
      return <div className='font-medium'>{row.getValue('category')}</div>
    },
    size: 180,
  },
  {
    accessorKey: 'description',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Description' />
    ),
    cell: ({ row }) => {
      return (
        <div className='max-w-[300px] truncate'>
          {row.getValue('description')}
        </div>
      )
    },
    size: 250,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue('status')
      )

      if (!status) {
        return null
      }

      return (
        <div className='flex w-[100px] items-center'>
          {status.icon && (
            <div className='mr-2 h-4 w-4 text-muted-foreground'>
              {status.icon()}
            </div>
          )}
          <span>{status.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    size: 120,
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Date' />
    ),
    cell: ({ row }) => {
      try {
        const dateStr = row.getValue('createdAt') as string
        const date = parseISO(dateStr)
        return <div>{format(date, 'dd MMM yyyy')}</div>
      } catch (_) {
        return <div>Invalid date</div>
      }
    },
    size: 150,
  },
  {
    id: 'actions',
    cell: () => {
      return (
        <Button variant='ghost' size='sm' className='h-8 w-8 p-0'>
          {/* <EyeIcon className='h-4 w-4' />
          <span className='sr-only'>View details</span> */}
        </Button>
      )
    },
    size: 50,
  },
]
