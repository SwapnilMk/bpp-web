import { useNavigate } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

export function Slide2() {
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
          backgroundImage: `url('https://img.freepik.com/premium-vector/flat-vector-illustration-people-with-different-skin-colors-raising-their-hands-seamless-border_91515-528.jpg?w=900')`,
        }}
      >
        <div className='absolute inset-0 bg-black/40'></div>
      </motion.div>

      <div className='relative flex h-full flex-col items-center justify-center px-8 text-center md:px-16 lg:px-24'>
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className='mb-4 text-4xl font-bold text-white md:text-4xl lg:text-6xl'
        >
          {t('Slider.Contribution.tittle')}
        </motion.h1>

        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className='mb-12 max-w-3xl text-sm text-white md:text-lg lg:text-lg'
        >
          {t('Slider.Contribution.description')}
        </motion.p>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className='flex items-center justify-center gap-6'
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='rounded-full bg-[#2196f3] px-4 py-2 text-white hover:bg-[#1e40af]'
            onClick={() => navigate({ to: '/sign-up' })}
          >
            {t('Slider.Contribution.button')}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='rounded-full bg-[#2196f3] px-4 py-2 text-white hover:bg-[#1e40af]'
            onClick={() =>
              navigate({ to: '/community-contribution/introduction' })
            }
          >
            {t('Slider.Contribution.button2')}
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}
