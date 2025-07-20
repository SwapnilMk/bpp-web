export interface CaseSummary {
  id: string;
  title: string;
  status: string;
  createdAt: string;
}

export interface Case {
  id: string;
  title: string;
  description: string;
  status: string;
  createdAt: string;
  // Add other case properties here
}
