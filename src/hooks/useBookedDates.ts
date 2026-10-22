import { useQuery } from '@tanstack/react-query';

import { getBookedDates, reservationsQueryKeys } from '@/api/reservations';

export const useBookedDates = (
  propertyId: string,
  reservationId: string | null = null,
) => {
  return useQuery({
    queryKey: [...reservationsQueryKeys.bookedDates(propertyId), reservationId],
    queryFn: () => getBookedDates(propertyId, reservationId),
    select: (res) => new Set(res.result?.bookedDates ?? []),
  });
};
