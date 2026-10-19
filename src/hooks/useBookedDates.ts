import { useQuery } from '@tanstack/react-query';

import { getBookedDates, reservationsQueryKeys } from '@/api/reservations';

export const useBookedDates = (propertyId: string) => {
  return useQuery({
    queryKey: reservationsQueryKeys.bookedDates(propertyId),
    queryFn: () => getBookedDates(propertyId),
    select: (res) => new Set(res.result?.bookedDates ?? []),
  });
};
