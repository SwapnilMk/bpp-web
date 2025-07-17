import React from 'react'
import { Link, useLocation } from '@tanstack/react-router'
import { useMainMenuList } from '@/data/menu/main-menu'
import type { Group, Menu, Submenu } from '@/data/menu/main-menu'
import { ChevronDown, MenuIcon, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import bppLogo from '@/assets/logo/bppLogo.png'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
// Use TanStack Router
import { ThemeSwitch } from '@/components/theme-switch'
import { LanguageToggle } from './components/lang-toggle'
import QRToggle from './components/qr-toggle'

const ListItem = React.forwardRef<
  React.ElementRef<typeof Link>,
  React.ComponentPropsWithoutRef<typeof Link> & { description?: string }
>(({ className, title, children, description, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 text-sm leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <div className='text-xs font-medium leading-none'>{title}</div>
          <p className='line-clamp-2 text-xs leading-snug text-muted-foreground'>
            {description}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = 'ListItem'

const MainNav = () => {
  const { t } = useTranslation(['common', 'header'])
  const location = useLocation() // TanStack Router's useLocation
  const menuList = useMainMenuList(location.pathname)
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <header className='sticky top-0 z-40 w-full border-b bg-background'>
      <div className='mx-auto flex h-16 w-full max-w-7xl items-center justify-around sm:justify-between md:max-w-7xl'>
        {/* Logo */}
        <Link to='/' className='flex max-w-7xl items-center gap-1'>
          <img
            src={bppLogo}
            className='h-12 w-auto object-contain'
            alt='BPP Logo'
          />
          <span className='font-oswald text-xl font-bold sm:text-sm md:text-xl'>
            {t('PartyName.name')}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className='hidden lg:flex'>
          <NavigationMenuList className='gap-2'>
            {menuList.map((group: Group, groupIndex: number) =>
              group.menus.map((menu: Menu) => (
                <NavigationMenuItem key={`${groupIndex}-${menu.href}`}>
                  {menu.submenus?.length ? (
                    <>
                      <NavigationMenuTrigger>
                        <span className='flex items-center text-xs'>
                          {menu.label}
                        </span>
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className='grid w-[300px] gap-3 p-4 md:w-[650px] md:grid-cols-2'>
                          {menu.submenus.map((submenu: Submenu) => (
                            <ListItem
                              key={submenu.href}
                              title={submenu.label}
                              description={submenu.description}
                              to={submenu.href}
                            />
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <NavigationMenuLink asChild>
                      <Link
                        to={menu.href}
                        className='inline-flex h-8 w-full items-center justify-center rounded-md px-3 py-1 text-xs font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50'
                      >
                        {menu.label}
                      </Link>
                    </NavigationMenuLink>
                  )}
                </NavigationMenuItem>
              ))
            )}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Mobile Navigation */}
        <div className='flex lg:hidden'>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button
                type='button'
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
                className='relative flex h-10 w-10 items-center justify-center rounded-md transition-colors hover:bg-accent focus:bg-accent'
              >
                <span
                  className='absolute inset-0 flex items-center justify-center transition-transform duration-300'
                  style={{
                    opacity: isOpen ? 0 : 1,
                    transform: isOpen
                      ? 'rotate(90deg) scale(0.7)'
                      : 'rotate(0deg) scale(1)',
                  }}
                >
                  <MenuIcon className='h-5 w-5 transition-all' />
                </span>
                <span
                  className='absolute inset-0 flex items-center justify-center transition-transform duration-300'
                  style={{
                    opacity: isOpen ? 1 : 0,
                    transform: isOpen
                      ? 'rotate(0deg) scale(1)'
                      : 'rotate(-90deg) scale(0.7)',
                  }}
                >
                  <X className='h-5 w-5 transition-all' />
                </span>
              </button>
            </SheetTrigger>
            <SheetContent side='right' className='w-[300px] p-0 sm:w-[400px]'>
              <div className='flex h-full flex-col'>
                {/* Header (Logo) */}
                <SheetHeader className='shrink-0 p-4'>
                  <SheetTitle>
                    <Link
                      to='/'
                      className='flex items-center gap-2'
                      onClick={() => setIsOpen(false)}
                    >
                      <img src={bppLogo} className='h-8 w-8' alt='BPP Logo' />
                      <span className='font-oswald font-bold'>
                        {t('PartyName.name')}
                      </span>
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                {/* Scrollable menu links */}
                <div className='mt-6 flex-1 space-y-2 overflow-y-auto px-4'>
                  {menuList.map((group: Group, groupIndex: number) =>
                    group.menus.map((menu: Menu) => (
                      <Collapsible key={`${groupIndex}-${menu.href}`} open>
                        {menu.submenus?.length ? (
                          <>
                            <CollapsibleTrigger className='flex w-full items-center justify-between rounded-md p-2 text-left hover:bg-accent'>
                              <span className='text-sm font-medium'>
                                {menu.label}
                              </span>
                              <ChevronDown className='h-4 w-4' />
                            </CollapsibleTrigger>
                            <CollapsibleContent className='ml-4 space-y-2'>
                              {menu.submenus.map((submenu: Submenu) => (
                                <Link
                                  key={submenu.href}
                                  to={submenu.href}
                                  onClick={() => setIsOpen(false)}
                                  className='block rounded-md p-2 text-sm hover:bg-accent'
                                >
                                  {submenu.label}
                                </Link>
                              ))}
                            </CollapsibleContent>
                          </>
                        ) : (
                          <Link
                            to={menu.href}
                            onClick={() => setIsOpen(false)}
                            className='block rounded-md p-2 text-sm hover:bg-accent'
                          >
                            {menu.label}
                          </Link>
                        )}
                      </Collapsible>
                    ))
                  )}
                </div>
                {/* Bottom buttons */}
                <div className='mt-8 flex shrink-0 flex-col gap-2 p-4'>
                  <Button variant='outline' asChild>
                    <Link to='/sign-in' onClick={() => setIsOpen(false)}>
                      Login
                    </Link>
                  </Button>
                  <Button
                    className='bg-blue-600 text-white hover:bg-blue-800 dark:bg-blue-400 dark:text-blue-900 dark:hover:bg-blue-600'
                    asChild
                  >
                    <Link to='/sign-up' onClick={() => setIsOpen(false)}>
                      Sign Up
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Right Side Actions */}
        <div className='hidden items-center gap-1 lg:flex'>
          <Button
            variant='outline'
            className='border-blue-600 text-blue-600 hover:bg-blue-50 hover:text-blue-800 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900 dark:hover:text-blue-200'
          >
            <Link to={'/donate' as unknown as string} className='text-xs'>
              {t('Donate.label', { ns: 'header', defaultValue: 'Donate' })}
            </Link>
          </Button>
          <Button className='bg-blue-600 text-white hover:bg-blue-800 dark:bg-blue-400 dark:text-blue-900 dark:hover:bg-blue-600'>
            <Link to='/sign-in' className='text-xs text-white'>
              {t('Join.label', { ns: 'header' })}
            </Link>
          </Button>
          <QRToggle />
          <LanguageToggle />
          <ThemeSwitch />
        </div>
      </div>
    </header>
  )
}

export default MainNav
