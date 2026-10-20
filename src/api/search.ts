import type { ApiResponse } from '@/types';
import { CitiesApiResponse } from '@/types/cities';
import type { SearchItem } from '@/types/search';

import { apiFetch } from '@/utils/api';

export const searchQueryKey = 'search';

export type SearchPropertiesResult = {
  items: SearchItem[];
  totalCount: number;
  pageSize: number;
  pageNumber: number;
};

export type SearchPropertiesResponse = ApiResponse<SearchPropertiesResult>;

export const searchProperties = (
  guestCount: string,
  checkInDate: string,
  checkOutDate: string,
  cityId: string,
  pageNumber = 1,
  pageSize = 10,
): Promise<SearchPropertiesResponse> => {
  const params = new URLSearchParams({
    numberOfGuests: guestCount,
    checkInDate,
    checkOutDate,
    cityId,
    pageNumber: String(pageNumber),
    pageSize: String(pageSize),
  });
  if(guestCount) params.set('numberOfGuests', guestCount);
  if(checkInDate) params.set('checkInDate', checkInDate);
  if(checkOutDate) params.set('checkOutDate', checkOutDate);
  if(cityId) params.set('cityId', cityId);
  return apiFetch(`api/Property/search-properties?${params.toString()}`);
};

export const getCitiesOfSearch = (): Promise<CitiesApiResponse> =>
  apiFetch(`api/Cities/get-all`);