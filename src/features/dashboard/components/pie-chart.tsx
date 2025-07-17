import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts'
import { DashboardData } from '@/hooks/use-dashboard-data'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

interface PieChartProps {
  dashboardData: DashboardData
  isLoading: boolean
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

export function PieChartComponent({ dashboardData, isLoading }: PieChartProps) {
  if (isLoading) {
    return (
      <Card className='col-span-1'>
        <CardHeader>
          <CardTitle>Members by State</CardTitle>
          <CardDescription>
            Distribution of members across different states
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Skeleton className='h-[300px] w-full' />
        </CardContent>
      </Card>
    )
  }

  const data = dashboardData.charts.pieStats

  return (
    <Card className='col-span-1'>
      <CardHeader>
        <CardTitle>Members by State</CardTitle>
        <CardDescription>
          Distribution of members across different states
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='h-[300px]'>
          <ResponsiveContainer width='100%' height='100%'>
            <PieChart>
              <Pie
                data={data}
                cx='50%'
                cy='50%'
                labelLine={false}
                outerRadius={80}
                fill='#8884d8'
                dataKey='value'
                nameKey='name'
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {data.map((_entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
