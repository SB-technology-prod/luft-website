import React from 'react';

import StarIcon from '@/components/icons/StarIcon';

type AppRateProps = {
  rate: number;
  color?: string;
  textClassName?: string;
};

export default function AppRate({ rate, color, textClassName }: AppRateProps) {
  return (
    <div className='flex items-center gap-0.5'>
      <StarIcon
        fill={color}
        className={`size-5`}
      />
      <span
        className={textClassName}
        style={{
          color,
        }}
      >
        {rate}
      </span>
    </div>
  );
}
