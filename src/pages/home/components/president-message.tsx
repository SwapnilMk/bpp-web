import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import sirPhoto from '@/assets/images/sirPhoto.png'

const PresidentMessage = () => {
  const { t } = useTranslation('homePage')

  return (
    <div className='relative mx-auto mt-3 w-full max-w-7xl px-4 font-poppins'>
      <div className='rounded-3xl border border-border bg-card/80 p-6 shadow-md backdrop-blur-xl md:p-12'>
        {/* Quote icon */}
        <motion.div
          className='absolute right-8 top-8 z-0 opacity-20'
          animate={{ rotate: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <Quote className='h-16 w-16 text-primary' />
        </motion.div>
        <h2 className='mb-8 w-full text-left text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl'>
          {t('PresidentMessage.heading')}
        </h2>
        <div className='relative flex w-full flex-col items-center gap-8 md:flex-row'>
          {/* President Photo & Info */}
          <div className='relative z-10 flex-shrink-0 text-center md:text-left'>
            <motion.div
              className='relative mb-6'
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className='relative mx-auto h-32 w-32 overflow-hidden rounded-full border-4 border-primary/20 md:mx-0'>
                <img
                  src={sirPhoto}
                  alt={t('PresidentMessage.presidentName') as string}
                  className='h-full w-full object-cover'
                />
                {/* Floating ring animation */}
                <motion.div
                  className='absolute inset-0 rounded-full border-2 border-primary/30'
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            </motion.div>
            <h3 className='mb-2 text-2xl font-bold text-primary'>
              {t('PresidentMessage.presidentName')}
            </h3>
            <p className='text-md mb-2 font-semibold text-[#e85a32]'>
              {t('PresidentMessage.designation')}
            </p>
            {/* Star Rating (static 5 stars for style) */}
            <div className='mb-4 flex justify-center gap-1 md:justify-start'>
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1, duration: 0.3 }}
                ></motion.div>
              ))}
            </div>
          </div>

          {/* Message Content */}
          <div className='relative z-10 flex flex-1 flex-col justify-center'>
            <motion.blockquote
              className='sm:text-md mb-8 text-sm font-light italic leading-relaxed text-foreground md:text-lg'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <p className='mb-3'>{t('PresidentMessage.description')}</p>
              <p className='mb-3'>{t('PresidentMessage.description2')}</p>
              <p className='mb-3'>{t('PresidentMessage.description3')}</p>
              <p className='mb-3'>{t('PresidentMessage.description4')}</p>
            </motion.blockquote>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PresidentMessage
