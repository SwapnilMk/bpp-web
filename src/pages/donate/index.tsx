import { useNavigate, useRouter } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

export default function DonatePage() {
  const navigate = useNavigate()
  const { history } = useRouter()
  return (
    <div className='h-svh'>
      <div className='m-auto flex h-full w-full flex-col items-center justify-center gap-2'>
        <h1 className='text-[2.5rem] font-bold leading-tight text-[#e85a32]'>
          Support Our Mission
        </h1>
        <span className='text-lg font-medium'>Donations To Be Opened Soon</span>
        <p className='max-w-xl text-center text-muted-foreground'>
          Bharatiya Popular Party is a dedicated party working tirelessly to
          bring meaningful change to our nation.
          <br />
          <br />
          <strong>Important Update:</strong>
          <br />
          We are currently awaiting official registration confirmation under
          Section 29A of the Representation of the People Act, 1951.
          <br />
          As per legal requirements, we will begin accepting donations only
          after registration is confirmed by the Election Commission of India.
          <br />
          Feel free to contact us for any clarification.
          <br />
          Thank you for your support and patience. Together, we move forward.
        </p>
        <div className='mt-6 flex gap-4'>
          <Button variant='outline' onClick={() => history.go(-1)}>
            Go Back
          </Button>
          <Button onClick={() => navigate({ to: '/' })}>Back to Home</Button>
        </div>
      </div>
    </div>
  )
}
