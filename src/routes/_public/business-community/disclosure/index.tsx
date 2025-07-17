import { createFileRoute } from '@tanstack/react-router'
import VendorDisclosure from '@/pages/BusinessCommunity/VendorDisclosure'

export const Route = createFileRoute('/_public/business-community/disclosure/')(
  {
    component: VendorDisclosure,
  }
)
