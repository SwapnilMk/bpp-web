import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { ArrowRightIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { FaAndroid } from 'react-icons/fa'
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

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '') // Only digits
    setPhoneInput(value)
    if (value.length === 0) {
      setPhoneError('')
    } else if (!/^\d{10}$/.test(value)) {
      setPhoneError('Please enter a valid 10-digit phone number')
    } else {
      setPhoneError('')
    }
  }

  const handleSignup = () => {
    if (/^\d{10}$/.test(phoneInput)) {
      navigate({ to: '/sign-up', search: { phone: phoneInput } })
    } else {
      setPhoneError('Please enter a valid 10-digit phone number')
    }
  }

  return (
    <section className='w-full bg-background py-8 transition-colors dark:bg-gray-900 md:py-16'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-20'>
          {/* Left Column - Image Section */}
          <div className='flex flex-1 flex-col items-center lg:items-start'>
            <div
              className='mx-auto overflow-hidden rounded-3xl dark:border-gray-700'
              style={{
                height: '450px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
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
              className='mx-auto mt-4 w-full max-w-xs sm:max-w-sm md:max-w-md'
              onValueChange={(value) =>
                setDevice(value as 'mobile' | 'desktop')
              }
              value={device}
            >
              <TabsList className='grid w-full grid-cols-2 rounded-xl bg-muted'>
                <TabsTrigger value='mobile' className='rounded-xl'>
                  {t('DownloadQr.section1')}
                </TabsTrigger>
                <TabsTrigger value='desktop' className='rounded-xl'>
                  {t('DownloadQr.section2')}
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Right Column - Download Section */}
          <div className='flex flex-1 flex-col items-center space-y-6 lg:items-start'>
            <div className='w-full space-y-4'>
              <div className='space-y-2'>
                <h1 className='flex flex-wrap items-center gap-2 text-3xl font-bold tracking-tight text-blue-600 dark:text-white sm:text-4xl md:text-5xl'>
                  <NumberTicker
                    initialValue={103786}
                    incrementOptions={[2, 3, 4]}
                    delay={3}
                    className='text-blue-600 dark:text-white'
                  />
                  {t('DownloadQr.header')}
                </h1>
                <h2 className='text-xl font-bold tracking-tight text-gray-900 dark:text-gray-300 sm:text-2xl md:text-3xl'>
                  {t('DownloadQr.subheader')}
                </h2>
              </div>
            </div>

            <h1 className='text-lg font-bold text-gray-900 dark:text-white sm:text-xl md:text-2xl'>
              {t('DownloadQr.heading')}
            </h1>

            {/* QR Code and Download Buttons */}
            <div className='flex w-full flex-col items-center gap-6 md:flex-row'>
              <div className='flex h-32 w-32 items-center justify-center rounded-lg border border-gray-200 bg-white p-2 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:h-40 md:w-40'>
                <img
                  src={appQr}
                  alt='App QR Code'
                  className='max-h-full max-w-full'
                />
              </div>
              <div className='w-full flex-1 space-y-2 text-center md:text-left'>
                <p className='text-sm font-bold text-gray-600 dark:text-gray-400'>
                  {t('DownloadQr.scanTxt')}
                </p>
                <div className='flex w-full flex-col justify-center gap-2 sm:flex-row md:justify-start'>
                  <Button
                    onClick={() =>
                      (window.location.href =
                        'https://bppdatabase.s3.ap-south-1.amazonaws.com/app/BPP.apk')
                    }
                    className='flex w-full items-center justify-center gap-3 rounded-lg bg-[#2196f3] px-4 py-3 text-white hover:bg-[#1e40af] sm:w-auto'
                  >
                    <FaAndroid className='h-6 w-6 text-white' />
                    <span className='text-left text-base font-semibold'>
                      {t('DownloadQr.buttonTxt')}
                    </span>
                  </Button>
                  <Button
                    className='flex w-full items-center justify-center gap-3 rounded-lg bg-[#2196f3] px-4 py-3 text-white hover:bg-[#1e40af] sm:w-auto'
                    onClick={() => navigate({ to: '/download-app' })}
                  >
                    <ArrowRightIcon className='h-6 w-6 text-white' />
                  </Button>
                </div>
              </div>
            </div>

            {/* How it works Button */}
            <div
              className={cn(
                'group mb-2 mt-2 inline-block max-w-sm rounded-full border border-black/5 bg-neutral-100 text-base font-bold text-black transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800'
              )}
              onClick={() =>
                navigate({ to: '/community-contribution/how-it-works' })
              }
            >
              <AnimatedShinyText className='inline-flex items-center justify-center px-4 py-2 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400'>
                <span className='text-sm font-bold'>
                  {t('DownloadQr.contribution')}
                </span>
                <ArrowRightIcon className='ml-1 h-5 w-5 transition-transform duration-300 ease-in-out group-hover:translate-x-1' />
              </AnimatedShinyText>
            </div>

            {/* Signup Input with phone validation */}
            <div className='w-full max-w-md'>
              <div className='flex flex-col gap-2 sm:flex-row'>
                <Input
                  type='text'
                  placeholder={t('DownloadQr.placeholder')}
                  className={
                    phoneError
                      ? 'min-w-0 flex-1 border-red-500 focus:ring-red-500'
                      : 'min-w-0 flex-1'
                  }
                  value={phoneInput}
                  maxLength={10}
                  onChange={handlePhoneChange}
                  inputMode='numeric'
                  pattern='[0-9]*'
                />
                <Button
                  onClick={handleSignup}
                  className='w-full rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-900 sm:w-auto'
                  disabled={!/^\d{10}$/.test(phoneInput)}
                >
                  {t('DownloadQr.button')}
                </Button>
              </div>
              {phoneError && (
                <p className='mt-1 text-xs text-red-500'>{phoneError}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DownloadSection
