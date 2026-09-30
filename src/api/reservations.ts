import { apiFetch } from '@/utils/api';

export const reservationsQueryKeys = {
  all: ['reservations'] as const,
  myReservations: () => [...reservationsQueryKeys.all, 'my'] as const,
  details: (id: string) =>
    [...reservationsQueryKeys.all, 'details', id] as const,
};

export const getMyReservations = (): Promise<any> =>
  apiFetch(`api/reservations/my-reservation`);

export const getReservationDetails = (reservationId: string): Promise<any> =>
  apiFetch(
    `api/reservations/reservation-details?reservationId=${reservationId}`,
  );
