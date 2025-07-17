import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_public/about/constitution/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_public/about/constitution/"!</div>
}
