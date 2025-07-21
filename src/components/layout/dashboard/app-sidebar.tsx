import { useAppSelector } from '@/store/hooks'
import { hasAccess, hasBusinessCommunityAccess } from '@/utils/role-access'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'
import { LogoHeader } from '@/components/layout/dashboard/logo-header'
import { NavGroup } from '@/components/layout/dashboard/nav-group'
import { NavUser } from '@/components/layout/dashboard/nav-user'
import { sidebarData } from './data/sidebar-data'
import { type NavItem, type NavCollapsible } from './types'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const user = useAppSelector((state) => state.user.user)

  // Filter navigation groups based on user role and verification status
  const filteredNavGroups = sidebarData.navGroups.filter((group) => {
    // Check if any item in the group is accessible
    const hasAccessibleItems = group.items.some((item) => {
      if ('url' in item && item.url) {
        return hasAccess(user, item.url as string)
      } else if ('items' in item && item.items && Array.isArray(item.items)) {
        return item.items.some(
          (subItem) => subItem.url && hasAccess(user, subItem.url as string)
        )
      }
      return false
    })

    // Special case for Business Community - only show if user has access
    if (group.title === 'Services') {
      const hasBusinessAccess = hasBusinessCommunityAccess(user)
      return (
        hasAccessibleItems &&
        (hasBusinessAccess ||
          group.items.some(
            (item) =>
              'url' in item &&
              item.url &&
              item.url !== '/dashboard/business-community'
          ))
      )
    }

    return hasAccessibleItems
  })

  // Filter items within each group
  const filteredSidebarData = {
    ...sidebarData,
    navGroups: filteredNavGroups.map((group) => ({
      ...group,
      items: group.items
        .filter((item) => {
          if ('url' in item && item.url) {
            return hasAccess(user, item.url as string)
          } else if (
            'items' in item &&
            item.items &&
            Array.isArray(item.items)
          ) {
            const filteredSubItems = item.items.filter(
              (subItem) => subItem.url && hasAccess(user, subItem.url as string)
            )
            return filteredSubItems.length > 0
          }
          return false
        })
        .map((item) => {
          if ('items' in item && item.items && Array.isArray(item.items)) {
            return {
              ...item,
              items: item.items.filter(
                (subItem) =>
                  subItem.url && hasAccess(user, subItem.url as string)
              ),
            } as NavCollapsible
          }
          return item as NavItem
        }),
    })),
  }

  return (
    <Sidebar collapsible='icon' variant='sidebar' {...props}>
      <SidebarHeader>
        <LogoHeader />
      </SidebarHeader>
      <SidebarContent>
        {filteredSidebarData.navGroups.map((props) => (
          <NavGroup key={props.title} {...props} />
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
