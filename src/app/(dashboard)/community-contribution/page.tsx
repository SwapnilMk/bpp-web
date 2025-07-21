'use client'
import { CountdownTimer } from '@/components/features/countdown-timer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'

const CommunityContribution = () => {
  return (
    <div className='flex justify-center items-center'>
      <Card className='w-full max-w-4xl'>
        <CardHeader>
          <CardTitle className='text-2xl font-bold'>Community Contribution</CardTitle>
          <CardDescription>
            Contribute to the community and make a difference.
          </CardDescription>
          <CountdownTimer />
          <Separator />
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            <div>
              <h2 className='text-xl font-semibold'>Select Contribution Type</h2>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder='Select a contribution type' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='legal'>Legal Assistance</SelectItem>
                  <SelectItem value='financial'>Financial Assistance</SelectItem>
                  <SelectItem value='other'>Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <h2 className='text-xl font-semibold'>Terms and Conditions</h2>
              <p>
                By contributing, you agree to our terms and conditions. Please read them
                carefully before proceeding.
              </p>
            </div>
            <Link href='/community-contribution/form'>
              <Button>Get Started</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default CommunityContribution
