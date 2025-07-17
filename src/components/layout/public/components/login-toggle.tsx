import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function LoginToggle() {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <DropdownMenu modal={false} onOpenChange={(open) => setIsOpen(open)}>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          className='ghost flex w-auto items-center gap-2 p-3'
        >
          <span className='font-medium'>Login</span>
          {isOpen ? (
            <ChevronUp className='h-4 w-4' />
          ) : (
            <ChevronDown className='h-4 w-4' />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem onClick={() => navigate({ to: '/sign-in' })}>
          Member Login
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate({ to: '/sign-up' })}>
          Join BPP
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate({ to: '/sign-in' })}>
          Business Community Login
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate({ to: '/business-sign-up' })}>
          Business Community Join
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
