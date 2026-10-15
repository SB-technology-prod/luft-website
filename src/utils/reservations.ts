import { type ReservationStatusId } from '@/types/reservations';

export function isUpcomingReservation(statusId: ReservationStatusId) {
  return statusId === 1 || statusId === 2 || statusId === 6;
}

export function getCancellationContactHref(
  reservationId: string,
  propertyName: string,
) {
  return {
    pathname: '/contact',
    query: { messageType: 2, reservationId, propertyName },
  };
}
