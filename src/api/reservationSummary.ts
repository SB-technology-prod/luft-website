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
  phoneNumber: string,
): Promise<ReservationCheckoutApiResponse> {
  return apiFetch(
    `api/payments/reservations/${encodeURIComponent(reservationId)}/checkout`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phoneNumber }),
    },
    true,
    false,
  );
}
