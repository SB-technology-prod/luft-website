import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import { isConflictError } from '@/utils/errors';

import { getQuoteTotal, reservationsQueryKeys } from '@/api/reservations';

export const useQuoteTotal = (
  propertyId: string,
  checkInDate: string | undefined,
  checkOutDate: string | undefined,
  enabled: boolean,
) => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: reservationsQueryKeys.quote(
      propertyId,
      checkInDate ?? '',
      checkOutDate ?? '',
    ),
    queryFn: async () => {
      try {
        return await getQuoteTotal(propertyId, {
          checkInDate: checkInDate!,
          checkOutDate: checkOutDate!,
        });
      } catch (error) {
        // 409: dates were booked meanwhile, refresh the calendar
        if (isConflictError(error)) {
          queryClient.invalidateQueries({
            queryKey: reservationsQueryKeys.bookedDates(propertyId),
          });
        }
        throw error;
      }
    },
    select: (res) => res.result.totalAmount,
    enabled: enabled && !!checkInDate && !!checkOutDate,
    placeholderData: keepPreviousData,
    retry: false,
  });
};
