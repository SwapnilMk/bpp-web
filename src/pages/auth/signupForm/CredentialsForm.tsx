import { useState, useEffect, useMemo } from 'react'
import { Check, Eye, EyeOff, X } from 'lucide-react'
import ReCAPTCHA from 'react-google-recaptcha'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { FormWrapper } from './components/FormWrapper'

type CredentialsData = {
  password: string
  confirmPassword: string
  referralCode?: string
  recaptchaToken?: string
}

type CredentialsFormProps = CredentialsData & {
  updateFields: (fields: Partial<CredentialsData>) => void
  onCaptchaVerified: (verified: boolean) => void
}

export function CredentialsForm({
  password,
  confirmPassword,
  referralCode,
  updateFields,
  onCaptchaVerified,
}: CredentialsFormProps) {
  const [errors, setErrors] = useState<{
    password?: string
    confirmPassword?: string
    captcha?: string
  }>({})
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false)

  const passwordRequirements = useMemo(
    () => [
      { regex: /.{8,}/, text: 'At least 8 characters' },
      { regex: /[0-9]/, text: 'At least 1 number' },
      { regex: /[a-z]/, text: 'At least 1 lowercase letter' },
      { regex: /[A-Z]/, text: 'At least 1 uppercase letter' },
      { regex: /[!@#$%^&*]/, text: 'At least 1 special character (!@#$%^&*)' },
    ],
    []
  )

  const strength = useMemo(
    () =>
      passwordRequirements.map((req) => ({
        met: req.regex.test(password),
        text: req.text,
      })),
    [password, passwordRequirements]
  )
  const strengthScore = strength.filter((req) => req.met).length

  useEffect(() => {
    setErrors((prev) => {
      const newErrors = { ...prev }
      if (!password) newErrors.password = 'Password is required'
      else if (password !== confirmPassword)
        newErrors.confirmPassword = 'Passwords do not match'
      else if (strengthScore < 5)
        newErrors.password =
          strength.find((req) => !req.met)?.text || 'Invalid password'
      else {
        delete newErrors.password
        delete newErrors.confirmPassword
      }
      return newErrors
    })
  }, [password, confirmPassword, strength, strengthScore])

  const getStrengthColor = (score: number) => {
    const colors = [
      'bg-border',
      'bg-red-500',
      'bg-red-500',
      'bg-orange-500',
      'bg-amber-500',
      'bg-emerald-500',
    ]
    return colors[score] || 'bg-border'
  }

  return (
    <FormWrapper title='Credentials Details'>
      <div className='grid gap-4'>
        <div>
          <Label>
            Password <span className='text-red-700'>*</span>
          </Label>
          <div className='relative'>
            <Input
              type={isPasswordVisible ? 'text' : 'password'}
              value={password}
              onChange={(e) =>
                updateFields({ password: e.target.value.slice(0, 15) })
              }
              maxLength={15}
              className={
                errors.password ? 'border-red-500 focus:ring-red-500' : ''
              }
            />
            <button
              type='button'
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              className='absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center text-muted-foreground/80'
              aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
            >
              {isPasswordVisible ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          <div
            className='mt-3 h-1 w-full rounded-full bg-border'
            role='progressbar'
            aria-valuenow={strengthScore}
            aria-valuemin={0}
            aria-valuemax={5}
          >
            <div
              className={`h-full ${getStrengthColor(strengthScore)}`}
              style={{ width: `${(strengthScore / 5) * 100}%` }}
            ></div>
          </div>
          <ul className='mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2'>
            {strength.map((req, i) => (
              <li key={i} className='flex items-center gap-2'>
                {req.met ? (
                  <Check size={16} className='text-emerald-500' />
                ) : (
                  <X size={16} className='text-muted-foreground/80' />
                )}
                <span
                  className={`text-xs ${req.met ? 'text-emerald-600' : 'text-muted-foreground'}`}
                >
                  {req.text}
                </span>
              </li>
            ))}
          </ul>
          {errors.password && (
            <p className='mt-1 text-xs text-red-500'>{errors.password}</p>
          )}
        </div>
        <div>
          <Label>
            Confirm Password <span className='text-red-700'>*</span>
          </Label>
          <div className='relative'>
            <Input
              type={isConfirmPasswordVisible ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) =>
                updateFields({ confirmPassword: e.target.value })
              }
              className={
                errors.confirmPassword
                  ? 'border-red-500 focus:ring-red-500'
                  : ''
              }
            />
            <button
              type='button'
              onClick={() =>
                setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
              }
              className='absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center text-muted-foreground/80'
              aria-label={
                isConfirmPasswordVisible ? 'Hide password' : 'Show password'
              }
            >
              {isConfirmPasswordVisible ? (
                <EyeOff size={16} />
              ) : (
                <Eye size={16} />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className='mt-1 text-xs text-red-500'>
              {errors.confirmPassword}
            </p>
          )}
        </div>
        <div>
          <Label>Referral Code (Optional)</Label>
          <Input
            placeholder='Referral code'
            value={referralCode}
            onChange={(e) => updateFields({ referralCode: e.target.value })}
          />
        </div>
        <div>
          <ReCAPTCHA
            sitekey={import.meta.env.VITE_GOOGLE_RECAPTCHA_SITE_KEY}
            onChange={(value) => {
              setErrors((prev) => ({
                ...prev,
                captcha: value ? undefined : 'CAPTCHA required',
              }))
              onCaptchaVerified(!!value)
              updateFields({ recaptchaToken: value || undefined })
            }}
          />
          {errors.captcha && (
            <p className='mt-1 text-xs text-red-500'>{errors.captcha}</p>
          )}
        </div>
      </div>
    </FormWrapper>
  )
}
