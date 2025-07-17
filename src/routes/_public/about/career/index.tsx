import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_public/about/career/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_public/about/career/"!</div>
}
