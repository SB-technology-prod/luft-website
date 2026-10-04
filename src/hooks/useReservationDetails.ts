import { useQuery } from '@tanstack/react-query';

import {
  getReservationDetails,
  reservationsQueryKeys,
} from '@/api/reservations';

export const useReservationDetails = (
  reservationId: string,
  enabled: boolean = true,
) => {
  return useQuery({
    queryKey: reservationsQueryKeys.details(reservationId),
    queryFn: () => getReservationDetails(reservationId),
    enabled: enabled && !!reservationId,
  });
};
