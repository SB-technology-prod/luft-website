'use client';

import { useRef, useState } from 'react';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';

import { parseISO } from 'date-fns';
import {
  ArrowLeft,
  CalendarDays,
  Mail,
  Pencil,
  Phone,
  Star,
  UserRound,
  UsersRound,
} from 'lucide-react';

import { useMutation } from '@tanstack/react-query';

import Spinner from '@/components/shared/Spinner';
import SubmitButton from '@/components/shared/SubmitButton';
import { Button } from '@/components/ui/button';

import { useReservationSummary } from '@/hooks/useReservationSummary';
import useSession from '@/hooks/useSession';

import { getReservationEditHref } from '@/utils/reservationSelection';

import { createReservationCheckout } from '@/api/reservationSummary';
import { Link, usePathname } from '@/i18n/routing';

export default function ReservationSummaryPage() {
  const locale = useLocale();
  const t = useTranslations('reservationSummary');
  const propertyT = useTranslations('pages.propertyDetails.propertyInfo');
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
      maximumFractionDigits: 2,
    }).format(amount);
  const date = (value: string) =>
    new Intl.DateTimeFormat(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(parseISO(value.slice(0, 10)));

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
      className='min-h-[70vh] w-full bg-grayish-30 py-6 text-grayish-900 md:py-8'
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
    >
      <div className='container'>
        <Link
          href={editHref}
          aria-label={t('back')}
          className='mb-4 flex size-9 items-center justify-center rounded-full border border-grayish-900'
        >
          <ArrowLeft className='size-4 rtl:rotate-180' />
        </Link>
        <h1 className='text-2xl font-medium'>{t('title')}</h1>
        <section
          aria-label={t('details')}
          className='mx-auto mt-8 w-full max-w-[34rem] rounded-3xl bg-white p-5 md:mt-10 md:p-6'
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
              <div className='mb-6 flex items-center justify-between gap-4'>
                <h2 className='text-xl font-medium'>{t('details')}</h2>
                <Link
                  href={editHref}
                  aria-disabled={isConfirming || checkout.isSuccess}
                  onClick={(event) => {
                    if (isConfirming || checkout.isSuccess)
                      event.preventDefault();
                  }}
                  className='flex items-center gap-1 text-sm underline underline-offset-2'
                >
                  <Pencil className='size-4' />
                  {t('edit')}
                </Link>
              </div>
              <div className='flex items-center gap-4 pb-4'>
                {data.property.imageUrl && (
                  <div className='relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl max-sm:h-24 max-sm:w-24'>
                    <Image
                      src={data.property.imageUrl}
                      alt={data.property.name}
                      fill
                      sizes='112px'
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
                  <h3 className='text-lg font-medium'>{data.property.name}</h3>
                  <p className='text-sm text-grayish-400'>
                    {data.property.location}
                  </p>
                  <p className='mt-1 flex flex-wrap gap-x-1 text-sm'>
                    <span>
                      {propertyT('guests', {
                        count: number(data.property.maximumGuests),
                      })}
                    </span>
                    <span aria-hidden>·</span>
                    <span>
                      {propertyT('bedrooms', {
                        count: number(data.property.bedrooms),
                      })}
                    </span>
                    <span aria-hidden>·</span>
                    <span>
                      {propertyT('bathrooms', {
                        count: number(data.property.bathrooms),
                      })}
                    </span>
                  </p>
                </div>
              </div>
              <div className='space-y-2 border-t border-grayish-50 py-4'>
                <h3 className='font-medium'>{t('guestDetails')}</h3>
                <p className='flex items-center gap-2 text-grayish-400'>
                  <UserRound className='size-4 shrink-0' />
                  <bdi>{data.guest.name || t('notProvided')}</bdi>
                </p>
                <p className='flex items-center gap-2 text-grayish-400'>
                  <Phone className='size-4 shrink-0' />
                  <bdi dir='ltr'>{data.guest.phone || t('notProvided')}</bdi>
                </p>
                <p className='flex items-center gap-2 text-grayish-400'>
                  <Mail className='size-4 shrink-0' />
                  <bdi
                    className='break-all'
                    dir='ltr'
                  >
                    {data.guest.email || t('notProvided')}
                  </bdi>
                </p>
              </div>
              <div className='space-y-2 border-t border-grayish-50 py-4'>
                <h3 className='font-medium'>{t('checkInOut')}</h3>
                <p className='flex items-center gap-2 text-sm text-grayish-400'>
                  <CalendarDays className='size-4 shrink-0' />
                  {t('dateRange', {
                    checkIn: date(data.stay.checkInDate),
                    checkOut: date(data.stay.checkOutDate),
                  })}
                </p>
                <h3 className='pt-2 font-medium'>{t('totalGuests')}</h3>
                <p className='flex items-center gap-2 text-grayish-400'>
                  <UsersRound className='size-4 shrink-0' />
                  {number(data.guests.total)}
                </p>
              </div>
              <div className='border-t border-grayish-50 pt-4'>
                <h3 className='mb-2 font-medium'>{t('summary')}</h3>
                <dl className='space-y-1 text-sm'>
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
                          : item.quantity > 1
                            ? t('feeWithQuantity', {
                                description: item.description,
                                quantity: number(item.quantity),
                              })
                            : item.description}
                      </dt>
                      <dd className='shrink-0'>
                        <bdi>{money(item.total)}</bdi>
                      </dd>
                    </div>
                  ))}
                  <div className='!mt-3 flex justify-between gap-4 border-t border-grayish-50 pt-3 text-base'>
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
                  className='h-12 w-full text-sm sm:w-1/2'
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
