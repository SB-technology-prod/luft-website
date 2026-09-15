import React from 'react';

import { IconProps } from '@/types';

export default function XIcon({ className }: IconProps) {
  return (
    <svg
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path
        d='M11.5721 8.41412L18.8106 0H17.0953L10.8103 7.30606L5.79024 0H0L7.59102 11.0479L0 19.8718H1.71533L8.35251 12.156L13.6543 19.8718H19.4446L11.5721 8.41412ZM9.2225 11.1453L8.45346 10.0452L2.33335 1.29127H4.96835L9.90728 8.35569L10.6763 9.4558L17.0961 18.6389H14.4611L9.2225 11.1453Z'
        fill='#1B1B1B'
      />
    </svg>
  );
}
