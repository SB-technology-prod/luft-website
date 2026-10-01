import Link from 'next/link';

import { getTranslations } from 'next-intl/server';

import {
  ReservationsTabsContent,
  ReservationsTabsList,
  ReservationsTabsProvider,
} from './_components/ReservationsTabs';

// Inline circle-chevron SVGs so we don't need lucide
function CircleChevronLeft() {
  return (
    <svg
      width='40'
      height='40'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className='text-grayish-900'
      stroke='currentColor'
      strokeWidth='1'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <circle cx='12' cy='12' r='10' />
      <polyline points='13 16 9 12 13 8' />
    </svg>
  );
}

function CircleChevronRight() {
  return (
    <svg
      width='40'
      height='40'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className='text-grayish-900'
      stroke='currentColor'
      strokeWidth='1'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <circle cx='12' cy='12' r='10' />
      <polyline points='11 8 15 12 11 16' />
    </svg>
  );
}

export default async function ReservationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isRtl = locale === 'ar';
  const t = await getTranslations('reservations');

  return (
    <ReservationsTabsProvider>
      <div
        dir={isRtl ? 'rtl' : 'ltr'}
        className='container mb-[9.875rem] mt-6 flex w-full flex-col gap-8 max-md:gap-6 md:mb-44 md:mt-10 xl:mb-48 xl:mt-[44px] xl:w-[60.375rem] xl:ms-[4.5rem]'
      >
        {/* Top: back arrow + title */}
        <div className='flex flex-col gap-3'>
          <Link href='/' className='w-fit max-sm:hidden'>
            {isRtl ? <CircleChevronRight /> : <CircleChevronLeft />}
          </Link>

          <h6 className='text-2xl font-medium text-grayish-900 sm:text-[1.75rem] lg:text-[2rem]'>
            {t('title')}
          </h6>
        </div>

        {/* Tabs + content */}
        <div className='flex w-full flex-col gap-6 md:flex-row md:items-start md:gap-[72px] lg:gap-[103px]'>
          <div className='shrink-0 md:w-40'>
            <ReservationsTabsList />
          </div>

          <div className='min-w-0 flex-1'>
            <ReservationsTabsContent />
          </div>
        </div>
      </div>
    </ReservationsTabsProvider>
  );
}
