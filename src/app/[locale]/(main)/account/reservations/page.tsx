import Link from 'next/link';

import { CircleChevronLeftIcon, CircleChevronRightIcon } from 'lucide-react';

import {
  ReservationsTabsContent,
  ReservationsTabsList,
  ReservationsTabsProvider,
} from './_components/ReservationsTabs';

export default async function ReservationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isRtl = locale === 'ar';

  return (
    <ReservationsTabsProvider>
      <div className='container mb-[9.875rem] mt-6 flex w-full gap-8 max-lg:flex-col max-md:gap-6 md:mb-44 md:mt-20 xl:mb-48 xl:ms-[4.5rem] xl:mt-28 xl:w-[60.375rem]'>
        {/* Left column: back arrow + title + tab switcher */}
        <div className='flex gap-4 max-lg:items-start lg:flex-col xl:-mt-16'>
          <Link href='/' className='w-fit max-sm:hidden'>
            {isRtl ? (
              <CircleChevronRightIcon className='size-10 stroke-1 text-grayish-900' />
            ) : (
              <CircleChevronLeftIcon className='size-10 stroke-1 text-grayish-900' />
            )}
          </Link>
          <div>
            <h6 className='text-2xl font-medium text-grayish-900 sm:text-[1.75rem] lg:text-[2rem]'>
              My Reservations
            </h6>
            <ReservationsTabsList />
          </div>
        </div>

        {/* Right column: tab content (cards) */}
        <div className='flex-1'>
          <ReservationsTabsContent />
        </div>
      </div>
    </ReservationsTabsProvider>
  );
}

