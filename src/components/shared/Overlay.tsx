import React, { ReactNode } from 'react';

import { cn } from '@/lib/utils';

type LoadingOverlayProps = {
  children?: ReactNode;
  className?: string;
};

export default function Overlay({ children, className }: LoadingOverlayProps) {
  return (
    <div
      className={cn(
        'absolute inset-0 flex size-full items-center justify-center rounded-xl bg-transparent',
        className,
      )}
    >
      {children}
    </div>
  );
}
