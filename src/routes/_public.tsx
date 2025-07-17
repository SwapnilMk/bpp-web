import { createFileRoute, Outlet } from '@tanstack/react-router'
import PublicLayout from '@/components/layout/public/PublicLayout'

export const Route = createFileRoute('/_public')({
  component: PublicLayoutComponent,
})

function PublicLayoutComponent() {
  return (
    <div className='flex min-h-screen flex-col'>
      <PublicLayout>
        <main className='flex-grow'>
          <Outlet />
        </main>
      </PublicLayout>
    </div>
  )
}
