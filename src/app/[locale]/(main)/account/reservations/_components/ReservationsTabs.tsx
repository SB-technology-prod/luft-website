'use client';

import { HomeIcon, WrenchIcon } from 'lucide-react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import ReservationCard from './ReservationCard';
import { type ReservationItem } from './ReservationDetailsDialog';

// Mock apartment image (placeholder using a public URL)
const APARTMENT_IMG =
  'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80';

const MOCK_RESERVATIONS: ReservationItem[] = [
  {
    id: '1',
    title: 'Apartment in Alexandria, Egypt',
    location: 'Alexandria, Egypt',
    description:
      'Enjoy a stylish experience at this centrally-located apartment with stunning Nile views.',
    rating: 4.95,
    reviewsCount: 44,
    imageUrl: APARTMENT_IMG,
    checkIn: '2024-03-15',
    checkOut: '2024-03-18',
    checkInDisplay: '15th March',
    checkOutDisplay: '18th March',
    submittedOn: '4 may 2024',
    status: 'upcoming',
    guests: 4,
    nightlyRate: 120,
    nights: 3,
    breakfastCount: 1,
    earlyCheckIn: true,
    taxes: 36,
    paymentMethod: { brand: 'Master Card', last4: '4471', expDate: '07/28' },
  },
  {
    id: '2',
    title: 'Apartment in Alexandria, Egypt',
    location: 'Alexandria, Egypt',
    description:
      'Enjoy a stylish experience at this centrally-located apartment with stunning Nile views.',
    rating: 4.95,
    reviewsCount: 44,
    imageUrl: APARTMENT_IMG,
    checkIn: '2024-03-15',
    checkOut: '2024-03-18',
    checkInDisplay: '15th March',
    checkOutDisplay: '18th March',
    submittedOn: '4 may 2024',
    status: 'ongoing',
    guests: 2,
    nightlyRate: 120,
    nights: 3,
    breakfastCount: 1,
    earlyCheckIn: false,
    taxes: 36,
    paymentMethod: { brand: 'Master Card', last4: '4471', expDate: '07/28' },
  },
  {
    id: '3',
    title: 'Apartment in Alexandria, Egypt',
    location: 'Alexandria, Egypt',
    description:
      'Enjoy a stylish experience at this centrally-located apartment with stunning Nile views.',
    rating: 4.95,
    reviewsCount: 44,
    imageUrl: APARTMENT_IMG,
    checkIn: '2024-03-15',
    checkOut: '2024-03-18',
    checkInDisplay: '15th March',
    checkOutDisplay: '18th March',
    submittedOn: '4 may 2024',
    status: 'completed',
    guests: 3,
    nightlyRate: 120,
    nights: 3,
    breakfastCount: 1,
    earlyCheckIn: true,
    taxes: 36,
    paymentMethod: { brand: 'Master Card', last4: '4471', expDate: '07/28' },
  },
  {
    id: '4',
    title: 'Apartment in Alexandria, Egypt',
    location: 'Alexandria, Egypt',
    description:
      'Enjoy a stylish experience at this centrally-located apartment with stunning Nile views.',
    rating: 4.95,
    reviewsCount: 44,
    imageUrl: APARTMENT_IMG,
    checkIn: '2024-03-15',
    checkOut: '2024-03-18',
    checkInDisplay: '15th March',
    checkOutDisplay: '18th March',
    submittedOn: '4 may 2024',
    status: 'canceled',
    guests: 2,
    nightlyRate: 120,
    nights: 3,
    breakfastCount: 1,
    earlyCheckIn: false,
    taxes: 36,
    paymentMethod: { brand: 'Master Card', last4: '4471', expDate: '07/28' },
  },
];

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
  return (
    <>
      <TabsContent value='stays'>
        <div className='flex flex-col gap-6'>
          {MOCK_RESERVATIONS.map((reservation) => (
            <ReservationCard key={reservation.id} reservation={reservation} />
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

