'use client';

import { useParams } from 'next/navigation';

import { NavLinkProps } from '@/types/components';
import { PageTypeEnum } from '@/types/page';

import { Link, usePathname } from '@/i18n/routing';
import { cn } from '@/lib/utils';

export default function FooterLink({ id, title, pageType }: NavLinkProps) {
  const params = useParams();
  const pathname = usePathname();

  const currentId = params?.id as string;
  const isHomePage = pageType === PageTypeEnum.Home && pathname === '/';
  const isActive = currentId ? currentId === id : isHomePage;

  const href = pageType === PageTypeEnum.Home ? '/' : `/${id}`;

  return (
    <Link
      href={href}
      title={title}
      className={cn('line-clamp-1 w-fit text-grayish-100 sm:text-lg', {
        'font-medium text-grayish-30': isActive,
      })}
    >
      {title}
    </Link>
  );
}
