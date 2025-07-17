import { createFileRoute } from '@tanstack/react-router'
import CodeOfConduct from '@/pages/Membership/CodeOfConduct'

export const Route = createFileRoute('/_public/membership/code-of-conduct/')({
  component: CodeOfConduct,
})
