import { useQuery } from '@tanstack/react-query';

import useSession from '@/hooks/useSession';

import { getReservationSummary } from '@/api/reservationSummary';

export function useReservationSummary(
  reservationId: string | null,
  locale: string,
) {
  const session = useSession();
  return useQuery({
    queryKey: ['reservation-summary', locale, session?.user.id, reservationId],
    enabled: !!reservationId && !!session,
    retry: false,
    queryFn: async () => (await getReservationSummary(reservationId!)).result,
  });
}
