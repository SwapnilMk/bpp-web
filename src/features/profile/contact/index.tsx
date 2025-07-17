import ContentSection from '@/features/profile/components/content-section'
import ContactForm from '@/features/profile/contact/contact-form'

export default function ContactDetails() {
  return (
    <ContentSection
      title='Contact Information'
      desc='Update your contact details and communication preferences.'
    >
      <ContactForm />
    </ContentSection>
  )
}
