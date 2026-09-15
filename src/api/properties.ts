import {
  GetPropertyApiResponse,
  RecommendedPropertiesApiRes,
} from '@/types/properties';

import { apiFetch } from '@/utils/api';

export const getRecommendedProperties =
  (): Promise<RecommendedPropertiesApiRes> =>
    apiFetch(`api/Property/get-all-recommended-properties`, undefined, false);

export const getProperty = (id: string): Promise<GetPropertyApiResponse> =>
  apiFetch(`api/Property/website/get-by-id?id=${id}`, undefined, false);
