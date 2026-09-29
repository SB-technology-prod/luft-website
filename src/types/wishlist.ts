import { ApiResponse } from '.';

export type wishlistApiResponse = ApiResponse<{
  items: wishlistItemApi[];
  totalCount: number;
}>;

export type wishlistItemApi = {
  propertyId: string;
  name: string;
  description: string;
  pricePerNight: number;
  currency: string;
  rating: number;
  reviewsCount: number;
  isWishlisted: boolean;
  images: {
    url: string;
    sortOrder: number;
  }[];
};
