'use client';

import React from 'react';

import { SheetClose } from '@/components/ui/sheet';

import { Link } from '@/i18n/routing';

export default function MobileNavLink({
  title,
  id,
}: {
  title: string;
  id: string;
}) {
  return (
    <SheetClose
      className='size-fit'
      asChild
    >
      <Link
        href={`/${id}`}
        className='text-grayish-900'
      >
        {title}
      </Link>
    </SheetClose>
  );
}
