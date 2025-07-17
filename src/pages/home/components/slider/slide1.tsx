import { useNavigate } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import WelcomeBanner from '@/assets/images/backgrounds/sliders/WELCOME TO BPP.png'

export function Slide1() {
  const navigate = useNavigate()
  const { t } = useTranslation('homePage')
  return (
    <div className='relative h-[70vh] w-full sm:h-[80vh]'>
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        className='absolute inset-0 h-full w-full bg-cover bg-center bg-no-repeat'
        style={{
          backgroundImage: `url(${WelcomeBanner})`,
        }}
      >
        <div className='absolute inset-0 bg-black/40'></div>
      </motion.div>

      <div className='relative flex h-full flex-col justify-center px-8 md:px-16 lg:px-24'>
        <motion.h1
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className='text-3xl font-bold text-white md:text-3xl lg:text-6xl'
        >
          {t('Slider.Welcome.tittle')}
        </motion.h1>
        <motion.h1
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className='mb-4 text-3xl font-bold text-white md:text-3xl lg:text-6xl'
        >
          {t('Slider.Welcome.subTittle')}
        </motion.h1>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className='flex flex-col justify-between align-middle'
        >
          <div className='mb-4'>
            <h3 className='text-3xl font-semibold text-white md:text-3xl lg:text-4xl'>
              {t('Slider.Welcome.description')}
            </h3>
            <h3 className='text-3xl font-semibold text-white md:text-3xl lg:text-4xl'>
              {t('Slider.Welcome.description2')}
            </h3>
          </div>

          <div>
            <button
              className='rounded-full bg-[#2196f3] px-4 py-2 text-white hover:bg-[#1e40af]'
              onClick={() => navigate({ to: '/sign-up' })}
            >
              {t('Slider.Welcome.button')}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
