import { User } from '@/types/auth'

export enum UserRole {
  MEMBER = 'MEMBER',
  PRIMARY_MEMBER = 'PRIMARY MEMBER',
  ACTIVE_MEMBER = 'ACTIVE MEMBER',
}

// Define the status types
export enum UserStatus {
  PROCESSING = 'PROCESSING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  SUSPENDED = 'SUSPENDED',
}

// Define route sets for different member states
const memberRoutes = {
  [UserStatus.PROCESSING]: [
    '/dashboard',
    '/dashboard/goal',
    '/dashboard/events',
    '/dashboard/campaigns',
    '/dashboard/help-center',
    '/dashboard/settings',
    '/dashboard/settings/appearance',
    '/dashboard/settings/notifications',
    '/dashboard/settings/sessions',
  ],
  [UserStatus.APPROVED]: [
    '/dashboard',
    '/dashboard/goal',
    '/dashboard/wallet',
    '/dashboard/wallet/transactions',
    '/dashboard/events',
    '/dashboard/campaigns',
    '/dashboard/help-center',
    '/dashboard/membership',
    '/dashboard/membership/payment',
    '/dashboard/settings',
    '/dashboard/settings/appearance',
    '/dashboard/settings/notifications',
    '/dashboard/settings/sessions',
  ],
}

export const roleAccessMap = {
  [UserRole.MEMBER]: memberRoutes,
  [UserRole.PRIMARY_MEMBER]: [
    '/dashboard',
    '/dashboard/goal',
    '/dashboard/donate',
    '/dashboard/donate/add-donation',
    '/dashboard/referral',
    '/dashboard/profile',
    '/dashboard/profile/personal',
    '/dashboard/profile/contact',
    '/dashboard/profile/address',
    '/dashboard/profile/document',
    '/dashboard/profile/professional',
    '/dashboard/wallet',
    '/dashboard/wallet/transactions',
    '/dashboard/membership',
    '/dashboard/membership/upgrade',
    '/dashboard/community-contribution',
    '/dashboard/events',
    '/dashboard/campaigns',
    '/dashboard/help-center',
    '/dashboard/settings',
    '/dashboard/settings/appearance',
    '/dashboard/settings/notifications',
    '/dashboard/settings/sessions',
  ],
  [UserRole.ACTIVE_MEMBER]: [
    '/dashboard',
    '/dashboard/goal',
    '/dashboard/donate',
    '/dashboard/donate/add-donation',
    '/dashboard/referral',
    '/dashboard/profile',
    '/dashboard/profile/personal',
    '/dashboard/profile/contact',
    '/dashboard/profile/address',
    '/dashboard/profile/document',
    '/dashboard/profile/professional',
    '/dashboard/wallet',
    '/dashboard/wallet/transactions',
    '/dashboard/membership',
    '/dashboard/community-contribution',
    '/dashboard/business-community',
    '/dashboard/events',
    '/dashboard/campaigns',
    '/dashboard/help-center',
    '/dashboard/settings',
    '/dashboard/settings/appearance',
    '/dashboard/settings/notifications',
    '/dashboard/settings/sessions',
  ],
}

export const hasAccess = (user: User | null, route: string): boolean => {
  if (!user) return false

  const role = (user.role as UserRole) || UserRole.MEMBER
  const status = (user.status as UserStatus) || UserStatus.PROCESSING

  // If user is not verified or status is not APPROVED, only show limited access
  if (!user.isVerified || status !== UserStatus.APPROVED) {
    return roleAccessMap[UserRole.MEMBER][UserStatus.PROCESSING].includes(route)
  }

  // Check if the route is accessible for the user's role
  if (role === UserRole.MEMBER) {
    return roleAccessMap[UserRole.MEMBER][status].includes(route)
  } else if (role === UserRole.PRIMARY_MEMBER) {
    return roleAccessMap[UserRole.PRIMARY_MEMBER].includes(route)
  } else if (role === UserRole.ACTIVE_MEMBER) {
    return roleAccessMap[UserRole.ACTIVE_MEMBER].includes(route)
  }

  return false
}

// Check if a user needs to verify their account
export const needsVerification = (user: User | null): boolean => {
  if (!user) return false
  return !user.isVerified || user.status !== UserStatus.APPROVED
}

// Check if a user needs to upgrade to primary membership
export const needsPrimaryMembership = (user: User | null): boolean => {
  if (!user) return false
  return (
    user.isVerified === true &&
    user.status === UserStatus.APPROVED &&
    user.role === UserRole.MEMBER
  )
}

// Check if a user has business community access
export const hasBusinessCommunityAccess = (user: User | null): boolean => {
  if (!user) return false
  return user.role === UserRole.ACTIVE_MEMBER
}
