import { ApiResponse } from '.';

export type CollectionApiRes = {
  id: string;
  name: string;
  imageUrl: string;
  // not returned by the API yet, rendered when available
  description?: string;
};

export type CollectionsApiRes = ApiResponse<CollectionApiRes[]>;
