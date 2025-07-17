import { useNavigate } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import GoodHealth from '@/assets/images/backgrounds/sliders/GOOD HEALTH AND WELL-BEING.jpeg'

export function Slide5() {
  const navigate = useNavigate()
  const { t } = useTranslation('homePage')

  return (
    <div className='relative h-[80vh] w-full'>
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        className='absolute inset-0 h-full w-full bg-cover bg-center bg-no-repeat'
        style={{
          backgroundImage: `url(${GoodHealth})`,
        }}
      >
        <div className='absolute inset-0 bg-black/40'></div>
      </motion.div>

      <div className='relative mx-auto flex h-full max-w-5xl flex-col justify-center px-8 md:px-16 lg:px-24'>
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className='mb-3 flex items-center gap-4'
        >
          <Heart className='text-white' size={30} />
          <h2 className='text-3xl font-bold text-white'>
            {t('Slider.Goal3.tittle')}
          </h2>
        </motion.div>

        <motion.h1
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className='mb-6 text-3xl font-bold text-white md:text-4xl lg:text-5xl'
        >
          {t('Slider.Goal3.subTittle')}
        </motion.h1>

        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className='text-md mb-4 text-white'
        >
          {t('Slider.Goal3.description')}
          <div className='mt-4'>
            <button
              className='rounded-full bg-[#2196f3] px-4 py-2 text-white hover:bg-[#1e40af]'
              onClick={() => navigate({ to: '/about/bpp-goals' })}
            >
              {t('Slider.Goal3.button')}
            </button>
          </div>
        </motion.p>
      </div>
    </div>
  )
}
