import { CaseStatus } from '@/types/case';
import { authApi } from './api.service';

const getCaseStatus = async (): Promise<CaseStatus[]> => {
  const response = await authApi.get('/cases/status');
  return response.data;
};

export const caseService = {
  getCaseStatus,
};
