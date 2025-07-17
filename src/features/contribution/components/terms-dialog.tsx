import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface TermsDialogProps {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
}

const TermsDialog: React.FC<TermsDialogProps> = ({ isOpen, onOpenChange }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className='max-h-[90vh] max-w-5xl overflow-y-auto'>
        <DialogHeader>
          <DialogTitle className='mb-4 text-center text-2xl font-bold'>
            Terms of Service
          </DialogTitle>
        </DialogHeader>

        <div className='space-y-4 p-2'>
          <p className='text-sm text-gray-700'>
            These Terms of Service (the "Terms") are a binding contract between
            you and Bharatiya Popular Party, ("Bharatiya Popular Party," "we"
            "our") Your use of the Services in any way means that you agree to
            all of these Terms, and these Terms will remain in effect while you
            use the Services.
          </p>

          <p className='text-sm text-gray-700'>
            Please read these Terms carefully. They cover important information
            about Services provided to you.
          </p>

          <div className='space-y-2'>
            {[
              'The support provided is intended to assist members facing genuine concerns or issues. It is not a crowdfunding initiative and should not be construed as such.',
              'Each concern for support will be reviewed and evaluated individually by the Administrator of the Bharatiya Popular Party. Approval and the nature of assistance provided may vary based on the specifics of the case.',
              'The Bharatiya Popular party is not responsible for any failure or delays in the resolution of issues.',
              'Members must ensure that all information provided in their application is accurate and complete. False or misleading information may result in the rejection of the application or termination of support.',
              'All personal and case-related information shared will be treated with strict confidentiality.',
              'Members must comply with the verification process, including submitting necessary documents such as identity proof and details related to the issue.',
              'We provide your Personal Data to parties that help us provide the Services or perform functions.',
              'The Bharatiya Popular party is not liable for any adverse outcomes or consequences resulting from the assistance provided. Members are encouraged to seek independent advice where necessary.',
              'We do not knowingly collect or solicit Personal Data about children under 18 years of age.',
              "The Bharatiya Popular party provides support voluntarily and is not legally obligated to resolve any member's issue.",
              'Bharatiya Popular party is also free to terminate (or suspend access to) your use of the Services or your account for any reason in our discretion, including your breach of these Terms.',
              'The organizing body reserves the right to modify or update these terms and conditions at any time. Members will be notified of significant changes as necessary.',
              'By seeking support, members acknowledge that they have read, understood, and agreed to these terms and conditions.',
            ].map((term, index) => (
              <div key={index} className='flex gap-2'>
                <span className='font-medium'>{index + 1}.</span>
                <p className='text-sm text-gray-700'>{term}</p>
              </div>
            ))}
          </div>

          <div className='mt-6 text-sm text-gray-700'>
            <p>
              If you have any questions, comments, or concerns regarding these
              terms or the Services, please contact us at:
            </p>
            <p className='mt-2'>
              Email:{' '}
              <a
                href='mailto:bpp.headoffice@gmail.com'
                className='text-blue-600 hover:underline'
              >
                bpp.headoffice@gmail.com
              </a>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default TermsDialog
