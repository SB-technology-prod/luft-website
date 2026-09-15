'use client';
import React, { ReactNode } from 'react';

import { SheetClose } from '@/components/ui/sheet';

import { Link } from '@/i18n/routing';

type UserLinkProps = {
  label: string;
  icon: ReactNode;
  href: string;
};

export default function UserLink({ label, icon, href }: UserLinkProps) {
  return (
    <SheetClose asChild>
      <Link
        type='button'
        className='flex items-center gap-2'
        href={href}
      >
        {icon}
        <span>{label}</span>
      </Link>
    </SheetClose>
  );
}
