import React from 'react';

import { useTranslations } from 'next-intl';

import AirbnbIcon from '@/components/icons/AirbnbIcon';

import AppRate from '@/app/[locale]/(auth)/_components/AppRate';
import { cn } from '@/lib/utils';

type RatedByGuestsProps = {
  color?: string;
  textClassName?: string;
};

export default function RatedByGuests({
  color,
  textClassName,
}: RatedByGuestsProps) {
  const numOfGuests = 1000;
  const rate = 4.8;
  const t = useTranslations('auth.banner');

  return (
    <div className={'flex items-center text-grayish-900'}>
      <AppRate
        rate={rate}
        color={color}
        textClassName={textClassName}
      />
      <p
        className={cn('me-2 ms-1', textClassName)}
        style={{ color }}
      >
        {t('ratedBy', {
          numOfGuests,
        })}
      </p>
      <AirbnbIcon />
    </div>
  );
}
