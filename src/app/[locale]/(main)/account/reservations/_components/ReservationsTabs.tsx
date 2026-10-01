'use client';

import { useTranslations } from 'next-intl';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

import { useMyReservations } from '@/hooks/useMyReservations';

import ReservationCard from './ReservationCard';

// ─── Home / Stays icon ─────────────────────────────────────────────────────────

function HomeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width='16'
      height='16'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M3 9.5L12 3L21 9.5V20C21 20.5523 20.5523 21 20 21H15V15H9V21H4C3.44772 21 3 20.5523 3 20V9.5Z'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}

// ─── Wrench / Services icon ────────────────────────────────────────────────────

function ServicesIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width='16'
      height='16'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}

// ─── Reservation card skeleton ─────────────────────────────────────────────────

function ReservationCardSkeleton() {
  return (
    <div className='flex w-full items-start gap-4 rounded-xl p-2'>
      {/* Image placeholder */}
      <div className='h-[7.5rem] w-[8.5rem] shrink-0 animate-pulse rounded-xl bg-grayish-100 sm:h-28 sm:w-36' />
      {/* Text placeholders */}
      <div className='flex flex-1 flex-col gap-2.5 pt-1'>
        <div className='h-5 w-2/3 animate-pulse rounded-md bg-grayish-100' />
        <div className='h-4 w-1/2 animate-pulse rounded-md bg-grayish-100' />
        <div className='h-4 w-1/3 animate-pulse rounded-md bg-grayish-100' />
        <div className='h-6 w-20 animate-pulse rounded-full bg-grayish-100' />
      </div>
    </div>
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
    <TabsList className='flex h-auto w-full items-start justify-start gap-0 rounded-full bg-transparent p-1 md:flex-col'>
      <TabsTrigger
        value='stays'
        className='flex items-center gap-1.5 rounded-full px-5 py-2 text-sm font-medium text-grayish-500 transition-all data-[state=active]:bg-white data-[state=active]:text-grayish-900 data-[state=active]:shadow-sm'
      >
        <HomeIcon className='size-4' />
        <span>{t('stays')}</span>
      </TabsTrigger>

      <TabsTrigger
        value='services'
        className='flex items-center gap-1.5 rounded-full px-5 py-2 text-sm font-medium text-grayish-500 transition-all data-[state=active]:bg-white data-[state=active]:text-grayish-900 data-[state=active]:shadow-sm'
      >
        <ServicesIcon className='size-4' />
        <span>{t('services')}</span>
      </TabsTrigger>
    </TabsList>
  );
}

// ─── Tabs content ──────────────────────────────────────────────────────────────

export function ReservationsTabsContent() {
  const t = useTranslations('reservations');
  const { data, isLoading, isError } = useMyReservations();

  const reservations = data?.result?.items || [];

  return (
    <>
      <TabsContent value='stays' className='w-full'>
        <div className='flex flex-col gap-6'>
          {isLoading && (
            <>
              <ReservationCardSkeleton />
              <ReservationCardSkeleton />
              <ReservationCardSkeleton />
            </>
          )}

          {isError && (
            <p className='text-sm text-error-500'>{t('error')}</p>
          )}

          {!isLoading && !isError && reservations.length === 0 && (
            <p className='text-sm text-grayish-500'>{t('empty')}</p>
          )}

          {!isLoading &&
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
          <ServicesIcon className='mb-3 size-10' />
          <p className='text-sm'>{t('emptyServices')}</p>
        </div>
      </TabsContent>
    </>
  );
}
