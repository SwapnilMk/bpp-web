export const mockCaseStatus = [
  {
    id: 'CASE-001-AD',
    date: '2025-07-15',
    status: 'Under Review',
    category: 'Legal Assistance',
    history: [
      { status: 'Submitted', date: '2025-07-15' },
      { status: 'Initial Review', date: '2025-07-16' },
      { status: 'Lawyer Assigned', date: '2025-07-20' },
      { status: 'Under Review', date: '2025-07-22' },
    ],
    assignedLawyer: 'Adv. Ananya Sharma',
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
  supportCenters: [
    { position: [28.6139, 77.209], name: 'Delhi Support Center' },
    { position: [19.076, 72.8777], name: 'Mumbai Support Center' },
    { position: [12.9716, 77.5946], name: 'Bengaluru Support Center' },
  ],
}
