'use client';

import { HomeIcon, WrenchIcon } from 'lucide-react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { useMyReservations } from '@/hooks/useMyReservations';

import ReservationCard from './ReservationCard';
import { type ReservationItem } from './ReservationDetailsDialog';

/** Wraps everything in the shared Tabs context */
export function ReservationsTabsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Tabs defaultValue='stays'>{children}</Tabs>;
}

/** The tab switcher — place under the title in the left column */
export function ReservationsTabsList() {
  return (
    <TabsList className='mt-4 h-auto gap-0 rounded-full bg-[#f0ede8] p-1'>
      <TabsTrigger
        value='stays'
        className='flex items-center gap-1.5 rounded-full px-5 py-2 text-sm font-medium text-grayish-500 transition-all data-[state=active]:bg-white data-[state=active]:text-grayish-900 data-[state=active]:shadow-sm'
      >
        <HomeIcon className='size-4' />
        Stays
      </TabsTrigger>
      <TabsTrigger
        value='services'
        className='flex items-center gap-1.5 rounded-full px-5 py-2 text-sm font-medium text-grayish-500 transition-all data-[state=active]:bg-white data-[state=active]:text-grayish-900 data-[state=active]:shadow-sm'
      >
        <WrenchIcon className='size-4' />
        Services
      </TabsTrigger>
    </TabsList>
  );
}

/** The tab panels — place in the right content column */
export function ReservationsTabsContent() {
  const { data, isLoading, isError } = useMyReservations();

  const reservations = Array.isArray(data)
    ? data
    : data?.items || data?.data || [];

  return (
    <>
      <TabsContent value='stays'>
        <div className='flex flex-col gap-6'>
          {isLoading && <p>Loading...</p>}
          {isError && <p>Error loading reservations</p>}
          {!isLoading && !isError && reservations.length === 0 && (
            <p className='text-grayish-500'>No reservations found.</p>
          )}
          {!isLoading &&
            !isError &&
            reservations.map((reservation: any) => (
              <ReservationCard
                key={reservation.id}
                reservation={reservation}
              />
            ))}
        </div>
      </TabsContent>

      <TabsContent value='services'>
        <div className='flex flex-col items-center justify-center py-16 text-grayish-400'>
          <WrenchIcon className='mb-3 size-10 stroke-1' />
          <p className='text-sm'>No services reservations yet</p>
        </div>
      </TabsContent>
    </>
  );
}
