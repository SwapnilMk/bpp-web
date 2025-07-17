import React from 'react'
import { Link } from '@tanstack/react-router'
import { cn } from '@/lib/utils'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

interface BreadcrumbLinkType {
  label: string
  href: string
}

interface HeaderComponentProps {
  heading?: string
  text?: string
  className?: string
  breadcrumbLinks?: BreadcrumbLinkType[]
  imgUrl: string
}

const HeaderComponent: React.FC<HeaderComponentProps> = ({
  heading,
  text,
  className,
  breadcrumbLinks,
  imgUrl,
}) => {
  return (
    <>
      <div
        className={cn(
          'w-7xl relative flex items-center justify-center font-sans text-white',
          'min-h-[200px]',
          'bg-cover bg-center bg-no-repeat',
          className
        )}
        style={{
          backgroundImage: `url(${imgUrl})`,
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
        }}
      >
        <div className='absolute inset-0 bg-black/50' />
        <div className='relative mx-auto max-w-4xl px-6 text-center'>
          <div className='mx-auto mt-5 max-w-full'>
            <h1 className='my-3 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>
              {heading}
            </h1>
          </div>
          {text && (
            <div className='text-md font-normal'>
              <span>{text}</span>
            </div>
          )}
        </div>
      </div>

      {/* Breadcrumb section */}
      {breadcrumbLinks && breadcrumbLinks.length > 0 && (
        <div className='container'>
          <div className='mx-auto mt-3 max-w-7xl font-bold'>
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbLinks.map((link, index) => (
                  <React.Fragment key={index}>
                    <BreadcrumbItem>
                      <Link to={link.href}>{link.label}</Link>
                    </BreadcrumbItem>
                    {index < breadcrumbLinks.length - 1 && (
                      <BreadcrumbSeparator />
                    )}
                  </React.Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
      )}
    </>
  )
}

export default HeaderComponent
