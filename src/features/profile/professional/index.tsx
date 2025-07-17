import ContentSection from '@/features/profile/components/content-section'
import ProfessionalForm from '@/features/profile/professional/professional-form'

export default function ProfessionalDetails() {
  return (
    <ContentSection
      title='Professional Information'
      desc='Update your professional details and work experience.'
    >
      <ProfessionalForm />
    </ContentSection>
  )
}
