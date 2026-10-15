import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

import { Button } from '@/components/ui/button';

import { Link } from '@/i18n/routing';

export async function generateMetadata() {
  const t = await getTranslations('reservationFailed');

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function ReservationFailedPage() {
  const t = await getTranslations('reservationFailed');

  return (
    <section className='relative flex min-h-[34rem] w-full items-center justify-center overflow-hidden px-6 py-16 sm:min-h-[39rem] md:px-10 lg:min-h-[43.5rem] lg:py-20'>
      <Image
        src='/svg/leftArrow.svg'
        alt=''
        width={95}
        height={130}
        aria-hidden
        className='pointer-events-none absolute left-4 top-1/2 hidden h-auto w-16 -translate-y-1/2 lg:block xl:left-16 xl:w-[5.9375rem]'
      />

      <div className='flex w-full max-w-[37.25rem] flex-col items-center text-center'>
        <div className='relative mb-5 aspect-[596/318] w-full max-w-[31rem] sm:mb-6 lg:max-w-[37.25rem]'>
          <Image
            src='/svg/reservationConfirmed.svg'
            alt={t('imageAlt')}
            fill
            priority
            sizes='(max-width: 640px) 82vw, (max-width: 1024px) 31rem, 37.25rem'
            className='object-contain'
          />
        </div>

        <h1 className='text-2xl font-medium leading-8 text-grayish-900 sm:text-[2rem] sm:leading-10'>
          {t('title')}
        </h1>
        <p className='mt-2 max-w-[27rem] text-sm leading-5 text-grayish-400 sm:text-base sm:leading-6'>
          {t('description')}
        </p>

        <Button
          asChild
          className='mt-7 h-12 min-w-[8.5rem] px-6 text-sm font-medium text-grayish-50'
        >
          <Link href='/'>{t('backToHome')}</Link>
        </Button>
      </div>

      <Image
        src='/svg/rightArrow.svg'
        alt=''
        width={95}
        height={130}
        aria-hidden
        className='pointer-events-none absolute right-4 top-1/2 hidden h-auto w-16 -translate-y-1/2 lg:block xl:right-16 xl:w-[5.9375rem]'
      />
    </section>
  );
}
