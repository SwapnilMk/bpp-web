import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function ContributionStatsSkeleton() {
  return (
    <div className='w-full'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <CardTitle>
                <Skeleton className='h-6 w-1/2' />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Skeleton className='h-10 w-1/2 mb-2' />
              <Skeleton className='h-4 w-3/4' />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
