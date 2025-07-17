import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'

interface TermsDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onAccept?: () => void
}

export const TermsDialog: React.FC<TermsDialogProps> = ({
  isOpen,
  onOpenChange,
  onAccept,
}) => {
  const handleAccept = () => {
    onAccept?.()
    onOpenChange(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className='border border-border bg-background text-foreground sm:max-w-lg'>
        <DialogHeader className='text-center'>
          <DialogTitle className='text-center text-xl font-semibold sm:text-2xl'>
            Terms & Conditions
          </DialogTitle>
        </DialogHeader>
        <Separator />
        <div className='max-h-[60vh] space-y-3 overflow-y-auto pr-4 text-xs leading-5 text-neutral-700 dark:text-neutral-200 sm:text-sm sm:leading-6'>
          <p className='text-sm font-bold leading-6 text-gray-900 dark:text-gray-100 sm:text-base sm:leading-7'>
            IMPORTANT – PLEASE READ CAREFULLY
          </p>
          <p className='leading-5 sm:leading-6'>
            These Terms of Service and Conditions ("Terms") represent a legally
            binding agreement between you and the{' '}
            <span className='font-semibold'>
              Bharatiya Popular Party ("Party")
            </span>{' '}
            regarding your use of the Bharatiya Popular Party website. By using
            the website, you acknowledge that you have read, understood, and
            agree to comply with these Terms.{' '}
            <span className='font-semibold'>
              If you do not agree, please do not use the Service.
            </span>
          </p>
          <p className='leading-5 sm:leading-6'>
            The Party may update these Terms periodically. Any changes to these
            Terms will be posted on the Party's official website,{' '}
            <a
              target='_blank'
              href='https://www.bppindia.com'
              className='text-blue-500 underline dark:text-blue-400'
            >
              www.bppindia.com
            </a>
            . If you do not agree with any updates, you may discontinue use and
            uninstall the Service at any time. By continuing to use the Service
            after changes are made, you acknowledge your acceptance of the
            revised Terms.
          </p>
        </div>
        <Separator />
        <div className='flex justify-end gap-3'>
          <Button
            className='text-xs'
            variant='outline'
            size='sm'
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>
          <Button className='text-xs' size='sm' onClick={handleAccept}>
            Accept
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
