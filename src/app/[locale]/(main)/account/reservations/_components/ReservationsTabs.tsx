'use client';

import { useTranslations } from 'next-intl';

import HandBellIcon from '@/components/icons/HandBellIcon';
import HomeIcon from '@/components/icons/HomeIcon';
import StatusLayout from '@/components/shared/StatusLayout';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

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
    <Tabs defaultValue='stays' className='w-full'>
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
        className='flex-1 flex items-center gap-1.5 rounded-full px-5 py-2 text-sm font-medium text-grayish-500 transition-all data-[state=active]:bg-white data-[state=active]:text-grayish-900 data-[state=active]:shadow-sm'
      >
        <HomeIcon className='size-4' />
        <span>{t('stays')}</span>
      </TabsTrigger>

      <TabsTrigger
        value='services'
        className='flex-1 flex items-center gap-1.5 rounded-full px-5 py-2 text-sm font-medium text-grayish-500 transition-all data-[state=active]:bg-white data-[state=active]:text-grayish-900 data-[state=active]:shadow-sm'
      >
        <HandBellIcon className='size-4' />
        <span>{t('services')}</span>
      </TabsTrigger>
    </TabsList>
  );
}

// ─── Tabs content ──────────────────────────────────────────────────────────────

export function ReservationsTabsContent() {
  const t = useTranslations('reservations');
  const { data, isFetching, isError } = useMyReservations();

  const reservations = data?.result?.items || [];
  console.log("🚀 ~ ReservationsTabsContent ~ reservations:", reservations)

  return (
    <>
      <TabsContent value='stays' className='w-full'>
        <div className='flex flex-col divide-y divide-grayish-50'>
          {isFetching && (
            <>
              <ReservationCardSkeleton />
              <ReservationCardSkeleton />
              <ReservationCardSkeleton />
            </>
          )}

          {!isFetching && (isError || reservations.length === 0) && (
            <EmptyReservationsState />
          )}

          {!isFetching &&
            !isError &&
            reservations.map((reservation) => (
              <ReservationCard
                key={reservation.reservationId}
                reservation={reservation}
              />
            ))}
        </div>
      </TabsContent>

      <TabsContent value='services'>
        <div className='flex flex-col items-center justify-center py-16 text-grayish-400'>
          <HandBellIcon className='mb-3 size-10' />
          <p className='text-sm'>{t('emptyServices')}</p>
        </div>
      </TabsContent>
    </>
  );
}
