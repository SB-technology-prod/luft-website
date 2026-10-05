import {
  GetBookedDatesApiResponse,
  GetMyReservationsApiResponse,
  GetQuoteTotalApiResponse,
  GetReservationDetailsApiResponse,
  ReservationQuoteRequest,
  ReserveApiResponse,
  ReserveRequest,
} from '@/types/reservations';

import { apiFetch } from '@/utils/api';

export const reservationsQueryKeys = {
  all: ['reservations'] as const,
  myReservations: () => [...reservationsQueryKeys.all, 'my'] as const,
  details: (id: string) =>
    [...reservationsQueryKeys.all, 'details', id] as const,
  bookedDates: (propertyId: string) =>
    [...reservationsQueryKeys.all, 'booked-dates', propertyId] as const,
  quote: (propertyId: string, checkInDate: string, checkOutDate: string) =>
    [
      ...reservationsQueryKeys.all,
      'quote',
      propertyId,
      checkInDate,
      checkOutDate,
    ] as const,
};

export const getMyReservations = (): Promise<GetMyReservationsApiResponse> =>
  apiFetch(`api/reservations/my-reservation`);

export const getReservationDetails = (
  reservationId: string,
): Promise<GetReservationDetailsApiResponse> =>
  apiFetch(
    `api/reservations/reservation-details?reservationId=${reservationId}`,
  );

export const getBookedDates = (
  propertyId: string,
): Promise<GetBookedDatesApiResponse> =>
  apiFetch(
    `api/reservations/properties/${propertyId}/booked-dates`,
    undefined,
    false,
    false,
  );

export const getQuoteTotal = (
  propertyId: string,
  body: ReservationQuoteRequest,
): Promise<GetQuoteTotalApiResponse> =>
  apiFetch(
    `api/reservations/properties/${propertyId}/quote-total`,
    {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    },
    true,
    false,
  );

export const reserve = (body: ReserveRequest): Promise<ReserveApiResponse> =>
  apiFetch(
    `api/reservations/reserve`,
    {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    },
    true,
    false,
  );
