import { Header } from '@/components/layout/dashboard/header'
import { Main } from '@/components/layout/dashboard/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'

// import { LegalCaseRegistration } from '@/components/form/caseRegistration/legal'
// import { Stepper } from '../index'

const CaseRegistrationForm = () => {
  return (
    <>
      <Header fixed>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>
      <Main>
        <div className='mb-6 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center'>
          <div className='w-full'>
            <div className='mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center'>
              <div>
                <h1 className='text-2xl font-bold'>Case Registration</h1>
                <p className='text-muted-foreground'>
                  Register a new case for legal assistance
                </p>
              </div>
            </div>
            <div className='mb-7'>{/* <Stepper /> */}</div>
            {/* <LegalCaseRegistration /> */}
          </div>
        </div>
      </Main>
    </>
  )
}

export default CaseRegistrationForm
