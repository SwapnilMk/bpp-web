'use client'

import * as React from 'react'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { DropdownNavProps, DropdownProps } from 'react-day-picker'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface EnhancedDatePickerProps {
  date: Date | undefined
  setDate: (date: Date | undefined) => void
  className?: string
  disabled?: boolean
  minDate?: Date
  maxDate?: Date
}

export function EnhancedDatePicker({
  date,
  setDate,
  className = '',
  disabled = false,
  minDate,
  maxDate,
}: EnhancedDatePickerProps) {
  const [open, setOpen] = React.useState(false)

  const handleCalendarChange = (
    _value: string | number,
    _e: React.ChangeEventHandler<HTMLSelectElement>
  ) => {
    const _event = {
      target: {
        value: String(_value),
      },
    } as React.ChangeEvent<HTMLSelectElement>
    _e(_event)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          className={cn(
            'w-full justify-start text-left font-normal',
            !date && 'text-muted-foreground',
            className
          )}
          disabled={disabled}
        >
          <CalendarIcon className='mr-2 h-4 w-4' />
          {date ? format(date, 'PPP') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0' align='start'>
        <Calendar
          mode='single'
          selected={date}
          onSelect={(d) => {
            setDate(d)
            setOpen(false)
          }}
          className='rounded-lg border border-border bg-background p-2'
          classNames={{
            month_caption: 'mx-0',
          }}
          captionLayout='dropdown'
          defaultMonth={date || new Date()}
          fromMonth={minDate || new Date(1900, 0, 1)}
          toMonth={maxDate || new Date()}
          disabled={disabled}
          components={{
            DropdownNav: (props: DropdownNavProps) => {
              return (
                <div className='flex w-full items-center gap-2'>
                  {props.children}
                </div>
              )
            },
            Dropdown: (props: DropdownProps) => {
              return (
                <Select
                  value={String(props.value)}
                  onValueChange={(value) => {
                    if (props.onChange) {
                      handleCalendarChange(value, props.onChange)
                    }
                  }}
                >
                  <SelectTrigger className='h-8 w-fit font-medium first:grow'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className='max-h-[min(26rem,var(--radix-select-content-available-height))]'>
                    {props.options?.map((option) => (
                      <SelectItem
                        key={option.value}
                        value={String(option.value)}
                        disabled={option.disabled}
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )
            },
          }}
        />
      </PopoverContent>
    </Popover>
  )
}
