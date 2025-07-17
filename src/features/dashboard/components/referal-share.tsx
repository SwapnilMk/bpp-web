'use client'

import { useId, useRef, useState } from 'react'
import {
  Check,
  Copy,
  Twitter,
  Facebook,
  Mail,
  Instagram,
  Share2,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface ReferralShareProps {
  referralLink?: string
}

function ReferralShare({ referralLink }: ReferralShareProps) {
  const id = useId()
  const [copied, setCopied] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleCopy = () => {
    if (inputRef.current) {
      navigator.clipboard.writeText(inputRef.current.value)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }

  const handleShare = (platform: string) => {
    if (!referralLink) return

    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent('Check out my referral link!')}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(`Check out my referral link: ${referralLink}`)}`,
      instagram: `https://instagram.com/share?url=${encodeURIComponent(referralLink)}`,
      email: `mailto:?subject=Check out my referral link&body=${encodeURIComponent(`Check out my referral link: ${referralLink}`)}`,
    }

    const url = shareUrls[platform as keyof typeof shareUrls]
    if (url) {
      window.open(url, '_blank', 'width=600,height=400')
    }
  }

  return (
    <div className='flex flex-col gap-4'>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant='outline'>
            <Share2 className='mr-2 h-4 w-4' />
            Share
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-72'>
          <div className='flex flex-col gap-3 text-center'>
            <div className='text-sm font-medium'>Share code</div>
            <div className='flex flex-wrap justify-center gap-2'>
              <Button
                size='icon'
                variant='outline'
                aria-label='Share on Twitter'
                onClick={() => handleShare('twitter')}
              >
                <Twitter size={16} strokeWidth={2} aria-hidden='true' />
              </Button>
              <Button
                size='icon'
                variant='outline'
                aria-label='Share on Facebook'
                onClick={() => handleShare('facebook')}
              >
                <Facebook size={16} strokeWidth={2} aria-hidden='true' />
              </Button>
              <Button
                size='icon'
                variant='outline'
                aria-label='Share on WhatsApp'
                onClick={() => handleShare('whatsapp')}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='16'
                  height='16'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path d='M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z' />
                </svg>
              </Button>
              <Button
                size='icon'
                variant='outline'
                aria-label='Share on Instagram'
                onClick={() => handleShare('instagram')}
              >
                <Instagram size={16} strokeWidth={2} aria-hidden='true' />
              </Button>
              <Button
                size='icon'
                variant='outline'
                aria-label='Share via email'
                onClick={() => handleShare('email')}
              >
                <Mail size={16} strokeWidth={2} aria-hidden='true' />
              </Button>
            </div>
            <div className='space-y-2'>
              <div className='relative'>
                <Input
                  ref={inputRef}
                  id={id}
                  className='pe-9'
                  type='text'
                  defaultValue={referralLink}
                  aria-label='Share link'
                  readOnly
                />
                <TooltipProvider delayDuration={0}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={handleCopy}
                        className='absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg border border-transparent text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed'
                        aria-label={copied ? 'Copied' : 'Copy to clipboard'}
                        disabled={copied}
                      >
                        <div
                          className={cn(
                            'transition-all',
                            copied
                              ? 'scale-100 opacity-100'
                              : 'scale-0 opacity-0'
                          )}
                        >
                          <Check
                            className='stroke-emerald-500'
                            size={16}
                            strokeWidth={2}
                            aria-hidden='true'
                          />
                        </div>
                        <div
                          className={cn(
                            'absolute transition-all',
                            copied
                              ? 'scale-0 opacity-0'
                              : 'scale-100 opacity-100'
                          )}
                        >
                          <Copy size={16} strokeWidth={2} aria-hidden='true' />
                        </div>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent className='px-2 py-1 text-xs'>
                      Copy to clipboard
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export { ReferralShare }
