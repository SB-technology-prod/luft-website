import React, { ReactNode } from 'react';

import { cn } from '@/lib/utils';

type TextBetweenLineProps = { children: ReactNode; className?: string };

export default function TextBetweenLine({
  children,
  className,
}: TextBetweenLineProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <span className='h-px flex-1 bg-grayish-50' />
      <div className='text-sm text-grayish-400'>{children}</div>
      <span className='h-px flex-1 bg-grayish-50' />
    </div>
  );
}
