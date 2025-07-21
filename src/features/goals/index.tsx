import { memo, useState } from 'react'
import { motion, AnimatePresence, easeInOut } from 'framer-motion'
import { ArrowLeft, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Main } from '@/components/layout/dashboard/main'
import { goals } from './data/goals'

const GoalsPage = memo(() => {
  const [selectedGoal, setSelectedGoal] = useState<(typeof goals)[0] | null>(
    null
  )

  const handleGoalClick = (goal: (typeof goals)[0]) => {
    setSelectedGoal(goal)
  }

  const handleBackClick = () => {
    setSelectedGoal(null)
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
      },
    }),
  }

  const detailVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: easeInOut,
      },
    },
    exit: { opacity: 0 },
  }

  return (
    <Main>
      <AnimatePresence mode='wait'>
        {!selectedGoal ? (
          <motion.div
            key='goals-grid'
            initial='hidden'
            animate='visible'
            exit='exit'
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
              exit: { opacity: 0, y: -20 },
            }}
            transition={{ duration: 0.3 }}
            className='w-full px-4 sm:px-6 lg:px-4'
          >
            {/* Header Section */}
            <div className='mb-6 sm:mb-8'>
              <h1 className='text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl'>
                Our Goals
              </h1>
            </div>
            <Separator className='mb-4 sm:mb-5' />

            {/* Goals Grid */}
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
              {goals.map((goal, index) => (
                <motion.div
                  key={goal.number}
                  custom={index}
                  variants={cardVariants}
                  initial='hidden'
                  animate='visible'
                  whileHover={{
                    y: -5,
                    boxShadow:
                      '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{ scale: 0.98 }}
                  className='h-full'
                >
                  <Card
                    className='flex h-full cursor-pointer flex-col overflow-hidden rounded-xl border-border bg-card shadow-sm transition-all duration-300 hover:border-border/50 hover:shadow-lg active:scale-[0.98] dark:hover:border-border/70'
                    onClick={() => handleGoalClick(goal)}
                    role='button'
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        handleGoalClick(goal)
                      }
                    }}
                  >
                    <CardContent className='flex flex-1 flex-col p-4 sm:p-6'>
                      <div className='mb-3 flex items-start gap-3 sm:mb-4 sm:gap-4'>
                        <div
                          className='flex-shrink-0 rounded-lg p-2'
                          style={{
                            backgroundColor: goal.bgColor
                              .replace('bg-[', '')
                              .replace(']', ''),
                            color: 'white',
                          }}
                        >
                          <goal.icon size={24} className='sm:h-8 sm:w-8' />
                        </div>
                        <div className='min-w-0 flex-1'>
                          <h2 className='text-sm font-semibold leading-tight text-foreground sm:text-base lg:text-lg'>
                            {goal.title}
                          </h2>
                        </div>
                      </div>
                      <p className='flex-1 text-xs leading-relaxed text-muted-foreground sm:text-sm'>
                        {goal.description}
                      </p>
                      <div className='mt-3 text-right sm:mt-4'>
                        <span
                          className='rounded-md px-2 py-1 text-xs font-medium uppercase tracking-wider'
                          style={{
                            color: goal.bgColor
                              .replace('bg-[', '')
                              .replace(']', ''),
                            backgroundColor: `${goal.bgColor.replace('bg-[', '').replace(']', '')}20`,
                          }}
                        >
                          {goal.number}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          // Detail View for a selected goal
          <motion.div
            key='goal-detail'
            variants={detailVariants}
            initial='hidden'
            animate='visible'
            exit='exit'
            className='min-h-screen w-full bg-background'
          >
            <div className='w-full px-4 py-4 sm:px-6 sm:py-6 lg:px-8'>
              {/* Header and Controls */}
              <div className='sticky top-0 z-10 flex items-center justify-between border-b border-border bg-background/95 py-4 backdrop-blur-sm'>
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={handleBackClick}
                  className='flex items-center gap-2 rounded-md px-3 py-2 text-foreground hover:bg-accent hover:text-accent-foreground'
                >
                  <ArrowLeft className='h-4 w-4' />
                  <span className='hidden sm:inline'>Back to Goals</span>
                  <span className='sm:hidden'>Back</span>
                </Button>
                <Button
                  variant='ghost'
                  size='icon'
                  onClick={handleBackClick}
                  className='flex h-8 w-8 items-center justify-center rounded-full text-foreground hover:bg-accent hover:text-accent-foreground'
                >
                  <X className='h-4 w-4' />
                </Button>
              </div>

              {/* Goal Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { delay: 0.2, duration: 0.5 },
                }}
                className='mt-6 sm:mt-8'
              >
                {/* Goal Header */}
                <div className='mb-6 text-center sm:mb-8'>
                  <div
                    className='mb-4 inline-flex items-center justify-center rounded-full p-4'
                    style={{
                      backgroundColor: selectedGoal.bgColor
                        .replace('bg-[', '')
                        .replace(']', ''),
                      color: 'white',
                    }}
                  >
                    <selectedGoal.icon size={48} className='sm:h-12 sm:w-12' />
                  </div>
                  <h1 className='text-xl font-extrabold leading-tight tracking-tight text-foreground sm:text-2xl lg:text-3xl xl:text-4xl'>
                    {selectedGoal.title}
                  </h1>
                </div>

                <Separator className='mb-6 sm:mb-8' />

                {/* Goal Content */}
                <article
                  className='prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-ul:text-muted-foreground prose-li:text-muted-foreground prose-h3:text-foreground prose-h3:font-bold prose-h3:mb-4 prose-h3:text-xl sm:prose-h3:text-2xl lg:prose-h3:text-3xl prose-p:leading-relaxed prose-ul:leading-relaxed prose-li:leading-relaxed max-w-none text-foreground'
                  style={
                    {
                      '--tw-prose-body': 'hsl(var(--muted-foreground))',
                      '--tw-prose-headings': 'hsl(var(--foreground))',
                      '--tw-prose-links': 'hsl(var(--primary))',
                      '--tw-prose-bold': 'hsl(var(--foreground))',
                      '--tw-prose-counters': 'hsl(var(--muted-foreground))',
                      '--tw-prose-bullets': 'hsl(var(--muted-foreground))',
                      '--tw-prose-hr': 'hsl(var(--border))',
                      '--tw-prose-quotes': 'hsl(var(--foreground))',
                      '--tw-prose-quote-borders': 'hsl(var(--border))',
                      '--tw-prose-captions': 'hsl(var(--muted-foreground))',
                      '--tw-prose-code': 'hsl(var(--foreground))',
                      '--tw-prose-pre-code': 'hsl(var(--muted-foreground))',
                      '--tw-prose-pre-bg': 'hsl(var(--muted))',
                      '--tw-prose-th-borders': 'hsl(var(--border))',
                      '--tw-prose-td-borders': 'hsl(var(--border))',
                    } as React.CSSProperties
                  }
                  dangerouslySetInnerHTML={{
                    __html: selectedGoal.content || '',
                  }}
                />

                {/* Back Button at End */}
                <div className='mt-12 flex justify-center sm:mt-16'>
                  <Button
                    onClick={handleBackClick}
                    className='flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/90'
                  >
                    <ArrowLeft className='h-5 w-5' />
                    <span className='hidden sm:inline'>Back to All Goals</span>
                    <span className='sm:hidden'>Back to Goals</span>
                  </Button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Main>
  )
})

export default GoalsPage
