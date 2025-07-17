import { createFileRoute } from '@tanstack/react-router'
import VendorSupplier from '@/pages/BusinessCommunity/VendorSupplier'

export const Route = createFileRoute(
  '/_public/business-community/vendor-suppliers/'
)({
  component: VendorSupplier,
})
