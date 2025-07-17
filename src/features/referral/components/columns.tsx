import { format, parseISO } from 'date-fns'
import { ColumnDef } from '@tanstack/react-table'
import { Referral } from '../data/schema'
import { DataTableColumnHeader } from './data-table-column-header'

export const statuses = [
  {
    value: 'PENDING',
    label: 'Pending',
    icon: () => <div className='h-2 w-2 rounded-full bg-yellow-500' />,
  },
  {
    value: 'APPROVED',
    label: 'Approved',
    icon: () => <div className='h-2 w-2 rounded-full bg-green-500' />,
  },
  {
    value: 'REJECTED',
    label: 'Rejected',
    icon: () => <div className='h-2 w-2 rounded-full bg-red-500' />,
  },
]

export const columns: ColumnDef<Referral>[] = [
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
    accessorKey: 'referralCode',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Referral Code' />
    ),
    cell: ({ row }) => {
      return <div className='font-medium'>{row.getValue('referralCode')}</div>
    },
    size: 150,
  },
  {
    accessorKey: 'referredUser',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Referred User' />
    ),
    cell: ({ row }) => {
      const referredUser = row.original.referredUser
      return (
        <div className='flex flex-col'>
          <div className='font-medium'>{`${referredUser?.firstName} ${referredUser?.lastName}`}</div>
          <div className='text-sm text-muted-foreground'>
            {referredUser?.email}
          </div>
          <div className='text-sm text-muted-foreground'>
            {referredUser?.phone}
          </div>
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
      <DataTableColumnHeader column={column} title='Created Date' />
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
]
