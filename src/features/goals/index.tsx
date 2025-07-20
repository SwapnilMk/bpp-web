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
    <Main >
      <AnimatePresence mode="wait">
        {!selectedGoal ? (
          <motion.div
            key="goals-grid"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
              exit: { opacity: 0, y: -20 },
            }}
            transition={{ duration: 0.3 }}
            className="w-full px-4 sm:px-6 lg:px-4"
          >
            {/* Header Section */}
            <div className="mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
                Our Core Objectives
              </h1>
              <p className="mt-2 sm:mt-3 text-base sm:text-lg text-muted-foreground">
                A blueprint for a stronger, more inclusive future.
              </p>
            </div>
            <Separator className="mb-6 sm:mb-8" />
            
            {/* Goals Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6">
              {goals.map((goal, index) => (
                <motion.div
                  key={goal.number}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ 
                    y: -5, 
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="h-full"
                >
                  <Card
                    className="flex h-full cursor-pointer flex-col overflow-hidden rounded-xl border-border bg-card shadow-sm transition-all duration-300 hover:shadow-lg hover:border-border/50 dark:hover:border-border/70 active:scale-[0.98]"
                    onClick={() => handleGoalClick(goal)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        handleGoalClick(goal)
                      }
                    }}
                  >
                    <CardContent className="flex flex-1 flex-col p-4 sm:p-6">
                      <div className="mb-3 sm:mb-4 flex items-start gap-3 sm:gap-4">
                        <div 
                          className="flex-shrink-0 p-2 rounded-lg"
                          style={{ 
                            backgroundColor: goal.bgColor.replace('bg-[', '').replace(']', ''),
                            color: 'white'
                          }}
                        >
                          <goal.icon
                            size={24}
                            className="sm:w-8 sm:h-8"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h2 className="text-sm sm:text-base lg:text-lg font-semibold text-foreground leading-tight">
                            {goal.title}
                          </h2>
                        </div>
                      </div>
                      <p className="flex-1 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {goal.description}
                      </p>
                      <div className="mt-3 sm:mt-4 text-right">
                        <span 
                          className="text-xs font-medium uppercase tracking-wider px-2 py-1 rounded-md"
                          style={{ 
                            color: goal.bgColor.replace('bg-[', '').replace(']', ''),
                            backgroundColor: `${goal.bgColor.replace('bg-[', '').replace(']', '')}20`
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
            key="goal-detail"
            variants={detailVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="min-h-screen bg-background w-full"
          >
            <div className="w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
              {/* Header and Controls */}
              <div className="sticky top-0 z-10 flex items-center justify-between bg-background/95 backdrop-blur-sm py-4 border-b border-border">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleBackClick}
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-foreground hover:bg-accent hover:text-accent-foreground"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span className="hidden sm:inline">Back to Goals</span>
                  <span className="sm:hidden">Back</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleBackClick}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-foreground hover:bg-accent hover:text-accent-foreground"
                >
                  <X className="h-4 w-4" />
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
                className="mt-6 sm:mt-8"
              >
                {/* Goal Header */}
                <div className="mb-6 sm:mb-8 text-center">
                  <div 
                    className="inline-flex items-center justify-center p-4 rounded-full mb-4"
                    style={{ 
                      backgroundColor: selectedGoal.bgColor.replace('bg-[', '').replace(']', ''),
                      color: 'white'
                    }}
                  >
                    <selectedGoal.icon
                      size={48}
                      className="sm:w-12 sm:h-12"
                    />
                  </div>
                  <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-extrabold tracking-tight text-foreground leading-tight">
                    {selectedGoal.title}
                  </h1>
                </div>
                
                <Separator className="mb-6 sm:mb-8" />
                
                {/* Goal Content */}
                <article
                  className="prose prose-sm sm:prose-base lg:prose-lg max-w-none text-foreground dark:prose-invert prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-ul:text-muted-foreground prose-li:text-muted-foreground prose-h3:text-foreground prose-h3:font-bold prose-h3:mb-4 prose-h3:text-xl sm:prose-h3:text-2xl lg:prose-h3:text-3xl prose-p:leading-relaxed prose-ul:leading-relaxed prose-li:leading-relaxed"
                  style={{
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
                  } as React.CSSProperties}
                  dangerouslySetInnerHTML={{
                    __html: selectedGoal.content || '',
                  }}
                />

                {/* Back Button at End */}
                <div className="mt-12 sm:mt-16 flex justify-center">
                  <Button
                    onClick={handleBackClick}
                    className="flex items-center gap-2 px-6 py-3 text-base font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                  >
                    <ArrowLeft className="h-5 w-5" />
                    <span className="hidden sm:inline">Back to All Goals</span>
                    <span className="sm:hidden">Back to Goals</span>
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
