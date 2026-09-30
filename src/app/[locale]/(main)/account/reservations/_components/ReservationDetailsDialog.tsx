'use client';

import { useState } from 'react';
import Image from 'next/image';

import { CalendarIcon, Star, Users, Loader2 } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useReservationDetails } from '@/hooks/useReservationDetails';
import { cn } from '@/lib/utils';
import {
  type ReservationListItem,
  type ReservationDetails,
} from '@/types/reservations';

const statusConfig: Record<
  string,
  { label: string; className: string }
> = {
  upcoming: {
    label: 'Upcoming',
    className: 'border border-grayish-900 text-grayish-900 bg-transparent',
  },
  ongoing: {
    label: 'Ongoing',
    className: 'border border-warning-500 text-warning-600 bg-transparent',
  },
  completed: {
    label: 'Completed',
    className: 'border border-success-500 text-success-600 bg-transparent',
  },
  canceled: {
    label: 'Canceled',
    className: 'border border-error-500 text-error-500 bg-transparent',
  },
};

function StatusBadge({ status }: { status: string }) {
  const config = statusConfig[status.toLowerCase()] || statusConfig['upcoming'];
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-sm font-medium',
        config.className,
      )}
    >
      {config.label}
    </span>
  );
}

/**
 * Format a date string like "2026-10-13" into "13th October"
 */
function formatDateDisplay(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00');
  const day = date.getDate();
  const month = date.toLocaleString('en-US', { month: 'long' });

  const suffix = getDaySuffix(day);
  return `${day}${suffix} ${month}`;
}

function getDaySuffix(day: number): string {
  if (day >= 11 && day <= 13) return 'th';
  switch (day % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
}

interface ReservationDetailsDialogProps {
  reservation: ReservationListItem;
  trigger: React.ReactNode;
}

export default function ReservationDetailsDialog({
  reservation,
  trigger,
}: ReservationDetailsDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  const { data, isLoading, isError } = useReservationDetails(
    reservation.reservationId,
    isOpen,
  );

  const details: ReservationDetails | undefined = data?.result;

  // Fallback values from list item when details haven't loaded yet
  const propertyName = details?.property?.name ?? reservation.propertyName;
  const propertyImage =
    details?.property?.imageUrl ?? reservation.propertyImageUrl;
  const description = details?.property?.description ?? '';
  const rating = details?.property?.rating ?? 0;
  const reviewsCount = details?.property?.reviewsCount ?? 0;
  const status = details?.status ?? reservation.status;

  const checkInDate = details?.stay?.checkInDate ?? reservation.checkInDate;
  const checkOutDate = details?.stay?.checkOutDate ?? reservation.checkOutDate;

  const totalGuests = details?.guests?.total ?? 0;

  const priceSummaryItems = details?.priceSummary?.items ?? [];
  const taxes = details?.priceSummary?.taxes ?? 0;
  const finalPrice = details?.priceSummary?.finalPrice ?? 0;
  const currency = details?.priceSummary?.currency ?? '';

  const paymentStatus = details?.payment?.status ?? '';
  const paidAmount = details?.payment?.paidAmount ?? 0;

  const canCancel = details?.cancellation?.canCancel ?? false;

  /**
   * Build description text for a price summary item.
   * For ReservePrice: "100 EGP × 3 nights"
   * For Fee: "Cleaning Fee"
   */
  function formatPriceItemLabel(item: (typeof priceSummaryItems)[0]): string {
    if (item.type === 'ReservePrice' && item.pricePerNight != null) {
      return `${item.pricePerNight} ${currency} × ${item.quantity} night${item.quantity !== 1 ? 's' : ''}`;
    }
    // For fees and other types, show quantity if > 1
    if (item.quantity > 1) {
      return `${item.description} × ${item.quantity}`;
    }
    return item.description;
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className='max-h-[90vh] w-full max-w-[42.5rem] overflow-y-auto rounded-2xl bg-white p-6 sm:rounded-2xl'>
        <DialogHeader className='mb-4'>
          <DialogTitle className='text-xl font-semibold text-grayish-900'>
            Reservation Details
          </DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className='flex h-40 items-center justify-center'>
            <Loader2 className='size-8 animate-spin text-grayish-400' />
          </div>
        ) : isError ? (
          <div className='flex h-40 items-center justify-center text-error-500'>
            Failed to load reservation details.
          </div>
        ) : (
          <>
            {/* Property Info */}
            <div className='flex gap-4'>
              <div className='relative h-28 w-36 shrink-0 overflow-hidden rounded-xl'>
                <Image
                  src={propertyImage}
                  alt={propertyName}
                  fill
                  className='object-cover'
                  sizes='144px'
                />
              </div>
              <div className='flex flex-col gap-1'>
                {reviewsCount > 0 && (
                  <div className='flex items-center gap-1'>
                    <Star className='size-4 fill-amber-400 stroke-amber-400' />
                    <span className='text-sm font-medium text-grayish-900'>
                      {rating} ({reviewsCount})
                    </span>
                  </div>
                )}
                <h3 className='text-lg font-semibold text-grayish-900'>
                  {propertyName}
                </h3>
                {description && (
                  <p className='text-sm text-grayish-500'>{description}</p>
                )}
                <div className='mt-1'>
                  <StatusBadge status={status} />
                </div>
              </div>
            </div>

            <div className='my-4 h-px bg-grayish-100' />

            {/* Check In - Check Out */}
            <div className='flex flex-col gap-2'>
              <p className='font-medium text-grayish-900'>
                Check-in - Check-out
              </p>
              <div className='flex items-center gap-2 text-grayish-600'>
                <CalendarIcon className='size-4 shrink-0' />
                <span className='text-sm'>
                  {formatDateDisplay(checkInDate)} To{' '}
                  {formatDateDisplay(checkOutDate)}
                </span>
              </div>
            </div>

            <div className='my-4 h-px bg-grayish-100' />

            {/* Guests */}
            <div className='flex flex-col gap-2'>
              <p className='font-medium text-grayish-900'>Guests</p>
              <div className='flex items-center gap-2 text-grayish-600'>
                <Users className='size-4 shrink-0' />
                <span className='text-sm'>
                  {totalGuests} Guest{totalGuests !== 1 ? 's' : ''}
                </span>
              </div>
            </div>

            <div className='my-4 h-px bg-grayish-100' />

            {/* Summary */}
            <div className='flex flex-col gap-3'>
              <p className='font-medium text-grayish-900'>Summary</p>
              <div className='flex flex-col gap-2'>
                {priceSummaryItems.map((item, index) => (
                  <div
                    key={index}
                    className='flex items-center justify-between text-sm text-grayish-700'
                  >
                    <span>{formatPriceItemLabel(item)}</span>
                    <span>
                      {item.total} {currency}
                    </span>
                  </div>
                ))}
                <div className='flex items-center justify-between text-sm text-grayish-700'>
                  <span>Taxes</span>
                  <span>
                    {taxes} {currency}
                  </span>
                </div>
              </div>
            </div>

            <div className='my-4 h-px bg-grayish-100' />

            {/* Final Price */}
            <div className='flex items-center justify-between'>
              <span className='font-medium text-grayish-900'>Final Price</span>
              <span className='font-semibold text-grayish-900'>
                {finalPrice} {currency}
              </span>
            </div>

            <div className='my-4 h-px bg-grayish-100' />

            {/* Payment Status */}
            <div className='flex flex-col gap-3'>
              <p className='font-medium text-grayish-900'>Payment</p>
              <div className='flex items-center justify-between text-sm text-grayish-700'>
                <span>Status</span>
                <span className='font-medium'>{paymentStatus}</span>
              </div>
              <div className='flex items-center justify-between text-sm text-grayish-700'>
                <span>Paid Amount</span>
                <span>
                  {paidAmount} {currency}
                </span>
              </div>
            </div>

            {/* Cancel Reservation */}
            {canCancel && (
              <div className='mt-4'>
                <button className='text-sm text-grayish-900 underline underline-offset-2 transition-colors hover:text-error-500'>
                  Cancel Reservation
                </button>
              </div>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
