export const mockCaseStatus = [
  {
    id: 'CASE-2024-001',
    date: '2024-03-15',
    status: 'Pending Review',
    category: 'Legal Assistance',
    history: [
      { status: 'Submitted', date: '2024-03-15' },
      { status: 'Pending Review', date: '2024-03-16' },
    ],
    assignedLawyer: 'Adv. Priya Sharma',
  },
  {
    id: 'CASE-2024-002',
    date: '2024-02-10',
    status: 'Resolved',
    category: 'Medical Cases',
    history: [
      { status: 'Submitted', date: '2024-02-10' },
      { status: 'In Progress', date: '2024-02-12' },
      { status: 'Resolved', date: '2024-02-20' },
    ],
    assignedLawyer: 'Adv. Rahul Mehta',
  },
  {
    id: 'CASE-2024-003',
    date: '2024-01-05',
    status: 'Closed',
    category: 'Social Needs',
    history: [
      { status: 'Submitted', date: '2024-01-05' },
      { status: 'Closed', date: '2024-01-10' },
    ],
    assignedLawyer: 'Adv. Sneha Patil',
  },
]

// Mock dashboard stats
export const mockDashboardStats = {
  totalCases: 1427,
  casesByCategory: [
    { name: 'Legal Assistance', value: 890 },
    { name: 'Medical Cases', value: 312 },
    { name: 'Social Needs', value: 155 },
    { name: 'Educational Cases', value: 70 },
  ],
  activeVolunteers: 128,
  pendingCases: 87,
  resolvedCases: 1200,
  closedCases: 140,
}

// Mock user address for map (Navi Mumbai, Maharashtra, India)
export const mockUserAddress = {
  line1: 'Sector 17',
  line2: 'Vashi',
  cityOrVillage: 'Navi Mumbai',
  district: 'Raigad',
  state: 'Maharashtra',
  pincode: '400703',
  coordinates: [18.6446, 73.2907],
}

// Unified mock data object for single API call
export const mockCommunityContributionData = {
  caseHistory: mockCaseStatus,
  dashboardStats: mockDashboardStats,
  userAddress: mockUserAddress,
}
