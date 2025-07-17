import { createFileRoute } from '@tanstack/react-router'
import EthicsVendorsSuppliers from '@/pages/BusinessCommunity/EthicsVendorsSuppliers'

export const Route = createFileRoute('/_public/business-community/ethics/')({
  component: EthicsVendorsSuppliers,
})
