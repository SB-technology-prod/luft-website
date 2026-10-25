'use client';

import { useEffect, useState } from 'react';

import { useTranslations } from 'next-intl';

// import HandBellIcon from '@/components/icons/HandBellIcon';
import HomeIcon from '@/components/icons/HomeIcon';
import Spinner from '@/components/shared/Spinner';
import StatusLayout from '@/components/shared/StatusLayout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import ReservationCard from './ReservationCard';

import { useMyReservations } from '@/hooks/useMyReservations';

function ReservationCardSkeleton() {
  return (
    <div className='flex w-full flex-col items-start gap-3 py-4 sm:gap-4 md:flex-row'>
      {/* Image placeholder */}
      <div className='h-44 w-full shrink-0 animate-pulse rounded-xl bg-grayish-100 sm:h-56 md:h-28 md:w-36' />
      {/* Text placeholders */}
      <div className='flex flex-1 flex-col gap-2.5 pt-1'>
        <div className='h-4 w-2/3 animate-pulse rounded-md bg-grayish-100' />
        <div className='h-4 w-1/2 animate-pulse rounded-md bg-grayish-100' />
        <div className='h-4 w-1/3 animate-pulse rounded-md bg-grayish-100' />
        <div className='h-5 w-16 animate-pulse rounded-full bg-grayish-100' />
      </div>
    </div>
  );
}

function EmptyReservationsState() {
  const t = useTranslations('reservations.emptyState');

  return (
    <StatusLayout
      title={t('title')}
      paragraph={t('description')}
      mainImageSrc='/svg/noReservation.svg'
    />
  );
}

// ─── Tabs provider ─────────────────────────────────────────────────────────────

export function ReservationsTabsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Tabs
      defaultValue='stays'
      className='w-full'
    >
      {children}
    </Tabs>
  );
}

// ─── Tabs list ─────────────────────────────────────────────────────────────────

export function ReservationsTabsList() {
  const t = useTranslations('reservations.tabs');

  return (
    <TabsList className='flex h-auto w-full items-start justify-between gap-0 rounded-full bg-transparent p-1 md:flex-col'>
      <TabsTrigger
        value='stays'
        className='flex flex-1 items-center gap-1.5 rounded-full px-5 py-2 text-sm font-medium text-grayish-500 transition-all data-[state=active]:bg-white data-[state=active]:text-grayish-900 data-[state=active]:shadow-sm'
      >
        <HomeIcon className='size-4' />
        <span>{t('stays')}</span>
      </TabsTrigger>

      {/* Services tab: hidden for now, will be enabled later
      <TabsTrigger
        value='services'
        className='flex flex-1 items-center gap-1.5 rounded-full px-5 py-2 text-sm font-medium text-grayish-500 transition-all data-[state=active]:bg-white data-[state=active]:text-grayish-900 data-[state=active]:shadow-sm'
      >
        <HandBellIcon className='size-4' />
        <span>{t('services')}</span>
      </TabsTrigger> */}
    </TabsList>
  );
}

// ─── Tabs content ──────────────────────────────────────────────────────────────

export function ReservationsTabsContent() {
  const t = useTranslations('reservations');
  const {
    data,
    isPending,
    isFetching,
    isError,
    isFetchingNextPage,
    isFetchNextPageError,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useMyReservations();
  const [loadMoreElement, setLoadMoreElement] = useState<HTMLDivElement | null>(
    null,
  );

  const reservations = data?.pages.flatMap((page) => page.result.items) ?? [];

  useEffect(() => {
    if (!loadMoreElement || !hasNextPage || isFetching || isError) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) void fetchNextPage({ cancelRefetch: false });
    });
    observer.observe(loadMoreElement);
    return () => observer.disconnect();
  }, [loadMoreElement, hasNextPage, isFetching, isError, fetchNextPage]);

  return (
    <>
      <TabsContent
        value='stays'
        className='w-full'
      >
        <div className='flex flex-col divide-y divide-grayish-50'>
          {isPending && (
            <>
              <ReservationCardSkeleton />
              <ReservationCardSkeleton />
              <ReservationCardSkeleton />
            </>
          )}

          {!isPending && !isError && reservations.length === 0 && (
            <EmptyReservationsState />
          )}

          {reservations.map((reservation) => (
            <ReservationCard
              key={reservation.reservationId}
              reservation={reservation}
            />
          ))}
        </div>
        {isError && (
          <div className='flex flex-col items-center gap-3 py-6'>
            <p
              role='alert'
              className='text-sm text-error-500'
            >
              {t('error')}
            </p>
            <Button
              type='button'
              disabled={isFetching}
              onClick={() => {
                if (isFetchNextPageError)
                  void fetchNextPage({ cancelRefetch: false });
                else void refetch();
              }}
            >
              {t('retry')}
            </Button>
          </div>
        )}
        {hasNextPage && (
          <div
            ref={setLoadMoreElement}
            className='h-1'
            aria-hidden
          />
        )}
        {isFetchingNextPage && (
          <div
            role='status'
            className='flex items-center justify-center gap-3 py-6 text-sm text-grayish-400'
          >
            <Spinner />
            <span>{t('loading')}</span>
          </div>
        )}
      </TabsContent>

      {/* Services tab: hidden for now, will be enabled later
      <TabsContent value='services'>
        <div className='flex flex-col items-center justify-center py-16 text-grayish-400'>
          <HandBellIcon className='mb-3 size-10' />
          <p className='text-sm'>{t('emptyServices')}</p>
        </div>
      </TabsContent> */}
    </>
  );
}
