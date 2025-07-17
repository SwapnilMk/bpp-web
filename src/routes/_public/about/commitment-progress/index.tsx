import { createFileRoute } from '@tanstack/react-router'
import CommitmentToProgress from '@/pages/About/commitment-progress'

export const Route = createFileRoute('/_public/about/commitment-progress/')({
  component: CommitmentToProgress,
})
