import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Header } from '@/components/layout/dashboard/header'
import { Main } from '@/components/layout/dashboard/main'
import { NotificationHeaderMenu } from '@/components/layout/dashboard/notification'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { goals } from './data/goals'

const GoalsPage = () => {
  const [selectedGoal, setSelectedGoal] = useState<(typeof goals)[0] | null>(
    null
  )

  const handleGoalClick = (goal: (typeof goals)[0]) => {
    setSelectedGoal(goal)
  }

  const handleBackClick = () => {
    setSelectedGoal(null)
  }

  return (
    <>
      <Header fixed>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <NotificationHeaderMenu />
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>
      <Main>
        <AnimatePresence mode='wait'>
          {!selectedGoal ? (
            <motion.div
              key='goals-grid'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className='space-y-6'
            >
              <h1 className='text-3xl font-bold tracking-tight'>Our Goals</h1>
              <Separator />
              <div className='mt-8 grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                {goals.map((goal, index) => (
                  <motion.div
                    key={goal.number}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className='h-64'
                  >
                    <Card
                      className={`${goal.bgColor} flex h-full cursor-pointer flex-col overflow-hidden text-white transition-all duration-200`}
                      onClick={() => handleGoalClick(goal)}
                      role='button'
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          handleGoalClick(goal)
                        }
                      }}
                    >
                      <CardContent className='flex h-full flex-col p-0'>
                        {/* Header with Goal Number */}
                        <div className='flex items-center justify-between border-b border-white/20 p-3'>
                          <span className='text-lg font-bold sm:text-xl'>
                            {goal.number}
                          </span>
                        </div>

                        {/* Main Content */}
                        <div className='flex flex-1 flex-col items-center justify-center p-4 text-center'>
                          {/* Icon */}
                          <div className='mb-4 flex items-center justify-center'>
                            <goal.icon
                              size={48}
                              color={goal.iconColor}
                              className='sm:h-12 sm:w-12'
                            />
                          </div>

                          {/* Title */}
                          <h3 className='mb-2 line-clamp-2 text-sm font-bold leading-tight sm:text-base'>
                            {goal.title}
                          </h3>

                          {/* Description */}
                          <p className='line-clamp-3 text-xs opacity-90 sm:text-sm'>
                            {goal.description}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key='goal-detail'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`min-h-screen ${selectedGoal.bgColor} text-white`}
            >
              <div className='relative h-full'>
                {/* Back Button */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className='absolute left-6 top-6 z-10'
                >
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={handleBackClick}
                    className='bg-white/20 text-white backdrop-blur-sm hover:bg-white/30'
                  >
                    <ArrowLeft className='mr-2 h-4 w-4' />
                    Back to Goals
                  </Button>
                </motion.div>

                {/* Close Button */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className='absolute right-6 top-6 z-10'
                >
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={handleBackClick}
                    className='bg-white/20 text-white backdrop-blur-sm hover:bg-white/30'
                  >
                    <X className='h-4 w-4' />
                  </Button>
                </motion.div>

                {/* Goal Content */}
                <div className='flex min-h-screen flex-col items-center justify-center p-8'>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className='mx-auto max-w-5xl text-justify'
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className='prose prose-invert max-w-none'
                      dangerouslySetInnerHTML={{
                        __html: selectedGoal.content || '',
                      }}
                    />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Main>
    </>
  )
}

export default GoalsPage
