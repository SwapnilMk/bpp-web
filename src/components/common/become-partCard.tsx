import { useNavigate } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

const RecruitmentBanner = () => {
  const navigate = useNavigate()
  return (
    <Card className='relative mx-auto mb-8 w-full max-w-7xl overflow-hidden'>
      {/* Background Image Container */}
      <div className='relative h-[300px] w-full'>
        {/* Using a placeholder image - replace with your actual image */}
        <img
          src='https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnVzaW5lc3MlMjBjb21tdW5pdHl8ZW58MHx8MHx8fDA%3D'
          alt='Group of people with signs'
          className='h-full w-full object-cover brightness-75'
        />

        {/* Content Overlay */}
        <div className='absolute inset-0 flex flex-col justify-center p-8'>
          <div className='max-w-xl'>
            {/* Main Heading */}
            <h1 className='mb-4 text-4xl font-bold text-white md:text-5xl'>
              Be part of change
            </h1>

            {/* Subheading */}
            <p className='mb-6 text-xl text-white'>
              Join us and together we can change our community.
            </p>

            {/* Call to Action Button */}
            <Button
              className='rounded-full bg-[#e85a32] px-6 py-2 text-white hover:bg-[#e85a32]'
              onClick={() => navigate({ to: '/sign-up' })}
            >
              Join Now
              <ArrowRight className='ml-2 h-4 w-4' />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default RecruitmentBanner
