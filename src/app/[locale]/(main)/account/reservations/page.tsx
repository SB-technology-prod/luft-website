import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import CircleChevronLeftIcon from '@/components/icons/CircleChevronLeftIcon';
import CircleChevronRightIcon from '@/components/icons/CircleChevronRightIcon';

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
            {isRtl ? <CircleChevronRightIcon /> : <CircleChevronLeftIcon />}
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
