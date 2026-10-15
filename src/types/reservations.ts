import { ApiResponse } from './index';

export type ReservationStatus =
  'Upcoming' | 'Ongoing' | 'Completed' | 'Canceled';

export type ReservationStatusId = 1 | 2 | 3 | 4 | 5 | 6;

export type ReservationListItem = {
  reservationId: string;
  propertyId: string;
  propertyName: string;
  propertyImageUrl: string;
  checkInDate: string;
  checkOutDate: string;
  submittedAt: string;
  status: ReservationStatus;
  statusId: ReservationStatusId;
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
  statusId: ReservationStatusId;
  stay: ReservationStay;
  guests: ReservationGuests;
  priceSummary: ReservationPriceSummary;
  payment: ReservationPayment;
  cancellation: ReservationCancellation;
};

export type GetReservationDetailsApiResponse = ApiResponse<ReservationDetails>;

// --- Booking widget types ---

export type BookedDates = {
  propertyId: string;
  source: string;
  from: string;
  to: string;
  totalBookedDays: number;
  // Booked nights in yyyy-MM-dd format
  bookedDates: string[];
};

export type GetBookedDatesApiResponse = ApiResponse<BookedDates>;

export type ReservationQuoteRequest = {
  checkInDate: string;
  checkOutDate: string;
};

export type ReservationQuote = {
  totalAmount: number;
};

export type GetQuoteTotalApiResponse = ApiResponse<ReservationQuote>;

export type ReserveRequest = ReservationQuoteRequest & {
  propertyId: string;
  numberOfGuests: number;
  expectedTotalAmount: number;
};

export type ReserveApiResponse = ApiResponse<{
  id: string;
  reservationNumber: string;
  status: ReservationStatusId;
  paymentStatus: number;
}>;

export type ReservationSummary = {
  reservationId: string;
  reservationNumber: string;
  statusId: ReservationStatusId;
  property: Omit<ReservationProperty, 'description'> & {
    location: string;
    maximumGuests: number;
    bedrooms: number;
    beds: number;
    bathrooms: number;
  };
  guest: { name: string; phone: string; email: string };
  stay: ReservationStay;
  guests: ReservationGuests;
  price: {
    currency: string;
    items: {
      type: string;
      description: string;
      quantity: number;
      unitPrice: number;
      total: number;
    }[];
    accommodationAmount: number;
    feesAmount: number;
    taxesAmount: number;
    totalAmount: number;
  };
  payment: {
    status: string;
    expiresAt: string;
    remainingSeconds: number;
  };
};

export type GetReservationSummaryApiResponse = ApiResponse<ReservationSummary>;
export type ReservationCheckoutApiResponse = ApiResponse<{
  reservationId: string;
  paymentId: string;
  checkoutUrl: string;
  clientSecret: string;
  publicKey: string;
  amount: number;
  currency: string;
  expiresAt: string;
  remainingSeconds: number;
}>;
