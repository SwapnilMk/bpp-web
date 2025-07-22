import 'leaflet/dist/leaflet.css'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { mockDashboardStats } from '@/features/contribution/data/data'

export const ContributionStats = ({
  stats,
  hideMap = false,
}: {
  stats: typeof mockDashboardStats
  hideMap?: boolean
}) => (
  <div className='w-full'>
    <div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4${hideMap ? '' : ''}`}
    >
      {/* Total Cases Card */}
      <Card>
        <CardHeader>
          <CardTitle>Total Cases Filed</CardTitle>
        </CardHeader>
        <CardContent>
          <p className='text-4xl font-bold text-blue-600 dark:text-blue-400'>
            {stats.totalCases.toLocaleString()}
          </p>
          <p className='mt-1 text-sm text-gray-500 dark:text-gray-400'>
            Across all categories
          </p>
        </CardContent>
      </Card>
      {/* Active Volunteers Card */}
      <Card>
        <CardHeader>
          <CardTitle>Active Volunteers</CardTitle>
        </CardHeader>
        <CardContent>
          <p className='text-4xl font-bold text-green-600 dark:text-green-400'>
            {stats.activeVolunteers.toLocaleString()}
          </p>
          <p className='mt-1 text-sm text-gray-500 dark:text-gray-400'>
            Legal and support staff
          </p>
        </CardContent>
      </Card>
      {/* Cases by Category Card */}
      <Card>
        <CardHeader>
          <CardTitle>Cases by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className='space-y-2'>
            {stats.casesByCategory.map((cat) => (
              <li
                key={cat.name}
                className='flex items-center justify-between text-sm'
              >
                <span className='text-gray-700 dark:text-gray-300'>
                  {cat.name}
                </span>
                <span className='font-semibold text-gray-900 dark:text-white'>
                  {cat.value.toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  </div>
)
