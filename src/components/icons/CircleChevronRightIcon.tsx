import React from 'react';

import { IconProps } from '@/types';

export default function CircleChevronRightIcon({ className }: IconProps) {
  return (
    <svg
      width='40'
      height='40'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className ?? 'text-grayish-900'}
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
