'use client'

import { useState, useEffect } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { Eclipse, X } from 'lucide-react'
import { Banner } from '@/components/ui/banner'
import { Button } from '@/components/ui/button'

function HeaderBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const closed = localStorage.getItem('bpp-header-banner-closed')
    setIsVisible(!closed)
  }, [])

  if (!isVisible) return null

  return (
    <Banner
      variant='muted'
      className='dark px-2 py-2 text-foreground md:px-0 md:py-2'
    >
      <div className='flex w-full items-center gap-2'>
        <div className='flex flex-1 justify-center'>
          <div className='flex items-center gap-2'>
            <Eclipse
              className='shrink-0 opacity-60'
              size={16}
              strokeWidth={2}
              aria-hidden='true'
            />
            <span className='whitespace-nowrap text-sm'>
              Join Bharatiya Popular Party.
            </span>
            <Button
              size='sm'
              className='ml-2 whitespace-nowrap rounded-full px-3 py-1 text-xs'
              onClick={() => navigate({ to: '/sign-up' })}
            >
              Join Now
            </Button>
          </div>
        </div>
        <Button
          variant='ghost'
          size='icon'
          className='group size-8 shrink-0 p-0 hover:bg-transparent'
          onClick={() => {
            setIsVisible(false)
            localStorage.setItem('bpp-header-banner-closed', 'true')
          }}
          aria-label='Close banner'
        >
          <X
            size={16}
            strokeWidth={2}
            className='opacity-60 transition-opacity group-hover:opacity-100'
            aria-hidden='true'
          />
        </Button>
      </div>
    </Banner>
  )
}

export { HeaderBanner }
