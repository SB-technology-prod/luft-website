import { CollectionsApiRes } from '@/types/collections';

import { apiFetch } from '@/utils/api';

export const getAllCollections = (): Promise<CollectionsApiRes> =>
  apiFetch(`api/Collections/get-all-collections`, {}, false);
