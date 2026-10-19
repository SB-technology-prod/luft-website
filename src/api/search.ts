import { apiFetch } from '@/utils/api';
import type { ApiResponse } from '@/types';
import type { SearchItem } from '@/types/search';

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
  city: string,
  pageNumber = 1,
  pageSize = 10,
): Promise<SearchPropertiesResponse> => {
  const params = new URLSearchParams({
    numberOfGuests: guestCount,
    checkInDate,
    checkOutDate,
    city,
    pageNumber: String(pageNumber),
    pageSize: String(pageSize),
  });

  return apiFetch(`api/Property/search-properties?${params.toString()}`);
};

export const getCitiesOfSearch = (): Promise<any> =>
  apiFetch(`api/Cities/get-all`);