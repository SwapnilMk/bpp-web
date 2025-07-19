import { DashboardData } from '@/types/api'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

interface AreaChartProps {
  dashboardData: DashboardData
  isLoading: boolean
}

export function AreaChartComponent({
  dashboardData,
  isLoading,
}: AreaChartProps) {
  if (isLoading) {
    return (
      <Card className='col-span-1'>
        <CardHeader>
          <CardTitle>Membership Trends</CardTitle>
          <CardDescription>
            Cumulative growth of primary and active members
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Skeleton className='h-[300px] w-full' />
        </CardContent>
      </Card>
    )
  }

  // Add null check for charts and areaStats
  if (!dashboardData?.charts?.areaStats) {
    return (
      <Card className='col-span-1'>
        <CardHeader>
          <CardTitle>Membership Trends</CardTitle>
          <CardDescription>
            Cumulative growth of primary and active members
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex h-[300px] items-center justify-center text-muted-foreground'>
            No data available
          </div>
        </CardContent>
      </Card>
    )
  }

  const data = dashboardData.charts.areaStats.map(
    (item: { date: string; primary: number; active: number }) => ({
      ...item,
      date: new Date(item.date).toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric',
      }),
    })
  )

  return (
    <Card className='col-span-1'>
      <CardHeader>
        <CardTitle>Membership Trends</CardTitle>
        <CardDescription>
          Cumulative growth of primary and active members
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='h-[300px]'>
          <ResponsiveContainer width='100%' height='100%'>
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray='3 3' className='stroke-muted' />
              <XAxis dataKey='date' className='text-xs' />
              <YAxis className='text-xs' />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                }}
              />
              <Legend />
              <Area
                type='monotone'
                dataKey='primary'
                name='Primary Members'
                stackId='1'
                stroke='hsl(var(--primary))'
                fill='hsl(var(--primary))'
                fillOpacity={0.3}
              />
              <Area
                type='monotone'
                dataKey='active'
                name='Active Members'
                stackId='1'
                stroke='hsl(var(--secondary))'
                fill='hsl(var(--secondary))'
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
