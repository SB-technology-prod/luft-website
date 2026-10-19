import { format, isBefore, isValid, parseISO, startOfDay } from 'date-fns';

export type ReservationSelection = {
  propertyId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
};

export function parseReservationSelection(
  params: URLSearchParams,
): ReservationSelection | null {
  const propertyId = params.get('propertyId');
  const checkIn = params.get('checkIn') ?? '';
  const checkOut = params.get('checkOut') ?? '';
  const guests = Number(params.get('guests'));
  const from = parseISO(checkIn);
  const to = parseISO(checkOut);
  if (
    !propertyId ||
    !/^\d{4}-\d{2}-\d{2}$/.test(checkIn) ||
    !/^\d{4}-\d{2}-\d{2}$/.test(checkOut) ||
    !isValid(from) ||
    !isValid(to) ||
    format(from, 'yyyy-MM-dd') !== checkIn ||
    format(to, 'yyyy-MM-dd') !== checkOut ||
    !isBefore(from, to) ||
    isBefore(from, startOfDay(new Date())) ||
    !Number.isSafeInteger(guests) ||
    guests < 1
  )
    return null;
  return { propertyId, checkIn, checkOut, guests };
}

export function getReservationEditHref(selection: ReservationSelection) {
  return {
    pathname: `/properties/${encodeURIComponent(selection.propertyId)}`,
    query: {
      checkIn: selection.checkIn,
      checkOut: selection.checkOut,
      guests: String(selection.guests),
    },
    hash: 'reservation',
  };
}
