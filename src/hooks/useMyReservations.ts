import { useQuery } from '@tanstack/react-query';
import { getMyReservations, reservationsQueryKeys } from '@/api/reservations';

export const useMyReservations = () => {
  return useQuery({
    queryKey: reservationsQueryKeys.myReservations(),
    queryFn: getMyReservations,
  });
};
