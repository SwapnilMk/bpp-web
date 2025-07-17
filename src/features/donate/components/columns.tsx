import { format } from 'date-fns'
import { ColumnDef } from '@tanstack/react-table'
import { EyeIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { statuses } from '../data/data'
import { Donation } from '../data/schema'
import { DataTableColumnHeader } from './data-table-column-header'

export const columns: ColumnDef<Donation>[] = [
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
    accessorKey: 'amount',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Amount' />
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('amount'))
      const formatted = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
      }).format(amount)
      return <div className='font-medium'>{formatted}</div>
    },
    size: 120,
  },
  {
    accessorKey: 'receipt.receiptNumber',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Receipt No.' />
    ),
    cell: ({ row }) => {
      return <div>{row.original.receipt?.receiptNumber || '-'}</div>
    },
    size: 120,
  },
  {
    accessorKey: 'metadata.email',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Email' />
    ),
    cell: ({ row }) => {
      return <div>{row.original.metadata?.email || '-'}</div>
    },
    size: 200,
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
            <status.icon className='mr-2 h-4 w-4 text-muted-foreground' />
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
    accessorKey: 'paymentDetails.paymentMethod',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Payment Method' />
    ),
    cell: ({ row }) => {
      return <div>{row.original.paymentDetails?.paymentMethod || '-'}</div>
    },
    size: 150,
  },
  {
    accessorKey: 'paymentDetails.paymentDate',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Payment Date' />
    ),
    cell: ({ row }) => {
      const date = row.original.paymentDetails?.paymentDate
        ? new Date(row.original.paymentDetails.paymentDate)
        : new Date(row.getValue('createdAt'))
      return <div>{format(date, 'dd MMM yyyy')}</div>
    },
    size: 120,
  },
  {
    id: 'actions',
    cell: ({ row: _row }) => {
      return (
        <Button variant='ghost' size='sm' className='h-8 w-8 p-0'>
          <EyeIcon className='h-4 w-4' />
          <span className='sr-only'>View details</span>
        </Button>
      )
    },
    size: 50,
  },
]
