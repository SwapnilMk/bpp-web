import { CommunityContributionForm } from '@/components/form/communityContribution'

const CaseRegistrationForm = () => {
  return (
    <div className='w-full'>
      <div className='mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center'>
        <div>
          <h1 className='text-2xl font-bold'>Community Contribution</h1>
          <p className='text-muted-foreground'>
            Register a new case for community contribution
          </p>
        </div>
      </div>
      <CommunityContributionForm />
    </div>
  )
}

export default CaseRegistrationForm
