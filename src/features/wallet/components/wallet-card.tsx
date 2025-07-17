import { IndianRupeeIcon } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Wallet } from '../data/schema'

interface WalletCardProps {
  wallet: Wallet
  membershipNo?: string
}

export function WalletCard({ wallet, membershipNo }: WalletCardProps) {
  return (
    <Card className='border-primary/20 bg-gradient-to-r from-primary/10 to-primary/5'>
      <CardHeader className='pb-2'>
        <CardTitle className='text-lg'>Wallet Balance</CardTitle>
        <CardDescription>Your current wallet balance</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='flex flex-col gap-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center text-3xl font-bold'>
              <IndianRupeeIcon className='mr-1 h-6 w-6' />
              {wallet.balance.toLocaleString('en-IN')}
            </div>
            <div className='text-sm text-muted-foreground'>
              {wallet.isActive ? 'Active' : 'Inactive'}
            </div>
          </div>
          {membershipNo && (
            <div className='flex items-center justify-between'>
              <div className='text-sm text-muted-foreground'>
                Membership No.
              </div>
              <div className='text-sm font-medium'>{membershipNo}</div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
