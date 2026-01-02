import type { SearchCriteria } from '@/resources/types/UserData';

export const toQueryParams = (criteria: SearchCriteria): string => {
  const params = new URLSearchParams();

  Object.entries(criteria).forEach(([key, value]) => {
    if (typeof value === 'boolean') {
      params.append(key, value ? 'true' : 'false');
    }
    if (typeof value === 'string' && value.trim() !== '') {
      params.append(key, value);
    }
  });

  return params.toString();
};