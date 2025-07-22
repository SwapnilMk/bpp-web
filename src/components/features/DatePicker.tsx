import * as React from 'react'
import { format, startOfYear, endOfYear, eachMonthOfInterval } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
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

interface DatePickerProps {
  date: Date | undefined
  setDate: (date: Date | undefined) => void
  endYear?: number
}

export const DatePicker = React.memo(function DatePicker({
  date,
  setDate,
  endYear,
}: DatePickerProps) {
  const currentDate = React.useMemo(() => new Date(), [])
  const [month, setMonth] = React.useState<number>(
    date ? date.getMonth() : currentDate.getMonth()
  )
  const [year, setYear] = React.useState<number>(
    date ? date.getFullYear() : currentDate.getFullYear()
  )
  const [open, setOpen] = React.useState(false)

  const years = React.useMemo(() => {
    const currentYear = currentDate.getFullYear()
    const finalEndYear = endYear ?? currentYear
    return Array.from(
      { length: finalEndYear - 1910 + 1 },
      (_, i) => finalEndYear - i
    )
  }, [endYear, currentDate])

  const months = React.useMemo(() => {
    return eachMonthOfInterval({
      start: startOfYear(new Date(year, 0, 1)),
      end: endOfYear(new Date(year, 0, 1)),
    })
  }, [year])

  const formattedMonth = React.useMemo(
    () => format(new Date(year, month), 'MMMM'),
    [year, month]
  )

  const currentMonth = React.useMemo(() => new Date(year, month), [year, month])

  React.useEffect(() => {
    if (date) {
      setMonth(date.getMonth())
      setYear(date.getFullYear())
    }
  }, [date])

  const handleYearChange = React.useCallback(
    (selectedYear: string) => {
      const newYear = parseInt(selectedYear, 10)
      setYear(newYear)
      if (date) {
        const newDate = new Date(date.getTime())
        newDate.setFullYear(newYear)
        setDate(newDate)
      }
    },
    [date, setDate]
  )

  const handleMonthChange = React.useCallback(
    (selectedMonth: string) => {
      const newMonth = parseInt(selectedMonth, 10)
      setMonth(newMonth)
      if (date) {
        const newDate = new Date(date.getTime())
        newDate.setMonth(newMonth)
        setDate(newDate)
      } else {
        const newDate = new Date(year, newMonth, 1)
        newDate.setHours(12, 0, 0, 0)
        setDate(newDate)
      }
    },
    [date, year, setDate]
  )

  const handleDateSelect = React.useCallback(
    (newDate: Date | undefined) => {
      if (newDate) {
        const adjustedDate = new Date(newDate)
        adjustedDate.setHours(12, 0, 0, 0)
        setDate(adjustedDate)
        setOpen(false)
      } else {
        setDate(undefined)
      }
    },
    [setDate]
  )

  const handleMonthChangeCalendar = React.useCallback((newMonth: Date) => {
    setMonth(newMonth.getMonth())
    setYear(newMonth.getFullYear())
  }, [])

  const handleOpenChange = React.useCallback((newOpen: boolean) => {
    setOpen(newOpen)
  }, [])

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          className={cn(
            'w-full justify-start text-left font-normal',
            !date && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className='mr-2 w-4 h-4' />
          {date ? format(date, 'PPP') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='p-0 w-auto' align='start'>
        <div className='flex justify-between p-2 space-x-1'>
          <Select onValueChange={handleMonthChange} value={month.toString()}>
            <SelectTrigger className='w-[120px]'>
              <SelectValue>{formattedMonth}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {months.map((m, index) => (
                <SelectItem key={index} value={index.toString()}>
                  {format(m, 'MMMM')}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={handleYearChange} value={year.toString()}>
            <SelectTrigger className='w-[120px]'>
              <SelectValue>{year}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {years.map((y) => (
                <SelectItem key={y} value={y.toString()}>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Calendar
          mode='single'
          selected={date}
          onSelect={handleDateSelect}
          month={currentMonth}
          onMonthChange={handleMonthChangeCalendar}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
})
