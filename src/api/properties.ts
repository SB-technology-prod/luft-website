import {
  GetPropertyApiResponse,
  RecommendedPropertiesApiRes,
} from '@/types/properties';

import { apiFetch } from '@/utils/api';

// Sent with the user's token when logged in so the API can resolve `isWishlisted`;
// guests have no session, so no Authorization header is attached.
export const getRecommendedProperties =
  (): Promise<RecommendedPropertiesApiRes> =>
    apiFetch(`api/Property/get-all-recommended-properties`);

export const getProperty = (id: string): Promise<GetPropertyApiResponse> =>
  apiFetch(`api/Property/website/get-by-id?id=${id}`);
