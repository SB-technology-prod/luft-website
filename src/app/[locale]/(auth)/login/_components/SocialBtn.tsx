import React, { ReactNode } from 'react';

import { Button } from '@/components/ui/button';

import { cn } from '@/lib/utils';

type SocialBtnProps = {
  label: string;
  icon: ReactNode;
  onClick: () => void;
  className?: string;
};

export default function SocialBtn({
  label,
  icon,
  onClick,
  className,
}: SocialBtnProps) {
  return (
    <Button
      className={cn(
        'group flex h-12 items-center gap-1 border border-transparent bg-white py-3.5 text-grayish-900 shadow-sm transition-all hover:border-white hover:bg-grayish-900 hover:text-white',
        className,
      )}
      onClick={onClick}
    >
      {icon}
      <span className='max-sm:text-sm'>{label}</span>
    </Button>
  );
}
