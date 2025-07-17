'use client'

import * as React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

type DetailData = {
  title: string
  slogan?: string
  coreMessage?: string
  excerpt?: string
  images: {
    thumbnail: string
    alt: string
  }[]
  action?: {
    slug: string
    label?: string
  }
}

const DEFAULT_PRODUCT: DetailData = {
  title: 'SHSF Work',
  slogan:
    'Enterprise-grade workspace platform with AI-powered productivity tools, collaborative environments, and customizable workflow templates.',
  coreMessage:
    'Designed for modern teams seeking seamless communication and project management.',
  action: {
    slug: 'shsf-work',
    label: 'Explore workspace',
  },
  images: [
    {
      thumbnail:
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=640&h=360&auto=format&fit=crop',
      alt: 'SHSF Work dashboard showing project analytics and team performance metrics',
    },
    {
      thumbnail:
        'https://images.unsplash.com/photo-1581287053822-fd7bf4f4bfec?q=80&w=640&h=360&auto=format&fit=crop',
      alt: 'SHSF Work collaboration hub with real-time document editing',
    },
    {
      thumbnail:
        'https://images.unsplash.com/photo-1572177191856-3cde618dee1f?q=80&w=640&h=360&auto=format&fit=crop',
      alt: 'SHSF Work mobile experience with synchronized notifications',
    },
    {
      thumbnail:
        'https://images.unsplash.com/photo-1553484771-898ed465e931?q=80&w=640&h=360&auto=format&fit=crop',
      alt: 'SHSF Work workflow automation builder interface',
    },
    {
      thumbnail:
        'https://images.unsplash.com/photo-1542744173-05336fcc7ad4?q=80&w=640&h=360&auto=format&fit=crop',
      alt: 'SHSF Work custom workspace configuration with module marketplace',
    },
  ],
}

type DetailSwapCardProps = React.HTMLAttributes<HTMLDivElement> & {
  data?: DetailData
  onImageChange?: (index: number) => void
  showImageCounter?: boolean
  showDotIndicator?: boolean
  showThumbnailNavigator?: boolean
}

const DetailSwapCard = React.forwardRef<HTMLDivElement, DetailSwapCardProps>(
  (props, ref) => {
    const {
      data = DEFAULT_PRODUCT,
      className,
      onImageChange,
      showImageCounter = true,
      showDotIndicator = true,
      showThumbnailNavigator = true,
      ...restProps
    } = props

    const [activeIndex, setActiveIndex] = React.useState(0)
    const [isTransitioning, setIsTransitioning] = React.useState(false)
    const images = data.images
    const totalImages = images.length

    const handleImageChange = (index: number) => {
      if (isTransitioning || index === activeIndex) return

      setIsTransitioning(true)
      setActiveIndex(index)

      if (onImageChange) {
        onImageChange(index)
      }

      setTimeout(() => {
        setIsTransitioning(false)
      }, 500)
    }

    const handleNext = () => {
      if (isTransitioning) return
      const nextIndex = (activeIndex + 1) % totalImages
      handleImageChange(nextIndex)
    }

    const handlePrevious = () => {
      if (isTransitioning) return
      const prevIndex = (activeIndex - 1 + totalImages) % totalImages
      handleImageChange(prevIndex)
    }

    return (
      <div
        ref={ref}
        className={cn(
          'w-full max-w-96 space-y-2 rounded-lg border bg-white p-4',
          className
        )}
        {...restProps}
      >
        <div className='relative aspect-video w-full overflow-hidden rounded-xl'>
          <div className='relative h-full w-full overflow-hidden rounded-xl'>
            {images.map((image, index) => (
              <div
                key={image.thumbnail}
                className={cn(
                  'absolute inset-0 h-full w-full transition-all duration-500 ease-out',
                  activeIndex === index
                    ? 'z-10 transform-none opacity-100'
                    : 'z-0 scale-95 opacity-0'
                )}
                style={{
                  transform:
                    activeIndex === index
                      ? 'none'
                      : index < activeIndex
                        ? 'translateX(-100%)'
                        : 'translateX(100%)',
                }}
              >
                <img
                  src={image.thumbnail}
                  alt={image.alt || `Detail image ${index + 1}`}
                  className='h-full w-full object-cover transition-all duration-500'
                  style={{
                    objectPosition: index === 0 ? 'top' : 'center',
                  }}
                  loading='lazy'
                  draggable={false}
                />
              </div>
            ))}
          </div>

          {totalImages > 1 && (
            <>
              <Button
                variant='secondary'
                size='icon'
                className='absolute left-2 top-1/2 z-20 size-8 -translate-y-1/2 rounded-full bg-black/40 text-white shadow-md hover:bg-black/60'
                onClick={handlePrevious}
                disabled={isTransitioning}
              >
                <ChevronLeft size={16} />
                <span className='sr-only'>Previous image</span>
              </Button>

              <Button
                variant='secondary'
                size='icon'
                className='absolute right-2 top-1/2 z-20 size-8 -translate-y-1/2 rounded-full bg-black/40 text-white shadow-md hover:bg-black/60'
                onClick={handleNext}
                disabled={isTransitioning}
              >
                <ChevronRight size={16} />
                <span className='sr-only'>Next image</span>
              </Button>
            </>
          )}

          {totalImages > 1 && showDotIndicator && (
            <div className='absolute bottom-2 left-1/2 z-20 flex -translate-x-1/2 gap-1.5 rounded-full border border-white/20 bg-black/40 px-2 py-1 shadow-sm backdrop-blur-sm'>
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleImageChange(index)}
                  className={cn(
                    'h-2 w-2 cursor-pointer rounded-full transition-all duration-300',
                    activeIndex === index
                      ? 'scale-110 bg-white ring-1 ring-white/50'
                      : 'bg-white/60 hover:bg-white/80'
                  )}
                  aria-label={`View image ${index + 1} of ${totalImages}`}
                  disabled={isTransitioning}
                />
              ))}
            </div>
          )}

          {showImageCounter && (
            <div className='absolute right-2 top-2 z-20 rounded-full border border-white/20 bg-black/40 px-2 py-0.5 text-xs font-medium text-white backdrop-blur-sm'>
              {activeIndex + 1} / {totalImages}
            </div>
          )}
        </div>

        <div className='space-y-2'>
          <h2 className='line-clamp-1 font-medium text-gray-900'>
            {data.title}
          </h2>
          {data.slogan && (
            <div className='mb-2'>
              <div className='mb-1 text-base font-bold text-gray-900'>
                • Slogan
              </div>
              <blockquote className='border-l-2 border-blue-600 pl-4 text-[15px] italic text-gray-600'>
                “{data.slogan}”
              </blockquote>
            </div>
          )}
          {data.coreMessage && (
            <div className='mb-2'>
              <div className='mb-1 text-base font-bold text-gray-900'>
                • Core Message
              </div>
              <p className='whitespace-pre-line text-[15px] text-gray-700'>
                {data.coreMessage}
              </p>
            </div>
          )}
          {!data.slogan && !data.coreMessage && data.excerpt && (
            <div className='whitespace-pre-line text-sm text-gray-700'>
              {data.excerpt}
            </div>
          )}
        </div>

        {showThumbnailNavigator && images.length > 0 && (
          <ScrollArea className='w-full'>
            <div className='flex gap-2 px-1 pb-2.5 pt-2'>
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => handleImageChange(index)}
                  className={cn(
                    'w-18 relative aspect-video h-12 shrink-0 overflow-hidden rounded border transition-all duration-200',
                    activeIndex === index
                      ? 'ring-2 ring-primary ring-offset-1'
                      : 'opacity-70 hover:opacity-100'
                  )}
                  disabled={isTransitioning}
                >
                  <img
                    src={image.thumbnail}
                    alt={`Thumbnail ${index + 1}`}
                    className={cn(
                      'object-cover',
                      activeIndex !== index && 'grayscale'
                    )}
                    loading='lazy'
                  />
                </button>
              ))}
            </div>
            <ScrollBar orientation='horizontal' className='h-1.5' />
          </ScrollArea>
        )}
      </div>
    )
  }
)

DetailSwapCard.displayName = 'DetailSwapCard'

export { DetailSwapCard }
