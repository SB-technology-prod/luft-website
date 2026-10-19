import type { ApiResponse } from '@/types';
import { wishlistApiResponse } from '@/types/wishlist';

import { apiFetch } from '@/utils/api';

export const wishlistQueryKey = 'wishlist';

export const getUserWishlist = (): Promise<wishlistApiResponse> =>
  apiFetch('api/wishlist');

export const addToWishlist = (
  propertyId: string,
): Promise<ApiResponse<null>> =>
  apiFetch('api/wishlist', {
    method: 'POST',
    body: JSON.stringify({ propertyId }),
    headers: { 'Content-Type': 'application/json' },
  });

export const removeFromWishlist = (
  propertyId: string,
): Promise<ApiResponse<null>> =>
  apiFetch(`api/wishlist/${propertyId}`, { method: 'DELETE' });
