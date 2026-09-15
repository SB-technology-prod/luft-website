import { useTranslations } from 'next-intl';

import AirbnbIcon from '@/components/icons/AirbnbIcon';

import AppRate from './AppRate';

export default function AuthBanner() {
  const numOfGuests = 1000;
  const rate = 4.8;
  const t = useTranslations('auth.banner');

  return (
    <div className='relative h-full w-1/2 overflow-hidden rounded-2xl max-lg:hidden xl-1200:w-[41rem]'>
      <img
        src='/images/auth/authBanner.jpg'
        alt='Auth Banner'
        className='absolute inset-0 size-full'
      />
      <div className='absolute inset-0 flex size-full flex-col justify-end bg-gradient-to-b from-transparent to-[#15110D] text-center'>
        <div className='mb-16 flex flex-col items-center gap-4'>
          <h4 className='mx-auto max-w-[75%] text-5xl font-medium leading-[3.5rem] text-grayish-50'>
            {t('description')}
          </h4>
          <div className='flex text-white'>
            <AppRate rate={rate} />
            <p className='me-2 ms-1'>
              {t('ratedBy', {
                numOfGuests,
              })}
            </p>
            <AirbnbIcon />
          </div>
        </div>
      </div>
    </div>
  );
}
