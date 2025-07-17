import { createLazyFileRoute } from '@tanstack/react-router'
import DocumentsDetails from '@/features/profile/documents'

export const Route = createLazyFileRoute('/dashboard/profile/document')({
  component: DocumentsDetails,
})
