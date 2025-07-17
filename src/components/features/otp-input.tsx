import OtpInput, { OTPInputProps } from 'react-otp-input'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'

type OtpOptions = Omit<OTPInputProps, 'renderInput'>

type OtpStyledInputProps = {
  className?: string
  inputType?: string
} & OtpOptions

export const OtpStyledInput = ({
  className,
  inputType = 'number',
  ...props
}: OtpStyledInputProps) => {
  return (
    <OtpInput
      {...props}
      inputType={inputType}
      renderInput={(inputProps) => (
        <Input
          {...inputProps}
          type='tel'
          inputMode='numeric'
          pattern='[0-9]*'
          autoComplete='one-time-code'
          className={cn('!w-12 !appearance-none selection:bg-none', className)}
        />
      )}
      containerStyle={`flex justify-center items-center flex-wrap text-2xl font-bold ${
        props.renderSeparator ? 'gap-1' : 'gap-x-3 gap-y-2'
      }`}
    />
  )
}
