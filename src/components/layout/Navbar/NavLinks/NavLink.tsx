'use client';

import { useParams } from 'next/navigation';

import { NavLinkProps } from '@/types/components';
import { PageTypeEnum } from '@/types/page';

import { Link, usePathname } from '@/i18n/routing';
import { cn } from '@/lib/utils';

export default function NavLink({ title, id, pageType }: NavLinkProps) {
  const params = useParams();
  const pathname = usePathname();

  const currentId = params?.id as string;
  const isHomePage = pageType === PageTypeEnum.Home && pathname === '/';
  const isActive = currentId ? currentId === id : isHomePage;

  const href = pageType === PageTypeEnum.Home ? '/' : `/${id}`;

  return (
    <Link
      href={href}
      className={cn('text-grayish-300 hover:text-grayish-500', {
        'font-medium text-grayish-900 hover:text-current': isActive,
      })}
    >
      {title}
    </Link>
  );
}
