import ContentSection from '@/features/profile/components/content-section'
import DocumentsForm from '@/features/profile/documents/documents-form'

export default function DocumentsDetails() {
  return (
    <ContentSection
      title='Identity Documents'
      desc='Manage your identity documents and verification details.'
    >
      <DocumentsForm />
    </ContentSection>
  )
}
