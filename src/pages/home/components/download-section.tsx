import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { ArrowRightIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { FaAndroid } from 'react-icons/fa'
// Asset and Component Imports
import appQr from '@/assets/appQR.svg'
import desktop from '@/assets/mockups/laptop.png'
import phone from '@/assets/mockups/phone.png'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AnimatedShinyText } from '@/components/animated-shiny-text'
import Android from '@/components/mockups/android'
import { Safari } from '@/components/mockups/safari'
import NumberTicker from '@/components/number-ticker'

const DownloadSection = () => {
  const navigate = useNavigate()
  const { t } = useTranslation('homePage')
  const [device, setDevice] = useState<'mobile' | 'desktop'>('mobile')
  const [phoneInput, setPhoneInput] = useState('')
  const [phoneError, setPhoneError] = useState('')

  // Validates a 10-digit phone number
  const isPhoneValid = (phone: string) => /^\d{10}$/.test(phone)

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '') // Allow only digits
    setPhoneInput(value)
    if (value.length > 0 && !isPhoneValid(value)) {
      setPhoneError('Please enter a valid 10-digit phone number.')
    } else {
      setPhoneError('')
    }
  }

  const handleSignup = () => {
    if (isPhoneValid(phoneInput)) {
      navigate({ to: '/sign-up', search: { phone: phoneInput } })
    } else {
      setPhoneError('Please enter a valid 10-digit phone number.')
    }
  }

  return (
    <section className='w-full bg-background py-12 md:py-20 lg:py-24'>
      <div className='container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20'>
          {/* Left Column: Image and Device Toggles */}
          <div className='flex flex-col items-center'>
            <div className='relative flex h-[450px] w-full max-w-lg items-center justify-center'>
              {device === 'mobile' ? (
                <Android className='h-full w-full object-contain' src={phone} />
              ) : (
                <Safari
                  url='bppindia.com'
                  className='h-full w-full object-contain'
                  imageSrc={desktop}
                />
              )}
            </div>
            <Tabs
              defaultValue='mobile'
              value={device}
              onValueChange={(value) =>
                setDevice(value as 'mobile' | 'desktop')
              }
              className='mt-6 w-full max-w-xs'
            >
              <TabsList className='grid w-full grid-cols-2 rounded-xl bg-muted'>
                <TabsTrigger
                  value='mobile'
                  className='rounded-xl text-sm font-semibold'
                >
                  {t('DownloadQr.section1', 'Mobile App')}
                </TabsTrigger>
                <TabsTrigger
                  value='desktop'
                  className='rounded-xl text-sm font-semibold'
                >
                  {t('DownloadQr.section2', 'Desktop')}
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Right Column: Content and Actions */}
          <div className='flex flex-col items-center text-center lg:items-start lg:text-left'>
            <div className='space-y-4'>
              <h1 className='flex flex-wrap items-center justify-center gap-2 text-3xl font-bold tracking-tight text-blue-600 dark:text-blue-400 sm:text-4xl md:text-5xl lg:justify-start'>
                <NumberTicker
                  initialValue={103786}
                  incrementOptions={[2, 3, 4]}
                  delay={3}
                  className='text-inherit'
                />
                {t('DownloadQr.header', 'Users have already joined!')}
              </h1>
              <h2 className='text-2xl font-bold tracking-tight text-primary sm:text-3xl md:text-4xl'>
                {t('DownloadQr.subheader', 'Join our growing community.')}
              </h2>
            </div>

            <h3 className='mt-8 text-xl font-bold text-primary md:text-2xl'>
              {t('DownloadQr.heading', 'Get the App')}
            </h3>

            {/* QR Code and Download Buttons */}
            <div className='mt-6 flex w-full flex-col items-center gap-4 md:flex-row md:gap-6'>
              <div className='flex h-32 w-32 shrink-0 items-center justify-center rounded-lg border bg-card p-2 shadow-sm md:h-36 md:w-36'>
                <img src={appQr} alt='App QR Code' className='h-full w-full' />
              </div>
              <div className='flex flex-col items-center space-y-3 md:items-start'>
                <p className='text-base font-medium text-muted-foreground'>
                  {t('DownloadQr.scanTxt', 'Scan the QR or download directly.')}
                </p>
                <div className='flex flex-col gap-3 sm:flex-row'>
                  <Button
                    onClick={() =>
                      (window.location.href =
                        'https://bppdatabase.s3.ap-south-1.amazonaws.com/app/BPP.apk')
                    }
                    className='flex items-center justify-center gap-2 bg-blue-600 px-5 py-6 text-base font-semibold text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'
                  >
                    <FaAndroid className='h-6 w-6' />
                    {t('DownloadQr.buttonTxt', 'Download for Android')}
                  </Button>
                </div>
              </div>
            </div>

            {/* How It Works Button */}
            <div
              className={cn(
                'group mt-8 inline-block cursor-pointer rounded-full border bg-secondary text-sm font-bold text-secondary-foreground transition-all hover:bg-muted'
              )}
              onClick={() =>
                navigate({ to: '/community-contribution/how-it-works' })
              }
            >
              <AnimatedShinyText className='inline-flex items-center justify-center px-4 py-2'>
                <span>{t('DownloadQr.contribution', 'See how it works')}</span>
                <ArrowRightIcon className='ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1' />
              </AnimatedShinyText>
            </div>

            {/* Phone Signup */}
            <div className='mt-8 w-full max-w-sm'>
              <div className='flex flex-col gap-2 sm:flex-row'>
                <Input
                  type='tel' // Use type="tel" for phone numbers
                  placeholder={t(
                    'DownloadQr.placeholder',
                    'Enter phone number'
                  )}
                  className={cn(
                    'flex-1 text-base',
                    phoneError && 'border-red-500 focus:ring-red-500'
                  )}
                  value={phoneInput}
                  maxLength={10}
                  onChange={handlePhoneChange}
                  inputMode='numeric'
                  pattern='[0-9]*'
                />
                <Button
                  onClick={handleSignup}
                  className='w-full bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 sm:w-auto'
                  disabled={!isPhoneValid(phoneInput)}
                >
                  {t('DownloadQr.button', 'Sign Up')}
                </Button>
              </div>
              {phoneError && (
                <p className='mt-2 text-xs text-red-500'>{phoneError}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DownloadSection
