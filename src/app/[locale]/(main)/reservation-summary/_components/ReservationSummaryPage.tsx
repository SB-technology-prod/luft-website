'use client';

import { useRef, useState } from 'react';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';

import { format, parseISO } from 'date-fns';
import { CalendarDays, SquarePen, Star } from 'lucide-react';

import { useMutation } from '@tanstack/react-query';

import Spinner from '@/components/shared/Spinner';
import SubmitButton from '@/components/shared/SubmitButton';
import { Button } from '@/components/ui/button';

import ReservationSummaryIcon from './ReservationSummaryIcon';

import { useReservationSummary } from '@/hooks/useReservationSummary';
import useSession from '@/hooks/useSession';

import { getReservationEditHref } from '@/utils/reservationSelection';

import { createReservationCheckout } from '@/api/reservationSummary';
import { Link, usePathname } from '@/i18n/routing';

export default function ReservationSummaryPage() {
  const locale = useLocale();
  const t = useTranslations('reservationSummary');
  const params = useSearchParams();
  const pathname = usePathname();
  const session = useSession();
  const reservationId = params.get('reservationId')?.trim() || null;
  const summary = useReservationSummary(reservationId, locale);
  const data = summary.data;
  const selection = data
    ? {
        propertyId: data.property.id,
        checkIn: data.stay.checkInDate.slice(0, 10),
        checkOut: data.stay.checkOutDate.slice(0, 10),
        guests: data.guests.total,
      }
    : null;
  const checkout = useMutation({
    mutationFn: (id: string) => createReservationCheckout(id),
    retry: false,
  });
  const [error, setError] = useState<string>();
  const [isConfirming, setIsConfirming] = useState(false);
  const confirming = useRef(false);
  const editHref = selection ? getReservationEditHref(selection) : '/';

  const number = (value: number) => new Intl.NumberFormat(locale).format(value);
  const money = (amount: number) =>
    new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: summary.data!.price.currency,
      currencyDisplay: 'symbol',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })
      .formatToParts(amount)
      .map((part, index, parts) => {
        if (part.type !== 'currency') return part.value;
        if (parts[index + 1]?.type === 'integer') return `${part.value} `;
        if (['integer', 'fraction'].includes(parts[index - 1]?.type))
          return ` ${part.value}`;
        return part.value;
      })
      .join('');
  const date = (value: string) => {
    const parsed = parseISO(value.slice(0, 10));
    const showYear =
      data?.stay.checkInDate.slice(0, 4) !==
      data?.stay.checkOutDate.slice(0, 4);
    return locale === 'en'
      ? format(parsed, showYear ? 'do MMMM yyyy' : 'do MMMM')
      : new Intl.DateTimeFormat(locale, {
          day: 'numeric',
          month: 'long',
          ...(showYear ? { year: 'numeric' } : {}),
        }).format(parsed);
  };

  async function confirmReservation() {
    if (
      confirming.current ||
      checkout.isSuccess ||
      !reservationId ||
      !selection ||
      !summary.data
    )
      return;
    setError(undefined);
    confirming.current = true;
    setIsConfirming(true);
    try {
      const previousTotal = summary.data.price.totalAmount;
      const previousCurrency = summary.data.price.currency;
      const latest = await summary.refetch();
      if (latest.isError || !latest.data) throw new Error();
      if (selection.guests > latest.data.property.maximumGuests) {
        setError(t('invalidSelection'));
        return;
      }
      if (
        previousTotal !== latest.data.price.totalAmount ||
        previousCurrency !== latest.data.price.currency
      ) {
        setError(t('priceChanged'));
        return;
      }
      const response = await checkout.mutateAsync(reservationId);
      if (
        typeof response.result?.checkoutUrl !== 'string' ||
        !response.result.checkoutUrl.trim()
      )
        throw new Error();
      const checkoutUrl = new URL(
        response.result.checkoutUrl,
        window.location.origin,
      );
      if (
        checkoutUrl.protocol !== 'https:' &&
        !(
          checkoutUrl.protocol === 'http:' &&
          checkoutUrl.origin === window.location.origin
        )
      )
        throw new Error();
      window.location.assign(checkoutUrl.href);
    } catch {
      setError(t('confirmError'));
    } finally {
      confirming.current = false;
      setIsConfirming(false);
    }
  }

  const invalid =
    !reservationId || (data && data.guests.total > data.property.maximumGuests);

  return (
    <div
      className='min-h-[70vh] w-full bg-grayish-30 p-3 text-grayish-900'
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
    >
      <div className='mx-auto w-full max-w-[708px]'>
        <h1 className='sr-only'>{t('title')}</h1>
        <section
          aria-label={t('details')}
          className='w-full rounded-3xl bg-white px-4 pb-[22px] pt-7 sm:px-[22px]'
        >
          {invalid ? (
            <div className='flex flex-col items-start gap-4'>
              <p role='alert'>{t('invalidSelection')}</p>
              <Button asChild>
                <Link href={editHref}>{t('edit')}</Link>
              </Button>
            </div>
          ) : !session ? (
            <div className='flex flex-col items-start gap-4'>
              <p>{t('loginRequired')}</p>
              <Button asChild>
                <Link
                  href={{
                    pathname: '/login',
                    query: { redirect: `${pathname}?${params.toString()}` },
                  }}
                >
                  {t('login')}
                </Link>
              </Button>
            </div>
          ) : summary.isError ? (
            <div className='flex flex-col items-start gap-4'>
              <p role='alert'>{t('loadError')}</p>
              <Button onClick={() => summary.refetch()}>{t('retry')}</Button>
            </div>
          ) : !data ? (
            <div
              role='status'
              className='flex min-h-64 flex-col items-center justify-center gap-4'
            >
              <Spinner />
              <span>{t('loading')}</span>
            </div>
          ) : (
            <>
              <div className='mb-7 flex items-center justify-between gap-4'>
                <h2 className='text-[26px] font-medium leading-[34px]'>
                  {t('details')}
                </h2>
                <Link
                  href={editHref}
                  aria-disabled={isConfirming || checkout.isSuccess}
                  onClick={(event) => {
                    if (isConfirming || checkout.isSuccess)
                      event.preventDefault();
                  }}
                  className='me-4 flex items-center gap-1 text-sm underline underline-offset-2 aria-disabled:pointer-events-none aria-disabled:opacity-50'
                >
                  <SquarePen className='size-4' />
                  {t('edit')}
                </Link>
              </div>
              <div className='flex items-center gap-4 pb-4'>
                {data.property.imageUrl && (
                  <div className='relative h-[120px] w-[146px] shrink-0 overflow-hidden rounded-2xl max-sm:h-24 max-sm:w-24'>
                    <Image
                      src={data.property.imageUrl}
                      alt={data.property.name}
                      fill
                      sizes='(max-width: 599px) 96px, 146px'
                      className='object-cover'
                    />
                  </div>
                )}
                <div className='min-w-0'>
                  <p className='mb-1 flex items-center gap-1 text-sm text-grayish-400'>
                    <Star className='size-4 fill-current' />
                    {t('reviews', {
                      rating: number(data.property.rating),
                      count: number(data.property.reviewsCount),
                    })}
                  </p>
                  <h3 className='text-lg font-medium leading-7 sm:text-[22px]'>
                    {data.property.name}
                  </h3>
                  <p className='mt-2 flex flex-wrap gap-x-1 text-sm leading-5'>
                    <span>
                      {t('propertyGuests', {
                        count: data.property.maximumGuests,
                      })}
                    </span>
                    <span aria-hidden>·</span>
                    <span>
                      {t('bedrooms', {
                        count: data.property.bedrooms,
                      })}
                    </span>
                    <span aria-hidden>·</span>
                    <span>
                      {t('bathrooms', {
                        count: data.property.bathrooms,
                      })}
                    </span>
                  </p>
                </div>
              </div>
              <div className='space-y-2 border-t border-grayish-50 py-4'>
                <h3 className='text-lg font-medium leading-6'>
                  {t('guestDetails')}
                </h3>
                <p className='flex items-center gap-1 text-base leading-6 text-grayish-400'>
                  <ReservationSummaryIcon name='guest' />
                  <bdi>{data.guest.name || t('notProvided')}</bdi>
                </p>
                <p className='flex items-center gap-1 text-base leading-6 text-grayish-400'>
                  <ReservationSummaryIcon name='phone' />
                  <bdi dir='ltr'>{data.guest.phone || t('notProvided')}</bdi>
                </p>
                <p className='flex items-center gap-1 text-base leading-6 text-grayish-400'>
                  <ReservationSummaryIcon name='email' />
                  <bdi
                    className='break-all'
                    dir='ltr'
                  >
                    {data.guest.email || t('notProvided')}
                  </bdi>
                </p>
              </div>
              <div className='space-y-2 border-t border-grayish-50 pb-4 pt-4'>
                <h3 className='text-lg font-medium leading-6'>
                  {t('checkInOut')}
                </h3>
                <p className='flex items-center gap-1 text-sm leading-6 text-grayish-400'>
                  <CalendarDays
                    className='size-[22px] shrink-0'
                    aria-hidden
                  />
                  {t('dateRange', {
                    checkIn: date(data.stay.checkInDate),
                    checkOut: date(data.stay.checkOutDate),
                  })}
                </p>
                <h3 className='pt-2 text-lg font-medium leading-6'>
                  {t('totalGuests')}
                </h3>
                <p className='flex items-center gap-1 text-base leading-6 text-grayish-400'>
                  <ReservationSummaryIcon name='guests' />
                  {number(data.guests.total)}
                </p>
              </div>
              <div className='border-t border-grayish-50 pt-4'>
                <h3 className='mb-2 text-lg font-medium leading-6'>
                  {t('summary')}
                </h3>
                <dl className='space-y-1 text-sm leading-[19px]'>
                  {data.price.items.map((item, index) => (
                    <div
                      key={`${item.type}-${index}`}
                      className='flex justify-between gap-4'
                    >
                      <dt className='text-grayish-400'>
                        {item.type === 'Accommodation'
                          ? t('nightlyPrice', {
                              price: money(item.unitPrice),
                              count: item.quantity,
                            })
                          : item.type === 'Tax'
                            ? item.description || t('taxes')
                            : t('feePrice', {
                                price: money(item.unitPrice),
                                quantity: number(item.quantity),
                                description: item.description,
                              })}
                      </dt>
                      <dd className='shrink-0'>
                        <bdi>{money(item.total)}</bdi>
                      </dd>
                    </div>
                  ))}
                  <div className='!mt-2 flex justify-between gap-4 border-t border-grayish-50 pt-2 text-base leading-6'>
                    <dt>{t('finalPrice')}</dt>
                    <dd>
                      <bdi>{money(data.price.totalAmount)}</bdi>
                    </dd>
                  </div>
                </dl>
              </div>
              {error && (
                <p
                  role='alert'
                  className='mt-4 text-sm text-error-500'
                >
                  {error}
                </p>
              )}
              <div className='mt-6 flex justify-end'>
                <SubmitButton
                  type='button'
                  onClick={confirmReservation}
                  isSubmitting={isConfirming}
                  disabled={
                    isConfirming || checkout.isSuccess || summary.isFetching
                  }
                  className='h-[52px] w-full text-sm shadow-none sm:w-[49%]'
                >
                  {t('confirm')}
                </SubmitButton>
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
}
