import {
  GetReservationSummaryApiResponse,
  ReservationCheckoutApiResponse,
} from '@/types/reservations';

import { apiFetch } from '@/utils/api';

export function getReservationSummary(
  reservationId: string,
): Promise<GetReservationSummaryApiResponse> {
  return apiFetch(
    `api/reservations/reservation-summary?${new URLSearchParams({ reservationId })}`,
    {
      cache: 'no-store',
    },
    true,
    false,
  );
}

export function createReservationCheckout(
  reservationId: string,
): Promise<ReservationCheckoutApiResponse> {
  return apiFetch(
    `api/payments/reservations/${encodeURIComponent(reservationId)}/checkout`,
    {
      method: 'POST',
    },
    true,
    false,
  );
}
