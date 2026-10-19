import { useInfiniteQuery } from '@tanstack/react-query';

import { getMyReservations, reservationsQueryKeys } from '@/api/reservations';

export const useMyReservations = () => {
  return useInfiniteQuery({
    queryKey: [...reservationsQueryKeys.myReservations(), 'infinite', 10],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => getMyReservations(pageParam, 10),
    getNextPageParam: (lastPage) => {
      const { items, pageNumber, pageSize, totalCount } = lastPage.result;
      return items.length > 0 && pageNumber * pageSize < totalCount
        ? pageNumber + 1
        : undefined;
    },
  });
};
