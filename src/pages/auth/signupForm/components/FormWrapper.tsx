import { ReactNode } from 'react'

type FormWrapperProps = {
  title: string
  children: ReactNode
}

export function FormWrapper({ children }: FormWrapperProps) {
  return (
    <>
      <div className='w-xl max-w-xl p-3'>
        <div className='grid gap-4'>{children}</div>
      </div>
    </>
  )
}
