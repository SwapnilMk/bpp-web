import { createFileRoute } from '@tanstack/react-router'
import DownloadAppPage from '@/pages/download'

export const Route = createFileRoute('/_public/download-app/')({
  component: DownloadAppPage,
})
