'use client';

import { useId, useState } from 'react';

import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';

import CalenderDateRangeIcon from '@/components/icons/CalenderDateRangeIcon';
import CardIcon from '@/components/icons/CardIcon';
import Spinner from '@/components/icons/Spinner';
import StarIcon from '@/components/icons/StarIcon';
import UsersIcon from '@/components/icons/UsersIcon';
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
} from '@/types/reservations';

import {
  getCancellationContactHref,
  isUpcomingReservation,
} from '@/utils/reservations';

import { Link } from '@/i18n/routing';

// ─── Date formatting ───────────────────────────────────────────────────────────

function formatDateDisplay(dateStr: string, locale: string): string {
  const date = new Date(dateStr + 'T00:00:00');

  if (locale !== 'en') {
    return new Intl.DateTimeFormat(locale, {
      day: 'numeric',
      month: 'long',
    }).format(date);
  }

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
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const descriptionId = useId();
  const locale = useLocale();
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
  const statusId = details?.statusId ?? reservation.statusId;

  const checkInDate = details?.stay?.checkInDate ?? reservation.checkInDate;
  const checkOutDate = details?.stay?.checkOutDate ?? reservation.checkOutDate;

  const totalGuests = details?.guests?.total ?? 0;

  const priceSummaryItems = details?.priceSummary?.items ?? [];
  const taxes = details?.priceSummary?.taxes ?? 0;
  const finalPrice = details?.priceSummary?.finalPrice ?? 0;
  const currency = details?.priceSummary?.currency ?? '';

  const paymentStatus = details?.payment?.status ?? '';
  const paidAmount = details?.payment?.paidAmount ?? 0;
  const paymentCard = details?.payment?.card;
  const cardBrand = paymentCard?.brandCardName?.trim() ?? '';
  const cardLastFour = paymentCard?.cardNumber?.trim().slice(-4) ?? '';
  const paymentMethod = cardBrand || details?.payment?.method || '';
  const hasCardDetails = Boolean(cardBrand || cardLastFour);

  const isRtl = locale === 'ar';

  function formatNumber(value: number): string {
    return new Intl.NumberFormat(locale).format(value);
  }

  // Localize currency symbol: EGP -> ج.م
  function formatCurrency(amount: number, cur: string): string {
    const symbol = cur === 'EGP' && isRtl ? 'ج.م' : cur;
    return `${formatNumber(amount)} ${symbol}`;
  }

  function formatNightCount(count: number): string {
    if (isRtl) {
      return `${formatNumber(count)} ${count === 1 ? 'ليلة' : 'ليالٍ'}`;
    }

    return `${formatNumber(count)} ${count === 1 ? 'night' : 'nights'}`;
  }

  const canCancel = isUpcomingReservation(statusId);

  function getPriceSummaryItemTotal(
    item: (typeof priceSummaryItems)[0],
  ): number {
    if (item.type === 'ReservePrice' && item.pricePerNight != null) {
      return item.pricePerNight * item.quantity;
    }
    return item.total;
  }

  function formatPriceItemLabel(item: (typeof priceSummaryItems)[0]) {
    if (item.type === 'ReservePrice' && item.pricePerNight != null) {
      return (
        <span
          className='inline-flex flex-wrap items-center gap-1'
          dir='ltr'
        >
          <span dir={isRtl ? 'rtl' : 'ltr'}>
            {formatCurrency(item.pricePerNight, currency)}
          </span>
          <span>×</span>
          <span dir={isRtl ? 'rtl' : 'ltr'}>
            {formatNightCount(item.quantity)}
          </span>
        </span>
      );
    }
    if (item.quantity > 1) {
      return t('feeWithQuantity', {
        description: item.description,
        quantity: formatNumber(item.quantity),
      });
    }
    return item.description;
  }

  return (
    <>
      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          setIsOpen(open);
          if (!open) setIsDescriptionExpanded(false);
        }}
      >
        <DialogTrigger asChild>{trigger}</DialogTrigger>

        <DialogContent className='max-h-[calc(100dvh-4.5rem)] w-[calc(100%-2.5rem)] max-w-[42.5rem] overflow-y-auto rounded-[1.75rem] bg-white p-5 pt-6 sm:p-6 md:max-h-[90vh] md:w-full md:rounded-2xl [&>button>svg]:!size-6 [&>button>svg]:!text-neutral-900 md:[&>button>svg]:!size-4 [&>button]:top-8 md:[&>button]:top-4 [&>button]:ltr:left-auto [&>button]:ltr:right-8 md:[&>button]:ltr:right-4 [&>button]:rtl:left-8 [&>button]:rtl:right-auto md:[&>button]:rtl:left-4'>
          <DialogHeader className='mb-7 pe-10 md:mb-4'>
            <DialogTitle className='text-start text-2xl font-semibold leading-8 text-grayish-900 md:text-xl md:leading-none'>
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
              <div className='flex flex-col gap-4 md:flex-row'>
                <div className='relative h-48 w-full shrink-0 overflow-hidden rounded-2xl md:h-28 md:w-36 md:rounded-xl'>
                  <Image
                    src={propertyImage}
                    alt={propertyName}
                    fill
                    className='object-cover'
                    sizes='(max-width: 767px) calc(100vw - 5rem), 144px'
                  />
                </div>

                <div className='flex min-w-0 flex-1 flex-col gap-2 md:gap-1.5'>
                  <div className='flex items-center gap-1'>
                    <StarIcon
                      className='size-5 fill-neutral-500 md:size-4 md:fill-neutral-400'
                      fill='currentColor'
                    />
                    <span className='text-base font-medium text-grayish-500 md:text-sm md:text-grayish-900'>
                      {t('reviews', { rating, count: reviewsCount })}
                    </span>
                  </div>
                  <h3 className='text-xl font-semibold leading-7 text-grayish-900 md:text-lg md:leading-normal'>
                    {propertyName}
                  </h3>
                  {description && (
                    <div>
                      <p
                        id={descriptionId}
                        className={`break-words text-lg leading-6 text-grayish-500 md:text-sm md:leading-relaxed ${isDescriptionExpanded ? '' : 'line-clamp-2'}`}
                      >
                        {description}
                      </p>
                      <button
                        type='button'
                        aria-expanded={isDescriptionExpanded}
                        aria-controls={descriptionId}
                        onClick={() => setIsDescriptionExpanded((expanded) => !expanded)}
                        className='mt-1 text-sm font-medium text-grayish-900 underline underline-offset-2'
                      >
                        {isDescriptionExpanded ? t('seeLess') : t('seeMore')}
                      </button>
                    </div>
                  )}
                  <div className='mt-1'>
                    <StatusBadge
                      statusId={statusId}
                      className='px-3 py-1 text-base leading-6 md:px-2 md:py-0.5 md:text-xs md:leading-5'
                    />
                  </div>
                </div>
              </div>

              <Divider />

              {/* ── Check-in / Check-out ──────────────────────── */}
              <div className='flex flex-col gap-2'>
                <p className='text-lg font-medium text-grayish-900 md:text-base'>
                  {t('checkInOut')}
                </p>
                <div className='flex items-center gap-2 text-grayish-600'>
                  <CalenderDateRangeIcon className='size-6 shrink-0 md:size-5' />
                  <span className='text-base md:text-sm'>
                    {t('checkInOutValue', {
                      checkIn: formatDateDisplay(checkInDate, locale),
                      checkOut: formatDateDisplay(checkOutDate, locale),
                    })}
                  </span>
                </div>
              </div>

              <Divider />

              {/* ── Guests ────────────────────────────────────── */}
              <div className='flex flex-col gap-2'>
                <p className='text-lg font-medium text-grayish-900 md:text-base'>
                  {t('guests')}
                </p>
                <div className='flex items-center gap-2 text-grayish-600'>
                  <UsersIcon className='size-6 shrink-0 md:size-5' />
                  <span className='text-base md:text-sm'>
                    {totalGuests === 1
                      ? t('guestsCount', { count: totalGuests })
                      : t('guestsCountPlural', { count: totalGuests })}
                  </span>
                </div>
              </div>

              <Divider />

              {/* ── Price Summary ─────────────────────────────── */}
              <div className='flex flex-col gap-3'>
                <p className='text-lg font-medium text-grayish-900 md:text-base'>
                  {t('summary')}
                </p>
                <div className='flex flex-col gap-2'>
                  {priceSummaryItems.map((item, index) => (
                    <div
                      key={index}
                      className='flex items-center justify-between gap-4 text-base text-grayish-700 md:text-sm'
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
                  <div className='flex items-center justify-between gap-4 text-base text-grayish-700 md:text-sm'>
                    <span>{t('taxes')}</span>
                    <span>{formatCurrency(taxes, currency)}</span>
                  </div>
                </div>
              </div>

              <Divider />

              {/* ── Final Price ───────────────────────────────── */}
              <div className='flex items-center justify-between gap-4'>
                <span className='text-grayish-900'>{t('finalPrice')}</span>
                <span className='text-grayish-900'>
                  {formatCurrency(finalPrice, currency)}
                </span>
              </div>

              <Divider />

              {/* ── Payment ──────────────────────────────────── */}
              <div className='flex flex-col gap-3'>
                <p className='text-lg font-medium text-grayish-900 md:text-base'>
                  {t('payment')}
                </p>
                <div className='flex flex-col gap-2'>
                  {hasCardDetails ? (
                    <>
                      <div className='flex items-center gap-2.5'>
                        {paymentCard?.icon ? (
                          <Image
                            src={paymentCard.icon}
                            alt=''
                            width={36}
                            height={24}
                            unoptimized
                            className='h-6 w-9 shrink-0 rounded object-contain'
                          />
                        ) : (
                          <CardIcon
                            type={cardBrand}
                            className='h-6 w-9 shrink-0 rounded'
                          />
                        )}
                        <span className='text-base font-medium text-grayish-900 md:text-sm'>
                          {cardLastFour
                            ? t('paymentMethod', {
                                cardType: paymentMethod,
                                lastFour: cardLastFour,
                              })
                            : paymentMethod}
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className='flex items-center justify-between gap-4 text-base text-grayish-700 md:text-sm'>
                        <span>{t('paymentStatus')}</span>
                        <span className='font-medium'>{paymentStatus}</span>
                      </div>
                      <div className='flex items-center justify-between gap-4 text-base text-grayish-700 md:text-sm'>
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
                    <Link
                      href={getCancellationContactHref(
                        reservation.reservationId,
                        propertyName,
                      )}
                      className='text-sm font-medium text-grayish-900 underline underline-offset-2 transition-colors hover:text-error-500'
                    >
                      {t('cancelReservation')}
                    </Link>
                  </div>
                </>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
