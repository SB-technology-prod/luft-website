import React from 'react';

import { IconProps } from '@/types';

export default function VisaIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox='0 0 38 24'
      xmlns='http://www.w3.org/2000/svg'
      role='img'
      aria-label='Visa'
    >
      <rect
        width='38'
        height='24'
        rx='4'
        fill='#1A1F71'
      />
      <text
        x='19'
        y='17'
        textAnchor='middle'
        fill='white'
        fontSize='12'
        fontWeight='bold'
        fontFamily='Arial, sans-serif'
        letterSpacing='1'
      >
        VISA
      </text>
    </svg>
  );
}
