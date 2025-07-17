import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

export function VerificationPendingDialog() {
  const [open, setOpen] = useState(true)

  // Close the dialog after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(false)
    }, 10000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Account Verification Pending</DialogTitle>
          <DialogDescription>
            Your account is currently under verification. You have limited
            access to the dashboard until your account is verified.
          </DialogDescription>
        </DialogHeader>
        <div className='py-4'>
          <p className='text-sm text-muted-foreground'>
            We are reviewing your submitted documents. This process may take 1-2
            business days. You will be notified once your account is verified.
          </p>
        </div>
        <DialogFooter className='sm:justify-start'>
          {/* <Button
            type='button'
            variant='default'
            onClick={() => {
              setOpen(false)
              navigate({ to: '/dashboard/profile' })
            }}
          >
            View Profile
          </Button> */}
          <Button
            type='button'
            variant='secondary'
            onClick={() => setOpen(false)}
          >
            Continue with Limited Access
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
