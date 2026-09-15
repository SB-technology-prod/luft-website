'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';

import { Minus, Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';

type ReservationFormProps = {
  maxGuests: number;
  variant?: 'default' | 'mobile';
};

function ReservationForm({
  maxGuests,
  variant = 'default',
}: ReservationFormProps) {
  const t = useTranslations('pages.propertyDetails.reservation');
  const [guests, setGuests] = useState(1);

  if (variant === 'default')
    return (
      <div className='flex flex-col gap-4'>
        <div className='flex h-16 w-full justify-between rounded-full border border-grayish-100'>
          <div className='flex flex-col justify-center ps-4 lg:px-6 lg:py-2.5'>
            <span className='text-sm leading-6 text-grayish-900'>{t('checkIn')}</span>
            <span className='leading-5 text-grayish-400'>{t('addDate')}</span>
          </div>
          <span className='h-full w-px bg-grayish-50' />
          <div className='flex flex-col justify-center pe-4 lg:px-6 lg:py-2.5'>
            <span className='text-sm leading-6 text-grayish-900'>
              {t('checkOut')}
            </span>
            <span className='leading-5 text-grayish-400'>{t('addDate')}</span>
          </div>
        </div>
        {/* Guests selection */}
        <div className='flex h-16 w-full justify-between rounded-full border border-grayish-100 px-6 py-2.5 text-grayish-900'>
          <div className='flex flex-col'>
            <span className='text-sm'>{t('guests')}</span>
            <span className=''>{t('guestsCount', { count: guests })}</span>
          </div>
          <div className='flex items-center gap-1'>
            <button
              type='button'
              onClick={() => {
                if (guests > 1) {
                  setGuests(guests - 1);
                }
              }}
              disabled={guests <= 1}
              className='group'
            >
              <Minus className='size-6 transition-all duration-300 group-disabled:text-grayish-200' />
            </button>
            <button
              type='button'
              onClick={() => {
                if (guests < maxGuests) {
                  setGuests(guests + 1);
                }
              }}
              disabled={guests >= maxGuests}
              className='group'
            >
              <Plus className='size-6 transition-all duration-300 group-disabled:text-grayish-200' />
            </button>
          </div>
        </div>
        <Button className='h-14 text-base text-grayish-50'>{t('reserve')}</Button>
      </div>
    );

  if (variant === 'mobile')
    return (
      <div className='flex h-full w-full items-center gap-4 bg-white p-6'>
        <div className='flex flex-col text-grayish-400'>
          <span className='text-2xl font-medium text-grayish-900'>$120</span>
          <span>{t('forNights', { count: 2 })}</span>
        </div>
        <span className='h-full w-px bg-grayish-50' />
        <Button className='h-12 flex-1 text-base text-grayish-50'>
          {t('reserve')}
        </Button>
      </div>
    );
}

export default ReservationForm;
