import { apiFetch } from '@/utils/api';
import {
  GetMyReservationsApiResponse,
  GetReservationDetailsApiResponse,
} from '@/types/reservations';

export const reservationsQueryKeys = {
  all: ['reservations'] as const,
  myReservations: () => [...reservationsQueryKeys.all, 'my'] as const,
  details: (id: string) =>
    [...reservationsQueryKeys.all, 'details', id] as const,
};

export const getMyReservations = (): Promise<GetMyReservationsApiResponse> =>
  apiFetch(`api/reservations/my-reservation`);

export const getReservationDetails = (
  reservationId: string,
): Promise<GetReservationDetailsApiResponse> =>
  apiFetch(
    `api/reservations/reservation-details?reservationId=${reservationId}`,
  );

