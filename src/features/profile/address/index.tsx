import AddressForm from '@/features/profile/address/address-form'
import ContentSection from '@/features/profile/components/content-section'

export default function AddressDetails() {
  return (
    <ContentSection
      title='Address Information'
      desc='Update your residential address details.'
    >
      <AddressForm />
    </ContentSection>
  )
}
