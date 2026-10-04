import { ApiResponse } from './index';

export type ReservationStatus = 'Upcoming' | 'Ongoing' | 'Completed' | 'Canceled';

export type ReservationListItem = {
  reservationId: string;
  propertyId: string;
  propertyName: string;
  propertyImageUrl: string;
  checkInDate: string;
  checkOutDate: string;
  submittedAt: string;
  status: ReservationStatus;
};

export type PaginatedReservations = {
  totalCount: number;
  pageSize: number;
  pageNumber: number;
  items: ReservationListItem[];
};

export type GetMyReservationsApiResponse = ApiResponse<PaginatedReservations>;

// --- Reservation Details types ---

export type ReservationProperty = {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  rating: number;
  reviewsCount: number;
};

export type ReservationStay = {
  checkInDate: string;
  checkOutDate: string;
  numberOfNights: number;
};

export type ReservationGuests = {
  total: number;
};

export type PriceSummaryItem = {
  type: string;
  description: string;
  quantity: number;
  pricePerNight?: number;
  total: number;
};

export type ReservationPriceSummary = {
  items: PriceSummaryItem[];
  taxes: number;
  finalPrice: number;
  currency: string;
};

export type ReservationPaymentCard = {
  type: string;
  lastFourDigits: string;
  expiryDate: string;
};

export type ReservationPayment = {
  status: string;
  paidAmount: number;
  card?: ReservationPaymentCard;
};

export type ReservationCancellation = {
  canCancel: boolean;
};

export type ReservationDetails = {
  reservationId: string;
  reservationNumber: string;
  property: ReservationProperty;
  status: ReservationStatus;
  stay: ReservationStay;
  guests: ReservationGuests;
  priceSummary: ReservationPriceSummary;
  payment: ReservationPayment;
  cancellation: ReservationCancellation;
};

export type GetReservationDetailsApiResponse =
  ApiResponse<ReservationDetails>;
