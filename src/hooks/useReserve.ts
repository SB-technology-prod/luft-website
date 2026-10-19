import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ReserveRequest } from '@/types/reservations';

import { isConflictError } from '@/utils/errors';

import { reservationsQueryKeys, reserve } from '@/api/reservations';

export function useReserve() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: ReserveRequest) => reserve(body),
    onSuccess: (_res, { propertyId }) => {
      queryClient.invalidateQueries({
        queryKey: reservationsQueryKeys.myReservations(),
      });
      queryClient.invalidateQueries({
        queryKey: reservationsQueryKeys.bookedDates(propertyId),
      });
    },
    onError: (error, { propertyId }) => {
      // 409: dates were booked meanwhile, refresh the calendar
      if (isConflictError(error)) {
        queryClient.invalidateQueries({
          queryKey: reservationsQueryKeys.bookedDates(propertyId),
        });
      }
    },
  });
}
