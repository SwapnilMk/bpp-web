import { Case, CaseSummary } from '@/types/contribution';
import { PagedResponse, Pagination } from '@/types/api';
import { authApi } from './api.service';

const getCaseSummaries = async (pagination: Pagination): Promise<PagedResponse<CaseSummary>> => {
  const response = await authApi.get('/cases', { params: pagination });
  return response.data;
};

const getCase = async (caseId: string): Promise<Case> => {
  const response = await authApi.get(`/cases/${caseId}`);
  return response.data;
};

const createCase = async (caseData: FormData): Promise<Case> => {
  const response = await authApi.post('/cases', caseData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const contributionService = {
  getCaseSummaries,
  getCase,
  createCase,
};
