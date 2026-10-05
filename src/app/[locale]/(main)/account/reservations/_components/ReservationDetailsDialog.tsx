'use client';

import { useState } from 'react';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

import CalenderDateRangeIcon from '@/components/icons/CalenderDateRangeIcon';
import StarIcon from '@/components/icons/StarIcon';
import UsersIcon from '@/components/icons/UsersIcon';
import ConfirmModal from '@/components/shared/ConfirmModal';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import StatusBadge from './StatusBadge';

import { useReservationDetails } from '@/hooks/useReservationDetails';

import {
  type ReservationDetails,
  type ReservationListItem,
  type ReservationStatus,
} from '@/types/reservations';

// ─── Mastercard Icon ───────────────────────────────────────────────────────────

function MastercardIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox='0 0 38 24'
      xmlns='http://www.w3.org/2000/svg'
      role='img'
      aria-label='Mastercard'
    >
      <rect
        width='38'
        height='24'
        rx='4'
        fill='#252525'
      />
      <circle
        cx='15'
        cy='12'
        r='7'
        fill='#EB001B'
      />
      <circle
        cx='23'
        cy='12'
        r='7'
        fill='#F79E1B'
      />
      <path
        d='M19 6.8a7 7 0 0 1 0 10.4A7 7 0 0 1 19 6.8z'
        fill='#FF5F00'
      />
    </svg>
  );
}

// ─── Visa Icon ─────────────────────────────────────────────────────────────────

function VisaIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox='0 0 38 24'
      xmlns='http://www.w3.org/2000/svg'
      role='img'
      aria-label='Visa'
    >
      <rect
        width='38'
        height='24'
        rx='4'
        fill='#1A1F71'
      />
      <text
        x='19'
        y='17'
        textAnchor='middle'
        fill='white'
        fontSize='12'
        fontWeight='bold'
        fontFamily='Arial, sans-serif'
        letterSpacing='1'
      >
        VISA
      </text>
    </svg>
  );
}

function CardIcon({ type, className }: { type: string; className?: string }) {
  const lower = type.toLowerCase();
  if (lower.includes('visa')) return <VisaIcon className={className} />;
  return <MastercardIcon className={className} />;
}

// ─── Spinner ───────────────────────────────────────────────────────────────────

function Spinner() {
  return (
    <svg
      className='size-8 animate-spin text-grayish-400'
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
    >
      <circle
        className='opacity-25'
        cx='12'
        cy='12'
        r='10'
        stroke='currentColor'
        strokeWidth='4'
      />
      <path
        className='opacity-75'
        fill='currentColor'
        d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z'
      />
    </svg>
  );
}

// ─── Date formatting ───────────────────────────────────────────────────────────

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

// ─── Divider ───────────────────────────────────────────────────────────────────

function Divider() {
  return <div className='h-px bg-grayish-100' />;
}

// ─── Main component ────────────────────────────────────────────────────────────

interface ReservationDetailsDialogProps {
  reservation: ReservationListItem;
  trigger: React.ReactNode;
}

export default function ReservationDetailsDialog({
  reservation,
  trigger,
}: ReservationDetailsDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCancelConfirmOpen, setIsCancelConfirmOpen] = useState(false);
  const [localStatus, setLocalStatus] = useState<ReservationStatus | null>(
    null,
  );
  const t = useTranslations('reservations.details');

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
  const status = localStatus ?? details?.status ?? reservation.status;

  const checkInDate = details?.stay?.checkInDate ?? reservation.checkInDate;
  const checkOutDate = details?.stay?.checkOutDate ?? reservation.checkOutDate;
  const numberOfNights = details?.stay?.numberOfNights ?? 0;

  const totalGuests = details?.guests?.total ?? 0;

  const priceSummaryItems = details?.priceSummary?.items ?? [];
  const taxes = details?.priceSummary?.taxes ?? 0;
  const finalPrice = details?.priceSummary?.finalPrice ?? 0;
  const currency = details?.priceSummary?.currency ?? '';

  const paymentStatus = details?.payment?.status ?? '';
  const paidAmount = details?.payment?.paidAmount ?? 0;
  const paymentCard = details?.payment?.card;

  // Localize currency symbol: EGP → ج.م
  function formatCurrency(amount: number, cur: string): string {
    const symbol = cur === 'EGP' ? 'ج.م' : cur;
    return `${amount} ${symbol}`;
  }

  const canCancel =
    status.toLowerCase() !== 'canceled' &&
    (details?.cancellation?.canCancel ?? false);

  function handleCancelReservation() {
    setLocalStatus('Canceled');
    setIsCancelConfirmOpen(false);
  }

  function getPriceSummaryItemTotal(
    item: (typeof priceSummaryItems)[0],
  ): number {
    if (item.type === 'ReservePrice' && item.pricePerNight != null) {
      return item.pricePerNight * item.quantity;
    }
    return item.total;
  }

  function formatPriceItemLabel(item: (typeof priceSummaryItems)[0]): string {
    if (item.type === 'ReservePrice' && item.pricePerNight != null) {
      const key = item.quantity === 1 ? 'reservePrice' : 'reservePricePlural';
      return t(key, {
        price: item.pricePerNight,
        currency,
        nights: item.quantity,
      });
    }
    if (item.quantity > 1) {
      return t('feeWithQuantity', {
        description: item.description,
        quantity: item.quantity,
      });
    }
    return item.description;
  }

  return (
    <>
      <Dialog
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <DialogTrigger asChild>{trigger}</DialogTrigger>

        <DialogContent className='max-h-[90vh] w-full max-w-[42.5rem] overflow-y-auto rounded-2xl bg-white p-6 sm:rounded-2xl [&>button>svg]:!text-neutral-900'>
          <DialogHeader className='mb-4'>
            <DialogTitle className='text-xl font-semibold text-grayish-900'>
              {t('title')}
            </DialogTitle>
          </DialogHeader>

          {isLoading ? (
            <div className='flex h-40 items-center justify-center'>
              <Spinner />
            </div>
          ) : isError ? (
            <div className='flex h-40 items-center justify-center text-error-500'>
              {t('loadError')}
            </div>
          ) : (
            <div className='flex flex-col gap-4'>
              {/* ── Property Info ─────────────────────────────── */}
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

                <div className='flex flex-col gap-1.5'>
                  <div className='flex items-center gap-1'>
                    <StarIcon
                      className='size-4 fill-neutral-400'
                      fill='currentColor'
                    />
                    <span className='text-sm font-medium text-grayish-900'>
                      {t('reviews', { rating, count: reviewsCount })}
                    </span>
                  </div>
                  <h3 className='text-lg font-semibold text-grayish-900'>
                    {propertyName}
                  </h3>
                  {description && (
                    <p className='text-sm leading-relaxed text-grayish-500'>
                      {description}
                    </p>
                  )}
                  <div className='mt-1'>
                    <StatusBadge status={status} />
                  </div>
                </div>
              </div>

              <Divider />

              {/* ── Check-in / Check-out ──────────────────────── */}
              <div className='flex flex-col gap-2'>
                <p className='font-medium text-grayish-900'>
                  {t('checkInOut')}
                </p>
                <div className='flex items-center gap-2 text-grayish-600'>
                  <CalenderDateRangeIcon className='size-5 shrink-0' />
                  <span className='text-sm'>
                    {t('checkInOutValue', {
                      checkIn: formatDateDisplay(checkInDate),
                      checkOut: formatDateDisplay(checkOutDate),
                    })}
                  </span>
                </div>
              </div>

              <Divider />

              {/* ── Guests ────────────────────────────────────── */}
              <div className='flex flex-col gap-2'>
                <p className='font-medium text-grayish-900'>{t('guests')}</p>
                <div className='flex items-center gap-2 text-grayish-600'>
                  <UsersIcon className='size-5 shrink-0' />
                  <span className='text-sm'>
                    {totalGuests === 1
                      ? t('guestsCount', { count: totalGuests })
                      : t('guestsCountPlural', { count: totalGuests })}
                  </span>
                </div>
              </div>

              <Divider />

              {/* ── Price Summary ─────────────────────────────── */}
              <div className='flex flex-col gap-3'>
                <p className='font-medium text-grayish-900'>{t('summary')}</p>
                <div className='flex flex-col gap-2'>
                  {priceSummaryItems.map((item, index) => (
                    <div
                      key={index}
                      className='flex items-center justify-between text-sm text-grayish-700'
                    >
                      <span>{formatPriceItemLabel(item)}</span>
                      <span>
                        {formatCurrency(
                          getPriceSummaryItemTotal(item),
                          currency,
                        )}
                      </span>
                    </div>
                  ))}
                  <div className='flex items-center justify-between text-sm text-grayish-700'>
                    <span>{t('taxes')}</span>
                    <span>{formatCurrency(taxes, currency)}</span>
                  </div>
                </div>
              </div>

              <Divider />

              {/* ── Final Price ───────────────────────────────── */}
              <div className='flex items-center justify-between'>
                <span className='text-grayish-900'>{t('finalPrice')}</span>
                <span className='text-grayish-900'>
                  {formatCurrency(finalPrice, currency)}
                </span>
              </div>

              <Divider />

              {/* ── Payment ──────────────────────────────────── */}
              <div className='flex flex-col gap-3'>
                <p className='font-medium text-grayish-900'>{t('payment')}</p>
                <div className='flex flex-col gap-2'>
                  {paymentCard ? (
                    <>
                      <div className='flex items-center gap-2.5'>
                        <CardIcon
                          type={paymentCard.type}
                          className='h-6 w-9 shrink-0 rounded'
                        />
                        <span className='text-sm font-medium text-grayish-900'>
                          {t('paymentMethod', {
                            cardType: paymentCard.type,
                            lastFour: paymentCard.lastFourDigits,
                          })}
                        </span>
                      </div>
                      <p className='text-sm text-grayish-500'>
                        {t('paymentExpiry', { expiry: paymentCard.expiryDate })}
                      </p>
                    </>
                  ) : (
                    <>
                      <div className='flex items-center justify-between text-sm text-grayish-700'>
                        <span>{t('paymentStatus')}</span>
                        <span className='font-medium'>{paymentStatus}</span>
                      </div>
                      <div className='flex items-center justify-between text-sm text-grayish-700'>
                        <span>{t('paidAmount')}</span>
                        <span>{formatCurrency(paidAmount, currency)}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* ── Cancel Reservation ───────────────────────── */}
              {canCancel && (
                <>
                  <Divider />
                  <div>
                    <button
                      type='button'
                      className='text-sm font-medium text-grayish-900 underline underline-offset-2 transition-colors hover:text-error-500'
                      onClick={() => setIsCancelConfirmOpen(true)}
                    >
                      {t('cancelReservation')}
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      <ConfirmModal
        isOpen={isCancelConfirmOpen}
        onCancel={() => setIsCancelConfirmOpen(false)}
        onConfirm={handleCancelReservation}
        variant='destructive'
      >
        <div className='flex flex-col items-center gap-2 text-center'>
          <h6 className='text-xl font-medium'>
            {t('cancelReservationConfirm.title')}
          </h6>
        </div>
      </ConfirmModal>
    </>
  );
}
