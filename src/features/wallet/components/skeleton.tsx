import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function WalletSkeleton() {
  return (
    <div className='space-y-8'>
      {/* Wallet Card Skeleton */}
      <Card className='border-primary/20 bg-gradient-to-r from-primary/10 to-primary/5'>
        <CardHeader className='pb-2'>
          <Skeleton className='h-6 w-32' />
          <Skeleton className='h-4 w-24' />
        </CardHeader>
        <CardContent>
          <div className='flex flex-col gap-4'>
            <div className='flex items-center justify-between'>
              <Skeleton className='h-8 w-24' />
              <Skeleton className='h-8 w-32' />
            </div>
            <div className='flex items-center justify-between'>
              <Skeleton className='h-4 w-48' />
              <Skeleton className='h-4 w-24' />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Transactions Skeleton */}
      <Card>
        <CardHeader>
          <Skeleton className='h-6 w-48' />
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            {[...Array(5)].map((_, i) => (
              <div key={i} className='flex items-center gap-4'>
                <Skeleton className='h-4 w-8' />
                <Skeleton className='h-4 w-24' />
                <Skeleton className='h-4 w-24' />
                <Skeleton className='h-4 w-48' />
                <Skeleton className='h-4 w-24' />
                <Skeleton className='h-4 w-32' />
                <Skeleton className='h-8 w-8' />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
