import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { Download } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import appQr from '@/assets/appQR.svg'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

const QRToggle = () => {
  const [isHovered, setIsHovered] = useState(false)
  const navigate = useNavigate()
  const { t } = useTranslation('header')
  return (
    <div
      className='relative inline-block'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Button variant='ghost' className='p-2'>
        <Download size={18} />
      </Button>

      {isHovered && (
        <Card className='absolute left-1/2 top-full z-50 mt-2 -translate-x-1/2 transform bg-white p-4 shadow-lg transition-all duration-200 ease-in-out dark:bg-gray-800'>
          <div className='flex flex-col items-center gap-3'>
            <img src={appQr} alt='QR Code' className='h-40 w-40' />
            <p className='text-center text-sm text-gray-600 dark:text-gray-300'>
              {t('Download.label')}
            </p>
            <Button
              variant='outline'
              className='w-full'
              onClick={() => navigate({ to: '/download-app' })}
            >
              {t('Download.button')}
            </Button>
          </div>
        </Card>
      )}
    </div>
  )
}

export default QRToggle
