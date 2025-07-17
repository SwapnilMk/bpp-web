import { Link } from '@tanstack/react-router'
import bpplogo from '@/assets/images/logos/Bpp.png'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { BusinessCommunity } from './BusinessCommunitySignup'

const BussinessCommunitySignup = () => {
  return (
    <section className='mx-auto flex h-screen max-w-xl items-center rounded-none py-14 md:rounded-3xl md:p-8'>
      <div className='flex flex-col gap-4'>
        <Card className='mx-auto max-w-xl p-4'>
          <CardHeader>
            <div className='flex items-center justify-center gap-2 text-xl font-bold text-blue-800'>
              <img
                src={bpplogo}
                alt=''
                className='w-[120px] rounded-lg object-contain'
              />
            </div>
            <h2 className='my-2 text-center text-2xl font-black text-neutral-800 dark:text-neutral-200'>
              Welcome to <br />{' '}
              <span style={{ color: '#79A5F2' }}>Bharatiya Popular Party</span>
            </h2>
          </CardHeader>
          <CardContent>
            <form className='space-y-8'>
              <div className='grid gap-4'>
                <BusinessCommunity
                  title={''}
                  firstName={''}
                  middleName={''}
                  lastName={''}
                  dateOfBirth={''}
                  age={''}
                  gender={''}
                  updateFields={function (): void {
                    throw new Error('Function not implemented.')
                  }}
                />
                <Button type='submit'>Next</Button>
              </div>
            </form>
          </CardContent>
        </Card>
        <div className='flex justify-center gap-1 text-sm'>
          <Link to='/sign-up' className='font-semibold underline'>
            sign up as a Member
          </Link>{' '}
          <p>or</p>{' '}
          <Link to='/sign-in' className='font-semibold underline'>
            log in
          </Link>
        </div>
      </div>
    </section>
  )
}

export default BussinessCommunitySignup
